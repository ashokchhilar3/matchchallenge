# Math Challenge — 5th Grade Adventure

## Overview
An interactive web-based math challenge for students starting 5th grade. Kids explore an adventure map, completing math exercises at each checkpoint along the way.

## Target Audience
- Students entering 5th grade (~10 years old)
- Subject: Mathematics only

---

## Core Experience

### Progress & Levels
- Progress is shown as a **simple horizontal timeline** with **5–7 level nodes**
- Completed levels are visually marked (filled/highlighted), current level is prominent, future levels are dimmed/locked
- Clean, minimal design — no elaborate map artwork in V1
- Provision for multiple maps/paths in the architecture, but **V1 ships with 1 path only**

### Checkpoints & Exercises
- Each checkpoint contains **1 exercise of 10 questions**
- Questions have **mixed complexity** covering various 5th-grade math topics (arithmetic, fractions, geometry, word problems, etc.)
- **Geometry questions** must include SVG figures with dimension annotations. The entire figure with all annotations must be fully visible without scrolling or clipping
- Each question is **multiple choice** (4 options)
- Kids can **mark a question as "disputed"** — indicating the question isn't clear enough or the answers are confusing. Disputed questions are excluded from scoring
- A **"Check Answers"** button scores the exercise

### Scoring & Progression
- A checkpoint is passed with **100% correct answers** (disputed questions excluded from the count)
- Each checkpoint displays: success percentage, correct count, disputed count
- Kids can retry a checkpoint as many times as needed
- Progress through checkpoints is sequential — must pass checkpoint N to unlock checkpoint N+1

### Score Review Screen
- After checking answers, show the **same question view** (all questions with their figures, options, and hints) but with added feedback:
  - Each question shows whether the kid's answer was **correct** (green highlight) or **incorrect** (red highlight)
  - The correct answer is clearly indicated for wrong answers
  - Flagged questions are shown as flagged (not scored)
- This is the same layout as the exercise — not a separate summary card. The kid scrolls through their answers with visual feedback on each one.
- Score summary (percentage, correct count, flagged count) is shown at the top, followed by the full question review below
- Retry and Continue buttons remain accessible

### Celebrations (V1 — Minimal)
- **Level passed:** Brief success animation (green checkmark, subtle confetti or sparkle — CSS only, lightweight)
- **Path cleared (final level):** Slightly bigger animation + congratulations message
- No sound effects in V1, no mascots, no complex particle systems
- Keep it snappy — celebration should last ~1-2 seconds max, never block progression
- See `open-items.md` for full celebration plans in future versions

---

## Leaderboard
- Displayed alongside or accessible from the map
- Shows rankings with name, checkpoints completed, and score
- **Simulated community:** Pre-populated with dummy bot users at various skill levels (some fast, some slow, wide distribution) so every kid finds themselves somewhere in the middle — never dead last, never obviously first
- Bots progress at simulated rates during the session to create a sense of real-time competition
- Updates in real-time during the session

---

## Identity & Persistence (V1 — Minimal)
- **No login or accounts** in V1
- On visiting the page, the kid enters a **fun display name**
- Name and progress stored in **session only** (localStorage or sessionStorage)
- **Wiped on exit** — no persistence across sessions
- See `open-items.md` for future identity decisions

---

## Tech Stack (V1)
- **React** (Create React App or Vite) — component-based, good for animations
- **Pure frontend** — no backend, no database
- **Static deployment** — can be hosted on GitHub Pages, Netlify, or any static host
- Questions are **hardcoded** in JSON/JS files
- Leaderboard bots run client-side with simulated progression
- See `open-items.md` for future backend decisions

### File Structure
- Keep it **simple and flat** — easy to understand and edit
- Minimal nesting, clear naming conventions
- A non-React developer should be able to find and edit question content easily

---

## Design & Visuals
- **Colorful, kid-friendly** palette — bright but not overwhelming
- Clean, simple layout with large touch-friendly buttons
- Smooth CSS/JS animations (transitions, transforms — no janky reflows)
- SVG-based geometry figures with clean dimension annotations (reference `C:\src\questions\` for quality benchmarks)
- Responsive — works on tablets and desktops (phones are secondary)
- Accessible: good contrast, readable fonts, keyboard navigation

### Question Reference Samples
Question samples at `C:\src\questions\` demonstrate the quality bar:
- SVG geometry figures with dimension lines, angle annotations, and right-angle markers
- Clean card-based layout with hint text
- Multiple choice radio buttons
- These are for **quality reference only** — the app will use its own themes and component structures

---

## Out of Scope (V1)
- User accounts / authentication
- Backend / database
- Multiple maps (architecture supports it, only 1 shipped)
- Teacher/parent dashboards
- Mobile-first design
- Question editor / CMS