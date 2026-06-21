# Iteration 3 Plan — Final P1 Polish

## Goal
Close the last real blockers with small, surgical edits only. No new features. Do not touch the P2 replay bug in this loop.

## P1 fixes

### 1) Leaderboard starts too low
- **Owner:** Data
- **Files:** `src/utils/leaderboard.js`, `src/data/leaderboardBots.js`
- **Exact change:** rebalance the player starter band and bot seed spread so a brand-new player starts at **rank 8-9 of 17**, stays in the middle third after level 1 and level 3, and finishes around **rank 3-5 of 17** after level 5 without hitting rank 1.
- **Keep it surgical:** tune constants / bot seeds only; no leaderboard UI rewrite.

### 2) Level 5 Q8 is ambiguous
- **Owner:** Data
- **File:** `src/data/levels.js`
- **Exact change:** rewrite `level-5-q8` so the side is explicit.
  - Replace prompt with: `A 9-meter by 7-meter playground gets a 2-meter-wide path added along the 7-meter side. What is the new total area?`
  - Tighten the hint to match that setup (`9 × 7` plus `7 × 2`).
- **Keep it surgical:** text-only fix; no new figure unless the wording still feels shaky.

### 3) “Dispute” is not kid-friendly
- **Owners:** Data, Mouth
- **Files:** `src/components/QuestionCard.jsx`, `src/components/ExerciseScreen.jsx`, `src/components/ScoreSummary.jsx`, `src/App.jsx`, optional `src/styles/components.css`
- **Exact change:** keep the internal state names as-is, but rename the player-facing copy from “dispute/disputed” to **flag/flagged**.
  - Button icon + label: **`❓ Not sure about this question`**
  - Active button text: **`❓ Question flagged`**
  - Count/summary copy: change `disputed` / `Disputed questions` to **`flagged` / `Flagged questions`**
  - Explanatory copy: say flagged questions do not count toward the score.
- **Mouth:** only touch CSS if the new icon/text needs spacing or wrap cleanup.

### 4) Landing screen needs privacy/purpose reassurance
- **Owner:** Data
- **File:** `src/components/NameEntryScreen.jsx`
- **Exact change:** replace the intro copy with: **`A fun math challenge for 5th graders. No account needed — just pick a name and play.`**
- **Keep it surgical:** one short reassurance line; no layout change.

### 5) “Community Leaderboard” overpromises
- **Owner:** Data
- **File:** `src/components/LeaderboardPanel.jsx`
- **Exact change:** change the title from **`Community leaderboard`** to **`Leaderboard`**.
- **Keep it surgical:** leave the rest of the panel alone unless copy must be adjusted for consistency.

## Order
1. Fix Q8 copy and landing/leaderboard text.
2. Do the kid-friendly flagging rename.
3. Rebalance leaderboard last and verify target ranks.

## Done when
- Player starts around **8th-9th of 17**.
- Level 5 Q8 has one defensible answer.
- No player-facing “dispute/community” copy remains where kids see it.
- Landing screen clearly says no account is needed.
