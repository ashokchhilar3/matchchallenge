---
configured: true
max_iterations: 5
description: "Math Challenge — iterative build loop"
---

# Squad Build Loop — Math Challenge

> Run with: `squad loop` or tell Squad: "run the build loop"

## Overview

An iterative build loop that designs, develops, tests, and reviews the Math Challenge app. Each iteration produces a working, committed increment. The loop runs until **Sloth** (Iteration Reviewer) issues **COMPLETED** or **max_iterations** (5) is reached.

## Loop State

All inter-agent artifacts and iteration state are persisted in `.squad/loop-state/`:

| File | Purpose | Written By |
|------|---------|------------|
| `iteration-{N}-plan.md` | Architecture/design plan for this iteration | Mikey |
| `iteration-{N}-bugs.md` | Combined bug reports from testing + launch analysis | Chunk, Brand |
| `iteration-{N}-review.md` | Requirements checklist, bug triage, verdict | Sloth |
| `loop-status.md` | Current iteration number, status, history of verdicts | Coordinator |

## Iteration Cycle

Each iteration runs these phases IN ORDER. Phases within a group can run in parallel where noted.

### Phase 1: Plan (sync — blocks all other phases)

**Agent:** 🏗️ Mikey (Lead)

**Inputs:**
- `project.md` — full requirements
- `open-items.md` — deferred items (DO NOT implement these)
- `.squad/loop-state/iteration-{N-1}-review.md` — previous review (if N > 1)
- `.squad/loop-state/iteration-{N-1}-bugs.md` — previous bugs (if N > 1)

**Task:**
- If iteration 1: Design the full project architecture, file structure, component breakdown, and data model. Decide the React setup approach (Vite or CRA). Define which requirements to tackle first.
- If iteration 2+: Read the previous review and bug list. Plan fixes and remaining requirements. Prioritize P0 bugs first, then P1, then new requirements.
- Output a clear plan with specific file-level tasks for Data and Mouth.

**Output:** `.squad/loop-state/iteration-{N}-plan.md`

**Git:** Commit plan file.

---

### Phase 2: Build (parallel)

**Agents:** ⚛️ Data (Frontend Dev) + 🎨 Mouth (UX/Design Dev)

