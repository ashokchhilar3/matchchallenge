# Iteration 2 Review

## Verdict: CONTINUE
**Rationale:** This was meaningful progress: the team closed the P0 scoring loophole, shipped the real styling system, restored session-state saving, and expanded the app from 3 levels to 5. It is still not ready to sign off because the leaderboard still starts the player in the bottom third, level 5 question 8 is ambiguous, and the architecture still only partially shows room for future multi-path expansion.

## Requirements Coverage
| # | Requirement | Status | Notes |
|---|-------------|--------|-------|
| 1 | Timeline with 5-7 levels | ✅ | `src/data/levels.js` now defines 5 levels. |
| 2 | Completed/current/future timeline states are visibly distinct | ✅ | `TimelineView.jsx` + `components.css` now ship matching stateful timeline styling. |
| 3 | Clean minimal V1 progression view (simple timeline, no elaborate map art) | ✅ | The live CSS bundle now loads from `src/main.jsx`, and the UI stays simple. |
| 4 | Architecture leaves room for multiple maps/paths while V1 ships one path | ⚠️ | V1 still uses a flat `levels` array; single-path shipping is correct, but future-path provision is only implicit. |
| 5 | Each checkpoint has 1 exercise of 10 questions | ✅ | All 5 levels have 10 questions each. |
| 6 | Questions cover mixed 5th-grade math topics | ✅ | Arithmetic, fractions, decimals, geometry, measurement, data, and word problems are all present. |
| 7 | Geometry questions use SVG with fully visible dimension annotations | ✅ | SVG figure questions are present in levels 2-5, and the real figure styling now ships. |
| 8 | Every question is multiple choice with 4 options | ✅ | All questions still use 4 options. |
| 9 | Kids can dispute questions and disputes are excluded from scoring | ✅ | Dispute toggles work, and disputed questions are excluded without granting a free pass. |
| 10 | “Check Answers” scores the exercise | ✅ | Submitting an exercise still routes through `calculateScore(...)`. |
| 11 | Passing requires 100% correct among non-disputed questions | ✅ | `scoring.js` now requires at least one scored question and no incorrect answers. |
| 12 | Score view shows percentage, correct count, and disputed count | ✅ | `ScoreSummary.jsx` shows all three. |
| 13 | Kids can retry checkpoints as many times as needed | ✅ | Retry flow is still present from results. |
| 14 | Progression is sequential; checkpoint N unlocks N+1 | ✅ | The dispute-all bypass is closed, so sequential unlocks now hold. |
| 15 | Level-passed celebration is brief, lightweight, and non-blocking | ✅ | CSS-only overlay auto-dismisses after ~1.6 seconds. |
| 16 | Final path-clear celebration is bigger and includes congratulations | ✅ | Final-clear mode maps to the larger celebration treatment and complete-state messaging. |
| 17 | No sound effects, mascots, or heavy particle systems in V1 | ✅ | Still pure CSS celebration only. |
| 18 | Leaderboard is shown alongside or accessible from the map | ✅ | `LeaderboardPanel.jsx` remains side-by-side with the main experience. |
| 19 | Leaderboard shows rank, name, checkpoints completed, and score | ✅ | Rank, display name, levels cleared, and score are all rendered. |
| 20 | Simulated community keeps the player around the middle of the pack | ❌ | At tick 0 the player still starts 12/17, which is bottom-third, not mid-pack. |
| 21 | Bots progress at simulated rates during the session | ✅ | Timed leaderboard ticks and bot progression remain active. |
| 22 | Leaderboard updates in real time during the session | ✅ | `App.jsx` advances leaderboard state on an interval. |
| 23 | No login/accounts in V1; kid enters a fun display name on visit | ✅ | Name entry remains the first screen, with no account flow. |
| 24 | Name and progress persist only for the session and are wiped on exit | ✅ | Storage remains `sessionStorage`, now including in-progress exercise state. |
| 25 | React, pure frontend, static deployment, hardcoded questions, client-side bots | ✅ | Still a Vite/React frontend with hardcoded content and client-side leaderboard bots. |
| 26 | File structure stays simple, flat, and easy to edit | ✅ | Content and UI remain in a straightforward flat layout. |
| 27 | Visual design is colorful, kid-friendly, and touch-friendly | ✅ | The shipped palette, large controls, and card styling now actually load. |
| 28 | Responsive tablet/desktop support with accessibility basics | ✅ | Responsive CSS rules, semantic controls, and keyboard-reachable inputs/buttons are in place. |

## Bug Triage
| # | Bug | Severity | Assigned To | Status |
|---|-----|----------|-------------|--------|
| 1 | Marking every question as disputed still clears the level | P0 | Data | Fixed |
| 2 | The app never loads the real stylesheet bundle | P1 | Data | Fixed |
| 3 | CSS selectors do not match the rendered component class names | P1 | Mouth | Fixed |
| 4 | The app only shipped 3 levels instead of the required 5-7 | P1 | Data | Fixed |
| 5 | “Save for later in this session” discarded the current quiz state | P1 | Data | Fixed |
| 6 | Leaderboard rebalance still leaves a new player in the bottom third at game start | P1 | Data | Open |
| 7 | Level 5 question 8 is ambiguous about which side gets the added path | P1 | Data | Open |
| 8 | Replaying a cleared level can still overwrite a better saved result with a worse one | P2 | Data | Open |

## Iteration Score
- Requirements met: 26/28
- P0 bugs: 0
- P1 bugs: 2
- P2 bugs: 1
- Quality trend: improving

## Next Iteration Focus (if CONTINUE)
1. Rebalance leaderboard seeds/scoring so the player starts in the middle third and stays believable through level 5.
2. Rewrite or illustrate level 5 question 8 so there is exactly one defensible answer.
3. Add a light path wrapper for future multi-map growth, then preserve best results when a completed level is replayed.
