import QuestionCard from './QuestionCard.jsx'

function ExerciseScreen({
  level,
  answers,
  disputedIds,
  onAnswerChange,
  onToggleDispute,
  onSubmit,
  onBack,
}) {
  const answeredCount = level.questions.filter((question) => answers[question.id]).length
  const disputedSet = new Set(disputedIds)

  return (
    <section className="screen screen--exercise">
      <header className="screen__header">
        <p className="screen__eyebrow">{level.title}</p>
        <h2 className="screen__title">{level.theme}</h2>
        <p className="screen__intro">
          Answer all 10 questions. Flagged questions do not count toward your score before
          checking for a perfect run.
        </p>
        <p className="exercise-screen__progress">
          {answeredCount} answered • {disputedIds.length} flagged • {level.questions.length} total
          questions
        </p>
      </header>

      <div className="exercise-screen__actions exercise-screen__actions--top">
        <button
          className="exercise-screen__button exercise-screen__button--secondary"
          type="button"
          onClick={onBack}
        >
          Back to timeline
        </button>
        <button className="exercise-screen__button" type="button" onClick={onSubmit}>
          Check answers
        </button>
      </div>

      <div className="exercise-screen__questions">
        {level.questions.map((question, index) => (
          <section className="exercise-screen__question" key={question.id}>
            <p className="exercise-screen__question-number">Question {index + 1}</p>
            <QuestionCard
              question={question}
              selectedOption={answers[question.id]}
              isDisputed={disputedSet.has(question.id)}
              onSelectOption={(optionId) => onAnswerChange(question.id, optionId)}
              onToggleDispute={() => onToggleDispute(question.id)}
            />
          </section>
        ))}
      </div>

      <div className="exercise-screen__actions exercise-screen__actions--bottom">
        <button
          className="exercise-screen__button exercise-screen__button--secondary"
          type="button"
          onClick={onBack}
        >
          Save for later in this session
        </button>
        <button className="exercise-screen__button" type="button" onClick={onSubmit}>
          Check answers
        </button>
      </div>
    </section>
  )
}

export default ExerciseScreen
