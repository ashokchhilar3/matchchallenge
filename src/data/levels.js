// ⚠️ AUTO-GENERATED FILE — Do not edit manually!
// Source: content/levels/*/level.yaml
// Rebuild: npm run build:content

export const levels = [
  {
    id: 'level-1',
    title: 'Level 1',
    theme: 'Number Warm-Up',
    passingRule: 'perfect',
    questions: [
      {
        id: 'level-1-q1',
        prompt: 'What is 347 + 286?',
        topicTags: [
          'arithmetic',
          'addition'
        ],
        hint: 'Add the hundreds, tens, and ones carefully.',
        figure: null,
        options: [
          { id: 'a', text: '623' },
          { id: 'b', text: '633' },
          { id: 'c', text: '643' },
          { id: 'd', text: '653' }
        ],
        correctOptionId: 'b',
      },
      {
        id: 'level-1-q2',
        prompt: 'What is 912 − 458?',
        topicTags: [
          'arithmetic',
          'subtraction'
        ],
        hint: 'Regroup if you need to when subtracting.',
        figure: null,
        options: [
          { id: 'a', text: '444' },
          { id: 'b', text: '454' },
          { id: 'c', text: '464' },
          { id: 'd', text: '474' }
        ],
        correctOptionId: 'b',
      },
      {
        id: 'level-1-q3',
        prompt: 'What is 9 × 8?',
        topicTags: [
          'arithmetic',
          'multiplication'
        ],
        hint: 'Think of 8 groups of 9 or 9 groups of 8.',
        figure: null,
        options: [
          { id: 'a', text: '56' },
          { id: 'b', text: '63' },
          { id: 'c', text: '72' },
          { id: 'd', text: '81' }
        ],
        correctOptionId: 'c',
      },
      {
        id: 'level-1-q4',
        prompt: 'What is 144 ÷ 12?',
        topicTags: [
          'arithmetic',
          'division'
        ],
        hint: 'Ask yourself: 12 times what number equals 144?',
        figure: null,
        options: [
          { id: 'a', text: '10' },
          { id: 'b', text: '11' },
          { id: 'c', text: '12' },
          { id: 'd', text: '14' }
        ],
        correctOptionId: 'c',
      },
      {
        id: 'level-1-q5',
        prompt: 'What is 3/4 + 1/4?',
        topicTags: [
          'fractions',
          'addition'
        ],
        hint: 'When denominators are the same, add the numerators.',
        figure: null,
        options: [
          { id: 'a', text: '1' },
          { id: 'b', text: '4/8' },
          { id: 'c', text: '3/8' },
          { id: 'd', text: '7/8' }
        ],
        correctOptionId: 'a',
      },
      {
        id: 'level-1-q6',
        prompt: 'Which fraction is greater?',
        topicTags: [
          'fractions',
          'comparison'
        ],
        hint: 'The denominators match, so compare the numerators.',
        figure: null,
        options: [
          { id: 'a', text: '3/8' },
          { id: 'b', text: '5/8' },
          { id: 'c', text: 'They are equal.' },
          { id: 'd', text: 'Not enough information.' }
        ],
        correctOptionId: 'b',
      },
      {
        id: 'level-1-q7',
        prompt: 'What is 2/3 of 12?',
        topicTags: [
          'fractions',
          'multiplication'
        ],
        hint: 'Split 12 into 3 equal groups first.',
        figure: null,
        options: [
          { id: 'a', text: '4' },
          { id: 'b', text: '6' },
          { id: 'c', text: '8' },
          { id: 'd', text: '9' }
        ],
        correctOptionId: 'c',
      },
      {
        id: 'level-1-q8',
        prompt: 'What is 6 + 4 × 5?',
        topicTags: [
          'arithmetic',
          'order-of-operations'
        ],
        hint: 'Multiply before you add.',
        figure: null,
        options: [
          { id: 'a', text: '26' },
          { id: 'b', text: '50' },
          { id: 'c', text: '34' },
          { id: 'd', text: '20' }
        ],
        correctOptionId: 'a',
      },
      {
        id: 'level-1-q9',
        prompt: 'A square has side length 9 centimeters. What is its perimeter?',
        topicTags: [
          'measurement',
          'perimeter'
        ],
        hint: 'A square has 4 equal sides.',
        figure: null,
        options: [
          { id: 'a', text: '18 cm' },
          { id: 'b', text: '27 cm' },
          { id: 'c', text: '36 cm' },
          { id: 'd', text: '81 cm' }
        ],
        correctOptionId: 'c',
      },
      {
        id: 'level-1-q10',
        prompt: 'Mina has 45 stickers and shares them equally into 5 albums. How many stickers go in each album?',
        topicTags: [
          'word-problem',
          'division'
        ],
        hint: 'This is an equal groups problem.',
        figure: null,
        options: [
          { id: 'a', text: '8' },
          { id: 'b', text: '9' },
          { id: 'c', text: '10' },
          { id: 'd', text: '11' }
        ],
        correctOptionId: 'b',
      }
    ],
  },
  {
    id: 'level-2',
    title: 'Level 2',
    theme: 'Geometry and Measurement Mission',
    passingRule: 'perfect',
    questions: [
      {
        id: 'level-2-q1',
        prompt: 'What is the area of this rectangle?',
        topicTags: [
          'geometry',
          'area',
          'rectangle'
        ],
        hint: 'Area of a rectangle = length × width.',
        figure: {
          type: 'svg',
          viewBox: '0 0 300 180',
          width: 300,
          height: 180,
          alt: 'A rectangle labeled 8 centimeters across and 5 centimeters tall.',
          markup: `
            <rect x="40" y="40" width="200" height="100" fill="#e8f0fe" stroke="#4a47a3" stroke-width="2" />
            <line x1="40" y1="28" x2="240" y2="28" stroke="#333" stroke-width="1" />
            <line x1="40" y1="24" x2="40" y2="32" stroke="#333" stroke-width="1" />
            <line x1="240" y1="24" x2="240" y2="32" stroke="#333" stroke-width="1" />
            <text x="140" y="22" text-anchor="middle" font-size="14" fill="#333">8 cm</text>
            <line x1="252" y1="40" x2="252" y2="140" stroke="#333" stroke-width="1" />
            <line x1="248" y1="40" x2="256" y2="40" stroke="#333" stroke-width="1" />
            <line x1="248" y1="140" x2="256" y2="140" stroke="#333" stroke-width="1" />
            <text x="272" y="95" text-anchor="middle" font-size="14" fill="#333">5 cm</text>
            <polyline points="40,125 55,125 55,140" fill="none" stroke="#4a47a3" stroke-width="1.5" />
            <polyline points="225,140 225,125 240,125" fill="none" stroke="#4a47a3" stroke-width="1.5" />
          `,
        },
        options: [
          { id: 'a', text: '26 cm²' },
          { id: 'b', text: '40 cm²' },
          { id: 'c', text: '13 cm²' },
          { id: 'd', text: '80 cm²' }
        ],
        correctOptionId: 'b',
      },
      {
        id: 'level-2-q2',
        prompt: 'Find the missing angle marked with ? in this triangle.',
        topicTags: [
          'geometry',
          'angles',
          'triangle'
        ],
        hint: 'All angles in a triangle add up to 180°.',
        figure: {
          type: 'svg',
          viewBox: '0 0 280 200',
          width: 280,
          height: 200,
          alt: 'A triangle with bottom angles labeled 60 degrees and 70 degrees, and the top angle labeled with a question mark.',
          markup: `
            <polygon points="140,20 40,180 240,180" fill="#fff9e6" stroke="#e6a817" stroke-width="2" />
            <text x="140" y="55" text-anchor="middle" font-size="15" fill="#e53935" font-weight="bold">?</text>
            <text x="60" y="172" text-anchor="middle" font-size="14" fill="#333">60°</text>
            <text x="220" y="172" text-anchor="middle" font-size="14" fill="#333">70°</text>
            <path d="M 55,180 A 18,18 0 0,1 48,165" fill="none" stroke="#333" stroke-width="1.5" />
            <path d="M 225,180 A 18,18 0 0,0 232,165" fill="none" stroke="#333" stroke-width="1.5" />
            <path d="M 130,35 A 18,18 0 0,1 150,35" fill="none" stroke="#e53935" stroke-width="2" />
          `,
        },
        options: [
          { id: 'a', text: '40°' },
          { id: 'b', text: '50°' },
          { id: 'c', text: '60°' },
          { id: 'd', text: '130°' }
        ],
        correctOptionId: 'b',
      },
      {
        id: 'level-2-q3',
        prompt: 'A garden path is 12 meters long and 7 meters wide. What is its perimeter?',
        topicTags: [
          'measurement',
          'perimeter'
        ],
        hint: 'Add all four sides, or use 2 × (length + width).',
        figure: null,
        options: [
          { id: 'a', text: '19 meters' },
          { id: 'b', text: '38 meters' },
          { id: 'c', text: '84 meters' },
          { id: 'd', text: '24 meters' }
        ],
        correctOptionId: 'b',
      },
      {
        id: 'level-2-q4',
        prompt: 'Find the area of this L-shaped figure.',
        topicTags: [
          'geometry',
          'area',
          'composite-shapes'
        ],
        hint: 'Split the shape into two rectangles and add their areas.',
        figure: {
          type: 'svg',
          viewBox: '0 0 320 280',
          width: 320,
          height: 280,
          alt: 'An L-shaped figure with labeled side lengths of 7 centimeters, 11 centimeters, 7 centimeters, and 4 centimeters for the top step.',
          markup: `
            <polygon points="40,30 180,30 180,110 260,110 260,250 40,250" fill="#e8f0fe" stroke="#3f51b5" stroke-width="2" />
            <line x1="40" y1="18" x2="180" y2="18" stroke="#333" stroke-width="1" />
            <line x1="40" y1="14" x2="40" y2="22" stroke="#333" stroke-width="1" />
            <line x1="180" y1="14" x2="180" y2="22" stroke="#333" stroke-width="1" />
            <text x="110" y="12" text-anchor="middle" font-size="13" fill="#333">7 cm</text>
            <line x1="26" y1="30" x2="26" y2="250" stroke="#333" stroke-width="1" />
            <line x1="22" y1="30" x2="30" y2="30" stroke="#333" stroke-width="1" />
            <line x1="22" y1="250" x2="30" y2="250" stroke="#333" stroke-width="1" />
            <text x="14" y="145" text-anchor="middle" font-size="13" fill="#333">11 cm</text>
            <line x1="40" y1="262" x2="260" y2="262" stroke="#333" stroke-width="1" />
            <line x1="40" y1="258" x2="40" y2="266" stroke="#333" stroke-width="1" />
            <line x1="260" y1="258" x2="260" y2="266" stroke="#333" stroke-width="1" />
            <text x="150" y="278" text-anchor="middle" font-size="13" fill="#333">11 cm</text>
            <line x1="274" y1="110" x2="274" y2="250" stroke="#333" stroke-width="1" />
            <line x1="270" y1="110" x2="278" y2="110" stroke="#333" stroke-width="1" />
            <line x1="270" y1="250" x2="278" y2="250" stroke="#333" stroke-width="1" />
            <text x="295" y="185" text-anchor="middle" font-size="13" fill="#333">7 cm</text>
            <line x1="180" y1="100" x2="260" y2="100" stroke="#888" stroke-width="1" stroke-dasharray="3,3" />
            <text x="220" y="94" text-anchor="middle" font-size="12" fill="#888">4 cm</text>
            <line x1="190" y1="30" x2="190" y2="110" stroke="#888" stroke-width="1" stroke-dasharray="3,3" />
            <text x="198" y="75" font-size="12" fill="#888">4 cm</text>
          `,
        },
        options: [
          { id: 'a', text: '93 cm²' },
          { id: 'b', text: '105 cm²' },
          { id: 'c', text: '121 cm²' },
          { id: 'd', text: '77 cm²' }
        ],
        correctOptionId: 'b',
      },
      {
        id: 'level-2-q5',
        prompt: 'How many centimeters are in 2.5 meters?',
        topicTags: [
          'measurement',
          'unit-conversion'
        ],
        hint: '1 meter = 100 centimeters.',
        figure: null,
        options: [
          { id: 'a', text: '25 cm' },
          { id: 'b', text: '205 cm' },
          { id: 'c', text: '250 cm' },
          { id: 'd', text: '2,500 cm' }
        ],
        correctOptionId: 'c',
      },
      {
        id: 'level-2-q6',
        prompt: 'What type of angle is shown in this figure?',
        topicTags: [
          'geometry',
          'angles'
        ],
        hint: 'A 90° angle has a square corner marker.',
        figure: {
          type: 'svg',
          viewBox: '0 0 200 160',
          width: 200,
          height: 160,
          alt: 'Two lines meeting to form a 90 degree angle with a right-angle square marker.',
          markup: `
            <line x1="30" y1="130" x2="170" y2="130" stroke="#4a47a3" stroke-width="2.5" />
            <line x1="30" y1="130" x2="30" y2="20" stroke="#4a47a3" stroke-width="2.5" />
            <rect x="30" y="110" width="20" height="20" fill="none" stroke="#e53935" stroke-width="2" />
            <text x="80" y="150" font-size="14" fill="#333">90°</text>
          `,
        },
        options: [
          { id: 'a', text: 'Acute angle' },
          { id: 'b', text: 'Obtuse angle' },
          { id: 'c', text: 'Right angle' },
          { id: 'd', text: 'Straight angle' }
        ],
        correctOptionId: 'c',
      },
      {
        id: 'level-2-q7',
        prompt: 'A square playground has sides that are 6 meters long. What is its area?',
        topicTags: [
          'geometry',
          'area',
          'square'
        ],
        hint: 'Area of a square = side × side.',
        figure: {
          type: 'svg',
          viewBox: '0 0 220 220',
          width: 220,
          height: 220,
          alt: 'A square with each side labeled 6 meters.',
          markup: `
            <rect x="45" y="45" width="130" height="130" fill="#eef9f1" stroke="#2e7d32" stroke-width="2" />
            <line x1="45" y1="30" x2="175" y2="30" stroke="#333" stroke-width="1" />
            <line x1="45" y1="26" x2="45" y2="34" stroke="#333" stroke-width="1" />
            <line x1="175" y1="26" x2="175" y2="34" stroke="#333" stroke-width="1" />
            <text x="110" y="22" text-anchor="middle" font-size="14" fill="#333">6 m</text>
            <line x1="190" y1="45" x2="190" y2="175" stroke="#333" stroke-width="1" />
            <line x1="186" y1="45" x2="194" y2="45" stroke="#333" stroke-width="1" />
            <line x1="186" y1="175" x2="194" y2="175" stroke="#333" stroke-width="1" />
            <text x="204" y="112" text-anchor="middle" font-size="14" fill="#333">6 m</text>
          `,
        },
        options: [
          { id: 'a', text: '12 m²' },
          { id: 'b', text: '24 m²' },
          { id: 'c', text: '36 m²' },
          { id: 'd', text: '48 m²' }
        ],
        correctOptionId: 'c',
      },
      {
        id: 'level-2-q8',
        prompt: 'A rectangular prism has length 4 cm, width 3 cm, and height 2 cm. What is its volume?',
        topicTags: [
          'measurement',
          'volume'
        ],
        hint: 'Volume = length × width × height.',
        figure: null,
        options: [
          { id: 'a', text: '9 cm³' },
          { id: 'b', text: '12 cm³' },
          { id: 'c', text: '18 cm³' },
          { id: 'd', text: '24 cm³' }
        ],
        correctOptionId: 'd',
      },
      {
        id: 'level-2-q9',
        prompt: 'What is the perimeter of this triangle?',
        topicTags: [
          'geometry',
          'perimeter',
          'triangle'
        ],
        hint: 'Add all three side lengths.',
        figure: {
          type: 'svg',
          viewBox: '0 0 280 200',
          width: 280,
          height: 200,
          alt: 'A triangle with sides labeled 5 centimeters, 6 centimeters, and 7 centimeters.',
          markup: `
            <polygon points="50,170 230,170 150,45" fill="#fef7ef" stroke="#fb8c00" stroke-width="2" />
            <text x="140" y="188" text-anchor="middle" font-size="14" fill="#333">7 cm</text>
            <text x="84" y="112" font-size="14" fill="#333">5 cm</text>
            <text x="195" y="112" font-size="14" fill="#333">6 cm</text>
            <line x1="50" y1="178" x2="230" y2="178" stroke="#333" stroke-width="1" />
            <line x1="50" y1="174" x2="50" y2="182" stroke="#333" stroke-width="1" />
            <line x1="230" y1="174" x2="230" y2="182" stroke="#333" stroke-width="1" />
          `,
        },
        options: [
          { id: 'a', text: '13 cm' },
          { id: 'b', text: '18 cm' },
          { id: 'c', text: '21 cm' },
          { id: 'd', text: '42 cm' }
        ],
        correctOptionId: 'b',
      },
      {
        id: 'level-2-q10',
        prompt: 'A movie starts at 2:35 p.m. and ends at 4:10 p.m. How long is the movie?',
        topicTags: [
          'measurement',
          'elapsed-time'
        ],
        hint: 'Count from 2:35 to 3:35, then from 3:35 to 4:10.',
        figure: null,
        options: [
          { id: 'a', text: '1 hour 15 minutes' },
          { id: 'b', text: '1 hour 25 minutes' },
          { id: 'c', text: '1 hour 35 minutes' },
          { id: 'd', text: '1 hour 45 minutes' }
        ],
        correctOptionId: 'c',
      }
    ],
  },
  {
    id: 'level-3',
    title: 'Level 3',
    theme: 'Mixed Challenge Summit',
    passingRule: 'perfect',
    questions: [
      {
        id: 'level-3-q1',
        prompt: 'Lena ate 3/8 of a pizza at lunch and 2/8 at dinner. How much pizza did she eat in all?',
        topicTags: [
          'fractions',
          'word-problem'
        ],
        hint: 'The denominators are the same, so add the numerators.',
        figure: null,
        options: [
          { id: 'a', text: '5/8' },
          { id: 'b', text: '5/16' },
          { id: 'c', text: '1/8' },
          { id: 'd', text: '1' }
        ],
        correctOptionId: 'a',
      },
      {
        id: 'level-3-q2',
        prompt: 'Four notebooks cost $3 each, and one pen costs $2. How much money is needed to buy them all?',
        topicTags: [
          'word-problem',
          'multiplication',
          'addition'
        ],
        hint: 'Find the notebook cost first, then add the pen cost.',
        figure: null,
        options: [
          { id: 'a', text: '$12' },
          { id: 'b', text: '$13' },
          { id: 'c', text: '$14' },
          { id: 'd', text: '$15' }
        ],
        correctOptionId: 'c',
      },
      {
        id: 'level-3-q3',
        prompt: 'What is the area of this triangle?',
        topicTags: [
          'geometry',
          'area',
          'triangle'
        ],
        hint: 'Triangle area = 1/2 × base × height.',
        figure: {
          type: 'svg',
          viewBox: '0 0 300 210',
          width: 300,
          height: 210,
          alt: 'A triangle with a 9 centimeter base and a 4 centimeter height drawn with a dashed height line.',
          markup: `
            <polygon points="40,170 250,170 110,50" fill="#edf4ff" stroke="#1e88e5" stroke-width="2" />
            <line x1="110" y1="50" x2="110" y2="170" stroke="#1e88e5" stroke-width="1.5" stroke-dasharray="5,4" />
            <line x1="100" y1="160" x2="110" y2="160" stroke="#1e88e5" stroke-width="1.5" />
            <line x1="100" y1="160" x2="100" y2="170" stroke="#1e88e5" stroke-width="1.5" />
            <text x="148" y="188" text-anchor="middle" font-size="14" fill="#333">9 cm</text>
            <text x="122" y="112" font-size="14" fill="#333">4 cm</text>
            <line x1="40" y1="184" x2="250" y2="184" stroke="#333" stroke-width="1" />
            <line x1="40" y1="180" x2="40" y2="188" stroke="#333" stroke-width="1" />
            <line x1="250" y1="180" x2="250" y2="188" stroke="#333" stroke-width="1" />
          `,
        },
        options: [
          { id: 'a', text: '13 cm²' },
          { id: 'b', text: '18 cm²' },
          { id: 'c', text: '26 cm²' },
          { id: 'd', text: '36 cm²' }
        ],
        correctOptionId: 'b',
      },
      {
        id: 'level-3-q4',
        prompt: 'What is 5/6 − 1/3?',
        topicTags: [
          'fractions',
          'subtraction'
        ],
        hint: 'Rewrite 1/3 as sixths first.',
        figure: null,
        options: [
          { id: 'a', text: '1/2' },
          { id: 'b', text: '2/6' },
          { id: 'c', text: '4/6' },
          { id: 'd', text: '3/6' }
        ],
        correctOptionId: 'a',
      },
      {
        id: 'level-3-q5',
        prompt: 'Three-fifths of a class of 30 students brought water bottles. How many students brought water bottles?',
        topicTags: [
          'fractions',
          'word-problem'
        ],
        hint: 'Find 1/5 of 30, then multiply by 3.',
        figure: null,
        options: [
          { id: 'a', text: '6' },
          { id: 'b', text: '12' },
          { id: 'c', text: '15' },
          { id: 'd', text: '18' }
        ],
        correctOptionId: 'd',
      },
      {
        id: 'level-3-q6',
        prompt: 'A straight line is divided by a ray. One angle is 115°. What is angle x?',
        topicTags: [
          'geometry',
          'angles',
          'straight-line'
        ],
        hint: 'Angles on a straight line add to 180°.',
        figure: {
          type: 'svg',
          viewBox: '0 0 280 190',
          width: 280,
          height: 190,
          alt: 'A straight line with a ray forming a 115 degree angle on one side and an unknown x angle on the other.',
          markup: `
            <line x1="30" y1="140" x2="250" y2="140" stroke="#333" stroke-width="2" />
            <line x1="140" y1="140" x2="90" y2="50" stroke="#5e35b1" stroke-width="2" />
            <path d="M 121,106 A 35,35 0 0,1 107,139" fill="none" stroke="#5e35b1" stroke-width="2" />
            <path d="M 173,139 A 33,33 0 0,0 154,111" fill="none" stroke="#e53935" stroke-width="2" />
            <text x="90" y="106" font-size="14" fill="#5e35b1">115°</text>
            <text x="177" y="121" font-size="15" fill="#e53935" font-weight="bold">x</text>
          `,
        },
        options: [
          { id: 'a', text: '55°' },
          { id: 'b', text: '60°' },
          { id: 'c', text: '65°' },
          { id: 'd', text: '75°' }
        ],
        correctOptionId: 'c',
      },
      {
        id: 'level-3-q7',
        prompt: 'Which decimal is smaller?',
        topicTags: [
          'decimals',
          'comparison'
        ],
        hint: 'Line up the digits in the tenths and hundredths places.',
        figure: null,
        options: [
          { id: 'a', text: '4.07' },
          { id: 'b', text: '4.7' },
          { id: 'c', text: 'They are equal.' },
          { id: 'd', text: 'Not enough information.' }
        ],
        correctOptionId: 'a',
      },
      {
        id: 'level-3-q8',
        prompt: 'How many milliliters are in 1.5 liters?',
        topicTags: [
          'measurement',
          'unit-conversion'
        ],
        hint: '1 liter = 1,000 milliliters.',
        figure: null,
        options: [
          { id: 'a', text: '150 mL' },
          { id: 'b', text: '1,050 mL' },
          { id: 'c', text: '1,500 mL' },
          { id: 'd', text: '15,000 mL' }
        ],
        correctOptionId: 'c',
      },
      {
        id: 'level-3-q9',
        prompt: 'A rectangle has an area of 54 square inches and a length of 9 inches. What is its width?',
        topicTags: [
          'geometry',
          'area',
          'word-problem'
        ],
        hint: 'Width = area ÷ length.',
        figure: null,
        options: [
          { id: 'a', text: '5 inches' },
          { id: 'b', text: '6 inches' },
          { id: 'c', text: '7 inches' },
          { id: 'd', text: '8 inches' }
        ],
        correctOptionId: 'b',
      },
      {
        id: 'level-3-q10',
        prompt: 'A bus has 8 rows with 6 seats in each row. If 7 seats are empty, how many students are on the bus?',
        topicTags: [
          'word-problem',
          'multiplication',
          'subtraction'
        ],
        hint: 'Find the total number of seats, then subtract the empty seats.',
        figure: null,
        options: [
          { id: 'a', text: '41' },
          { id: 'b', text: '42' },
          { id: 'c', text: '47' },
          { id: 'd', text: '55' }
        ],
        correctOptionId: 'a',
      }
    ],
  },
  {
    id: 'level-4',
    title: 'Level 4',
    theme: 'Fractions, Decimals, and Data Dash',
    passingRule: 'perfect',
    questions: [
      {
        id: 'level-4-q1',
        prompt: 'Which fraction is equivalent to 3/5?',
        topicTags: [
          'fractions',
          'equivalent-fractions'
        ],
        hint: 'Multiply the numerator and denominator by the same number.',
        figure: null,
        options: [
          { id: 'a', text: '5/8' },
          { id: 'b', text: '6/12' },
          { id: 'c', text: '6/10' },
          { id: 'd', text: '9/20' }
        ],
        correctOptionId: 'c',
      },
      {
        id: 'level-4-q2',
        prompt: 'What decimal is equal to 7/10?',
        topicTags: [
          'fractions',
          'decimals',
          'conversion'
        ],
        hint: 'A denominator of 10 tells you the tenths place.',
        figure: null,
        options: [
          { id: 'a', text: '0.07' },
          { id: 'b', text: '0.7' },
          { id: 'c', text: '7.0' },
          { id: 'd', text: '0.17' }
        ],
        correctOptionId: 'b',
      },
      {
        id: 'level-4-q3',
        prompt: 'What is 4.8 + 1.35?',
        topicTags: [
          'decimals',
          'addition'
        ],
        hint: 'Line up the decimal points before adding.',
        figure: null,
        options: [
          { id: 'a', text: '5.15' },
          { id: 'b', text: '6.05' },
          { id: 'c', text: '6.15' },
          { id: 'd', text: '6.85' }
        ],
        correctOptionId: 'c',
      },
      {
        id: 'level-4-q4',
        prompt: 'What is 9.4 − 2.76?',
        topicTags: [
          'decimals',
          'subtraction'
        ],
        hint: 'Write 9.4 as 9.40 so the place values match.',
        figure: null,
        options: [
          { id: 'a', text: '6.24' },
          { id: 'b', text: '6.64' },
          { id: 'c', text: '7.14' },
          { id: 'd', text: '7.66' }
        ],
        correctOptionId: 'b',
      },
      {
        id: 'level-4-q5',
        prompt: 'According to the bar graph, how many books were read on Wednesday?',
        topicTags: [
          'data',
          'bar-graph',
          'reading-data'
        ],
        hint: 'Look at the height of the Wednesday bar and match it to the scale.',
        figure: {
          type: 'svg',
          viewBox: '0 0 320 240',
          width: 320,
          height: 240,
          alt: 'A bar graph showing books read on Monday 12, Tuesday 16, Wednesday 20, and Thursday 14.',
          markup: `
            <line x1="48" y1="24" x2="48" y2="190" stroke="#333" stroke-width="2" />
            <line x1="48" y1="190" x2="290" y2="190" stroke="#333" stroke-width="2" />
            <text x="34" y="194" font-size="12" fill="#333">0</text>
            <text x="28" y="154" font-size="12" fill="#333">10</text>
            <text x="28" y="114" font-size="12" fill="#333">20</text>
            <text x="28" y="74" font-size="12" fill="#333">30</text>
            <line x1="44" y1="150" x2="290" y2="150" stroke="#d0d7de" stroke-width="1" />
            <line x1="44" y1="110" x2="290" y2="110" stroke="#d0d7de" stroke-width="1" />
            <line x1="44" y1="70" x2="290" y2="70" stroke="#d0d7de" stroke-width="1" />
            <rect x="72" y="142" width="34" height="48" fill="#7c4dff" rx="6" />
            <rect x="126" y="126" width="34" height="64" fill="#42a5f5" rx="6" />
            <rect x="180" y="110" width="34" height="80" fill="#26a69a" rx="6" />
            <rect x="234" y="134" width="34" height="56" fill="#ffb300" rx="6" />
            <text x="89" y="208" text-anchor="middle" font-size="12" fill="#333">Mon</text>
            <text x="143" y="208" text-anchor="middle" font-size="12" fill="#333">Tue</text>
            <text x="197" y="208" text-anchor="middle" font-size="12" fill="#333">Wed</text>
            <text x="251" y="208" text-anchor="middle" font-size="12" fill="#333">Thu</text>
            <text x="170" y="226" text-anchor="middle" font-size="13" fill="#333">Books read</text>
          `,
        },
        options: [
          { id: 'a', text: '16 books' },
          { id: 'b', text: '18 books' },
          { id: 'c', text: '20 books' },
          { id: 'd', text: '24 books' }
        ],
        correctOptionId: 'c',
      },
      {
        id: 'level-4-q6',
        prompt: 'Which fraction is equal to 0.25?',
        topicTags: [
          'fractions',
          'decimals',
          'conversion'
        ],
        hint: 'Think of 0.25 as twenty-five hundredths and simplify.',
        figure: null,
        options: [
          { id: 'a', text: '1/2' },
          { id: 'b', text: '1/4' },
          { id: 'c', text: '2/5' },
          { id: 'd', text: '3/10' }
        ],
        correctOptionId: 'b',
      },
      {
        id: 'level-4-q7',
        prompt: 'A snack mix recipe uses 0.5 cup of raisins and 1.25 cups of cereal. How many cups are used in all?',
        topicTags: [
          'decimals',
          'word-problem',
          'addition'
        ],
        hint: 'Add the tenths and hundredths carefully.',
        figure: null,
        options: [
          { id: 'a', text: '1.3 cups' },
          { id: 'b', text: '1.7 cups' },
          { id: 'c', text: '1.75 cups' },
          { id: 'd', text: '2.15 cups' }
        ],
        correctOptionId: 'c',
      },
      {
        id: 'level-4-q8',
        prompt: 'A ribbon is 3/4 yard long. If each piece is 1/8 yard long, how many pieces can be cut?',
        topicTags: [
          'fractions',
          'division',
          'word-problem'
        ],
        hint: 'How many eighths are in three fourths?',
        figure: null,
        options: [
          { id: 'a', text: '4' },
          { id: 'b', text: '5' },
          { id: 'c', text: '6' },
          { id: 'd', text: '8' }
        ],
        correctOptionId: 'c',
      },
      {
        id: 'level-4-q9',
        prompt: 'A runner jogged 1.2 miles on Monday and 2.35 miles on Tuesday. How far did the runner jog altogether?',
        topicTags: [
          'decimals',
          'word-problem',
          'addition'
        ],
        hint: 'Rewrite 1.2 as 1.20 before adding.',
        figure: null,
        options: [
          { id: 'a', text: '3.45 miles' },
          { id: 'b', text: '3.55 miles' },
          { id: 'c', text: '3.65 miles' },
          { id: 'd', text: '4.55 miles' }
        ],
        correctOptionId: 'b',
      },
      {
        id: 'level-4-q10',
        prompt: 'A class collected 2.4 pounds of paper on Monday and 1.85 pounds on Tuesday. How much more than 4 pounds is that total?',
        topicTags: [
          'decimals',
          'word-problem',
          'multi-step'
        ],
        hint: 'Add the two amounts first, then compare the total to 4 pounds.',
        figure: null,
        options: [
          { id: 'a', text: '0.15 pound' },
          { id: 'b', text: '0.25 pound' },
          { id: 'c', text: '0.35 pound' },
          { id: 'd', text: '0.45 pound' }
        ],
        correctOptionId: 'b',
      }
    ],
  },
  {
    id: 'level-5',
    title: 'Level 5',
    theme: 'Final Challenge Peak',
    passingRule: 'perfect',
    questions: [
      {
        id: 'level-5-q1',
        prompt: 'What is 2 1/2 + 1.75?',
        topicTags: [
          'fractions',
          'decimals',
          'addition'
        ],
        hint: 'Change 2 1/2 to 2.5 before adding.',
        figure: null,
        options: [
          { id: 'a', text: '3.75' },
          { id: 'b', text: '4.00' },
          { id: 'c', text: '4.25' },
          { id: 'd', text: '4.50' }
        ],
        correctOptionId: 'c',
      },
      {
        id: 'level-5-q2',
        prompt: 'What is the missing angle in this right angle?',
        topicTags: [
          'geometry',
          'angles',
          'right-angle'
        ],
        hint: 'Angles that make a right angle add to 90°.',
        figure: {
          type: 'svg',
          viewBox: '0 0 250 200',
          width: 250,
          height: 200,
          alt: 'A right angle split into a 35 degree angle and an unknown angle.',
          markup: `
            <line x1="50" y1="160" x2="190" y2="160" stroke="#3949ab" stroke-width="3" />
            <line x1="50" y1="160" x2="50" y2="30" stroke="#3949ab" stroke-width="3" />
            <line x1="50" y1="160" x2="125" y2="75" stroke="#ef5350" stroke-width="3" />
            <rect x="50" y="142" width="18" height="18" fill="none" stroke="#3949ab" stroke-width="2" />
            <path d="M 76,161 A 28,28 0 0,1 96,140" fill="none" stroke="#ef5350" stroke-width="2" />
            <path d="M 53,118 A 38,38 0 0,1 96,140" fill="none" stroke="#26a69a" stroke-width="2" />
            <text x="100" y="150" font-size="14" fill="#ef5350">35°</text>
            <text x="66" y="112" font-size="16" fill="#26a69a" font-weight="bold">?</text>
          `,
        },
        options: [
          { id: 'a', text: '45°' },
          { id: 'b', text: '55°' },
          { id: 'c', text: '65°' },
          { id: 'd', text: '125°' }
        ],
        correctOptionId: 'b',
      },
      {
        id: 'level-5-q3',
        prompt: 'How many grams are in 3.6 kilograms?',
        topicTags: [
          'measurement',
          'unit-conversion'
        ],
        hint: '1 kilogram = 1,000 grams.',
        figure: null,
        options: [
          { id: 'a', text: '360 g' },
          { id: 'b', text: '3,060 g' },
          { id: 'c', text: '3,600 g' },
          { id: 'd', text: '36,000 g' }
        ],
        correctOptionId: 'c',
      },
      {
        id: 'level-5-q4',
        prompt: 'A square patio has an area of 64 square feet. What is its perimeter?',
        topicTags: [
          'geometry',
          'area',
          'perimeter',
          'square'
        ],
        hint: 'Find the side length first, then multiply by 4.',
        figure: null,
        options: [
          { id: 'a', text: '16 feet' },
          { id: 'b', text: '24 feet' },
          { id: 'c', text: '28 feet' },
          { id: 'd', text: '32 feet' }
        ],
        correctOptionId: 'd',
      },
      {
        id: 'level-5-q5',
        prompt: 'What is the volume of this rectangular prism?',
        topicTags: [
          'measurement',
          'volume',
          'rectangular-prism'
        ],
        hint: 'Volume = length × width × height.',
        figure: {
          type: 'svg',
          viewBox: '0 0 320 220',
          width: 320,
          height: 220,
          alt: 'A rectangular prism labeled 6 centimeters long, 4 centimeters wide, and 3 centimeters tall.',
          markup: `
            <polygon points="70,70 210,70 250,40 110,40" fill="#e3f2fd" stroke="#1e88e5" stroke-width="2" />
            <polygon points="70,70 70,160 210,160 210,70" fill="#bbdefb" stroke="#1e88e5" stroke-width="2" />
            <polygon points="210,70 250,40 250,130 210,160" fill="#90caf9" stroke="#1e88e5" stroke-width="2" />
            <line x1="70" y1="176" x2="210" y2="176" stroke="#333" stroke-width="1" />
            <line x1="70" y1="172" x2="70" y2="180" stroke="#333" stroke-width="1" />
            <line x1="210" y1="172" x2="210" y2="180" stroke="#333" stroke-width="1" />
            <text x="140" y="192" text-anchor="middle" font-size="13" fill="#333">6 cm</text>
            <line x1="262" y1="40" x2="262" y2="130" stroke="#333" stroke-width="1" />
            <line x1="258" y1="40" x2="266" y2="40" stroke="#333" stroke-width="1" />
            <line x1="258" y1="130" x2="266" y2="130" stroke="#333" stroke-width="1" />
            <text x="282" y="88" text-anchor="middle" font-size="13" fill="#333">3 cm</text>
            <line x1="112" y1="28" x2="252" y2="28" stroke="#333" stroke-width="1" />
            <line x1="112" y1="24" x2="112" y2="32" stroke="#333" stroke-width="1" />
            <line x1="252" y1="24" x2="252" y2="32" stroke="#333" stroke-width="1" />
            <text x="182" y="20" text-anchor="middle" font-size="13" fill="#333">4 cm</text>
          `,
        },
        options: [
          { id: 'a', text: '13 cm³' },
          { id: 'b', text: '24 cm³' },
          { id: 'c', text: '48 cm³' },
          { id: 'd', text: '72 cm³' }
        ],
        correctOptionId: 'd',
      },
      {
        id: 'level-5-q6',
        prompt: 'Four adult tickets cost $12 each and three kid tickets cost $8 each. What is the total cost?',
        topicTags: [
          'word-problem',
          'multiplication',
          'addition'
        ],
        hint: 'Find the adult total and kid total, then add them.',
        figure: null,
        options: [
          { id: 'a', text: '$64' },
          { id: 'b', text: '$68' },
          { id: 'c', text: '$72' },
          { id: 'd', text: '$76' }
        ],
        correctOptionId: 'c',
      },
      {
        id: 'level-5-q7',
        prompt: 'How many minutes are in 1.5 hours?',
        topicTags: [
          'measurement',
          'unit-conversion',
          'time'
        ],
        hint: '1 hour = 60 minutes.',
        figure: null,
        options: [
          { id: 'a', text: '75 minutes' },
          { id: 'b', text: '80 minutes' },
          { id: 'c', text: '90 minutes' },
          { id: 'd', text: '150 minutes' }
        ],
        correctOptionId: 'c',
      },
      {
        id: 'level-5-q8',
        prompt: 'A 9-meter by 7-meter playground gets a 2-meter-wide path added along the 7-meter side. What is the new total area?',
        topicTags: [
          'geometry',
          'area',
          'multi-step'
        ],
        hint: 'Original area 9 × 7, path area 7 × 2, add them.',
        figure: null,
        options: [
          { id: 'a', text: '71 m²' },
          { id: 'b', text: '75 m²' },
          { id: 'c', text: '77 m²' },
          { id: 'd', text: '81 m²' }
        ],
        correctOptionId: 'c',
      },
      {
        id: 'level-5-q9',
        prompt: 'Which statement is true?',
        topicTags: [
          'mixed-review',
          'comparison'
        ],
        hint: 'Compare the values carefully by rewriting them in the same form if needed.',
        figure: null,
        options: [
          { id: 'a', text: '0.6 is less than 3/5.' },
          { id: 'b', text: '2.4 is greater than 2 2/5.' },
          { id: 'c', text: '3/4 is equal to 0.75.' },
          { id: 'd', text: '1.2 is equal to 12/100.' }
        ],
        correctOptionId: 'c',
      },
      {
        id: 'level-5-q10',
        prompt: 'A science tank held 120 liters of water. Then 38.5 liters and 27.25 liters were poured out. How much water is left?',
        topicTags: [
          'decimals',
          'word-problem',
          'multi-step'
        ],
        hint: 'Add the water poured out, then subtract from 120 liters.',
        figure: null,
        options: [
          { id: 'a', text: '54.25 liters' },
          { id: 'b', text: '65.75 liters' },
          { id: 'c', text: '81.75 liters' },
          { id: 'd', text: '92.25 liters' }
        ],
        correctOptionId: 'a',
      }
    ],
  }
];

export default levels;
