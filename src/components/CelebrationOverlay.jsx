function CelebrationOverlay({ mode = 'level', isVisible, message }) {
  if (!isVisible) {
    return null;
  }

  const headline = message || (mode === 'complete' ? 'You cleared the whole path!' : 'Level complete!');
  const subtext =
    mode === 'complete' ? 'Amazing job — you solved every checkpoint.' : 'Nice work! Your next challenge is ready.';

  return (
    <div
      aria-live="polite"
      className={`celebration-overlay celebration-overlay--visible${
        mode === 'complete' ? ' celebration-overlay--complete' : ''
      }`}
      role="status"
    >
      <div className="celebration-overlay__card">
        <div className="celebration-sparkles" aria-hidden="true">
          <span className="celebration-sparkle" />
          <span className="celebration-sparkle" />
          <span className="celebration-sparkle" />
          <span className="celebration-sparkle" />
          <span className="celebration-sparkle" />
          <span className="celebration-sparkle" />
        </div>

        <svg
          aria-hidden="true"
          className="celebration-checkmark"
          viewBox="0 0 80 80"
        >
          <path d="M22 42L35 55L58 28" />
        </svg>

        <p className="celebration-overlay__message">{headline}</p>
        <p className="celebration-overlay__subtext">{subtext}</p>
      </div>
    </div>
  );
}

export default CelebrationOverlay;
