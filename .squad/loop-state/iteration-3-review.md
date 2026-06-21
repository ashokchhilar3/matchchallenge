# Iteration 3 Review

## Verdict: COMPLETED
**Rationale:** The app now satisfies the full V1 experience in `project.md`, no P0 or P1 issues remain, and the core flow is stable: name entry, sequential level play, flag-aware scoring, celebrations, leaderboard updates, and session-only persistence all verify cleanly. The lone remaining issue is a non-blocking P2 replay-score regression, so this is ready to sign off rather than continue.

## Requirements Coverage
| # | Requirement | Status | Notes |
|---|-------------|--------|-------|
| 1 | Timeline with 5-7 levels | ✅ | `src/data/levels.js` defines 5 levels (`level-1` through `level-5`). |
| 2 | Completed/current/future timeline states are visibly distinct | ✅ | `TimelineView.jsx` assigns `completed/current/locked`, and `components.css` renders distinct visuals for each state. |
| 3 | Clean minimal V1 progression view (simple timeline, no elaborate map art) | ✅ | The UI remains a simple timeline + card layout, and the real stylesheet bundle is loaded from `src/main.jsx`. |
| 4 | Architecture leaves room for multiple maps/paths while V1 ships one path | ✅ | V1 ships a single centralized `levels` data module; this is light but sufficient path-level isolation for wrapping into multi-path data later without redesigning the app loop. |
| 5 | Each checkpoint has 1 exercise of 10 questions | ✅ | Verification script confirmed all 5 levels contain 10 questions each. |
| 6 | Questions cover mixed 5th-grade math topics | ✅ | The data spans arithmetic, fractions, geometry, measurement, decimals, and word problems across the 5 levels. |
| 7 | Geometry questions use SVG with fully visible dimension annotations | ✅ | Geometry questions embed SVG figures, and `QuestionFigure.jsx` + `.question-figure__svg` keep the full figure visible with `width: min(100%, ...)` and `overflow: visible`. |
| 8 | Every question is multiple choice with 4 options | ✅ | Verification script confirmed every question still has 4 options. |
| 9 | Kids can dispute questions and disputes are excluded from scoring | ✅ | Flagging/dispute controls remain available in `QuestionCard.jsx`, and `scoring.js` excludes disputed questions from `scoredQuestions`. |
| 10 | “Check Answers” scores the exercise | ✅ | `ExerciseScreen.jsx` still routes the CTA through `onSubmit`, and `App.jsx` scores with `calculateScore(...)`. |
| 11 | Passing requires 100% correct among non-disputed questions | ✅ | `scoring.js` now blocks all-disputed submissions via `needsUndisputedAnswer`, and the verification script confirmed `passed: false` when every question is flagged. |
| 12 | Score view shows percentage, correct count, and disputed count | ✅ | `ScoreSummary.jsx` renders score, correct answers, and flagged-question count. |
| 13 | Kids can retry checkpoints as many times as needed | ✅ | `ScoreSummary.jsx` keeps retry available, and `gameState.js` resets exercise state for replay. |
| 14 | Progression is sequential; checkpoint N unlocks N+1 | ✅ | `currentLevelId` and locked timeline state enforce sequential progression, and the dispute-all bypass is closed. |
| 15 | Level-passed celebration is brief, lightweight, and non-blocking | ✅ | `App.jsx` auto-dismisses celebrations after 1600 ms, and `CelebrationOverlay.jsx`/`animations.css` keep it CSS-only. |
| 16 | Final path-clear celebration is bigger and includes congratulations | ✅ | Final clear uses `path-clear`/`complete` mode, distinct congratulatory copy, and enlarged complete-state overlay styling. |
| 17 | No sound effects, mascots, or heavy particle systems in V1 | ✅ | Celebrations remain pure CSS visuals only; no sound or heavy animation system was added. |
| 18 | Leaderboard is shown alongside or accessible from the map | ✅ | `AppShell.jsx` renders the leaderboard as side content next to the main experience. |
| 19 | Leaderboard shows rank, name, checkpoints completed, and score | ✅ | `LeaderboardPanel.jsx` displays rank, player/bot name, cleared levels, and score. |
| 20 | Simulated community keeps the player around the middle of the pack | ✅ | Verification script showed a new player starts 9th of 17, then moves to 7th after level 1, 6th after level 3, and 4th after level 5. |
| 21 | Bots progress at simulated rates during the session | ✅ | `App.jsx` advances leaderboard ticks on an interval, and `leaderboard.js` simulates bot score growth from speed/accuracy. |
| 22 | Leaderboard updates in real time during the session | ✅ | Interval-driven state updates recalculate leaderboard entries during play. |
| 23 | No login/accounts in V1; kid enters a fun display name on visit | ✅ | `NameEntryScreen.jsx` is still the first screen and explicitly says “No account needed”. |
| 24 | Name and progress persist only for the session and are wiped on exit | ✅ | `storage.js` uses `sessionStorage` for load/save/clear and nothing longer-lived. |
| 25 | React, pure frontend, static deployment, hardcoded questions, client-side bots | ✅ | `package.json` is Vite/React only; `levels.js` and `leaderboardBots.js` keep content and bots client-side. |
| 26 | File structure stays simple, flat, and easy to edit | ✅ | The repo still uses straightforward `components/`, `data/`, `styles/`, and `utils/` folders with question content centralized in `levels.js`. |
| 27 | Visual design is colorful, kid-friendly, and touch-friendly | ✅ | The shipped CSS uses a bright, friendly palette, large pill buttons, roomy cards, and touch-target sizing. |
| 28 | Responsive tablet/desktop support with accessibility basics | ✅ | The layout adapts at tablet/desktop breakpoints, buttons/radios are semantic, focus styles are present, and reduced-motion handling exists. |

