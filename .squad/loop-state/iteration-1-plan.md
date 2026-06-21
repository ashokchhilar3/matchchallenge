# Iteration 1 Plan — Initial Architecture

## Goal
Ship the first playable loop: **name entry → timeline → exercise → score → progression → basic leaderboard**.

This plan is optimized for two people working in parallel:
- **Data** builds React structure, state, question data, and interaction logic.
- **Mouth** builds layout, CSS, motion polish, and kid-friendly visual treatment.

The rule for Iteration 1: **simple, flat, and easy to maintain**. No backend. No TypeScript. No global state library.

---

## 1) React Setup

### Choice: **Vite + React**
Use **Vite** for V1.

### Why
- Faster startup and rebuilds than CRA.
- Smaller, cleaner setup for a static frontend.
- Easier for a small project with no backend.
- Less tooling noise for a C# developer reading the app later.

### V1 setup rules
- React with **JavaScript only**
- No TypeScript
- No Redux, Zustand, or router in V1
- Pure CSS files, no CSS-in-JS

---

## 2) File Structure

Keep the structure flat and obvious.

```text
src/
  components/
    AppShell.jsx
    NameEntryScreen.jsx
    TimelineView.jsx
    LevelNode.jsx
    ExerciseScreen.jsx
    QuestionCard.jsx
    QuestionFigure.jsx
    ScoreSummary.jsx
    LeaderboardPanel.jsx
    CelebrationOverlay.jsx
  data/
    levels.js
    leaderboardBots.js
  styles/
    reset.css
    app.css
    layout.css
    components.css
    animations.css
  utils/
    gameState.js
    scoring.js
    leaderboard.js
    storage.js
  App.jsx
  main.jsx
```

### Structure rules
- `components/`: one file per component
- `data/`: hardcoded content only
- `styles/`: CSS split by purpose, not by component explosion
- `utils/`: plain helper modules, no framework magic
- `App.jsx`: top-level state and screen switching

---

## 3) Component Breakdown

## AppShell
- **Owner:** Mouth
- **Props:** `title`, `subtitle`, `mainContent`, `sideContent`, `footerContent`
- **Renders:** main page frame, two-column desktop layout, stacked tablet layout
- **Notes:** visual/layout wrapper only; no app logic

## NameEntryScreen
- **Owner:** Data
- **Props:** `initialName`, `onStart`
- **Renders:** display name form, short intro text, start button
- **Notes:** validates simple non-empty name, hands control back to `App`

## TimelineView
- **Owner:** Data
- **Props:** `levels`, `currentLevelId`, `completedLevelIds`, `onSelectLevel`
- **Renders:** horizontal progress timeline with locked/current/completed states
- **Notes:** core progression view after name entry

## LevelNode
- **Owner:** Data
- **Props:** `level`, `status`, `isSelected`, `onClick`
- **Renders:** a single checkpoint node with title, state, and affordance
- **Notes:** keep logic light; Mouth styles status states in CSS

## ExerciseScreen
- **Owner:** Data
- **Props:** `level`, `answers`, `disputedIds`, `onAnswerChange`, `onToggleDispute`, `onSubmit`, `onBack`
- **Renders:** level header, question list, check answers action
- **Notes:** orchestration component for a 10-question exercise

## QuestionCard
- **Owner:** Data
- **Props:** `question`, `selectedOption`, `isDisputed`, `onSelectOption`, `onToggleDispute`
- **Renders:** prompt, optional hint, choices, dispute checkbox/button
- **Notes:** one card per question

## QuestionFigure
- **Owner:** Data
- **Props:** `figure`
- **Renders:** optional SVG geometry figure and caption/alt text
- **Notes:** must preserve full figure visibility with no clipping

## ScoreSummary
- **Owner:** Data
- **Props:** `result`, `onRetry`, `onContinue`
- **Renders:** success percentage, correct count, disputed count, pass/fail message
- **Notes:** used after scoring each level

