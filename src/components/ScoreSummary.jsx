import QuestionCard from './QuestionCard.jsx'

function ScoreSummary({ result, onRetry, onContinue }) {
  const message = result.passed
    ? 'Perfect! Every answer you left unflagged was correct.'
    : result.needsUndisputedAnswer
      ? 'You need to answer at least one question without flagging it.'
      : 'Not quite yet. Fix the missed answers and try again.'
  const canContinue = result.passed
  const renderActionButtons = () => (
    <div className="score-summary__actions">
      <button
        className="score-summary__button score-summary__button--secondary"
        type="button"
        onClick={onRetry}
      >
        Retry level
      </button>
      {canContinue ? (
        <button className="score-summary__button" type="button" onClick={onContinue}>
          {result.isFinalLevel ? 'See your final results' : 'Continue on timeline'}
        </button>
      ) : null}
    </div>
  )

  return (
    <section
      className={`screen screen--results${result.passed ? ' screen--results-success' : ' screen--results-retry'}`}
    >
      <div className="score-review">
        <div className="score-review__summary">
          <header className="screen__header">
            <p className="screen__eyebrow">Results</p>
            <h2 className="screen__title">{result.passed ? 'Level passed!' : 'Try again!'}</h2>
            <p className="screen__intro">{message}</p>
          </header>

          <dl className="score-summary__stats">
            <div className="score-summary__stat">
              <dt>Score</dt>
              <dd>{result.percentage}%</dd>
            </div>
            <div className="score-summary__stat">
              <dt>Correct answers</dt>
              <dd>
                {result.correctCount} / {result.totalCount}
              </dd>
            </div>
            <div className="score-summary__stat">
              <dt>Flagged questions</dt>
              <dd>{result.disputedCount}</dd>
            </div>
          </dl>

          {result.incorrectQuestionIds.length ? (
            <p className="score-summary__detail">
              Missed questions:{' '}
              {result.incorrectQuestionIds.map((questionId) => questionId.split('-q')[1]).join(', ')}
            </p>
          ) : null}
          {result.needsUndisputedAnswer ? (
            <p className="score-summary__detail">
              You need to answer at least one question without flagging it.
            </p>
          ) : null}

          {renderActionButtons()}
        </div>

        <div className="score-review__questions exercise-screen__questions">
          {result.questionResults.map((questionResult, index) => (
            <section className="exercise-screen__question" key={questionResult.questionId}>
              <p className="exercise-screen__question-number">Question {index + 1}</p>
              <QuestionCard
                question={{
                  id: questionResult.questionId,
                  prompt: questionResult.prompt,
                  topicTags: questionResult.topicTags,
                  hint: questionResult.hint,
                  figure: questionResult.figure,
                  options: questionResult.options,
                  correctOptionId: questionResult.correctOptionId,
                }}
                selectedOption={questionResult.selectedOptionId}
                isDisputed={questionResult.isDisputed}
                reviewMode
                correctOptionId={questionResult.correctOptionId}
              />
            </section>
          ))}
        </div>

        {renderActionButtons()}
      </div>
    </section>
  )
}

export default ScoreSummary
