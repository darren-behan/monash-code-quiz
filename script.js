// Array of questions
var questionsArray = [
  {
    question:
      "What is the element called that is used to describe the set of variables, objects, and functions you explicitly have access to?",
    choiceA: "1. Range",
    choiceB: "2. Output Level",
    choiceC: "3. Scope",
    choiceD: "4. Restriction",
    correct: "C",
  },
  {
    question:
      "What is the format called that is used for storing and transporting data?",
    choiceA: "1. HTML",
    choiceB: "2. Syntax",
    choiceC: "3. JSON",
    choiceD: "4. Font",
    correct: "C",
  },
  {
    question:
      "What is the object called that lets you work with both dates and time-related data?",
    choiceA: "1. Dates",
    choiceB: "2. Clock",
    choiceC: "3. Time field",
    choiceD: "4. Time-warp",
    correct: "A",
  },
  {
    question:
      "What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?",
    choiceA: "1. For Loop",
    choiceB: "2. Else Loop",
    choiceC: "3. Conditional Loop",
    choiceD: "4. While Loop",
    correct: "D",
  },
  {
    question:
      "In JavaScript, what is a block of code called that is used to perform a specific task?",
    choiceA: "1. Function",
    choiceB: "2. Declaration",
    choiceC: "3. Variable",
    choiceD: "4. String",
    correct: "A",
  },
  {
    question:
      "What are the identifiers called that cannot be used as variables or function names?",
    choiceA: "1. Concrete Terms",
    choiceB: "2. Constants",
    choiceC: "3. Reserved Words",
    choiceD: "4. Favorites",
    correct: "C",
  },
  {
    question:
      "What elements are used to test for TRUE or False values stored in variables?",
    choiceA: "1. Comparison and logical operators",
    choiceB: "2. Trigger readers",
    choiceC: "3. Conditional statements",
    choiceD: "4. RegExp or Regular Expressions",
    correct: "A",
  },
  {
    question:
      "In JavaScript, what element is used to store multiple values in a single variable?",
    choiceA: "1. Arrays",
    choiceB: "2. Strings",
    choiceC: "3. Variables",
    choiceD: "4. Functions",
    correct: "A",
  },
  {
    question:
      "What is the name of the object that allows you to perform mathematical tasks with the interpreter?",
    choiceA: "1. Count",
    choiceB: "2. Solve",
    choiceC: "3. Number",
    choiceD: "4. Math",
    correct: "D",
  },
  {
    question: "What can loops offer JavaScript code as a whole?",
    choiceA: "1. Improved performance.",
    choiceB: "2. Added plug-ins",
    choiceC: "3. Cross-platform support",
    choiceD: "4. Cleaner syntax",
    correct: "A",
  },
];

// variables storing elements
var nav = document.querySelector("nav");
var highScoreLink = document.querySelector("#highscore-link");
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

// create some variables

var lastQuestion = questionsArray.length - 1;
var currentQuestion = 0;
var totalSeconds = 0;
var secondsElapsed = 0;
var quizTimer;
var quizScore = 0;
var localStorageArray = [];

init();

// hiding resultsDiv and highScoresDiv on page load
function init() {
  resultsDiv.style.display = "none";
  highScoresDiv.style.display = "none";
}

// function hides startDiv & navbar & loads highScoresDiv on click of highScoreLink in navbar
function renderHighScoresLink() {
  startDiv.style.display = "none";
  nav.style.display = "none";
  highScoresDiv.style.display = "block";
}

// startQuiz function activates on click of startButton. this hides the startDiv and highScoreLink whilst appending the quizDiv. the renderQuestion function runs along with the renderCounter function.
function startQuiz() {
  startDiv.style.display = "none";
  highScoreLink.style.display = "none";
  quizDiv.style.display = "block";

  renderQuestion();
  renderCounter();
}

// function renders the questions from the questionsArray along with the answers relevant to that question & the next question appears onClick of an answer button which activates the checkAnswer() function.
function renderQuestion() {
  var q = questionsArray[currentQuestion];

  questionDiv.innerHTML = "<p>" + q.question + "</p>";
  answerAButton.innerHTML = q.choiceA;
  answerBButton.innerHTML = q.choiceB;
  answerCButton.innerHTML = q.choiceC;
  answerDButton.innerHTML = q.choiceD;
}

