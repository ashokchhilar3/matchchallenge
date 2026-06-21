const PLAYER_STARTER_SCORE = 1340
const PLAYER_LEVEL_CLEAR_BONUS = 180
const TICK_SCORE_MULTIPLIER = 6
const BOT_COMPLETION_THRESHOLDS = [1450, 1700, 1950, 2200, 2450]

export const calculatePlayerScore = (progress) => {
  const completedLevels = progress.completedLevelIds.length
  const scoreFromResults = Object.values(progress.scoresByLevelId).reduce(
    (total, result) => total + (result?.percentage ?? 0),
    0,
  )

  return PLAYER_STARTER_SCORE + completedLevels * PLAYER_LEVEL_CLEAR_BONUS + scoreFromResults
}

const getCompletedLevelsForScore = (score, levelCount) =>
  Math.min(
    levelCount,
    BOT_COMPLETION_THRESHOLDS.slice(0, levelCount).filter((threshold) => score >= threshold).length,
  )

export const simulateBotProgress = (bots = [], tickCount = 0, levelCount = 5) =>
  bots.map((bot) => {
    const score = Math.min(
      bot.maxScore ?? Number.POSITIVE_INFINITY,
      bot.score + tickCount * bot.speed * TICK_SCORE_MULTIPLIER + Math.round(bot.accuracy * 10),
    )
    const completedLevels = Math.max(bot.completedLevels, getCompletedLevelsForScore(score, levelCount))

    return {
      ...bot,
      completedLevels,
      score,
    }
  })

export const rankEntries = (entries) =>
  [...entries]
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score
      }

      if (right.completedLevels !== left.completedLevels) {
        return right.completedLevels - left.completedLevels
      }

      return left.name.localeCompare(right.name)
    })
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }))

export const buildLeaderboardEntries = ({
  bots = [],
  tickCount = 0,
  playerName = '',
  progress,
  levelCount = 5,
}) => {
  const botEntries = simulateBotProgress(bots, tickCount, levelCount).map((bot) => ({
    ...bot,
    type: 'bot',
  }))

  const playerEntry = {
    name: playerName || 'New Challenger',
    completedLevels: progress.completedLevelIds.length,
    score: calculatePlayerScore(progress),
    speed: 0,
    type: 'player',
  }

  return rankEntries([...botEntries, playerEntry]).map((entry) => ({
    ...entry,
    isPlayer: entry.type === 'player',
  }))
}
