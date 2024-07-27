var selectedColor = "rgb(255, 238, 107)";
var unselectedColor = "rgb(255, 255, 255)";
var canSubmit = false;

//Roll (or reroll) all dice
async function rollAll() {
    canSubmit = true;
    button = document.getElementById("roll-button");
    if (button.innerHTML == "<b>Reroll</b>") {
        reroll();
    }
    else {
        await callWithoutParam("roll");
        displayDice([0, 1, 2, 3, 4]);
        button.innerHTML = "<b>Reroll</b>";
        document.getElementById("instructions").style.visibility = "visible";
    }
    
}

//Reroll selected die
async function reroll() {
    //Check which die are selected
    diceSelected = false;
    const diceToReroll = []; 
    var rerolls = await callWithoutParam("getRerolls");
    if(rerolls < 3){
        for (var i = 1; i < 6; i ++) {
            if (document.getElementById("die" + i).style.backgroundColor == selectedColor) {
                diceToReroll.push(i - 1);
                select(document.getElementById("die" + i));
                diceSelected = true;
            }
        }
        
        //Display instructions
        var instructionBox = document.getElementById("instructions");
        if(!diceSelected) {
            instructionBox.innerHTML = "Select a dice first to reroll!";
        }
        else {  
            //Reroll die
            var rerolled = await callWithParam("reroll", diceToReroll);
            if (rerolled) {
                displayDice(diceToReroll);
            }
            rerolls = await callWithoutParam("getRerolls");
            instructionBox.innerHTML = "Rerolls Left: " + (3 - rerolls) + "<br>" + 
            "Click a dice to select it for a reroll and click \"Reroll\" <br>OR<br> Select a score box to submit a score";
            
        }
        
    }

}

//Change innerHTML of die to show number n
function showNDie(die, n) {
    if (n == 1) {
        die.innerHTML = "<div class=\"middle\"><div class=\"dot\"></div></div>";
    }
    else if (n == 2) {
        die.innerHTML = "<div class=\"top-left\"><div class=\"dot\"></div></div>" + 
                        "<div class=\"bottom-right\"><div class=\"dot\"></div></div>";
    }
    else if (n == 3) {
        die.innerHTML = "<div class=\"top-left\"><div class=\"dot\"></div></div>" + 
                        "<div class=\"bottom-right\"><div class=\"dot\"></div></div>" + 
                        "<div class=\"middle\"><div class=\"dot\"></div></div>" ;
    }
    else if (n == 4) {
        die.innerHTML = "<div class=\"top-left\"><div class=\"dot\"></div></div>" + 
                        "<div class=\"top-right\"><div class=\"dot\"></div></div>" + 
                        "<div class=\"bottom-left\"><div class=\"dot\"></div></div>" +
                        "<div class=\"bottom-right\"><div class=\"dot\"></div></div>" ;
    }
    else if (n == 5) {
        die.innerHTML = "<div class=\"top-left\"><div class=\"dot\"></div></div>" + 
                        "<div class=\"top-right\"><div class=\"dot\"></div></div>" + 
                        "<div class=\"bottom-left\"><div class=\"dot\"></div></div>" +
                        "<div class=\"bottom-right\"><div class=\"dot\"></div></div>" +
                        "<div class=\"middle\"><div class=\"dot\"></div></div>" ;
    }
    else if (n==6){
        die.innerHTML = "<div class=\"top-left\"><div class=\"dot\"></div></div>" + 
                        "<div class=\"top-right\"><div class=\"dot\"></div></div>" + 
                        "<div class=\"bottom-left\"><div class=\"dot\"></div></div>" +
                        "<div class=\"bottom-right\"><div class=\"dot\"></div></div>" +
                        "<div class=\"middle-right\"><div class=\"dot\"></div></div>" +
                        "<div class=\"middle-left\"><div class=\"dot\"></div></div>" ;
    }

}

//Show rolling animation and set dice face to n
function showRoll(die, n) {
    var i = 0;
    var roller = setInterval(() => {
        i ++;
        showNDie(die, Math.floor(Math.random() * 6) + 1);
        if (i > 15) {
            showNDie(die, n);
            clearInterval(roller);
        }
    }, 50);
    
}

async function displayDice(dice) {
    var gameDice = await callWithoutParam("getDice");
    for (let i = 0; i < dice.length; i++) {
        n = dice[i];
        showRoll(document.getElementById("die" + (n + 1)),  gameDice[n]); 
    }
    calculatePossibleScore();
}

//Change the selection of die
function select(die) {
    if (document.getElementById("roll-button").innerHTML == "<b>Roll</b>") {
        return;
    }
    else {
        //Check if die is selected
        if (die.style.backgroundColor == unselectedColor || die.style.backgroundColor == "") {
            die.style.backgroundColor = selectedColor;
        }
        else {
            die.style.backgroundColor = unselectedColor;
        }
    }
}

