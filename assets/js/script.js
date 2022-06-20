var timer = document.getElementById('countdown');
var timerText = document.getElementById('timer-text');
var startButton = document.getElementById('startButton');
var questionContainer = document.getElementById('questions');
var questionChoice = document.getElementById('questionChoices');
var startScreen = document.getElementById('startScreen');
var questionResult = document.getElementById('questionResult');
var timePenalty = document.getElementById('timePenalty');
var endGame = document.getElementById('endGame');
var playAgain = document.getElementById('playAgain');
var submitScore = document.getElementById('submitScore');
var currentscore = document.getElementById('current-score');
var highScorePage = document.getElementById('highscore');
var initials = document.getElementById('initials');

var timerId;
var time = 50;
var scoreboard = JSON.parse(localStorage.getItem("playerHighscore")) || [];





var currentQuestionIndex = 0;

//Questions

var questionDatabase = [
  {
    question: "Which type of JavaScript language is ___",
    answers: [
			'Object-Oriented',
			'Object-Based',
			'Assembly-language',
      'High-level'
    ],
		correctAnswer: '2. Object-Based'
  },
  {
    question: "Which one of the following also known as Conditional Expression:",
    answers: [
			'Alternative to if-else',
			'Switch statement',
			'If-then-else statement',
      'immediate if'
    ],
		correctAnswer: '4. immediate if'
  },
  {
    question: "In JavaScript, what is a block of statement?",
    answers: [
			'Conditional block',
			'block that combines a number of statements into a single compound statement',
			'both conditional block and a single statement',
      'block that contains a single statement'
    ],
		correctAnswer: '2. block that combines a number of statements into a single compound statement'
  },
  {
    question: "When interpreter encounters an empty statements, what it will do:",
    answers: [
			'Shows a warning',
			'Prompts to complete the statement',
			'Throws an error',
      'Ignores the statements'
    ],
		correctAnswer: '4. Ignores the statements'
  },
  {
    question: "The function and var are known as:",
    answers: [
			'Keywords',
			'Data types',
			'Declaration statements',
      'Prototypes'
    ],
		correctAnswer: '3. Declaration statements'
  },
  {
    question: "Which of the following variables takes precedence over the others if the names are the same?",
    answers: [
			'Global variable',
			'The local element',
			'The two of the above',
      'None of the above'
    ],
		correctAnswer: '2. The local element'
  },
]



function quizStart(){
  //unhides the question div
  questionContainer.removeAttribute("class");
  timerText.removeAttribute("class");
  //starts the timer - references clock function which controls timer
  timerId = setInterval(clock,1000);
  //gets question to begin quiz
  getQuestion();
}

function getQuestion(){
    
    currentQuestion = questionDatabase[currentQuestionIndex];
    var questionText = document.getElementById('questionText');
    questionChoice.innerHTML ="";
    questionText.textContent = currentQuestion.question;
    questionText.setAttribute("style","text-align:center")
    

    //runs for every choice in a question
    for (var i =0; currentQuestion.answers.length > i; i++){
      //creates a button for choice
      var choice = document.createElement("button");
      //places text content into choice
      choice.textContent= i+1 + ". " + currentQuestion.answers[i];
      //gives choice class so can be styled by css
      choice.setAttribute("class", "choices");
      //giving each choice a function to run when clicked
      choice.onclick = checkAnswer;
      //appends choice to choice div
      questionChoice.appendChild(choice);
    }
}

function checkAnswer(){
  if(this.textContent !== questionDatabase[currentQuestionIndex].correctAnswer){
    //removes 10 seconds off the timer for an incorrect answer and styles the pop up indicator
    time -= 10;
    questionResult.style.color ='red'
    questionResult.style.fontSize ='200%'
    questionResult.style.marginLeft ='40%'
    questionResult.textContent="Incorrect!"
    questionResult.style.marginTop = '5%'
    timePenalty.textContent="  -10";
    timePenalty.style.color ='red';
    //adds 5 seconds to the timer for an correct answer and styles the pop up indicator
  } else {
    time += 5;
    questionResult.style.color ='green';
    questionResult.style.fontSize ='200%';
    questionResult.textContent="Correct!";
    questionResult.style.marginLeft ='40%'
    questionResult.style.marginTop = '5%'
    timePenalty.textContent="  +5";
    timePenalty.style.color='green';
  }
  //removing any hide class from element so that text will reappear for subsequent questions
  timePenalty.setAttribute("class","")
  questionResult.setAttribute("class","")
  //Creating a timeout that will assign class hide to the time penatly and question result text
  //so that it won't stay for too long on the screen
  setTimeout(function(){
    timePenalty.setAttribute("class","hide");
  },1000)
  setTimeout(function(){
    questionResult.setAttribute("class","hide");
  },1000);
  //moves to next question in question array
  currentQuestionIndex ++;
  //Checks to see if there are any questions left in the question database
  //If not the quiz ends and runs end function otherwise generates next question
  if(currentQuestionIndex === questionDatabase.length){
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd(){
  //ends timer
  clearInterval(timerId);
  //hides questions, timer and question results
  questionContainer.setAttribute("class","hide");
  timerText.setAttribute("class","hide");
  questionResult.setAttribute("class","hide");
  //unhides the end game div
  endGame.removeAttribute("class");
  var endText = document.getElementById('endText');
  //Displays users score
  currentscore.textContent = "Congratulations! you score was " + time +"!"
  //alligns endgame text to be centered
  endText.setAttribute("style", "text-align: center");
}

function saveScore(){
  playerScore = {
      name: initials.value,
      score: time
  };

  scoreboard.push(playerScore);

  localStorage.setItem ("playerHighscore", JSON.stringify(scoreboard));

}



function clock(){
    //takes a second off
    time --;
    //updates time each second
    timer.textContent = time;
    //checks if timer reaches zero and ends game
    if (time <= 0){
      quizEnd();
    }
}
    

  

  

startButton.addEventListener("click", function(event) {
    //stop button from running defualt process
    event.preventDefault();
    // hides start text and button
    startScreen.style.visibility="hidden";
    //begins quiz
    quizStart();
});

//Resets the environment so the quiz can begin again

playAgain.addEventListener("click",function(event){
  event.preventDefault();
  //hides endgame div
  endGame.setAttribute("class","hide");
  //resets the question index
  currentQuestionIndex = 0;
  //resets the timer
  time =50;
  //starts the quiz again
  quizStart();
})

submitScore.addEventListener("click", function(event){
  event.preventDefault();
  // questionContainer.setAttribute("class","hide");
  // timerText.setAttribute("class","hide");
  // questionResult.setAttribute("class","hide");
  // endGame.setAttribute("class","hide");
  // highScorePage.removeAttribute("class");
  window.location.href = "scores.html"
  saveScore();
})

