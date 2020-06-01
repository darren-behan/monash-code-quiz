// Select all elements
var body = document.querySelector("body");
var nav = document.querySelector("nav");
var highScoreLink = document.querySelector("#highscore-link");
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
var resultsScore = document.querySelector("#score-display");
var initials = document.querySelector("#initials");
var submitScore = document.querySelector("#submit-button");
var highScores = document.querySelector("#highscores");
var scoresRanked = document.querySelector("#score-ranking");
var goBackHome = document.querySelector("#go-back");
var clearScores = document.querySelector("#clear-scores");

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
  }
];

// create some variables

var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var totalSeconds = 0;
var secondsElapsed = 0;
var TIMER;
var score = 0;
var objB = [];

init();

function init() {
  results.style.display = "none";
  highScores.style.display = "none";
}

function viewHighScorePageLink() {
  start.style.display = "none";
  highScorePage();
}

highScoreLink.addEventListener("click", viewHighScorePageLink);

// start quiz
function startQuiz() {
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderCounter();
}

start.addEventListener("click", startQuiz);

// render a question
function renderQuestion() {
  var q = questions[runningQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
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
  totalSeconds = 50;
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

  // else answer is incorrect, deduct time from TIMER

  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    // end the quiz and show the score
    stopTimer();
  }
}

function submitScorePage() {
  quiz.style.display = "none";
  results.style.display = "block";
  resultsScore.innerHTML = "<h4>" + "Your final score is: " + score + "</h4>";
  initials.value = "";

  // if input is empty, alert user to enter initials
}

function highScorePage(event) {
  event.preventDefault();
  setScore();
  renderScore();

  results.style.display = "none";
  nav.style.display = "none";
  highScores.style.display = "block";
}

submitScore.addEventListener("click", highScorePage);

function setScore() {
  var objA = initials.value + " " + score;

  objB.push(objA);
  console.log(objB);

  localStorage.setItem(
    "score",
    JSON.stringify(objB)
  );
}

function renderScore() {
  scoresRanked.innerHTML = "";

  for (var i = 0; i < objB.length; i++) {
    var scoreStored = objB[i];
    
    var li = document.createElement("li");
    li.textContent = scoreStored;
    li.setAttribute("data-index", i);

    scoresRanked.appendChild(li);
  }
}

function goBack() {
  highScores.style.display = "none";
  nav.style.display = "flex";
  start.style.display = "block";
  resetQuiz();
}

goBackHome.addEventListener("click", goBack);

function resetQuiz() {
  runningQuestion = 0;
  score = 0;
}

function clearScore() {
  localStorage.clear();
  objB = [];
  scoresRanked.innerHTML = "";
}

clearScores.addEventListener("click", clearScore);