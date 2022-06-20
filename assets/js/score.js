var playAgain = document.getElementById('playAgain');
var resetScoreboard = document.getElementById('resetHighscore');
var olTag = document.getElementById("scorePage")

var scoreboard = JSON.parse(localStorage.getItem("playerHighscore"));


function printScore(){

    var lastScore = JSON.parse(localStorage.getItem("playerHighscore"));
    //creates a score for each array in the local storage
    for (var i = 0; i < lastScore.length; i++){
        var thisScore = lastScore[i];
        var liTag = document.createElement("li");
        liTag.textContent = thisScore.name + " - " + thisScore.score;            
        liTag.setAttribute("data-index",i);
        olTag.appendChild(liTag);
        console.log(i);
        };
};


//play again button
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

//wiping scoreboard

resetScoreboard.addEventListener("click",function(event){
    //stops default button
    event.preventDefault();
    //clears all children from ol element
    olTag.innerHTML="";
    //clears the local storage
    localStorage.clear();

})


//to be run on page load
function init(){
    //prints score
    printScore();
}


init();