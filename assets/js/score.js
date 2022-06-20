var playAgain = document.getElementById('playAgain');
var resetScoreboard = document.getElementById('resetHighscore');
var olTag = document.getElementById("scorePage")

var scoreboard = JSON.parse(localStorage.getItem("playerHighscore"));


function printScore(){

    var lastScore = JSON.parse(localStorage.getItem("playerHighscore"));
    console.log(lastScore.length);
    for (var i = 0; i < lastScore.length; i++){
        var thisScore = lastScore[i];
        var liTag = document.createElement("li");
        liTag.textContent = thisScore.name + " - " + thisScore.score;            liTag.setAttribute("data-index",i);
        olTag.appendChild(liTag);
        console.log(i);
        };
};

playAgain.addEventListener("click",function(event){
    event.preventDefault();
    window.location.href = "index.html"
    //hides endgame div
    endGame.setAttribute("class","hide");
    //resets the question index
    currentQuestionIndex = 0;
    //resets the timer
    time =50;
    //starts the quiz again
    quizStart();
  })

resetScoreboard.addEventListener("click",function(event){
    event.preventDefault();
    olTag.innerHTML="";
    localStorage.clear();

  })

function init(){
    printScore();
    console.log("hello");
}


init();