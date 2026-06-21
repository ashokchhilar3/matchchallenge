import { useEffect, useMemo, useReducer } from 'react'
import AppShell from './components/AppShell.jsx'
import CelebrationOverlay from './components/CelebrationOverlay.jsx'
import ExerciseScreen from './components/ExerciseScreen.jsx'
import LeaderboardPanel from './components/LeaderboardPanel.jsx'
import NameEntryScreen from './components/NameEntryScreen.jsx'
import ScoreSummary from './components/ScoreSummary.jsx'
import TimelineView from './components/TimelineView.jsx'
import leaderboardBots from './data/leaderboardBots.js'
import levels from './data/levels.js'
import { buildLeaderboardEntries } from './utils/leaderboard.js'
import {
  advanceLeaderboard,
  buildInitialGameState,
  continueAfterResults,
  dismissCelebration,
  gameReducer,
  goToTimeline,
  retryLevel,
  selectLevel,
  setAnswer,
  startGame,
  startLevel,
  submitLevel,
  toggleDispute,
} from './utils/gameState.js'
import { calculateScore } from './utils/scoring.js'
import { loadSessionState, saveSessionState } from './utils/storage.js'

function App() {
  const [state, dispatch] = useReducer(
    gameReducer,
    {
      levels,
      bots: leaderboardBots,
      storedSession: loadSessionState(),
    },
    buildInitialGameState,
  )

  const selectedLevel =
    state.levels.find((level) => level.id === state.selectedLevelId) ?? state.levels[0]
  const activeLevel =
    state.levels.find((level) => level.id === state.exercise.levelId) ?? selectedLevel
  const hasSavedExerciseForSelectedLevel =
    state.exercise.levelId === selectedLevel.id &&
    (Object.keys(state.exercise.answersByQuestionId).length > 0 ||
      state.exercise.disputedQuestionIds.length > 0)
  const completedLevelSet = useMemo(
    () => new Set(state.progress.completedLevelIds),
    [state.progress.completedLevelIds],
  )
  const leaderboardEntries = useMemo(
    () =>
      buildLeaderboardEntries({
        bots: state.leaderboard.bots,
        tickCount: state.leaderboard.tickCount,
        playerName: state.playerName,
        progress: state.progress,
        levelCount: state.levels.length,
      }),
    [
      state.leaderboard.bots,
      state.leaderboard.tickCount,
      state.playerName,
      state.progress,
      state.levels.length,
    ],
  )

  useEffect(() => {
    saveSessionState({
      playerName: state.playerName,
      progress: state.progress,
      exercise: state.exercise,
      leaderboard: state.leaderboard,
    })
  }, [state.exercise, state.leaderboard, state.playerName, state.progress])

  useEffect(() => {
    if (!state.playerName) {
      return undefined
    }

    const timerId = window.setInterval(() => {
      dispatch(advanceLeaderboard())
    }, 4000)

    return () => window.clearInterval(timerId)
  }, [state.playerName])

  useEffect(() => {
    if (!state.celebration.isVisible) {
      return undefined
    }

    const timerId = window.setTimeout(() => {
      dispatch(dismissCelebration())
    }, 1600)

    return () => window.clearTimeout(timerId)
  }, [state.celebration.isVisible])

  const handleSubmitLevel = () => {
    if (!state.exercise.levelId) {
      return
    }

    const level = state.levels.find((item) => item.id === state.exercise.levelId)

    if (!level) {
      return
    }

    dispatch(
      submitLevel(
        calculateScore(level, state.exercise.answersByQuestionId, state.exercise.disputedQuestionIds),
      ),
    )
  }

  const isSelectedLevelUnlocked =
    selectedLevel.id === state.currentLevelId || completedLevelSet.has(selectedLevel.id)
  const selectedLevelResult = state.progress.scoresByLevelId[selectedLevel.id]
  const allLevelsComplete = state.progress.completedLevelIds.length === state.levels.length

  const renderTimelineScreen = (isCompleteView = false) => (
    <section className={`screen screen--timeline${isCompleteView ? ' screen--complete' : ''}`}>
      <header className="screen__header">
        <p className="screen__eyebrow">{isCompleteView ? 'Path complete' : 'Adventure map'}</p>
        <h2 className="screen__title">
          {isCompleteView
            ? `Amazing work, ${state.playerName || 'Explorer'}!`
            : 'Pick your next checkpoint'}
        </h2>
        <p className="screen__intro">
          {isCompleteView
            ? 'You cleared every level. Replay any checkpoint to sharpen your score and keep your place on the leaderboard.'
            : 'Levels unlock one at a time. Pass each checkpoint with a perfect unflagged score to move forward.'}
        </p>
      </header>

      <TimelineView
        levels={state.levels}
        currentLevelId={state.currentLevelId}
        completedLevelIds={state.progress.completedLevelIds}
        selectedLevelId={state.selectedLevelId}
        onSelectLevel={(levelId) => dispatch(selectLevel(levelId))}
      />

      <section className="level-preview">
        <header className="level-preview__header">
          <h3 className="level-preview__title">{selectedLevel.title}</h3>
          <p className="level-preview__theme">{selectedLevel.theme}</p>
        </header>
        <p className="level-preview__status">
          {completedLevelSet.has(selectedLevel.id)
            ? 'Completed — replay anytime.'
            : isSelectedLevelUnlocked
              ? 'Unlocked — ready to play.'
              : 'Locked — pass the current level first.'}
        </p>
        {selectedLevelResult ? (
          <p className="level-preview__score">
            Best score: {selectedLevelResult.percentage}% with {selectedLevelResult.disputedCount}{' '}
            flagged
          </p>
        ) : null}
        <button
          className="level-preview__button"
          type="button"
          disabled={!isSelectedLevelUnlocked}
          onClick={() => dispatch(startLevel(selectedLevel.id))}
        >
          {completedLevelSet.has(selectedLevel.id)
            ? 'Replay level'
            : hasSavedExerciseForSelectedLevel
              ? 'Resume level'
              : 'Start level'}
        </button>
      </section>
    </section>
  )

  let mainContent

  if (state.screen === 'name-entry') {
    mainContent = (
      <NameEntryScreen
        initialName={state.playerName}
        onStart={(playerName) => dispatch(startGame(playerName))}
      />
    )
  } else if (state.screen === 'exercise' && activeLevel) {
    mainContent = (
      <ExerciseScreen
        level={activeLevel}
        answers={state.exercise.answersByQuestionId}
        disputedIds={state.exercise.disputedQuestionIds}
        onAnswerChange={(questionId, optionId) => dispatch(setAnswer(questionId, optionId))}
        onToggleDispute={(questionId) => dispatch(toggleDispute(questionId))}
        onSubmit={handleSubmitLevel}
        onBack={() => dispatch(goToTimeline())}
      />
    )
  } else if (state.screen === 'results' && state.lastResult) {
    mainContent = (
      <ScoreSummary
        result={state.lastResult}
        onRetry={() => dispatch(retryLevel(state.lastResult.levelId))}
        onContinue={() => dispatch(continueAfterResults())}
      />
    )
  } else if (state.screen === 'complete') {
    mainContent = renderTimelineScreen(true)
  } else {
    mainContent = renderTimelineScreen(allLevelsComplete)
  }

  return (
    <>
      <CelebrationOverlay
        mode={state.celebration.mode === 'path-clear' ? 'complete' : 'level'}
        isVisible={state.celebration.isVisible}
        message={state.celebration.message}
      />
      <AppShell
        title="Math Challenge"
        subtitle={state.playerName ? `Player: ${state.playerName}` : '5th Grade Adventure'}
        mainContent={mainContent}
        sideContent={<LeaderboardPanel entries={leaderboardEntries} playerName={state.playerName} />}
      />
    </>
  )
}

export default App
