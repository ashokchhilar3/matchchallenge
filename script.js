// === Game Configuration ===
const TOTAL_QUESTIONS = 10;
const TIME_PER_QUESTION = 30; // seconds

const DIFFICULTY_CONFIG = {
  easy: {
    max: 10,
    operations: ['+', '-'],
    label: 'Easy',
  },
  medium: {
    max: 50,
    operations: ['+', '-'],
    label: 'Medium',
  },
  hard: {
    max: 100,
    operations: ['+', '-', '×', '÷'],
    label: 'Hard',
  },
};

// === Game State ===
let currentDifficulty = 'easy';
let score = 0;
let questionIndex = 0;
let correctAnswer = 0;
let timerInterval = null;
let timeLeft = TIME_PER_QUESTION;
let feedbackTimeout = null;

// === Screen Helpers ===
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showStartScreen() {
  clearGameTimers();
  showScreen('start-screen');
}

// === Game Start ===
function startGame(difficulty) {
  currentDifficulty = difficulty;
  score = 0;
  questionIndex = 0;
  showScreen('game-screen');
  loadQuestion();
}

// === Question Generation ===
function generateQuestion(difficulty) {
  const config = DIFFICULTY_CONFIG[difficulty];
  const op = config.operations[Math.floor(Math.random() * config.operations.length)];

  let a, b, answer;

  if (op === '+') {
    a = randInt(1, config.max);
    b = randInt(1, config.max);
    answer = a + b;
    return { text: `${a} + ${b} = ?`, answer };
  }

  if (op === '-') {
    a = randInt(1, config.max);
    b = randInt(1, a); // ensure non-negative result
    answer = a - b;
    return { text: `${a} − ${b} = ?`, answer };
  }

  if (op === '×') {
    a = randInt(1, 12);
    b = randInt(1, 12);
    answer = a * b;
    return { text: `${a} × ${b} = ?`, answer };
  }

  // Division: generate clean division problems
  b = randInt(1, 12);
  answer = randInt(1, 12);
  a = b * answer;
  return { text: `${a} ÷ ${b} = ?`, answer };
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// === Load Question ===
function loadQuestion() {
  clearGameTimers();

  const { text, answer } = generateQuestion(currentDifficulty);
  correctAnswer = answer;

  document.getElementById('question').textContent = text;
  document.getElementById('score').textContent = score;
  document.getElementById('question-num').textContent = `${questionIndex + 1} / ${TOTAL_QUESTIONS}`;
  document.getElementById('answer-input').value = '';
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = 'feedback';

  updateProgressBar();
  startTimer();

  document.getElementById('answer-input').focus();
}

// === Progress Bar ===
function updateProgressBar() {
  const pct = (questionIndex / TOTAL_QUESTIONS) * 100;
  document.getElementById('progress-bar').style.width = `${pct}%`;
}

// === Timer ===
function startTimer() {
  timeLeft = TIME_PER_QUESTION;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const el = document.getElementById('timer');
  el.textContent = timeLeft;
  el.className = timeLeft <= 5 ? 'stat-value timer-warning' : 'stat-value';
}

function handleTimeout() {
  showFeedback(false, `⏰ Time's up! Answer was ${correctAnswer}`);
  scheduleNextQuestion();
}

function clearGameTimers() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  if (feedbackTimeout) {
    clearTimeout(feedbackTimeout);
    feedbackTimeout = null;
  }
}

// === Submit Answer ===
function submitAnswer() {
  const input = document.getElementById('answer-input');
  const userAnswer = parseInt(input.value, 10);

  if (isNaN(userAnswer)) {
    input.focus();
    return;
  }

  clearInterval(timerInterval);

  const isCorrect = userAnswer === correctAnswer;

  if (isCorrect) {
    const points = Math.max(1, timeLeft); // bonus points for speed
    score += points;
    showFeedback(true, `✅ Correct! +${points} point${points !== 1 ? 's' : ''}`);
  } else {
    showFeedback(false, `❌ Oops! The answer was ${correctAnswer}`);
  }

  scheduleNextQuestion();
}

function showFeedback(isCorrect, message) {
  const el = document.getElementById('feedback');
  el.textContent = message;
  el.className = `feedback ${isCorrect ? 'correct' : 'wrong'}`;
}

function scheduleNextQuestion() {
  feedbackTimeout = setTimeout(() => {
    questionIndex++;
    if (questionIndex >= TOTAL_QUESTIONS) {
      showResults();
    } else {
      loadQuestion();
    }
  }, 1500);
}

// === Results ===
function showResults() {
  clearGameTimers();

  const maxScore = TOTAL_QUESTIONS * TIME_PER_QUESTION;
  const percentage = score / maxScore;

  let icon, title, message, stars;

  if (percentage >= 0.8) {
    icon = '🏆';
    title = 'Amazing job!';
    message = 'You\'re a Math Superstar! Keep it up!';
    stars = '⭐⭐⭐';
  } else if (percentage >= 0.5) {
    icon = '😊';
    title = 'Great work!';
    message = 'You did really well! Practice makes perfect!';
    stars = '⭐⭐';
  } else {
    icon = '💪';
    title = 'Keep practicing!';
    message = 'Don\'t give up — you\'ll get better every time!';
    stars = '⭐';
  }

  document.getElementById('result-icon').textContent = icon;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-message').textContent = message;
  document.getElementById('final-score').textContent = score;
  document.getElementById('final-stars').textContent = stars;

  document.getElementById('progress-bar').style.width = '100%';

  showScreen('result-screen');
}

// === Keyboard Support ===
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const gameScreen = document.getElementById('game-screen');
    if (gameScreen.classList.contains('active')) {
      submitAnswer();
    }
  }
});
