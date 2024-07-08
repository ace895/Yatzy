
const upperScores = ["aces-score", "twos-score", "threes-score", "fours-score", "fives-score", "sixes-score"];
const lowerScores = ["chance-score", "three-of-a-kind-score", "four-of-a-kind-score", "yahtzee-score", "sm-straight-score", "lg-straight-score", "full-house-score"];
const scores = upperScores.concat(lowerScores);  // Correct concatenation in JS

// Function after 2 rolls, the gray text should become blank again 
//Stay in JS
function remove_possible_calculation(){
    scores.forEach(score => {
        element = document.getElementById(score);
        if (element.style.color === 'rgb(128, 128, 128)') {
            element.innerHTML = "";
        }
    });
}

//Calculates possible scores for each category after each roll
//Stay in JS
function calculatePossibleScore(dice){
    for (var category of scores) {
        if(document.getElementById(category).innerHTML === "" || document.getElementById(category).style.color === 'rgb(128, 128, 128)') {
            document.getElementById(category).innerHTML = calculateScore(dice, category); /**Calculate score for given category **/
            document.getElementById(category).style.color = 'rgb(128, 128, 128)';
        }
    }

}
