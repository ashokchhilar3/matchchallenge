## Fixes Verified

- ✅ **Dispute-all loophole closed.** `src/utils/scoring.js` now returns `percentage: 0`, `passed: false`, and `needsUndisputedAnswer: true` when every question is disputed. `src/components/ScoreSummary.jsx` also shows a specific recovery message for that case.
- ✅ **Real CSS bundle ships.** `src/main.jsx` now imports `./styles/app.css`, and `npm run build` emits a non-empty CSS asset.
- ✅ **Selector mismatch fixed.** The JSX classes for the name entry form, timeline, question cards, leaderboard, exercise screen, and level preview now match the selectors in `src/styles/components.css` / `src/styles/animations.css`.
- ✅ **Five levels ship.** `src/data/levels.js` now defines 5 levels with 10 questions each. `src/data/leaderboardBots.js` also covers a 5-level ladder.
- ✅ **Session exercise state persists.** `src/App.jsx` saves `exercise`, and `src/utils/gameState.js` restores answers + disputes when returning to the timeline or reopening the same level.
- ✅ **Final clear flow works.** Completing level 5 sets `isFinalLevel`, triggers `path-clear` celebration mode, and routes to the complete-state timeline after continuing.
- ✅ **Build/lint/dev smoke pass succeeded.** `npm run build`, `npm run lint -- --ignore-pattern .squad/**`, and `npm run dev -- --host 127.0.0.1` all passed; the dev server returned HTTP 200.

### Requirements Re-check

- ✅ Requirement 1 — timeline now has 5 levels.
- ✅ Requirement 2 — completed/current/future states now have live styling.
- ✅ Requirement 3 — the minimal styled progression view now ships.
- ⚠️ Requirement 4 — architecture still uses a flat `levels` array, so “room for multiple maps/paths” remains only partially met.
- ✅ Requirement 7 — SVG questions now ship inside the real styled figure container.
- ✅ Requirement 9 — disputes are excluded from scoring without allowing a free pass.
- ✅ Requirement 11 — passing requires at least one undisputed correct answer.
- ✅ Requirement 14 — sequential unlocking is no longer bypassed by disputing everything.
- ✅ Requirement 15 — level-clear celebration is lightweight and timed.
- ✅ Requirement 16 — final path-clear celebration has distinct copy/state.
- ❌ Requirement 20 — the player still does not start in the middle third of the leaderboard.
- ✅ Requirement 27 — the colorful visual system now actually loads.
- ✅ Requirement 28 — responsive/accessibility styling hooks now ship.

## New/Remaining Issues

### [P1] New player still starts in the bottom third of the leaderboard
- **Reporter:** Chunk
- **Category:** functional
- **Description:** The leaderboard rebalance improved later ranks, but a brand-new player still starts too low. With the current seeds and scoring, the player begins at rank 12 of 17, which is bottom-third territory instead of mid-pack.
- **Expected:** A new player should begin in the middle third, remain mid-pack after early clears, and avoid rank 1 after clearing all 5 levels.
- **Steps:** Review `src/utils/leaderboard.js` and `src/data/leaderboardBots.js`, then compute ranks with `buildLeaderboardEntries(...)` at tick 0 for: start, after level 1, after level 3, and after level 5. Current results are start `12/17`, after level 1 `9/17`, after level 3 `7/17`, after level 5 `4/17`.
- **Recommendation:** Raise the starter band and/or tighten the lower bot seed spread until the player lands around the middle third immediately at game start while still staying below rank 1 after level 5.

### [P1] Level 5 question 8 is ambiguous
- **Reporter:** Chunk
- **Category:** content
- **Description:** `level-5-q8` says a 2-meter-wide path is added “along one side” of a 9 m by 7 m playground, but it never says whether the path runs along the 9-meter side or the 7-meter side. Two different total areas are reasonable from the wording.
- **Expected:** The question should identify which side gets the path, or show a figure so there is only one valid answer.
- **Steps:** Read `src/data/levels.js` at `level-5-q8`. The prompt is ambiguous, while the answer key expects `77 m²`, which only works if the path runs along the 7-meter side.
- **Recommendation:** Rewrite the prompt to specify the side explicitly (for example, “along the 7-meter side”) or add an SVG figure that labels the path placement.

### [P2] Replaying a cleared level can still overwrite a better score with a worse one
- **Reporter:** Chunk
- **Category:** functional
- **Description:** The previous replay regression is still open. Submitting a replay always replaces the stored result for that level, even when the new attempt is worse than the saved one.
- **Expected:** A worse replay should not replace a better saved result, or the app should separately track “best” versus “latest” scores.
- **Steps:** Inspect `src/utils/gameState.js` in the `SUBMIT_LEVEL` branch. `scoresByLevelId[result.levelId]` is always overwritten with `result`.
- **Recommendation:** Preserve the higher/better result when updating `scoresByLevelId`, or store both best score and latest attempt explicitly.
