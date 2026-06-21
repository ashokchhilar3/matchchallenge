# Iteration 2 Plan

## Goal
Close the progression loophole, ship the real visual system, and bring V1 back to the source-of-truth spec with **5 total levels** and a **mid-pack leaderboard**.

## CSS Loading Investigation — Root Cause and Fix

### What is broken
- `src/main.jsx` imports `./index.css`.
- `src/index.css` is only a placeholder comment, so the shipped CSS bundle is effectively empty.
- The real CSS entry point is `src/styles/app.css`, which already imports:
  - `reset.css`
  - `layout.css`
  - `components.css`
  - `animations.css`

### Exact fix
- **Owner: Data**
- Change `src/main.jsx` line 4 from:
  - `import './index.css'`
- To:
  - `import './styles/app.css'`
- Do **not** add another indirection layer. Import the real bundle directly from `main.jsx` so the entry point stays obvious.
- After that, `src/index.css` is dead weight. Either delete it or leave a short “unused legacy placeholder” comment, but do not keep routing production styling through it.

### Why
This is the smallest fix that ships the intended bundle immediately and keeps the CSS entry point flat and discoverable.

---

## Bug-by-Bug Assignments

### 1) [P0] Dispute-all passes level
- **Owner: Data**
- **Files:** `src/utils/scoring.js`, `src/components/ScoreSummary.jsx`
- **Exact changes**
  1. In `calculateScore(...)`, treat `totalCount === 0` as an invalid/failing submission:
     - `percentage` must be `0`, not `100`
     - `passed` must be `false`
     - add a result flag like `needsUndisputedAnswer: true`
  2. Keep disputed questions excluded from scoring, but require **at least one non-disputed question** before a pass is possible.
  3. In `ScoreSummary.jsx`, branch the fail copy:
     - existing generic retry copy for wrong answers
     - new specific guidance when `needsUndisputedAnswer` is true: tell the player to leave at least one question undisputed and answer it correctly
- **Why**
The gate rule is simple: perfect score on non-disputed questions only counts if there is at least one scored question.

### 2) [P1] Real stylesheet bundle never loads
- **Owner: Data**
- **Files:** `src/main.jsx`, optionally `src/index.css`
- **Exact changes**
  1. Replace the placeholder CSS import in `src/main.jsx` with `./styles/app.css`.
  2. Retire `src/index.css` so nobody mistakes it for the live bundle again.
  3. Verify the production build emits a non-empty CSS asset.
- **Why**
Until the entry import points at `app.css`, none of Mouth’s real styling ships.

### 3) [P1] CSS selectors do not match rendered class names
- **Owner: Mouth**
- **Files:** `src/styles/components.css`, `src/styles/animations.css`
- **Exact selector alignment work**

| Current CSS selector | Rendered JSX class to target |
|---|---|
| `.name-entry` | `.screen--name-entry` or `.name-entry-form` |
| `.name-entry__input` | `.name-entry-form__input` |
| `.name-entry__button` | `.name-entry-form__button` |
| `.timeline` | `.timeline-view__list` |
| `.question-options` | `.question-card__options` |
| `.question-option` | `.question-card__option` |
| `.question-hint` | `.question-card__hint` |
| `.question-dispute` | `.question-card__dispute-button` |
| `.leaderboard` | `.leaderboard-panel` / `.leaderboard-panel__list` |
| `.leaderboard-entry` | `.leaderboard-panel__entry` |
| `.leaderboard-rank` | `.leaderboard-panel__rank` |
| `.leaderboard-name` | `.leaderboard-panel__name` |
| `.leaderboard-score` | `.leaderboard-panel__score` |

- **Additional missing selectors Mouth must add**
  - `src/styles/components.css`
    - `.timeline-view`
    - `.timeline-view__list`
    - `.timeline-node__button`
    - `.timeline-node__theme`
    - `.timeline-node__status`
    - `.timeline-node--selected`
    - `.leaderboard-panel__header`
    - `.leaderboard-panel__subtitle`
    - `.leaderboard-panel__details`
    - `.leaderboard-panel__meta`
    - `.exercise-screen__progress`
    - `.exercise-screen__actions`
    - `.exercise-screen__button`
    - `.exercise-screen__questions`
    - `.exercise-screen__question`
    - `.exercise-screen__question-number`
    - `.level-preview`
    - `.level-preview__header`
    - `.level-preview__status`
    - `.level-preview__score`
    - `.level-preview__button`
    - shared screen framing hooks: `.screen__header`, `.screen__eyebrow`, `.screen__title`, `.screen__intro`
  - `src/styles/animations.css`
    - rename `.question-option` to `.question-card__option`
    - rename `.question-dispute` to `.question-card__dispute-button`
    - rename `.name-entry button` to `.name-entry-form__button`

- **Selected-answer styling requirement**
  - Style the actual rendered label markup in `QuestionCard.jsx`.
  - Use the existing radio input state (`input:checked`) or a label state selector so selected answers visibly differ.
  - Do **not** leave selection styling attached to dead `.question-option*` selectors.

- **Why**
Importing the right bundle is not enough. The CSS still misses the JSX that actually renders.

