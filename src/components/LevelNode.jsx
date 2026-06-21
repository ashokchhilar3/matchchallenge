function LevelNode({ level, status, isSelected, onClick }) {
  const isLocked = status === 'locked'
  const buttonLabel = isLocked ? `${level.title} is locked` : `Select ${level.title}`

  return (
    <li className={`timeline-node timeline-node--${status}${isSelected ? ' timeline-node--selected' : ''}`}>
      <button
        type="button"
        className="timeline-node__button"
        onClick={onClick}
        disabled={isLocked}
        aria-label={buttonLabel}
        aria-current={status === 'current' ? 'step' : undefined}
      >
        <span className="timeline-node__title">{level.title}</span>
        <span className="timeline-node__theme">{level.theme}</span>
        <span className="timeline-node__status">{status}</span>
      </button>
    </li>
  )
}

export default LevelNode