## LeaderboardPanel
- **Owner:** Data
- **Props:** `entries`, `playerName`, `playerEntry`
- **Renders:** ranked list with player highlighted
- **Notes:** reads simulated bot standings only; no editing here

## CelebrationOverlay
- **Owner:** Mouth
- **Props:** `mode`, `isVisible`, `message`
- **Renders:** lightweight success animation for level clear or final clear
- **Notes:** CSS-first animation, 1–2 seconds, non-blocking

---

## 4) Data Model

Store levels in `src/data/levels.js` as plain JavaScript objects that behave like JSON.

## Level shape

```js
{
  id: "level-1",
  title: "Level 1",
  theme: "Number Warm-Up",
  passingRule: "perfect",
  questions: [/* 10 questions */]
}
```

## Question shape

```js
{
  id: "level-1-q1",
  prompt: "What is the area of this rectangle?",
  topicTags: ["geometry", "area"],
  hint: "Area of a rectangle = length × width",
  figure: {
    type: "svg",
    viewBox: "0 0 300 180",
    width: 300,
    height: 180,
    alt: "A rectangle labeled 8 centimeters wide and 5 centimeters tall.",
    markup: `
      <rect x="40" y="40" width="200" height="100" fill="#e8f0fe" stroke="#4a47a3" stroke-width="2" />
      <line x1="40" y1="28" x2="240" y2="28" stroke="#333" stroke-width="1" />
      <text x="140" y="22" text-anchor="middle" font-size="14" fill="#333">8 cm</text>
      <line x1="252" y1="40" x2="252" y2="140" stroke="#333" stroke-width="1" />
      <text x="272" y="95" text-anchor="middle" font-size="14" fill="#333">5 cm</text>
    `
  },
  options: [
    { id: "a", text: "26 cm²" },
    { id: "b", text: "40 cm²" },
    { id: "c", text: "13 cm²" },
    { id: "d", text: "80 cm²" }
  ],
  correctOptionId: "b"
}
```

## Rules for question data
- Exactly 4 options
- `figure` is optional; use `null` for non-geometry questions
- Geometry figures must include dimensions/labels inside the SVG bounds
- `topicTags` supports filtering/reporting later without changing schema
- Keep all content readable by non-developers in one data file

### Question content plan for Iteration 1
- **Level 1:** arithmetic + basic fractions
- **Level 2:** geometry + measurement
- **Level 3:** mixed challenge set (word problems, fractions, geometry)

Use the reference HTML files as the quality bar for:
- clean card presentation
- readable hints
- SVG figures with visible dimension annotations

---

## 5) State Management

### Approach
Use **`useReducer` in `App.jsx`** plus small pure helpers in `utils/`.

### Why
- Simpler than adding a state library
- Safer than spreading many unrelated `useState` calls across the tree
- Easy to read: actions in, next state out

## Top-level app state

```js
{
  playerName: "",
  screen: "name-entry", // name-entry | timeline | exercise | results | complete
  levels: [],
  currentLevelId: "level-1",
  selectedLevelId: "level-1",
  progress: {
    completedLevelIds: [],
    scoresByLevelId: {}
  },
  exercise: {
    levelId: null,
    answersByQuestionId: {},
    disputedQuestionIds: []
  },
  lastResult: null,
  leaderboard: {
    bots: [],
    tickCount: 0
  }
}
```

## State flow
- `main.jsx` loads app and CSS
- `App.jsx` initializes state from `levels.js`, `leaderboardBots.js`, and storage
- `NameEntryScreen` sets `playerName` and moves to `timeline`
- `TimelineView` lets player open the current unlocked level
- `ExerciseScreen` updates answers and disputed flags in local state tree
- `Check Answers` computes score using `utils/scoring.js`
- If score is perfect after excluding disputes:
  - mark level complete
  - unlock next level
  - trigger celebration
- `LeaderboardPanel` receives derived entries from `utils/leaderboard.js`

