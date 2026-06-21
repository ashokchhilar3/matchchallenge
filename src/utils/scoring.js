export const calculateScore = (level, answersByQuestionId = {}, disputedQuestionIds = []) => {
  const disputedSet = new Set(disputedQuestionIds)
  const questionResults = level.questions.map((question) => {
    const selectedOptionId = answersByQuestionId[question.id] ?? null
    const isDisputed = disputedSet.has(question.id)

    return {
      questionId: question.id,
      prompt: question.prompt,
      topicTags: question.topicTags,
      hint: question.hint,
      figure: question.figure,
      options: question.options,
      correctOptionId: question.correctOptionId,
      selectedOptionId,
      isDisputed,
      isAnswered: selectedOptionId !== null,
      isCorrect: !isDisputed && selectedOptionId === question.correctOptionId,
    }
  })
  const scoredQuestions = level.questions.filter((question) => !disputedSet.has(question.id))
  const correctQuestions = scoredQuestions.filter(
    (question) => answersByQuestionId[question.id] === question.correctOptionId,
  )
  const incorrectQuestionIds = scoredQuestions
    .filter((question) => answersByQuestionId[question.id] !== question.correctOptionId)
    .map((question) => question.id)
  const unansweredQuestionIds = scoredQuestions
    .filter((question) => !answersByQuestionId[question.id])
    .map((question) => question.id)
  const totalCount = scoredQuestions.length
  const correctCount = correctQuestions.length
  const needsUndisputedAnswer = totalCount === 0
  const percentage = needsUndisputedAnswer ? 0 : Math.round((correctCount / totalCount) * 100)

  return {
    levelId: level.id,
    correctCount,
    totalCount,
    incorrectCount: incorrectQuestionIds.length,
    disputedCount: disputedSet.size,
    percentage,
    passed: !needsUndisputedAnswer && incorrectQuestionIds.length === 0,
    needsUndisputedAnswer,
    incorrectQuestionIds,
    unansweredQuestionIds,
    questionResults,
  }
}

export default calculateScore