async function submitScore(category) {
    if (canSubmit) {

        //Check if score can be submitted to
        if (document.getElementById(category).style.backgroundColor == 'rgb(240, 222, 85)') {
            return;
        }

        //Get dice values and calculate score
        var newScore = await callWithParam("calculateScore", category); 
        await addScore(newScore, category); //Update score

        //Update score and score display
        document.getElementById(category).innerHTML = newScore;
        document.getElementById(category).style.color = 'rgb(0,0,0)'; 
        document.getElementById(category).style.backgroundColor = '#F0DE55';
        remove_possible_calculation();
        resetBoard();

        //Check if all scores have been submitted
        if(document.getElementById("aces-score").innerHTML !== "" && document.getElementById("twos-score").innerHTML !== "" && document.getElementById("threes-score").innerHTML !== "" && document.getElementById("fours-score").innerHTML !== "" && 
            document.getElementById("fives-score").innerHTML !== "" && document.getElementById("sixes-score").innerHTML !== "" && document.getElementById("three-of-a-kind-score").innerHTML !== "" && document.getElementById("four-of-a-kind-score").innerHTML !== "" && 
            document.getElementById("yahtzee-score").innerHTML !== "" && document.getElementById("sm-straight-score").innerHTML !== "" && document.getElementById("lg-straight-score").innerHTML !== "" && 
            document.getElementById("full-house-score").innerHTML !== "" && document.getElementById("chance-score").innerHTML !== ""){
            endGame();
        }
    }
}

//Reset board objects for next turn
function resetBoard() {
    //Reset instructions
    instructionBox = document.getElementById("instructions");
    instructionBox.style.visibility = "hidden";
    instructionBox.innerHTML = "Click a dice to select it for a reroll and click \"Reroll\" <br>OR<br> Select a score box to submit a score";
    
    //Reset button
    document.getElementById("roll-button").innerHTML = "<b>Roll</b>";

    //Reset dice
    for (var i = 1; i < 6; i ++) {
        document.getElementById("die" + i).style.backgroundColor = unselectedColor;
    }

    canSubmit = false;
}

//Ends the current game
async function endGame() {

    //Display final scores
    var bonus = await callWithoutParam("getBonus");
    var upperScore = await callWithoutParam("getUpperScore");
    var lowerScore = await callWithoutParam("getLowerScore");
    document.getElementById("upper-subtotal-score").innerHTML = upperScore;
    document.getElementById("upper-bonus-score").innerHTML = bonus;
    document.getElementById("upper-total-score").innerHTML = upperScore + bonus;
    document.getElementById("lower-total-score").innerHTML = lowerScore;
    document.getElementById("total-score").innerHTML = upperScore + lowerScore + bonus;

    //Hide dice board
    document.getElementById("dice-board").innerHTML = "<h1 style=\"font-size: 60px\">CONGRADULATIONS!</h1>" +
        "<h2 id=\"score\">You scored " + document.getElementById("total-score").innerHTML + " points!</h2>" +
        "<a href = \"game_board.html\"><button class=\"play-button\"><b>Play Again</b></button></a> <br><br>";

   // Get player name from the session
   var session = await callWithoutParam("getSession");
   var playerName = session.username;
   
   // Check if playerName is valid
   if (!playerName) {
       console.error("Player name not found in session.");
       return;
   }
   // Calculate total score
   var totalScore = bonus + lowerScore + upperScore;
   
   // Add score to leaderboard
   await addToFinalScore(playerName, totalScore);

    //Clear session
    await callWithoutParam("resetGame");

    // Display leaderboard
    const leaderboardIframe = document.createElement("iframe");
    leaderboardIframe.src = "leaderboard.html";
    document.getElementById("dice-board").appendChild(leaderboardIframe);
}

const upperScores = ["aces-score", "twos-score", "threes-score", "fours-score", "fives-score", "sixes-score"];
const lowerScores = ["chance-score", "three-of-a-kind-score", "four-of-a-kind-score", "yahtzee-score", "sm-straight-score", "lg-straight-score", "full-house-score"];
const scores = upperScores.concat(lowerScores);  

// Function after rolling, the gray text should become blank again 
function remove_possible_calculation(){
    scores.forEach(score => {
        element = document.getElementById(score);
        if (element.style.color === 'rgb(128, 128, 128)') {
            element.innerHTML = "";
        }
    });
}

//Calculates possible scores for each category after each roll
async function calculatePossibleScore(){
    for (var category of scores) {
        if(document.getElementById(category).innerHTML === "" || document.getElementById(category).style.color === 'rgb(128, 128, 128)') {
            var score = await callWithParam("calculateScore", category); 
            document.getElementById(category).innerHTML = score;
            document.getElementById(category).style.color = 'rgb(128, 128, 128)';
        }
    }

}

window.onload = function() {

    for (var i = 1; i < 6; i ++) {
        showNDie(document.getElementById("die" + i), 6);
    }
    
};
