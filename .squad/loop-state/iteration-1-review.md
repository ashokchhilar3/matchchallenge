# Iteration 1 Review

## Verdict: CONTINUE
**Rationale:** The core loop exists, and the app still builds and lints cleanly, so the foundation is recoverable. It is not ready to sign off: the dispute-all scoring loophole is a P0, and several P1 gaps still miss the source-of-truth requirements around styling, level count, and leaderboard behavior.

## Requirements Coverage
| # | Requirement | Status | Notes |
|---|-------------|--------|-------|
| 1 | Timeline with 5-7 levels | ❌ | `project.md` requires 5-7 nodes, but `src/data/levels.js` defines only 3 levels. |
| 2 | Completed/current/future timeline states are visibly distinct | ⚠️ | Status logic exists in `App.jsx`/`TimelineView.jsx`, but the real stylesheet bundle is not loaded and timeline container selectors do not match JSX. |
| 3 | Clean minimal V1 progression view (simple timeline, no elaborate map art) | ⚠️ | The screen flow is minimal, but the shipped build renders nearly unstyled because `main.jsx` only imports placeholder `index.css`. |
| 4 | Architecture leaves room for multiple maps/paths while V1 ships one path | ⚠️ | V1 does ship one path, but the state/data model is just a flat `levels` array with no visible path abstraction. |
| 5 | Each checkpoint has 1 exercise of 10 questions | ✅ | Each of the 3 shipped levels contains 10 questions in `src/data/levels.js`. |
| 6 | Questions cover mixed 5th-grade math topics | ✅ | Arithmetic, fractions, geometry, measurement, decimals, and word problems are present across the 30 questions. |
| 7 | Geometry questions use SVG with fully visible dimension annotations | ⚠️ | SVG figures and annotations are present, but the missing style bundle means the intended layout guarantee for figure presentation is not fully verified in the shipped UI. |
| 8 | Every question is multiple choice with 4 options | ✅ | Question data uses four options per question and `QuestionCard.jsx` renders radio choices. |
| 9 | Kids can dispute questions and disputes are excluded from scoring | ⚠️ | Dispute toggles and exclusion logic exist, but disputing every question currently clears the level. |
| 10 | “Check Answers” scores the exercise | ✅ | `ExerciseScreen.jsx` calls `onSubmit`, and `App.jsx` scores via `calculateScore(...)`. |
| 11 | Passing requires 100% correct among non-disputed questions | ⚠️ | Mostly implemented, but `scoring.js` returns `passed: true` when all questions are disputed because `incorrectQuestionIds.length === 0`. |
| 12 | Score view shows percentage, correct count, and disputed count | ✅ | `ScoreSummary.jsx` shows all three metrics. |
| 13 | Kids can retry checkpoints as many times as needed | ✅ | `ScoreSummary.jsx` offers retry, and `gameState.js` resets exercise state for another attempt. |
| 14 | Progression is sequential; checkpoint N unlocks N+1 | ⚠️ | Unlocking logic is sequential, but the P0 dispute loophole lets players bypass the intended gate. |
| 15 | Level-passed celebration is brief, lightweight, and non-blocking | ⚠️ | Celebration components and timers are present, but the production CSS bundle is empty so the intended animation treatment is not actually shipping. |
| 16 | Final path-clear celebration is bigger and includes congratulations | ⚠️ | Separate complete-mode copy exists in `CelebrationOverlay.jsx`, but the same missing-style issue blocks the intended visual payoff. |
| 17 | No sound effects, mascots, or heavy particle systems in V1 | ✅ | No sound system, mascot assets, or complex particle library is present. |
| 18 | Leaderboard is shown alongside or accessible from the map | ✅ | `AppShell.jsx` always renders leaderboard side content next to the main screen. |
| 19 | Leaderboard shows rank, name, checkpoints completed, and score | ✅ | `LeaderboardPanel.jsx` renders all of these fields. |
| 20 | Simulated community keeps the player around the middle of the pack | ❌ | Verified false: the player ranks 16/19 when new and 1/19 after clearing all 3 levels with current `leaderboard.js` scoring. |
| 21 | Bots progress at simulated rates during the session | ✅ | `App.jsx` advances bot ticks every 4 seconds and `leaderboard.js` simulates score growth by speed/accuracy. |
| 22 | Leaderboard updates in real time during the session | ✅ | The interval-driven tick updates produce live leaderboard recalculation. |
| 23 | No login/accounts in V1; kid enters a fun display name on visit | ✅ | The app opens on `NameEntryScreen` and stores only a display name. |
| 24 | Name and progress persist only for the session and are wiped on exit | ✅ | `storage.js` uses `sessionStorage`, not long-term persistence. |
| 25 | React, pure frontend, static deployment, hardcoded questions, client-side bots | ✅ | Verified in `package.json`, `levels.js`, `leaderboardBots.js`, and absence of backend code. |
| 26 | File structure stays simple, flat, and easy to edit | ✅ | The repo follows the planned flat `components/`, `data/`, `styles/`, and `utils/` layout, with content centralized in `levels.js`. |
| 27 | Visual design is colorful, kid-friendly, and touch-friendly | ⚠️ | The design system exists in `src/styles/`, but it is not being shipped, so the build currently falls back to browser defaults. |
| 28 | Responsive tablet/desktop support with accessibility basics | ⚠️ | Semantic buttons/radios and responsive CSS rules exist, but the missing stylesheet bundle removes focus, spacing, and layout polish from the actual build. |

## Bug Triage
| # | Bug | Severity | Assigned To | Status |
|---|-----|----------|-------------|--------|
| 1 | Marking every question as disputed still clears the level | P0 | Data | Open |
| 2 | The app never loads the real stylesheet bundle | P1 | Mikey | Open |
| 3 | CSS selectors do not match the rendered component class names | P1 | Mouth | Open |
| 4 | The timeline only has 3 levels, but the source requirements call for 5-7 nodes | P1 | Data | Open |
| 5 | Leaderboard rules do not keep the player in the middle of the pack | P1 | Data | Open |
| 6 | “Save for later in this session” throws away the current quiz state | P1 | Data | Open |
| 7 | Replaying a cleared level can replace a perfect result with a worse score | P2 | Data | Open |

## Iteration Score
- Requirements met: 14/28
- P0 bugs: 1
- P1 bugs: 5
- P2 bugs: 1
- Quality trend: N/A (N/A for iteration 1)

## Next Iteration Focus (if CONTINUE)
1. Close the scoring gate loophole so a level cannot pass with zero non-disputed questions.
2. Ship the actual visual system by wiring in the real CSS bundle and aligning stylesheet selectors with rendered class names.
3. Bring the build back to spec by adding 2+ more full levels and rebalancing leaderboard scoring so the player stays mid-pack.
