
<?php
$html = file_get_contents('game_board.html');
$dom = new DOMDocument;
libxml_use_internal_errors(true);
$dom->loadHTML($html);
libxml_clear_errors();
$upperScores = ["aces-score", "twos-score", "threes-score", "fours-score", "fives-score", "sixes-score"];
$lowerScores = ["chance-score", "three-of-a-kind-score", "four-of-a-kind-score", "yahtzee-score", "sm-straight-score", "lg-straight-score", "full-house-score"];
$scores = $upperScores.concat($lowerScores);

//Category is which spot the player is going to add to their table 

function calculateScore($dice, $category){
    $one = count_dice($dice, 1);
    $two = count_dice($dice, 2);
    $three = count_dice($dice, 3);
    $four = count_dice($dice, 4);
    $five = count_dice($dice, 5);
    $six = count_dice($dice,6);
    $amount = [$one,$two,$three,$four,$five,$six]; 

    if($category === "aces-score"){
        return $one * 1;
    }else if($category === "twos-score"){
        return $two * 2; 
    }else if($category === "threes-score"){
        return $three * 3; 
    }else if($category === "fours-score"){
        return $four * 4; 
    }else if($category === "fives-score"){
        return $five * 5; 
    }else if($category === "sixes-score"){
        return $six * 6; 
    }else if($category === "chance-score"){
        return calculate_chance($dice);
    }else if($category === "three-of-a-kind-score"){
        return calculate_3OfAKind($amount);
    }else if($category === "four-of-a-kind-score"){
        return calculate_4OfAKind($amount);
    }else if($category === "yahtzee-score"){
        return calculate_yahtzee($amount);
    }else if($category === "sm-straight-score"){
        return calculate_smallStraight($one,$two,$three,$four,$five,$six);
    }else if($category === "lg-straight-score"){
        return calculate_largeStraight($one,$two,$three,$four,$five,$six);
    }else if($category === "full-house-score"){
        return calculate_fullHouse($one,$two,$three,$four,$five,$six);
    }else{
        return null; 
    }
}

function getUpperScore() {
    $upper_score = 0;
    foreach($upperScores as $score) {
        $upper_score += (int)$dom->getElementsByTagName($score).innerHTML;
    }
    return $upper_score;

}

function getBonus() {
    if (getUpperScore() >= 63) {
        return 35;
    } else {
        return 0;
    }

}

function getLowerScore() {
    $lower_score = 0;
    foreach($lowerScores as $score){
        $lower_score += (int)$dom->getElementsByTagName($score).innerHTML;
    }
    return $lower_score;

}
?>

<script>
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
</script> 

<?php
function count_dice($dice, $value){
    //gives us the number of each side of the dices 
    $num = 0; 
    //See how much we have eac dice 
    for($i = 0; $i < 5; $i++){
        if($dice[$i] == $value){
            $num++; 
        } 
    }
    return $num; 
}
function calculate_chance($dice){
    $chance = 0;  
    for($i = 0; $i < 5; $i++){
        $chance += $dice[$i];
    }
    return $chance; 
}
function calculate_3OfAKind($amount){
    $is3OfAKind = false;
    $total = 0;
    for($i = 0; $i < sizeof($amount); $i++){
        $total += $amount[$i]*($i + 1);
        if($amount[$i] >= 3){
            $is3OfAKind = true;
        }
    }
    return $is3OfAKind ? $total : 0;
}
function calculate_4OfAKind($amount){
    $is4OfAKind = false;
    $total = 0;
    for($i = 0; $i < sizeof($amount); $i++){
        $total += $amount[$i]*($i + 1);
        if($amount[$i] >= 4){
            $is4OfAKind = true;
        }
    }
    return $is4OfAKind ? $total : 0;
}
function calculate_yahtzee($amount){
    for($i = 0; $i < sizeof($amount); $i++){
        if($amount[$i] > 4){
            return 50;
        }
    }
    return 0;
}
function calculate_smallStraight($one,$two,$three,$four,$five,$six){
    if($one >=  1 && $two >=  1 && $three >=  1 && $four >=  1){
        return 30;
    }else if($two >=  1 && $three >=  1 && $four >=  1 && $five >=  1){
        return 30;
    }else if($three >=  1 && $four >=  1 && $five >=  1 && $six >=  1){
        return 30; 
    }else{
        return 0; 
    }
}
function calculate_largeStraight($one,$two,$three,$four,$five,$six){
    if($one >= 1 && $two >= 1 && $three >= 1 && $four >=  1 && $five >=  1){
        return 40;
    }else if($two >=  1 && $three >=  1 && $four >=  1 && $five >=  1 && $six >= 1){
        return 40; 
    }else{
        return 0; 
    }
}
function calculate_fullHouse($one,$two,$three,$four,$five,$six){
    if($one >= 3 && ($two >= 2 || $three >= 2 || $four >= 2 || $five >= 2 || $six >= 2)){
        return 25;
    }else if($two >= 3 && ($one >= 2 || $three >= 2 || $four >= 2 || $five >= 2 || $six >= 2)){
        return 25;
    }else if($three >= 3 && ($one >= 2 || $two >= 2 || $four >= 2 || $five >= 2 || $six >= 2)){
        return 25;
    }else if($four >= 3 && ($one >= 2 || $two >= 2 || $three >= 2 || $five >= 2 || $six >= 2)){
        return 25;
    }else if($five >= 3 && ($one >= 2 || $two >= 2 || $three >= 2 || $four >= 2 || $six >= 2)){
        return 25;
    }else if($six >= 3 && ($one >= 2 || $two >= 2 || $three >= 2 || $four >= 2 || $five >= 2)){
        return 25;
    }else{
        return 0; 
    }
}
?> 

<script>
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
</script> 