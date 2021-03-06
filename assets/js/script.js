// Array of questions
var questionsArray = [
  {
    question:
      "What is the element called that is used to describe the set of variables, objects, and functions you explicitly have access to?",
    answerA: "1. Range",
    answerB: "2. Output Level",
    answerC: "3. Scope",
    answerD: "4. Restriction",
    correct: "C",
  },
  {
    question:
      "What is the format called that is used for storing and transporting data?",
    answerA: "1. HTML",
    answerB: "2. Syntax",
    answerC: "3. JSON",
    answerD: "4. Font",
    correct: "C",
  },
  {
    question:
      "What is the object called that lets you work with both dates and time-related data?",
    answerA: "1. Dates",
    answerB: "2. Clock",
    answerC: "3. Time field",
    answerD: "4. Time-warp",
    correct: "A",
  },
  {
    question:
      "What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?",
    answerA: "1. For Loop",
    answerB: "2. Else Loop",
    answerC: "3. Conditional Loop",
    answerD: "4. While Loop",
    correct: "D",
  },
  {
    question:
      "In JavaScript, what is a block of code called that is used to perform a specific task?",
    answerA: "1. Function",
    answerB: "2. Declaration",
    answerC: "3. Variable",
    answerD: "4. String",
    correct: "A",
  },
  {
    question:
      "What are the identifiers called that cannot be used as variables or function names?",
    answerA: "1. Concrete Terms",
    answerB: "2. Constants",
    answerC: "3. Reserved Words",
    answerD: "4. Favorites",
    correct: "C",
  },
  {
    question:
      "What elements are used to test for TRUE or False values stored in variables?",
    answerA: "1. Comparison and logical operators",
    answerB: "2. Trigger readers",
    answerC: "3. Conditional statements",
    answerD: "4. RegExp or Regular Expressions",
    correct: "A",
  },
  {
    question:
      "In JavaScript, what element is used to store multiple values in a single variable?",
    answerA: "1. Arrays",
    answerB: "2. Strings",
    answerC: "3. Variables",
    answerD: "4. Functions",
    correct: "A",
  },
  {
    question:
      "What is the name of the object that allows you to perform mathematical tasks with the interpreter?",
    answerA: "1. Count",
    answerB: "2. Solve",
    answerC: "3. Number",
    answerD: "4. Math",
    correct: "D",
  },
  {
    question: "What can loops offer JavaScript code as a whole?",
    answerA: "1. Improved performance.",
    answerB: "2. Added plug-ins",
    answerC: "3. Cross-platform support",
    answerD: "4. Cleaner syntax",
    correct: "A",
  },
];

// Variables storing elements
var nav = document.querySelector("nav");
var navHighscoreLink = document.querySelector("#highscore-link");
var timeCount = document.querySelector(".time-count");
var startDiv = document.querySelector("#start");
var startButton = document.querySelector("#start-button");
var quizDiv = document.querySelector("#quiz");
var questionDiv = document.getElementById("question");
var answerAButton = document.getElementById("A");
var answerBButton = document.getElementById("B");
var answerCButton = document.getElementById("C");
var answerDButton = document.getElementById("D");
var resultsDiv = document.querySelector("#results");
var resultsScoreDiv = document.querySelector("#score-display");
var initialsInput = document.querySelector("#initials");
var submitScoreButton = document.querySelector("#submit-button");
var highScoresDiv = document.querySelector("#highscores");
var scoresRankedOl = document.querySelector("#score-ranking");
var goBackButton = document.querySelector("#go-back");
var clearScoresButton = document.querySelector("#clear-scores");

// Variables for use in script

var lastQuestion = questionsArray.length - 1;
var currentQuestion = 0;
var totalSeconds = 0;
var secondsElapsed = 0;
var quizTimer;
var quizScore = 0;
var localStorageArray = [];
var scoresArray = [];

init();

// Hiding resultsDiv and highScoresDiv on page load
function init() {
  resultsDiv.style.display = "none";
  highScoresDiv.style.display = "none";

  // Retrieves locally stored scores
  scoresArray = JSON.parse(localStorage.getItem("score"));

  // If scoresArray were retrieved from localStorage, update the localStorageArray to it
  if (scoresArray !== null) {
    localStorageArray = scoresArray;
  }
}

// startQuiz function activates on click of startButton.
function startQuiz() {
  // The startDiv and highScoreLink whilst appending the quizDiv
  startDiv.style.display = "none";
  navHighscoreLink.style.display = "none";
  quizDiv.style.display = "block";

  // Questions and Answers render
  renderQuestion();
  // quizTimer commences countdown
  renderCounter();
}

// Function renders a question from the questionsArray along with the answers relevant to that question.
function renderQuestion() {
  var q = questionsArray[currentQuestion];

  questionDiv.innerHTML = "<p>" + q.question + "</p>";
  answerAButton.innerHTML = q.answerA;
  answerBButton.innerHTML = q.answerB;
  answerCButton.innerHTML = q.answerC;
  answerDButton.innerHTML = q.answerD;
}

