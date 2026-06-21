# Question Content Format Recommendation

## Executive summary

I recommend **Option E: YAML per level + separate SVG files**.

It is the best fit for this app because the content is **structured data, not prose**. Questions have stable fields (`id`, `prompt`, `hint`, `options`, `correctOptionId`, `topicTags`, `figure`), so a schema-first format is easier to edit safely than markdown with custom parsing rules. Keeping SVG in standalone files also gives the cleanest geometry authoring workflow and scales better as the bank grows.

If we optimize for Ashok's "simple for a C# developer to maintain" requirement, this option beats markdown-first approaches.

---

## Comparison table

| Option | Developer edit experience | SVG authoring | Parsing complexity | Preview-ability | Scalability | Simplicity for C# dev | Overall |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **A. Markdown with embedded SVG** | Friendly for reading, but question structure becomes convention-based instead of schema-based | Weak to medium; raw SVG inside markdown gets noisy fast | **High**; custom parser needed for headings, options, answers, and raw HTML blocks | **High**; markdown previews well in GitHub/VS Code | Medium; large level files become hard to maintain | Medium-low; easy to read, harder to parse/debug | Not recommended |
| **B. Markdown + separate SVG files** | Better than A for diagrams, but question data is still spread across prose conventions | **High**; SVG files stay clean and tool-friendly | **Medium-high**; still need custom markdown parsing for question structure | High for markdown and SVG separately | Medium; file sprawl is manageable but structure is still loose | Medium | Viable, but not best |
| **C. YAML/JSON with SVG inline as a field** | Schema is clear, but inline SVG strings are unpleasant to edit | Low; quoted SVG is awkward and error-prone | **Low**; closest to current `levels.js` shape | Low; JSON/YAML is readable but not visually previewable | High | Medium; parsing is easy, authoring is not | Good parser story, poor authoring story |
| **D. MDX** | Powerful, but feels more like code than content | High; inline JSX/SVG is flexible | **High**; adds MDX toolchain and React-aware content parsing | Medium-high | High | Low; overpowered for this app | Too complex |
| **E. YAML per level + separate SVG files** | **High**; clear fields, minimal syntax noise, easy diffs | **High**; SVG stays in normal `.svg` files | **Low-medium**; small loader script only | Medium; YAML is readable, SVG previews directly | **High**; clean folders and predictable schema | **High** | **Recommended** |

---

## Recommendation

### Pick: **Option E — YAML per level + separate SVG files**

This is the best balance of editability, maintainability, and low implementation risk.

### Why this wins

1. **The app's content is structured, not narrative**
   - These are multiple-choice records with fixed fields.
   - YAML expresses that structure directly.
   - Markdown is great for prose, but here it would force us to invent a mini-language for options, answers, tags, and figures.

2. **SVG should stay out of the question file**
   - Geometry figures are easiest to author as normal `.svg` files.
   - Developers can edit them in VS Code, Illustrator, Figma export, Inkscape, or any plain-text editor.
   - Dimension labels, arrows, and shapes stay readable instead of being escaped inside a string.

3. **Build-time conversion stays simple**
   - A small Node build script can read YAML + SVG and generate the existing `levels.js` shape.
   - No CMS, no database, no runtime fetch, no MDX pipeline.
   - React app structure stays unchanged.

4. **It scales cleanly**
   - 50+ levels and 500+ questions are manageable when each level has a predictable folder and one schema file.
   - SVG assets live beside the level that owns them.
   - Merge conflicts are smaller than a giant monolithic `levels.js`.

5. **It feels natural to maintain**
   - A C# developer will usually be more comfortable with explicit fields than with markdown parsing conventions or JSX-based MDX.
   - YAML is close to config editing: readable, diffable, and easy to validate.

### Why not markdown-first

Markdown is attractive because it previews well, but that benefit matters more for article-style content than for quiz records. Here, markdown would trade away reliability and parser simplicity for a nicer reading format. That is the wrong trade for a growing question bank.

**Bottom line:** optimize for **clear structure + clean SVG files**, not for prose preview.

---

## Proposed file structure

```text
content/
  levels/
    level-1/
      level.yaml
    level-2/
      level.yaml
      figures/
        level-2-q1-rectangle-area.svg
        level-2-q2-triangle-angle.svg
        level-2-q4-l-shape-area.svg
    level-3/
      level.yaml
      figures/
        level-3-q3-triangle-area.svg
    level-4/
      level.yaml
      figures/
        level-4-q5-bar-graph.svg
    level-5/
      level.yaml
      figures/
        level-5-q2-right-angle.svg
        level-5-q5-rectangular-prism.svg

scripts/
  build-question-content.mjs

src/
  data/
    levels.js   # generated file, same shape the app already uses
```

### Folder rules

- **One folder per level**
- **One `level.yaml` per level**
- **One `.svg` per figure-bearing question**
- Figure filenames should start with the question id for easy tracing

---

## Example question in the recommended format

### `content/levels/level-2/level.yaml`

