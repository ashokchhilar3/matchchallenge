function LeaderboardPanel({ entries, playerName }) {
  return (
    <aside className="leaderboard-panel" aria-label="Leaderboard">
      <div className="leaderboard-panel__header">
        <h2 className="leaderboard-panel__title">Leaderboard</h2>
        <p className="leaderboard-panel__subtitle">Bots keep climbing while you play.</p>
      </div>

      <ol className="leaderboard-panel__list">
        {entries.map((entry) => (
          <li
            className={`leaderboard-panel__entry${entry.isPlayer ? ' leaderboard-panel__entry--player' : ''}`}
            key={`${entry.type}-${entry.name}`}
          >
            <span className="leaderboard-panel__rank">#{entry.rank}</span>
            <div className="leaderboard-panel__details">
              <span className="leaderboard-panel__name">{entry.isPlayer ? playerName || entry.name : entry.name}</span>
              <span className="leaderboard-panel__meta">{entry.completedLevels} levels cleared</span>
            </div>
            <span className="leaderboard-panel__score">{entry.score}</span>
          </li>
        ))}
      </ol>
    </aside>
  )
}

export default LeaderboardPanel
