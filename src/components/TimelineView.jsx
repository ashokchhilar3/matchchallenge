import LevelNode from './LevelNode.jsx'

function TimelineView({ levels, currentLevelId, completedLevelIds, selectedLevelId, onSelectLevel }) {
  const completedLevelSet = new Set(completedLevelIds)

  return (
    <section className="timeline-view" aria-label="Challenge timeline">
      <ol className="timeline-view__list">
        {levels.map((level) => {
          let status = 'locked'

          if (completedLevelSet.has(level.id)) {
            status = 'completed'
          } else if (level.id === currentLevelId) {
            status = 'current'
          }

          return (
            <LevelNode
              key={level.id}
              level={level}
              status={status}
              isSelected={selectedLevelId === level.id}
              onClick={() => onSelectLevel(level.id)}
            />
          )
        })}
      </ol>
    </section>
  )
}

export default TimelineView