## Disputed question rule
- Disputed questions are removed from the denominator
- A level passes only if **all non-disputed questions are correct**
- Keep disputed IDs in `exercise.disputedQuestionIds`

## Leaderboard simulation rule
- Start with hardcoded bots from `leaderboardBots.js`
- Use a timer in `App.jsx` to advance bots every few seconds
- Bot movement is fake but bounded:
  - never obviously impossible
  - keep player around the middle of the pack

## Session persistence rule
- Use `sessionStorage` through `utils/storage.js`
- Persist:
  - player name
  - completed levels
  - last known scores
  - in-session leaderboard snapshot
- Do **not** persist beyond the browser session

---

## 6) File Ownership Matrix

No shared ownership. If a file is not listed, nobody edits it in Iteration 1 without a new plan.

| File | Owner |
|---|---|
| `src/App.jsx` | Data |
| `src/main.jsx` | Data |
| `src/components/AppShell.jsx` | Mouth |
| `src/components/NameEntryScreen.jsx` | Data |
| `src/components/TimelineView.jsx` | Data |
| `src/components/LevelNode.jsx` | Data |
| `src/components/ExerciseScreen.jsx` | Data |
| `src/components/QuestionCard.jsx` | Data |
| `src/components/QuestionFigure.jsx` | Data |
| `src/components/ScoreSummary.jsx` | Data |
| `src/components/LeaderboardPanel.jsx` | Data |
| `src/components/CelebrationOverlay.jsx` | Mouth |
| `src/data/levels.js` | Data |
| `src/data/leaderboardBots.js` | Data |
| `src/utils/gameState.js` | Data |
| `src/utils/scoring.js` | Data |
| `src/utils/leaderboard.js` | Data |
| `src/utils/storage.js` | Data |
| `src/styles/reset.css` | Mouth |
| `src/styles/app.css` | Mouth |
| `src/styles/layout.css` | Mouth |
| `src/styles/components.css` | Mouth |
| `src/styles/animations.css` | Mouth |

### Coordination contract
- Data does **not** edit CSS files
- Mouth does **not** edit data/state files
- Mouth may request class names; Data exposes stable class hooks in JSX once

---

## 7) Iteration 1 Scope

## In scope
- Vite React app scaffold
- 3 playable levels
- 10 questions per level
- Mixed topics with real content
- Geometry SVG questions at reference quality
- Name entry screen
- Timeline progression screen
- Exercise screen with dispute action
- Score summary screen
- Perfect-score progression gate
- Retry flow
- Simulated bot leaderboard
- Basic celebration overlay
- Tablet + desktop responsive layout
- Session-only storage

## Out of scope for Iteration 1
- Accounts or login
- Backend or database
- Multiple maps
- Teacher/parent dashboard
- Advanced animation system
- Sound effects
- Avatar system
- Question editor/CMS

---

## Build Order

### Data builds first
1. Vite React app scaffold
2. File structure
3. Question data + bot data
4. Reducer/state helpers
5. Core components with semantic markup
6. Score/progression flow

### Mouth builds in parallel
1. CSS reset + layout system
2. Timeline node states
3. Question card visual treatment
4. Leaderboard styling
5. Celebration animation
6. Responsive polish

### Integration order
1. Data provides stable component structure and class names
2. Mouth attaches styles without changing logic
3. Data reconnects any final visual-only wrapper props if needed

---

## Architecture decisions worth defending
- **Vite over CRA:** less drag, faster iteration
- **JavaScript over TypeScript in V1:** easier for current team, lower setup cost
- **`useReducer` over state library:** enough structure without overbuilding
- **Single `levels.js` file:** easiest place to edit content
- **Session storage only:** matches V1 privacy/scope
- **Flat files:** fast onboarding, less hunting

## Done definition for this iteration
- A child can enter a name, play through 3 levels, dispute unclear questions, retry until perfect, and see their place on a live-feeling leaderboard.
- Data and Mouth can work at the same time without editing the same files.
