function QuestionFigure({ figure }) {
  if (!figure) {
    return null
  }

  return (
    <figure className="question-figure">
      <svg
        className="question-figure__svg"
        viewBox={figure.viewBox}
        width={figure.width}
        height={figure.height}
        role="img"
        aria-label={figure.alt}
        xmlns="http://www.w3.org/2000/svg"
        dangerouslySetInnerHTML={{ __html: figure.markup }}
      />
      <figcaption className="question-figure__caption">{figure.alt}</figcaption>
    </figure>
  )
}

export default QuestionFigure
