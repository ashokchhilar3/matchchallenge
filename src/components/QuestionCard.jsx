import QuestionFigure from './QuestionFigure.jsx'

function QuestionCard({
  question,
  selectedOption,
  isDisputed,
  onSelectOption,
  onToggleDispute,
  reviewMode = false,
  correctOptionId = question.correctOptionId,
}) {
  const isSelectedAnswerCorrect =
    !isDisputed && Boolean(selectedOption) && selectedOption === correctOptionId

  return (
    <article
      className={`question-card${isDisputed ? ' question-card--disputed' : ''}${reviewMode ? ' question-card--review' : ''}`}
    >
      <header className="question-card__header">
        <p className="question-card__tagline">{question.topicTags.join(' • ')}</p>
        <h3 className="question-card__title">{question.prompt}</h3>
        {reviewMode ? (
          <p
            className={`question-card__review-status${isDisputed ? ' question-card__review-status--flagged' : isSelectedAnswerCorrect ? ' question-card__review-status--correct' : ' question-card__review-status--incorrect'}`}
          >
            {isDisputed
              ? 'Flagged — not scored'
              : isSelectedAnswerCorrect
                ? 'Correct'
                : 'Incorrect'}
          </p>
        ) : null}
      </header>

      <QuestionFigure figure={question.figure} />

      <fieldset className="question-card__options">
        <legend className="question-card__legend">Choose one answer.</legend>
        {question.options.map((option) => {
          const optionId = `${question.id}-${option.id}`
          const isSelected = selectedOption === option.id
          const isCorrectOption = option.id === correctOptionId
          const showCorrectOption = reviewMode && !isDisputed && isCorrectOption
          const showIncorrectSelection =
            reviewMode && !isDisputed && isSelected && selectedOption !== correctOptionId
          const optionClassName = [
            'question-card__option',
            reviewMode && isSelected ? 'question-card__option--selected' : '',
            showCorrectOption ? 'question-card__option--correct' : '',
            showIncorrectSelection ? 'question-card__option--incorrect' : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <label className={optionClassName} htmlFor={optionId} key={option.id}>
              <input
                id={optionId}
                type="radio"
                name={question.id}
                checked={selectedOption === option.id}
                onChange={() => onSelectOption?.(option.id)}
                disabled={reviewMode}
              />
              <span className="question-card__option-content">
                <span className="question-card__option-text">{option.text}</span>
                {reviewMode && isSelected ? (
                  <span className="question-card__option-note">Your answer</span>
                ) : null}
                {reviewMode && !isDisputed && isCorrectOption && selectedOption !== correctOptionId ? (
                  <span className="question-card__option-note question-card__option-note--correct">
                    ✓ Correct answer
                  </span>
                ) : null}
              </span>
            </label>
          )
        })}
      </fieldset>

      <div className="question-card__footer">
        <p className="question-card__hint">Hint: {question.hint}</p>
        {reviewMode ? (
          <p
            className={`question-card__review-note${isDisputed ? ' question-card__review-note--flagged' : ''}`}
          >
            {isDisputed
              ? 'This question was flagged, so it does not affect the score.'
              : selectedOption
                ? `You chose option ${selectedOption.toUpperCase()}.`
                : 'No answer was chosen before checking answers.'}
          </p>
        ) : (
          <button
            className={`question-card__dispute-button${isDisputed ? ' question-card__dispute-button--active' : ''}`}
            type="button"
            onClick={onToggleDispute}
            aria-pressed={isDisputed}
          >
            {isDisputed ? '❓ Question flagged' : '❓ Not sure about this question'}
          </button>
        )}
      </div>
    </article>
  )
}

export default QuestionCard