// function checks if the answer is correct or wrong as selected by the user.
function checkAnswer(answer) {
  if (answer == questionsArray[currentQuestion].correct) {
    // answer is correct, log 5 points to quizScore
    quizScore += 5;
  } else {
    // else if answer is incorrect, deduct 10 seconds from quizTimer
    secondsElapsed += 10;
  }
  // increases currentQuestion if less than lastQuestion and renders a new question
  if (currentQuestion < lastQuestion) {
    currentQuestion++;
    renderQuestion();
  } else {
    // end the quiz and show the resultsDiv
    stopTimer();
  }
}

// controls setting, countdown and stopping of the quizTimer
function renderCounter() {
  // clears the quizTimer & sets the totalSeconds
  setTime();

  // increases secondsElapsed by 1 second which gets subtracted from the totalSeconds set in setTime()
  quizTimer = setInterval(function () {
    secondsElapsed++;

    renderTime();
  }, 1000);
}

// sets the totalSeconds
function setTime() {
  // clears the quizTimer
  clearInterval(quizTimer);
  totalSeconds = 70;
}

// changes the timeCount in the html based of the secondsLeft
function renderTime() {
  secondsLeft = totalSeconds - secondsElapsed;
  timeCount.textContent = secondsLeft;
  // if secondsElapsed equals totalSeconds, the quizTimer stops
  if (secondsElapsed >= totalSeconds) {
    stopTimer();
  }
}

// renders the submitScorePage whilst stopping and resetting the quizTimer
function stopTimer() {
  secondsElapsed = 0;
  setTime();
  // resets the timeCount in the html based on the time in setTime()
  renderTime();
  submitScorePage();
}

// renders resultsDiv to be able to log your score with your initials
function submitScorePage() {
  quizDiv.style.display = "none";
  resultsDiv.style.display = "block";
  resultsScoreDiv.innerHTML =
    "<h4>" + "Your final score is: " + quizScore + "</h4>";
  initialsInput.value = "";
}

// renders highScoresDiv to display results in order from highest to lowest
function renderHighScores(event) {
  event.preventDefault();

  // if no initials are entered, alerts the user and prevents the highScoresDiv from rendering
  if (initialsInput.value.length == 0) {
    alert("Please enter your initials");
    return false;
  }

  // stores the users score
  setScore();
  // renders the score/s to the scoresRankedOl
  renderScore();

  resultsDiv.style.display = "none";
  nav.style.display = "none";
  highScoresDiv.style.display = "block";
}

// stores the users score in localStorage
function setScore() {
  var scoreArray = { initials: initialsInput.value, userScore: quizScore };

  localStorageArray.push(scoreArray);

  localStorage.setItem("score", JSON.stringify(localStorageArray));
}

// renders the score/s to the scoresRankedOl
function renderScore() {
  // clears any existing appended li
  scoresRankedOl.innerHTML = "";
  // retrieves locally stored scores
  scoresArray = JSON.parse(localStorage.getItem("score"));
  // sorts the scores
  scoresArray.sort(function (a, b) {
    return b.userScore - a.userScore;
  });
  // loops through the scoresArray and appends each li
  for (var i = 0; i < scoresArray.length; i++) {
    scoreStored = scoresArray[i];

    var li = document.createElement("li");
    li.textContent = scoreStored.initials + " - " + scoreStored.userScore;
    li.setAttribute("id", "userScore");

    scoresRankedOl.appendChild(li);
  }
}

// function to return user to the quiz start page to have another attempt
function goBackButtonFunction() {
  highScoresDiv.style.display = "none";
  nav.style.display = "flex";
  highScoreLink.style.display = "flex";
  startDiv.style.display = "block";
  resetQuiz();
}

// resets the quiz currentQuestion and quizScore to 0 so the user can start again
function resetQuiz() {
  currentQuestion = 0;
  quizScore = 0;
}

// clears the scores onClick of of the clearScoreButton
function clearScore() {
  localStorage.clear();
  scoresRankedOl.innerHTML = "";
}

// Event Listeners
highScoreLink.addEventListener("click", renderHighScoresLink);
startButton.addEventListener("click", startQuiz);
submitScoreButton.addEventListener("click", renderHighScores);
goBackButton.addEventListener("click", goBackButtonFunction);
clearScoresButton.addEventListener("click", clearScore);