### 4) [P1] App only ships 3 levels; spec requires 5–7
- **Owner: Data**
- **Files:** `src/data/levels.js`, `src/components/NameEntryScreen.jsx`
- **Exact changes**
  1. Append **2 new level objects** to `src/data/levels.js` so V1 ships **5 total levels**.
  2. Keep the existing shape exactly:
     - `id`
     - `title`
     - `theme`
     - `passingRule`
     - `questions` (10 per level)
  3. Every new question must keep the current schema:
     - 4 options
     - `correctOptionId`
     - `hint`
     - `topicTags`
     - SVG `figure` only when needed, fully visible inside bounds
  4. Update the name-entry intro copy in `NameEntryScreen.jsx` from “three math levels” to “five math levels”.

#### New level content to add
- **Level 4 — Fractions, Decimals, and Data Dash**
  - 10 questions total
  - cover: equivalent fractions, fraction/decimal conversion, decimal addition/subtraction, line-plot or table reading, multi-step word problems
  - include at least **1 SVG geometry/data figure**
- **Level 5 — Final Challenge Peak**
  - 10 questions total
  - cover: mixed review, area/volume, angle reasoning, unit conversion, multi-step word problems
  - include at least **2 SVG figure questions**

- **Why**
Five levels is the minimum spec-compliant fix. It closes the gap without bloating V1 to 6 or 7 nodes.

### 5) [P1] Leaderboard does not keep player in the middle
- **Owner: Data**
- **Files:** `src/utils/leaderboard.js`, `src/data/leaderboardBots.js`
- **Exact changes**
  1. Rebalance the scoring formula in `leaderboard.js`. The current formula:
     - starts the player too low (`PLAYER_STARTER_SCORE = 75`)
     - then over-rewards perfect clears with `completedLevels * 1000 + percentage sum`
  2. Replace that with a tighter per-level score band so the player moves upward without jumping to obvious first place.
  3. Re-seed bot starting data in `leaderboardBots.js` for **5 levels**, not 3:
     - keep a spread of beginners, mid-pack bots, and front-runners
     - ensure some bots stay ahead even after the player clears level 5
  4. Remove hardcoded 3-level assumptions in `leaderboard.js` defaults:
     - `levelCount = 3` should no longer be the fallback mental model

#### Rank targets Data must hit
- New player: middle third, not bottom third
- After first clear: still middle third
- After three clears: still middle third
- After five clears: near upper-middle, **not** rank 1

- **Why**
The leaderboard should feel encouraging, not fake. Mid-pack is a product rule, not a nice-to-have.

### 6) [P1] “Save for later in this session” lies about persistence
- **Owner: Data**
- **Files:** `src/App.jsx`, `src/utils/gameState.js`, `src/utils/storage.js`
- **Exact changes**
  1. Persist in-progress exercise state in the saved session payload:
     - `exercise.levelId`
     - `exercise.answersByQuestionId`
     - `exercise.disputedQuestionIds`
  2. In `App.jsx`, include `exercise` in `saveSessionState(...)`.
  3. In `buildInitialGameState(...)`, hydrate `exercise` from storage when present.
  4. In `GO_TO_TIMELINE`, stop clearing `exercise`; going back to the timeline should preserve the current run.
  5. In `START_LEVEL`, if the player reopens the same in-progress level, reuse the saved exercise state instead of zeroing it out.
  6. Clear `exercise` only when it is truly finished or intentionally replaced:
     - after a scored result is accepted
     - when starting a different level
  7. Keep the bottom button label only if the behavior is now true.

- **Why**
The current button promise is false. Either save state or change the label. For Iteration 2, save state.

---

## File Ownership Matrix Updates

No broad ownership reshuffle.

| File | Owner | Notes |
|---|---|---|
| `src/main.jsx` | Data | One-line CSS entry fix lives here. |
| `src/index.css` | Data | Retire or delete after direct `app.css` import. |
| `src/components/NameEntryScreen.jsx` | Data | Copy update from 3 levels to 5 levels. |
| `src/data/levels.js` | Data | Add levels 4 and 5. |
| `src/data/leaderboardBots.js` | Data | Re-seed for 5-level ladder. |
| `src/utils/scoring.js` | Data | Close dispute-all loophole. |
| `src/utils/leaderboard.js` | Data | Rebalance mid-pack logic. |
| `src/utils/gameState.js` | Data | Preserve in-progress quiz state. |
| `src/App.jsx` | Data | Persist exercise payload. |
| `src/styles/components.css` | Mouth | Selector alignment and missing component styling. |
| `src/styles/animations.css` | Mouth | Rename dead animation selectors to live JSX hooks. |

---

## Execution Order

1. **Data:** fix `main.jsx` CSS import first so Mouth can validate live styles against the real bundle.
2. **Mouth:** align selectors and add missing screen/layout hooks.
3. **Data:** close scoring loophole and session-save bug.
4. **Data:** add levels 4 and 5.
5. **Data:** rebalance leaderboard after final level count is 5.

Why this order: styling is blocked by the wrong import, and leaderboard tuning depends on the final level count.

---

## Verification Checklist

- `npm run lint`
- `npm run build`
- Manual smoke pass:
  - app loads with full styling
  - timeline shows 5 nodes
  - disputing all 10 questions fails with explicit guidance
  - “Save for later in this session” restores answers/disputes after returning to timeline and after refresh
  - player rank stays mid-pack at start, after level 1, after level 3, and after level 5

---

## Out of Scope for This Phase

- P2 replay/best-score overwrite bug
- any multi-map architecture expansion beyond keeping the current flat V1 structure simple