```yaml
id: level-2
title: Level 2
theme: Geometry and Measurement Mission
passingRule: perfect
questions:
  - id: level-2-q1
    prompt: What is the area of this rectangle?
    topicTags:
      - geometry
      - area
      - rectangle
    hint: Area of a rectangle = length × width.
    figure:
      file: figures/level-2-q1-rectangle-area.svg
      alt: A rectangle labeled 8 centimeters across and 5 centimeters tall.
    options:
      - id: a
        text: 26 cm²
      - id: b
        text: 40 cm²
      - id: c
        text: 13 cm²
      - id: d
        text: 80 cm²
    correctOptionId: b
```

### `content/levels/level-2/figures/level-2-q1-rectangle-area.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 180" width="300" height="180">
  <rect x="40" y="40" width="200" height="100" fill="#e8f0fe" stroke="#4a47a3" stroke-width="2" />
  <line x1="40" y1="28" x2="240" y2="28" stroke="#333" stroke-width="1" />
  <line x1="40" y1="24" x2="40" y2="32" stroke="#333" stroke-width="1" />
  <line x1="240" y1="24" x2="240" y2="32" stroke="#333" stroke-width="1" />
  <text x="140" y="22" text-anchor="middle" font-size="14" fill="#333">8 cm</text>
  <line x1="252" y1="40" x2="252" y2="140" stroke="#333" stroke-width="1" />
  <line x1="248" y1="40" x2="256" y2="40" stroke="#333" stroke-width="1" />
  <line x1="248" y1="140" x2="256" y2="140" stroke="#333" stroke-width="1" />
  <text x="272" y="95" text-anchor="middle" font-size="14" fill="#333">5 cm</text>
</svg>
```

### Why this example works

- The YAML keeps the **question data obvious**
- The SVG stays **clean and editable**
- The content remains easy to diff in pull requests
- The final generated shape can still match today's `QuestionFigure` component contract

---

## Build pipeline

### Goal

Convert editable content files into the exact structure currently exported from `src/data/levels.js`, with **no React component redesign**.

### Suggested pipeline

1. **Authoring**
   - Developers edit `content/levels/<level-id>/level.yaml`
   - Developers edit any referenced `figures/*.svg`

2. **Build-time loader script**
   - Run a small Node script such as `scripts/build-question-content.mjs`
   - The script:
     - discovers all `content/levels/*/level.yaml` files
     - parses YAML
     - validates required fields
     - loads referenced SVG files
     - reads SVG root attributes like `viewBox`, `width`, and `height`
     - extracts inner SVG markup if needed for the existing `QuestionFigure.jsx` contract
     - emits a generated `src/data/levels.js`

3. **App consumption**
   - `App.jsx` keeps importing `./data/levels.js`
   - The generated file keeps the same shape the app already expects:
     - `id`
     - `title`
     - `theme`
     - `passingRule`
     - `questions[]`
     - `figure: { type, viewBox, width, height, alt, markup }`

4. **Validation**
   - Fail the build if:
     - a level id is duplicated
     - a question id is duplicated
     - `correctOptionId` does not match an option
     - a referenced SVG file is missing
     - required fields are missing

### Tooling level

Keep it minimal:

- one YAML parser package
- one small build script
- no runtime content fetching
- no MDX compiler
- no database

### Recommended integration points

- Run the content build script before `vite build`
- Optionally run it before `vite dev` too
- Commit source content files to Git
- Prefer committing generated `src/data/levels.js` only if the team wants zero local build surprises; otherwise generate it during build and keep it out of hand-edited workflows

---

## Migration plan

### Phase 1 — Define the schema

Create the target schema for `level.yaml`:

- level metadata: `id`, `title`, `theme`, `passingRule`
- per question: `id`, `prompt`, `topicTags`, `hint`, `figure`, `options`, `correctOptionId`

### Phase 2 — Split existing `levels.js` content

For each level in `src/data/levels.js`:

1. Create `content/levels/<level-id>/level.yaml`
2. Copy level metadata and non-figure questions directly into YAML
3. For each figure-based question:
   - create `figures/<question-id>-<short-name>.svg`
   - move the current inline SVG markup into that file
   - move `alt` text into YAML

### Phase 3 — Build script

Add a content build script that:

- reads all level YAML files
- reads SVG files
- generates `src/data/levels.js` in the current app shape

### Phase 4 — Verification

Compare generated output with the current hand-authored data:

- same level count
- same question count
- same ids
- same correct answers
- same rendered figures

### Phase 5 — Cutover

Once generated output matches current behavior:

- stop hand-editing `src/data/levels.js`
- treat `content/levels/**` as the source of truth

### Migration note

This migration is mostly mechanical. That is good. It keeps risk low because the quiz logic, React components, and scoring flow do not need to change.

---

## Final recommendation

Use **YAML per level + separate SVG files**.

It is the most maintainable choice for this project because it gives:

- **clear structure for questions**
- **clean authoring for geometry figures**
- **simple build-time transformation**
- **good scaling for a larger question bank**
- **the lowest long-term maintenance cost for a C#-leaning team**

If we want the simplest durable system, this is the one.
