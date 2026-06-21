import { useState } from 'react'

function NameEntryScreen({ initialName = '', onStart }) {
  const [playerName, setPlayerName] = useState(initialName)
  const [showError, setShowError] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedName = playerName.trim()

    if (!trimmedName) {
      setShowError(true)
      return
    }

    setShowError(false)
    onStart(trimmedName)
  }

  return (
    <section className="screen screen--name-entry">
      <header className="screen__header">
        <p className="screen__eyebrow">Ready, explorer?</p>
        <h2 className="screen__title">Choose your challenge name</h2>
        <p className="screen__intro">
          A fun math challenge for 5th graders. No account needed — just pick a name and play.
        </p>
      </header>

      <form className="name-entry-form" onSubmit={handleSubmit}>
        <label className="name-entry-form__label" htmlFor="player-name">
          Display name
        </label>
        <input
          id="player-name"
          className="name-entry-form__input"
          type="text"
          value={playerName}
          maxLength={20}
          placeholder="SkySolver"
          onChange={(event) => setPlayerName(event.target.value)}
        />
        {showError ? (
          <p className="name-entry-form__error" role="alert">
            Please enter a name before starting.
          </p>
        ) : null}
        <button className="name-entry-form__button" type="submit">
          Start the adventure
        </button>
      </form>
    </section>
  )
}

export default NameEntryScreen
