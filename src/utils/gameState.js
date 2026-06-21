const getNextLevelId = (levels, completedLevelIds) =>
  levels.find((level) => !completedLevelIds.includes(level.id))?.id ?? levels.at(-1)?.id ?? null

const sortCompletedLevels = (levels, completedLevelIds) =>
  levels.filter((level) => completedLevelIds.includes(level.id)).map((level) => level.id)

const summarizeLevelResult = (result) => ({
  levelId: result.levelId,
  correctCount: result.correctCount,
  totalCount: result.totalCount,
  incorrectCount: result.incorrectCount,
  disputedCount: result.disputedCount,
  percentage: result.percentage,
  passed: result.passed,
  needsUndisputedAnswer: result.needsUndisputedAnswer,
  incorrectQuestionIds: result.incorrectQuestionIds,
  unansweredQuestionIds: result.unansweredQuestionIds,
})

const createEmptyExerciseState = () => ({
  levelId: null,
  answersByQuestionId: {},
  disputedQuestionIds: [],
})

const hydrateExerciseState = (levels, storedExercise) => {
  if (!storedExercise?.levelId || !levels.some((level) => level.id === storedExercise.levelId)) {
    return createEmptyExerciseState()
  }

  return {
    levelId: storedExercise.levelId,
    answersByQuestionId: storedExercise.answersByQuestionId ?? {},
    disputedQuestionIds: Array.isArray(storedExercise.disputedQuestionIds)
      ? storedExercise.disputedQuestionIds
      : [],
  }
}

export const initialCelebrationState = {
  isVisible: false,
  mode: 'idle',
  message: '',
}

export const actionTypes = {
  START_GAME: 'START_GAME',
  SELECT_LEVEL: 'SELECT_LEVEL',
  START_LEVEL: 'START_LEVEL',
  SET_ANSWER: 'SET_ANSWER',
  TOGGLE_DISPUTE: 'TOGGLE_DISPUTE',
  SUBMIT_LEVEL: 'SUBMIT_LEVEL',
  RETRY_LEVEL: 'RETRY_LEVEL',
  CONTINUE_AFTER_RESULTS: 'CONTINUE_AFTER_RESULTS',
  GO_TO_TIMELINE: 'GO_TO_TIMELINE',
  ADVANCE_LEADERBOARD: 'ADVANCE_LEADERBOARD',
  DISMISS_CELEBRATION: 'DISMISS_CELEBRATION',
}

export const buildInitialGameState = ({ levels, bots, storedSession }) => {
  const completedLevelIds = sortCompletedLevels(levels, storedSession?.progress?.completedLevelIds ?? [])
  const currentLevelId = getNextLevelId(levels, completedLevelIds)
  const exercise = hydrateExerciseState(levels, storedSession?.exercise)
  const selectedLevelId = exercise.levelId ?? currentLevelId

  return {
    playerName: storedSession?.playerName ?? '',
    screen: storedSession?.playerName ? 'timeline' : 'name-entry',
    levels,
    currentLevelId,
    selectedLevelId,
    progress: {
      completedLevelIds,
      scoresByLevelId: storedSession?.progress?.scoresByLevelId ?? {},
    },
    exercise,
    lastResult: null,
    leaderboard: {
      bots: storedSession?.leaderboard?.bots?.length ? storedSession.leaderboard.bots : bots,
      tickCount: storedSession?.leaderboard?.tickCount ?? 0,
    },
    celebration: initialCelebrationState,
  }
}

