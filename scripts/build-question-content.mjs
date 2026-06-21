import { promises as fs } from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const repoRoot = process.cwd();
const contentRoot = path.join(repoRoot, 'content', 'levels');
const outputPath = path.join(repoRoot, 'src', 'data', 'levels.js');

function toSingleQuotedString(value) {
  return `'${String(value)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")}'`;
}

function toTemplateLiteral(value) {
  return `\`${String(value)
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${')}\``;
}

function formatArray(values, indent, mapper) {
  if (values.length === 0) {
    return '[]';
  }

  const nextIndent = `${indent}  `;
  const lines = values.map((value) => `${nextIndent}${mapper(value, nextIndent)}`);
  return `[\n${lines.join(',\n')}\n${indent}]`;
}

function formatOption(option, indent) {
  return `{ id: ${toSingleQuotedString(option.id)}, text: ${toSingleQuotedString(option.text)} }`;
}

function formatFigure(figure, indent) {
  if (figure === null) {
    return 'null';
  }

  const markupLines = figure.markup.split('\n');
  const markupIndent = `${indent}    `;
  const markup = markupLines.map((line) => `${markupIndent}${line}`).join('\n');

  return `{
${indent}  type: ${toSingleQuotedString(figure.type)},
${indent}  viewBox: ${toSingleQuotedString(figure.viewBox)},
${indent}  width: ${figure.width},
${indent}  height: ${figure.height},
${indent}  alt: ${toSingleQuotedString(figure.alt)},
${indent}  markup: ${toTemplateLiteral(`\n${markup}\n${indent}  `)},
${indent}}`;
}

function formatQuestion(question, indent) {
  return `{
${indent}  id: ${toSingleQuotedString(question.id)},
${indent}  prompt: ${toSingleQuotedString(question.prompt)},
${indent}  topicTags: ${formatArray(question.topicTags, `${indent}  `, (value) => toSingleQuotedString(value))},
${indent}  hint: ${toSingleQuotedString(question.hint)},
${indent}  figure: ${formatFigure(question.figure, `${indent}  `)},
${indent}  options: ${formatArray(question.options, `${indent}  `, formatOption)},
${indent}  correctOptionId: ${toSingleQuotedString(question.correctOptionId)},
${indent}}`;
}

function formatLevel(level, indent) {
  return `{
${indent}  id: ${toSingleQuotedString(level.id)},
${indent}  title: ${toSingleQuotedString(level.title)},
${indent}  theme: ${toSingleQuotedString(level.theme)},
${indent}  passingRule: ${toSingleQuotedString(level.passingRule)},
${indent}  questions: ${formatArray(level.questions, `${indent}  `, formatQuestion)},
${indent}}`;
}

function parseSvg(svgContent, svgPath) {
  const svgMatch = svgContent.match(/<svg\b([^>]*)>([\s\S]*?)<\/svg>/i);
  if (!svgMatch) {
    throw new Error(`Invalid SVG in ${svgPath}: missing root <svg> element.`);
  }

  const attributes = svgMatch[1];
  const innerMarkup = svgMatch[2]
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .join('\n');
  const attributeValue = (name) => {
    const match = attributes.match(new RegExp(`\\b${name}\\s*=\\s*(['"])(.*?)\\1`, 'i'));
    return match?.[2] ?? null;
  };

  const viewBox = attributeValue('viewBox');
  const width = attributeValue('width');
  const height = attributeValue('height');

  if (!viewBox || !width || !height) {
    throw new Error(`Invalid SVG in ${svgPath}: expected viewBox, width, and height attributes.`);
  }

  const parsedWidth = Number(width);
  const parsedHeight = Number(height);

  if (!Number.isFinite(parsedWidth) || !Number.isFinite(parsedHeight)) {
    throw new Error(`Invalid SVG in ${svgPath}: width and height must be numeric.`);
  }

  return {
    type: 'svg',
    viewBox,
    width: parsedWidth,
    height: parsedHeight,
    markup: innerMarkup,
  };
}