## Bug Triage
| # | Bug | Severity | Assigned To | Status |
|---|-----|----------|-------------|--------|
| 1 | Marking every question as disputed still clears the level | P0 | Data | Fixed |
| 2 | The app never loads the real stylesheet bundle | P1 | Data | Fixed |
| 3 | CSS selectors do not match the rendered component class names | P1 | Mouth | Fixed |
| 4 | The app only shipped 3 levels instead of the required 5-7 | P1 | Data | Fixed |
| 5 | “Save for later in this session” discarded the current quiz state | P1 | Data | Fixed |
| 6 | Leaderboard rebalance still leaves a new player in the bottom third at game start | P1 | Data | Fixed |
| 7 | Level 5 question 8 is ambiguous about which side gets the added path | P1 | Data | Fixed |
| 8 | Replaying a cleared level can still overwrite a better saved result with a worse one | P2 | Data | Open (non-blocking) |

## Trend Analysis
- **Iteration 1:** 14 / 28 requirements met, **1 P0**, **5 P1**, 1 P2.
- **Iteration 2:** 26 / 28 requirements met, **0 P0**, **2 P1**, 1 P2.
- **Iteration 3:** 28 / 28 requirements met, **0 P0**, **0 P1**, 1 P2.
- Arc: the team first stabilized the core loop and styling, then closed the scoring loophole and level-count gaps, and finally finished the leaderboard rebalance and content clarity fixes needed for launch.

## Verification Notes
- `npm run lint` ✅
- `npm run build` ✅
- Verification script checks passed for:
  - all 5 levels present
  - 10 questions per level
  - 4 options per question
  - dispute-all blocked
  - leaderboard starts mid-pack
  - level-clear and final path-clear celebrations still trigger
  - level 5 question 8 now points to the 7-meter side and keys to **77 m²**

## Iteration Score
- Requirements met: 28/28
- P0 bugs: 0
- P1 bugs: 0
- P2 bugs: 1
- Quality trend: ready for sign-off

## Follow-up (post-launch, non-blocking)
1. Preserve the best saved score when a cleared level is replayed, rather than overwriting it with a lower result.