export const gameReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.START_GAME:
      return {
        ...state,
        playerName: action.payload.playerName,
        screen: 'timeline',
      }
    case actionTypes.SELECT_LEVEL:
      return {
        ...state,
        selectedLevelId: action.payload.levelId,
      }
    case actionTypes.START_LEVEL:
      return {
        ...state,
        screen: 'exercise',
        selectedLevelId: action.payload.levelId,
        exercise:
          state.exercise.levelId === action.payload.levelId
            ? state.exercise
            : {
                levelId: action.payload.levelId,
                answersByQuestionId: {},
                disputedQuestionIds: [],
              },
      }
    case actionTypes.SET_ANSWER:
      return {
        ...state,
        exercise: {
          ...state.exercise,
          answersByQuestionId: {
            ...state.exercise.answersByQuestionId,
            [action.payload.questionId]: action.payload.optionId,
          },
        },
      }
    case actionTypes.TOGGLE_DISPUTE: {
      const isAlreadyDisputed = state.exercise.disputedQuestionIds.includes(action.payload.questionId)
      const disputedQuestionIds = isAlreadyDisputed
        ? state.exercise.disputedQuestionIds.filter((questionId) => questionId !== action.payload.questionId)
        : [...state.exercise.disputedQuestionIds, action.payload.questionId]

      return {
        ...state,
        exercise: {
          ...state.exercise,
          disputedQuestionIds,
        },
      }
    }
    case actionTypes.SUBMIT_LEVEL: {
      const result = action.payload.result
      const completedLevelIds = result.passed
        ? sortCompletedLevels(state.levels, [...state.progress.completedLevelIds, result.levelId])
        : state.progress.completedLevelIds
      const isFinalLevel = completedLevelIds.length === state.levels.length
      const currentLevelId = getNextLevelId(state.levels, completedLevelIds)

      return {
        ...state,
        screen: 'results',
        currentLevelId,
        selectedLevelId: result.passed ? currentLevelId : result.levelId,
        progress: {
          completedLevelIds,
          scoresByLevelId: {
            ...state.progress.scoresByLevelId,
            [result.levelId]: summarizeLevelResult(result),
          },
        },
        lastResult: {
          ...result,
          isFinalLevel,
        },
        celebration: result.passed
          ? {
              isVisible: true,
              mode: isFinalLevel ? 'path-clear' : 'level-clear',
              message: isFinalLevel ? 'Path cleared! You beat every level!' : 'Level cleared! Great job!',
            }
          : initialCelebrationState,
      }
    }
    case actionTypes.RETRY_LEVEL:
      return {
        ...state,
        screen: 'exercise',
        exercise: {
          levelId: action.payload.levelId,
          answersByQuestionId: {},
          disputedQuestionIds: [],
        },
      }
    case actionTypes.CONTINUE_AFTER_RESULTS:
      return {
        ...state,
        screen: state.lastResult?.isFinalLevel ? 'complete' : 'timeline',
        exercise: createEmptyExerciseState(),
      }
    case actionTypes.GO_TO_TIMELINE:
      return {
        ...state,
        screen: state.progress.completedLevelIds.length === state.levels.length ? 'complete' : 'timeline',
        selectedLevelId: state.exercise.levelId ?? state.selectedLevelId,
      }
    case actionTypes.ADVANCE_LEADERBOARD:
      return {
        ...state,
        leaderboard: {
          ...state.leaderboard,
          tickCount: state.leaderboard.tickCount + 1,
        },
      }
    case actionTypes.DISMISS_CELEBRATION:
      return {
        ...state,
        celebration: initialCelebrationState,
      }
    default:
      return state
  }
}

export const startGame = (playerName) => ({
  type: actionTypes.START_GAME,
  payload: { playerName },
})

export const selectLevel = (levelId) => ({
  type: actionTypes.SELECT_LEVEL,
  payload: { levelId },
})

export const startLevel = (levelId) => ({
  type: actionTypes.START_LEVEL,
  payload: { levelId },
})

export const setAnswer = (questionId, optionId) => ({
  type: actionTypes.SET_ANSWER,
  payload: { questionId, optionId },
})

export const toggleDispute = (questionId) => ({
  type: actionTypes.TOGGLE_DISPUTE,
  payload: { questionId },
})

export const submitLevel = (result) => ({
  type: actionTypes.SUBMIT_LEVEL,
  payload: { result },
})

export const retryLevel = (levelId) => ({
  type: actionTypes.RETRY_LEVEL,
  payload: { levelId },
})

export const continueAfterResults = () => ({
  type: actionTypes.CONTINUE_AFTER_RESULTS,
})

export const goToTimeline = () => ({
  type: actionTypes.GO_TO_TIMELINE,
})

export const advanceLeaderboard = () => ({
  type: actionTypes.ADVANCE_LEADERBOARD,
})

export const dismissCelebration = () => ({
  type: actionTypes.DISMISS_CELEBRATION,
})
