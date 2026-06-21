# Iteration 1 Bug Report

- Dev server started with `npm run dev` and responded with HTTP 200 at `http://127.0.0.1:5173/`.
- `npm run build` passed.
- `npm run lint` passed.

### [P0] Marking every question as disputed still clears the level
- **Reporter:** Chunk
- **Category:** functional
- **Description:** The scoring helper returns `percentage: 100` and `passed: true` when every question is disputed. That lets a kid skip the entire checkpoint, unlock the next level, and even clear the path without answering any math.
- **Expected:** A level should only pass after at least one non-disputed question remains and all remaining questions are correct.
- **Steps:** `src/utils/scoring.js:13-25` sets `percentage` to `100` when `totalCount === 0`, and `passed` only checks whether `incorrectQuestionIds.length === 0`.
- **Recommendation:** Treat `totalCount === 0` as a failed or invalid submission, and show guidance telling the player to answer at least one non-disputed question.

### [P1] The app never loads the real stylesheet bundle
- **Reporter:** Chunk
- **Category:** visual
- **Description:** `src/main.jsx` imports `src/index.css`, but that file is only a placeholder comment. None of the actual files under `src/styles/` are imported, so the shipped CSS bundle is effectively empty and the app renders with browser defaults.
- **Expected:** The app should load the real visual system so the timeline, question cards, buttons, celebration overlay, responsive layout, and kid-friendly styling are present.
- **Steps:** `src/main.jsx:1-10` imports `./index.css`; `src/index.css:1` is just a comment; the production build emitted a 1-byte CSS asset.
- **Recommendation:** Import `src/styles/app.css` from `main.jsx` or from `index.css`, then verify the built CSS asset contains the expected rules.

### [P1] CSS selectors do not match the rendered component class names
- **Reporter:** Chunk
- **Category:** visual
- **Description:** Even after fixing the missing import, large parts of the UI still will not style correctly because the CSS targets different class names than the JSX renders. The timeline, leaderboard, name entry form, and question option styles are disconnected from the markup.
- **Expected:** Component markup and stylesheet selectors should agree so the required visual states actually render.
- **Steps:** Examples: `src/components/TimelineView.jsx:7-29` uses `timeline-view`/`timeline-view__list`, but `src/styles/components.css:76-149` styles `.timeline`; `src/components/LeaderboardPanel.jsx:1-24` uses `leaderboard-panel__*`, but `src/styles/components.css:337-382` styles `.leaderboard-entry*`; `src/components/NameEntryScreen.jsx:31-52` uses `name-entry-form__*`, but `src/styles/components.css:1-74` styles `.name-entry*`.
- **Recommendation:** Align class names in JSX and CSS, then smoke-test every screen and state (locked/current/completed timeline nodes, selected options, leaderboard player highlight, celebration overlay).

### [P1] The timeline only has 3 levels, but the source requirements call for 5–7 nodes
- **Reporter:** Chunk
- **Category:** functional
- **Description:** The shipped content includes only three checkpoints. That misses the source-of-truth requirement for a 5–7 node horizontal timeline and makes the path feel much shorter than planned.
- **Expected:** V1 should provide 5–7 level nodes on the path.
- **Steps:** `project.md:15-16` requires 5–7 level nodes; `src/data/levels.js:1-589` defines only `level-1`, `level-2`, and `level-3`.
- **Recommendation:** Add at least two more full checkpoints or update the product requirements before sign-off.

### [P1] Leaderboard rules do not keep the player in the middle of the pack
- **Reporter:** Chunk
- **Category:** ux
- **Description:** The player starts near the bottom and jumps to obvious first place after a perfect clear. That breaks the “always somewhere in the middle” requirement and makes the bot competition feel fake.
- **Expected:** The player should stay around the middle of the rankings throughout the session—never dead last and never obviously first.
- **Steps:** `project.md:46-48` defines the rule. `src/utils/leaderboard.js:1-69` and `src/data/leaderboardBots.js:1-22` score the player at only `75` initially, but at `3375` after a perfect clear. In a direct calculation, that placed the player at rank 16/19 when new and rank 1/19 after clearing all 3 levels.
- **Recommendation:** Rebalance player scoring and bot seeds so the player stays mid-pack across early, mid, and full-clear states.

### [P1] “Save for later in this session” throws away the current quiz state
- **Reporter:** Chunk
- **Category:** ux
- **Description:** The lower exercise button promises that progress will be saved, but clicking it resets the current exercise and sends the kid back to the timeline. A page refresh during a quiz also loses all answers and dispute marks because only name/progress/leaderboard are persisted.
- **Expected:** Either preserve in-progress exercise state within the session, or relabel the control so it does not promise saved work.
- **Steps:** `src/components/ExerciseScreen.jsx:58-65` labels the button “Save for later in this session”; `src/utils/gameState.js:156-165` clears `exercise`; `src/App.jsx:67-73` only saves `playerName`, `progress`, and `leaderboard`; `src/utils/storage.js:24-30` persists only what App passes in.
- **Recommendation:** Persist `exercise.levelId`, answers, and disputed IDs in session storage, or change the button copy to an honest “Back to timeline (progress not saved)”.

### [P2] Replaying a cleared level can replace a perfect result with a worse score
- **Reporter:** Chunk
- **Category:** functional
- **Description:** Once a level is completed, replaying it and doing worse overwrites the stored result. The timeline can still show the level as completed while the UI label says “Best score” and now displays a lower, failing percentage.
- **Expected:** A replay should either keep the best result, or the UI should clearly label the value as the latest attempt instead of the best score.
- **Steps:** `src/App.jsx:158-162` labels the stored value as “Best score”; `src/utils/gameState.js:116-122` blindly replaces `scoresByLevelId[result.levelId]` with the newest result, even when it is worse.
- **Recommendation:** Store both `bestResult` and `latestResult`, or only update the displayed best score when the new attempt improves on the previous one.
