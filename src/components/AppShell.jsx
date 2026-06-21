function AppShell({ title, subtitle, mainContent, sideContent, footerContent }) {
  return (
    <div className="app-shell">
      {(title || subtitle) && (
        <header className="app-shell__header">
          <p className="app-shell__eyebrow">Math Challenge</p>
          {title ? <h1 className="app-shell__title">{title}</h1> : null}
          {subtitle ? <p className="app-shell__subtitle">{subtitle}</p> : null}
        </header>
      )}

      <div className="app-shell__body">
        <main className="main-content">{mainContent}</main>
        {sideContent ? <aside className="sidebar">{sideContent}</aside> : null}
      </div>

      {footerContent ? <footer className="app-shell__footer">{footerContent}</footer> : null}
    </div>
  );
}

export default AppShell;
