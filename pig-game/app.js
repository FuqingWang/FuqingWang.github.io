/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- The player loses his ENTIRE score when he rolls two 6 in a row. After that it's the next player's turn.
*/

var point, dice, roundscore, activePlayer, totalScore, gamePlaying, winscore, bot, ruleBox;

// new game
init();
document.querySelector(".btn-new").addEventListener("click", init);

// view game rules
var modal = document.querySelector(".infoBox");
document.querySelector(".btn-info").addEventListener("click", function(){
    modal.style.display = "block";
});

// close game rules

document.querySelector(".btn-close").addEventListener("click", function(){
    modal.style.display = "none";
});

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// start game with friend
document.querySelector(".btn-start").addEventListener("click", function(){
    setup();
    bot = false;
});

// start game with bot
document.querySelector(".btn-bot").addEventListener("click", function(){
    setup();
    bot = true;
});

// jigoku mode


// roll
function roll(){
    // check if a win situation has happened
    if(gamePlaying){
        // roll number
        point = Math.floor(Math.random()*6 + 1);
        
        // display result
        document.querySelector(".dice").style.display = "block";
        dice = document.querySelector(".dice");
        dice.src = "dice-" + point + ".png";

        // update score
        if(point !== 1){
            roundscore += point;
            document.getElementById("current-" + activePlayer).textContent = roundscore;
        }else{
            togglePlayer();
        }
    }
};

document.querySelector(".btn-roll").addEventListener("click", function(){
    roll();
});

// hold
function hold(){
    // check if a win situation has happened
    if(gamePlaying){
        totalScore[activePlayer] += roundscore;
        document.getElementById("score-" + activePlayer).textContent = totalScore[activePlayer];

        win();
        togglePlayer();
    }
}

document.querySelector(".btn-hold").addEventListener("click", function(){
    hold();
});

// toggle player and ui
function togglePlayer(){
    // check if a win situation has happened
    if(gamePlaying){
        roundscore = 0;
        document.getElementById("current-" + activePlayer).textContent = roundscore;
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        document.querySelector(".player-0-panel").classList.toggle("active");
        document.querySelector(".player-1-panel").classList.toggle("active");
        
    }
}

// determine if a player won
function win(){
    if(totalScore[activePlayer] >= winscore){
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        document.getElementById("name-" + activePlayer).textContent = "Winner!";
        gamePlaying = false;
    }
}

//set up score, etc
function setup(){
    document.querySelector(".win-score").disabled = true;
    var input = document.querySelector(".win-score").value;
    if(input){
        winscore = input;
    }else{
        winscore = 100;
    }
}

//initialize game
function init(){
    document.querySelector(".win-score").disabled = false;
    document.querySelector(".win-score").value = "set win score";
    gamePlaying = true;
    roundscore = 0;
    activePlayer = 0;
    totalScore = [0,0];
    document.querySelector(".dice").style.display = "none";
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("name-0").textContent = "PLAYER 1";
    document.getElementById("name-1").textContent = "PLAYER 2";
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.add("active");
}