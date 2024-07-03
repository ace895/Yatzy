var selectedColor = "rgb(255, 238, 107)";
var unselectedColor = "rgb(255, 255, 255)";
var canSubmit = false;

//Roll (or reroll) all dice
function rollAll() {
    canSubmit = true;
    button = document.getElementById("roll-button");
    if (button.innerHTML == "<b>Reroll</b>") {
        reroll();
    }
    else {
        Game.roll();
        displayDice([0, 1, 2, 3, 4]);
        button.innerHTML = "<b>Reroll</b>";
        document.getElementById("instructions").style.visibility = "visible";
    }
    
}

//Reroll selected die
function reroll() {
    //Check which die are selected
    diceSelected = false;
    const diceToReroll = []; 
    if(Game.rerolls >= 3){
        
    }else{
        if (document.getElementById("die1").style.backgroundColor == selectedColor) {
            diceToReroll.push(0);
            select(document.getElementById("die1"));
            diceSelected = true;
        }
        if (document.getElementById("die2").style.backgroundColor == selectedColor) {
            diceToReroll.push(1);
            select(document.getElementById("die2"));
            diceSelected = true;
        }
        if (document.getElementById("die3").style.backgroundColor == selectedColor) {
            diceToReroll.push(2);
            select(document.getElementById("die3"));
            diceSelected = true;
        }
        if (document.getElementById("die4").style.backgroundColor == selectedColor) {
            diceToReroll.push(3);
            select(document.getElementById("die4"));
            diceSelected = true;
        }
        if (document.getElementById("die5").style.backgroundColor == selectedColor) {
            diceToReroll.push(4);
            select(document.getElementById("die5"));
            diceSelected = true;
        }
        
        //Display instructions
        var instructionBox = document.getElementById("instructions");
        if(!diceSelected) {
            instructionBox.innerHTML = "Select a dice first to reroll!";
        }
        else {  
            //Reroll die
            Game.reroll(diceToReroll);
            displayDice(diceToReroll);
            
            instructionBox.innerHTML = "Rerolls Left: " + (3 - Game.rerolls) + "<br>" + 
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

function displayDice(dice) {
    for (let i = 0; i < dice.length; i++) {
        n = dice[i];
        showRoll(document.getElementById("die" + (n + 1)),  Game.dice[n]);
    }
    calculatePossibleScore(Game.dice);
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

function submitScore(Category) {
    if (canSubmit) {
        //Get dice values and calculate score
        var able_to_accept = calculateScore(Game.dice, Category);
        //see if they can keep going or not 
        if(able_to_accept){
            remove_possible_calculation(); 
            resetBoard();
        }else{
            return;
        }
        if(document.getElementById("aces-score").innerHTML !== "" && document.getElementById("twos-score").innerHTML !== "" && document.getElementById("threes-score").innerHTML !== "" && document.getElementById("fours-score").innerHTML !== "" && 
            document.getElementById("fives-score").innerHTML !== "" && document.getElementById("sixes-score").innerHTML !== "" && document.getElementById("three-of-a-kind-score").innerHTML !== "" && document.getElementById("four-of-a-kind-score").innerHTML !== "" && 
            document.getElementById("yahtzee-score").innerHTML !== "" && document.getElementById("sm-straight-score").innerHTML !== "" && document.getElementById("lg-straight-score").innerHTML !== "" && document.getElementById("full-house-score").innerHTML !== "" && document.getElementById("chance-score").innerHTML !== ""){
            updateOverallScore(); 
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
    document.getElementById("die1").style.backgroundColor = unselectedColor;
    document.getElementById("die2").style.backgroundColor = unselectedColor;
    document.getElementById("die3").style.backgroundColor = unselectedColor;
    document.getElementById("die4").style.backgroundColor = unselectedColor;
    document.getElementById("die5").style.backgroundColor = unselectedColor;

    canSubmit = false;
}

//Ends the current game
function endGame() {
    //Hide dice board
    document.getElementById("dice-board").innerHTML = "<h1>CONGRADULATIONS!</h1>" +
        "<h2 id=\"score\">You scored " + document.getElementById("total-score").innerHTML + " points!</h2>" +
        "<a href = \"game_board.html\"><button class=\"play-button\"><b>Play Again</b></button></a> ";        
    document.getElementById("end-board").style.visibility = "visible";
}

window.onload = function() {
    
    showNDie(document.getElementById('die1'), 6);
    showNDie(document.getElementById('die2'), 6);
    showNDie(document.getElementById('die3'), 6);
    showNDie(document.getElementById('die4'), 6);
    showNDie(document.getElementById('die5'), 6);
    
};