// Function checks if the answer is correct or wrong as selected by the user.
function checkAnswer(answer) {
  if (answer == questionsArray[currentQuestion].correct) {
    // Answer is correct, log 5 points to quizScore
    quizScore += 5;
  } else {
    // else if answer is incorrect, deduct 10 seconds from quizTimer
    secondsElapsed += 10;
  }
  // Increases currentQuestion if less than lastQuestion and renders a new question
  if (currentQuestion < lastQuestion) {
    currentQuestion++;
    renderQuestion();
  } else {
    // else ends the quiz and shows the resultsDiv
    stopTimer();
  }
}

// Controls setting, countdown and stopping of the quizTimer
function renderCounter() {
  // Clears the quizTimer & sets the totalSeconds
  setTime();

  // Increases secondsElapsed by 1 second which gets subtracted from the totalSeconds set in setTime()
  quizTimer = setInterval(function () {
    secondsElapsed++;

    renderTime();
  }, 1000);
}

// Sets the totalSeconds
function setTime() {
  // Clears the quizTimer
  clearInterval(quizTimer);
  totalSeconds = 70;
}

// Changes the timeCount in the html based on the secondsLeft
function renderTime() {
  secondsLeft = totalSeconds - secondsElapsed;
  timeCount.textContent = secondsLeft;
  // If secondsElapsed equals totalSeconds, the quizTimer stops
  if (secondsElapsed >= totalSeconds) {
    stopTimer();
  }
}

// Renders the submitScorePage whilst stopping and resetting the quizTimer
function stopTimer() {
  secondsElapsed = 0;
  setTime();
  // Resets the timeCount in the html based on the time in setTime()
  renderTime();
  recordScorePage();
}

// Renders resultsDiv to be able to log your score with your initials
function recordScorePage() {
  quizDiv.style.display = "none";
  resultsDiv.style.display = "block";
  resultsScoreDiv.innerHTML =
    "<h4>" + "Your final score is: " + quizScore + "</h4>";
  initialsInput.value = "";
}

// Renders highScoresDiv to display results in order from highest to lowest
function renderRecordedScores(event) {
  event.preventDefault();

  // Stores the users score
  storeScores();
  // Renders the score/s to the scoresRankedOl
  renderScores();

  resultsDiv.style.display = "none";
  nav.style.display = "none";
  highScoresDiv.style.display = "block";
}

// Stores the users score
function storeScores() {
  // If no initials are entered, alerts the user and prevents the highScoresDiv from rendering
  if (initialsInput.value.length == 0) {
    alert("Please enter your initials");
    return false;
  }

  // Stores initials entered and score in an empty array
  var scoreObject = { initials: initialsInput.value, userScore: quizScore };
  // Score is pushed to the localStorageArray
  localStorageArray.push(scoreObject);
  // Stores the users score in localStorage
  localStorage.setItem("score", JSON.stringify(localStorageArray));
}

// Renders the score/s to the scoresRankedOl
function renderScores() {
  // Clears any existing appended li
  scoresRankedOl.innerHTML = "";
  // Sorts the scores
  localStorageArray.sort(function (a, b) {
    return b.userScore - a.userScore;
  });
  // Loops through the scoresArray and appends each li
  for (var i = 0; i < localStorageArray.length; i++) {
    scoreStored = localStorageArray[i];

    var li = document.createElement("li");
    li.textContent = scoreStored.initials + " - " + scoreStored.userScore;
    li.setAttribute("id", "userScore");

    scoresRankedOl.appendChild(li);
  }
}

// Function hides startDiv & navbar & loads highScoresDiv on click of highScoreLink in navbar
function renderHighScoresLink() {
  startDiv.style.display = "none";
  nav.style.display = "none";
  highScoresDiv.style.display = "block";
}

// Function to return user to the quiz start page to have another attempt
function goBackButtonFunction() {
  highScoresDiv.style.display = "none";
  nav.style.display = "flex";
  navHighscoreLink.style.display = "flex";
  startDiv.style.display = "block";
  resetQuiz();
}

// Resets the quiz currentQuestion and quizScore to 0 so the user can start again
function resetQuiz() {
  currentQuestion = 0;
  quizScore = 0;
}

// Clears the scores onClick of the clearScoreButton
function clearScore() {
  localStorage.removeItem("score");
  localStorageArray = [];
  scoresRankedOl.innerHTML = "";
}

// Event Listeners
navHighscoreLink.addEventListener("click", renderHighScoresLink);
startButton.addEventListener("click", startQuiz);
submitScoreButton.addEventListener("click", renderRecordedScores);
goBackButton.addEventListener("click", goBackButtonFunction);
clearScoresButton.addEventListener("click", clearScore);
