// Select all elements
var body = document.querySelector("body");
var nav = document.querySelector("nav");
var highScore = document.querySelector("#highscores");
var timeCount = document.querySelector(".time-count");
var main = document.querySelector(".main");
var section = document.querySelector("section");
var start = document.querySelector("#start");
var quiz = document.querySelector("#quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var results = document.querySelector("#results");
var submitScore = document.querySelector("#submit-button");

// create the questions
var questions = [
  {
    question: "What does HTML stand for?",
    choiceA: "1. Answer",
    choiceB: "2. Answer",
    choiceC: "3. Answer",
    correct: "A",
  },
  {
    question: "What does CSS stand for?",
    choiceA: "1. Answer",
    choiceB: "2. Answer",
    choiceC: "3. Answer",
    correct: "B",
  },
  {
    question: "What does JS stand for?",
    choiceA: "1. Answer",
    choiceB: "2. Answer",
    choiceC: "3. Answer",
    correct: "C",
  },
];

// create some variables

var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var totalSeconds = 0;
var secondsElapsed = 0;
var TIMER;
var score = 0;

init();

function init() {
  results.style.display = "none";
}

// render a question
function renderQuestion() {
  var q = questions[runningQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderCounter();
}

function renderCounter() {
  setTime();

  TIMER = setInterval(function () {
    secondsElapsed++;

    renderTime();
  }, 1000);
}

function setTime() {
  clearInterval(TIMER);
  totalSeconds = 3;
}

function renderTime() {
  var secondsLeft = totalSeconds - secondsElapsed;
  timeCount.textContent = secondsLeft;

  if (secondsElapsed >= totalSeconds) {
    stopTimer();
  }
}

function stopTimer() {
  secondsElapsed = 0;
  setTime();
  renderTime();
  submitScorePage();
}

// checkAnswer

function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    // answer is correct
    score++;
  }

  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    // end the quiz and show the score
    clearInterval(TIMER);
    submitScorePage();
  }
}

function submitScorePage() {
  quiz.style.display = "none";
  results.style.display = "block";
  var h2Tag = document.body.children[1].children[0].children[0].children[2].children[0];
  scoreDisplay = document.createElement("h4");
  scoreDisplay.textContent = "Your final score is: " + score;
  h2Tag.appendChild(scoreDisplay);
}

function highScorePage() {
  console.log("highScorePage has loaded!");
  results.style.display = "none";
  nav.style.display = "none";
}

function viewHighScorePageLink() {
  console.log("highScorePage has loaded!");
  nav.style.display = "none";
  start.style.display = "none";
}

submitScore.addEventListener("click", highScorePage);
highScore.addEventListener("click", viewHighScorePageLink);