**Inputs:**
- `project.md` — requirements
- `.squad/loop-state/iteration-{N}-plan.md` — Mikey's plan for this iteration
- Previous iteration source code (if N > 1)
- `.squad/loop-state/iteration-{N-1}-bugs.md` — bugs to fix (if N > 1)
- Question samples at `C:\src\questions\` — for quality reference on geometry SVGs

**Tasks:**
- **Data:** Implement React components, state logic, scoring, leaderboard simulation, timeline progression per the plan. Create question data files. Wire up interactivity.
- **Mouth:** Implement styling, SVG geometry figures, design tokens, responsive layout, celebration animations, kid-friendly visual polish per the plan.
- Both agents work on the SAME codebase. Mikey's plan assigns clear file ownership to avoid conflicts.
- If iteration 2+: Fix bugs assigned to them from the previous review's triage.

**Output:** Working source code committed to the repo.

**Git:** Each agent commits their work with descriptive messages.

---

### Phase 3: Verify (parallel)

**Agents:** 🧪 Chunk (Tester) + 📢 Brand (Launch Analyst)

**Inputs:**
- `project.md` — requirements
- `.squad/loop-state/iteration-{N}-plan.md` — what was planned
- Current source code — what was built
- `.squad/loop-state/iteration-{N-1}-review.md` — previous review to check for regressions (if N > 1)

**Tasks:**
- **Chunk:** Run the app (or inspect code if no dev server). Test every requirement: scoring logic, disputed questions, checkpoint progression, leaderboard bots, SVG rendering, timeline, celebrations. Write tests if test framework is set up. Log bugs with severity (P0/P1/P2) and reproduction steps.
- **Brand:** Evaluate from a parent's perspective. First-impression test. Is the purpose clear? Would a parent trust this? Are there UX friction points? Any concerns about content, safety, or confusing elements? Log issues with severity and recommendations.

**Output:** Both agents append their findings to `.squad/loop-state/iteration-{N}-bugs.md`

**Format for bug entries:**
```markdown
### [{P0|P1|P2}] {Bug title}
- **Reporter:** {Chunk|Brand}
- **Category:** {functional|visual|ux|content|accessibility}
- **Description:** {what's wrong}
- **Expected:** {what should happen}
- **Steps:** {how to reproduce}
- **Recommendation:** {suggested fix}
```

**Git:** Commit bug report.

---

### Phase 4: Review (sync — gates the loop)

**Agent:** 🔍 Sloth (Iteration Reviewer)

**Inputs:**
- `project.md` — full requirements (the source of truth)
- `open-items.md` — deferred items (should NOT be in the build)
- `.squad/loop-state/iteration-{N}-plan.md` — what was planned
- `.squad/loop-state/iteration-{N}-bugs.md` — bugs from Chunk and Brand
- Current source code — what exists now
- All previous `.squad/loop-state/iteration-*-review.md` — trend analysis

**Task:**
- Walk through EVERY requirement in project.md and mark ✅ (done), ❌ (missing), or ⚠️ (partial)
- Triage all bugs: assign P0/P1/P2, assign to an agent for next iteration
- Check for regressions from previous iterations
- Assess overall quality: does this feel like a polished kid-friendly app?
- Issue verdict: **COMPLETED**, **CONTINUE**, or **HALT**

**Output:** `.squad/loop-state/iteration-{N}-review.md`

**Review file format:**
```markdown
# Iteration {N} Review

## Verdict: {COMPLETED|CONTINUE|HALT}
**Rationale:** {why this verdict}

## Requirements Coverage
| # | Requirement | Status | Notes |
|---|-------------|--------|-------|
| 1 | Timeline with 5-7 levels | ✅/❌/⚠️ | {detail} |
| ... | ... | ... | ... |

## Bug Triage
| # | Bug | Severity | Assigned To | Status |
|---|-----|----------|-------------|--------|
| 1 | {title} | P0 | Data | Open |
| ... | ... | ... | ... | ... |

## Iteration Score
- Requirements met: {X}/{total}
- P0 bugs: {count}
- P1 bugs: {count}
- P2 bugs: {count}
- Quality trend: {improving|stable|declining}

## Next Iteration Focus (if CONTINUE)
1. {top priority}
2. {second priority}
3. {third priority}
```

**Git:** Commit review file.

---

### Phase 5: Scribe (background — always runs)

**Agent:** 📋 Scribe

Merges decisions from inbox, writes orchestration log entry, updates agent histories with cross-agent context from this iteration.

---

## Loop Control

| Condition | Action |
|-----------|--------|
| Sloth says **COMPLETED** | Loop ends. Final commit. Print summary. 🎉 |
| Sloth says **CONTINUE** | Increment iteration counter. Go to Phase 1 with review + bugs as input. |
| Sloth says **HALT** | Loop pauses. Print Sloth's concerns. Wait for user input before resuming. |
| Iteration counter reaches **5** | Loop ends regardless of verdict. Print final status. ⚠️ |

## Git Strategy

- All work happens on the current branch
- Each phase commits its artifacts with message format: `[loop-{N}] {phase}: {summary}`
  - Example: `[loop-1] plan: Initial architecture and component design`
  - Example: `[loop-2] build: Fix scoring edge cases and add celebrations`
  - Example: `[loop-3] review: COMPLETED — all requirements met`
- The full iteration history is visible in git log

## How to Start

Tell Squad any of these:
- "Run the build loop"
- "Start the loop"
- "Kick off the build cycle"
- "Execute build-loop.md"

The Coordinator reads this file, initializes `loop-status.md`, and begins Iteration 1.