async function getLevelYamlPaths() {
  let levelEntries;

  try {
    levelEntries = await fs.readdir(contentRoot, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`Content directory not found: ${contentRoot}`);
    }

    throw error;
  }

  return levelEntries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(contentRoot, entry.name, 'level.yaml'))
    .sort((left, right) =>
      left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' }),
    );
}

function validateLevelShape(level, levelPath) {
  const requiredFields = ['id', 'title', 'theme', 'passingRule', 'questions'];
  for (const field of requiredFields) {
    if (!(field in level)) {
      throw new Error(`Missing "${field}" in ${levelPath}.`);
    }
  }

  if (!Array.isArray(level.questions)) {
    throw new Error(`Invalid questions array in ${levelPath}.`);
  }
}

async function loadLevels() {
  const levelPaths = await getLevelYamlPaths();
  const levelIds = new Set();
  const questionIds = new Set();
  const levels = [];

  for (const levelPath of levelPaths) {
    const rawYaml = await fs.readFile(levelPath, 'utf8');
    const parsedLevel = yaml.load(rawYaml);
    const levelDir = path.dirname(levelPath);

    validateLevelShape(parsedLevel, levelPath);

    if (levelIds.has(parsedLevel.id)) {
      throw new Error(`Duplicate level id "${parsedLevel.id}" found in ${levelPath}.`);
    }
    levelIds.add(parsedLevel.id);

    if (parsedLevel.questions.length !== 10) {
      throw new Error(`Level "${parsedLevel.id}" must contain exactly 10 questions.`);
    }

    const questions = [];
    for (const question of parsedLevel.questions) {
      if (questionIds.has(question.id)) {
        throw new Error(`Duplicate question id "${question.id}" found in ${levelPath}.`);
      }
      questionIds.add(question.id);

      const optionIds = new Set(question.options?.map((option) => option.id));
      if (!optionIds.has(question.correctOptionId)) {
        throw new Error(
          `Question "${question.id}" has correctOptionId "${question.correctOptionId}" that does not match any option id.`,
        );
      }

      let figure = null;
      if (question.figure !== null) {
        if (!question.figure?.file || !question.figure?.alt) {
          throw new Error(`Question "${question.id}" must define figure.file and figure.alt.`);
        }

        const svgPath = path.resolve(levelDir, question.figure.file);
        try {
          const svgContent = await fs.readFile(svgPath, 'utf8');
          figure = {
            ...parseSvg(svgContent, svgPath),
            alt: question.figure.alt,
          };
        } catch (error) {
          if (error.code === 'ENOENT') {
            throw new Error(`Referenced SVG file not found for question "${question.id}": ${svgPath}`);
          }

          throw error;
        }
      }

      questions.push({
        id: question.id,
        prompt: question.prompt,
        topicTags: question.topicTags,
        hint: question.hint,
        figure,
        options: question.options,
        correctOptionId: question.correctOptionId,
      });
    }

    levels.push({
      id: parsedLevel.id,
      title: parsedLevel.title,
      theme: parsedLevel.theme,
      passingRule: parsedLevel.passingRule,
      questions,
    });
  }

  return levels;
}

async function writeLevels(levels) {
  const fileContents = `// ⚠️ AUTO-GENERATED FILE — Do not edit manually!
// Source: content/levels/*/level.yaml
// Rebuild: npm run build:content

export const levels = ${formatArray(levels, '', formatLevel)};

export default levels;
`;

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, fileContents, 'utf8');
}

async function main() {
  const levels = await loadLevels();
  await writeLevels(levels);
  console.log(`Generated ${path.relative(repoRoot, outputPath)} from content sources.`);
}

main().catch((error) => {
  console.error(`Content build failed: ${error.message}`);
  process.exitCode = 1;
});
