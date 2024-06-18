var Dice = {
    history: [],

    dice_roll() {
        const roll = Math.floor(Math.random() * 6) + 1;
        this.history.push(roll);
        return roll;
    },

    multi_dice_roll(num) {
        results = [];
        for (let i = 0; i < num; i++) {
            const roll = Math.floor(Math.random() * 6) + 1;
            results.push(roll);
            this.history.push(roll);
        }
        return results;
    }
};

var Game = {
    dice: new Array(5),
    roll_num: 0,
    rerolls: 0,

    get_roll_num() {
        return this.roll_num;
    },

    get_dice() {
        return this.dice;
    },

    get_rerolls() {
        return this.rerolls;
    },

    //Roll all dice
    roll() {
        this.roll_num ++;
        this.rerolls = 0; //Reset rerolls
        this.dice = Dice.multi_dice_roll(5); //Roll all dice
    },

    //Takes integer array of dice to reroll and rerolls them
    reroll(dice_to_reroll) {
        if (this.rerolls >= 2) {
            return;
        }
        for(var i = 0; i < dice_to_reroll.length; i ++) {
            this.dice[dice_to_reroll[i]] = Dice.dice_roll();
        }
        this.rerolls ++;
    }
}

//Game is the current state 
//Category is which spot the player is going to add to their table 
function calculateScore(dice, category){
    var one = count_dice(dice, 1);
    var two = count_dice(dice, 2);
    var three = count_dice(dice, 3);
    var four = count_dice(dice, 4);
    var five = count_dice(dice, 5);
    var six = count_dice(dice,6);
    const amount = [one,two,three,four,five,six]; 
    console.log(category);
    if(category === "aces-score" && one !== 0 ){
        document.getElementById("aces-score").innerHTML = one * 1;
        document.getElementById("aces-score").style.color = '#000000'; 
    }else if(category === "twos-score" && two !== 0 ){
        document.getElementById("twos-score").innerHTML = two * 2; 
        document.getElementById("twos-score").style.color = '#000000'; 
    }else if(category === "threes-score" && three !== 0 ){
        document.getElementById("threes-score").innerHTML = three * 3; 
        document.getElementById("threes-score").style.color = '#000000'; 
    }else if(category === "fours-score" && four !== 0){
        document.getElementById("fours-score").innerHTML = four * 4; 
        document.getElementById("fours-score").style.color = '#000000'; 
    }else if(category === "fives-score" && five !== 0 ){
        document.getElementById("fives-score").innerHTML = five * 5; 
        document.getElementById("fives-score").style.color = '#000000';
    }else if(category === "sixes-score" && six !== 0 ){
        document.getElementById("sixes-score").innerHTML = six * 6; 
        document.getElementById("sixes-score").style.color = '#000000';
    }else if(category === "chance-score" ){
        const chance = calculate_chance(dice);
        document.getElementById("chance-score").innerHTML = chance;
        document.getElementById("chance-score").style.color = '#000000';
    }else if(category === "three-of-a-kind-score"){
        kind3 = calculate_3OfAKind(amount);
        document.getElementById("three-of-a-kind-score").innerHTML = kind3;
        document.getElementById("three-of-a-kind-score").style.color = '#000000';

    }else if(category === "four-of-a-kind-score"){
        kind4 = calculate_4OfAKind(amount);
        document.getElementById("four-of-a-kind-score").innerHTML = kind4;
        document.getElementById("four-of-a-kind-score").style.color = '#000000'; 
    }else if(category === "yahtzee-score"){
        yahtzee = calculate_yahtzee(amount);
        document.getElementById("yahtzee-score").innerHTML = yahtzee;
        document.getElementById("yahtzee-score").style.color = '#000000';
    }else if(category === "sm-straight-score" ){
        sm = calculate_smallStraight(one,two,three,four,five,six);
        if(sm === 30){
            document.getElementById("sm-straight-score").innerHTML = 30;
            document.getElementById("sm-straight-score").style.color = '#000000';
        }else{
            document.getElementById("sm-straight-score").innerHTML = 0;
            document.getElementById("sm-straight-score").style.color = '#000000';
        }
    }else if(category === "lg-straight-score"){
        lg = calculate_largeStraight(one,two,three,four,five,six);
        if(lg === 40){
            document.getElementById("lg-straight-score").innerHTML = 40;
            document.getElementById("lg-straight-score").style.color = '#000000';
        }else {
            document.getElementById("lg-straight-score").innerHTML = 0;
            document.getElementById("lg-straight-score").style.color = '#000000';
        }
    }else if(category === "full-house-score" ){
        full_house = calculate_fullHouse(one,two,three,four,five,six);
        if (full_house === 25){
            document.getElementById("full-house-score").innerHTML = 25;
            document.getElementById("full-house-score").style.color = '#000000';
        }else{
            document.getElementById("full-house-score").innerHTML = 0;
            document.getElementById("full-house-score").style.color = '#000000';
        }
    }else{
        //if none of them is null, then the game has ended
        updateOverallScore();
        return;  
    }
    remove_possible_calculation(); 
}
function updateOverallScore(){
    const upperScores = ["aces-score", "twos-score", "threes-score", "fours-score", "fives-score", "sixes-score"];
    let upper_score = 0;

    for (const score of upperScores) {
        upper_score += parseInt(document.getElementById(score).innerHTML || 0);
    }
    
    document.getElementById("upper-subtotal-score").innerHTML = upper_score;
    if (upper_score >= 63) {
        document.getElementById("upper-bonus-score").innerHTML = 35;
        upper_score += 35;
    } else {
        document.getElementById("upper-bonus-score").innerHTML = 0;
    }
    document.getElementById("upper-total-score").innerHTML = upper_score;

    const lowerScores = ["chance-score", "three-of-a-kind-score", "four-of-a-kind-score", "yahtzee-score", "sm-straight-score", "lg-straight-score", "full-house-score"];
    let lower_score = 0;

    for (const score of lowerScores) {
        lower_score += parseInt(document.getElementById(score).innerHTML || 0);
    }
    
    document.getElementById("lower-total-score").innerHTML = lower_score;
    document.getElementById("total-score").innerHTML = upper_score + lower_score;
}
//This function should always be called after the dice is rolled 
//to find the different categories, probably will make them into functions so that when i do calculatescore, its easier too and it can be use again 
function calculatePossibleScore(dice){
    var one = count_dice(dice, 1);
    var two = count_dice(dice, 2);
    var three = count_dice(dice, 3);
    var four = count_dice(dice, 4);
    var five = count_dice(dice, 5);
    var six = count_dice(dice,6);
    var chance = calculate_chance(dice);
    if(document.getElementById("chance-score").innerHTML === "" || document.getElementById("chance-score").style.color === 'rgb(128, 128, 128)'){
        document.getElementById("chance-score").innerHTML = chance;
        document.getElementById("chance-score").style.color = 'rgb(128, 128, 128)';
    }
    if(document.getElementById("aces-score").innerHTML === "" ||  document.getElementById("aces-score").style.color === 'rgb(128, 128, 128)'){
        document.getElementById("aces-score").innerHTML = one * 1;
        document.getElementById("aces-score").style.color = 'rgb(128, 128, 128)'; 
    }if(document.getElementById("twos-score").innerHTML === "" || document.getElementById("twos-score").style.color === 'rgb(128, 128, 128)'){
        document.getElementById("twos-score").innerHTML = two * 2; 
        document.getElementById("twos-score").style.color = 'rgb(128, 128, 128)';
    }if(document.getElementById("threes-score").innerHTML === "" || document.getElementById("threes-score").style.color === 'rgb(128, 128, 128)'){
        document.getElementById("threes-score").innerHTML = three * 3; 
        document.getElementById("threes-score").style.color = 'rgb(128, 128, 128)';
    }if(document.getElementById("fours-score").innerHTML === "" || document.getElementById("fours-score").style.color === 'rgb(128, 128, 128)'){
        document.getElementById("fours-score").innerHTML = four * 4; 
        document.getElementById("fours-score").style.color = 'rgb(128, 128, 128)';
    }if(document.getElementById("fives-score").innerHTML === "" || document.getElementById("fives-score").style.color === 'rgb(128, 128, 128)'){
        document.getElementById("fives-score").innerHTML = five * 5; 
        document.getElementById("fives-score").style.color = 'rgb(128, 128, 128)';
    }if(document.getElementById("sixes-score").innerHTML === "" || document.getElementById("sixes-score").style.color === 'rgb(128, 128, 128)'){
        document.getElementById("sixes-score").innerHTML = six * 6; 
        document.getElementById("sixes-score").style.color = 'rgb(128, 128, 128)';
    }
    const amount = [one,two,three,four,five,six]; 
    kind3 = calculate_3OfAKind(amount);
    kind4 = calculate_4OfAKind(amount); 
    yahtzee = calculate_yahtzee(amount);
    if(document.getElementById("three-of-a-kind-score").innerHTML === "" || document.getElementById("three-of-a-kind-score").style.color ==='rgb(128, 128, 128)'){
        document.getElementById("three-of-a-kind-score").innerHTML = kind3;
        document.getElementById("three-of-a-kind-score").style.color = 'rgb(128, 128, 128)';
    }
    if(document.getElementById("four-of-a-kind-score").innerHTML === "" || document.getElementById("four-of-a-kind-score").style.color === 'rgb(128, 128, 128)'){
        document.getElementById("four-of-a-kind-score").innerHTML = kind4;
        document.getElementById("four-of-a-kind-score").style.color = 'rgb(128, 128, 128)'; 
    }
    if(document.getElementById("yahtzee-score").innerHTML === "" ||  document.getElementById("yahtzee-score").style.color === 'rgb(128, 128, 128)'){
        document.getElementById("yahtzee-score").innerHTML = yahtzee;
        document.getElementById("yahtzee-score").style.color = 'rgb(128, 128, 128)';
    }
    //small straight 
    if(document.getElementById("sm-straight-score").innerHTML === "" || document.getElementById("sm-straight-score").style.color === 'rgb(128, 128, 128)'){
        sm = calculate_smallStraight(one,two,three,four,five,six);
        console.log(one +  " "+ two + " " + three + " " + four + " " + five + " " + six);
        console.log(sm);
        if(sm === 30){
            document.getElementById("sm-straight-score").innerHTML = 30;
            document.getElementById("sm-straight-score").style.color = 'rgb(128, 128, 128)';
        }else{
            document.getElementById("sm-straight-score").innerHTML = 0;
            document.getElementById("sm-straight-score").style.color = 'rgb(128, 128, 128)';
        }
    }   
    //large straight
    if(document.getElementById("lg-straight-score").innerHTML === "" || document.getElementById("lg-straight-score").style.color === 'rgb(128, 128, 128)'){
        lg = calculate_largeStraight(one,two,three,four,five,six);
        if(lg === 40){
            document.getElementById("lg-straight-score").innerHTML = 40;
            document.getElementById("lg-straight-score").style.color = 'rgb(128, 128, 128)';
        }else{
            document.getElementById("lg-straight-score").innerHTML = 0;
            document.getElementById("lg-straight-score").style.color = 'rgb(128, 128, 128)';
        }
    }
    //Full house 
    if(document.getElementById("full-house-score").innerHTML === "" || document.getElementById("full-house-score").style.color === 'rgb(128, 128, 128)'){
        full_house = calculate_fullHouse(one,two,three,four,five,six);
        if (full_house === 25){
            document.getElementById("full-house-score").innerHTML = 25;
            document.getElementById("full-house-score").style.color = 'rgb(128, 128, 128)';
        }else{
            document.getElementById("full-house-score").innerHTML = 0;
            document.getElementById("full-house-score").style.color = 'rgb(128, 128, 128)';
        }
    }
    console.log(document.getElementById("chance-score").style.color === 'rgb(128, 128, 128)');
}

function count_dice(dice, value){
     //gives us the number of each side of the dices 
     let num = 0; 
     //See how much we have eac dice 
     for(let i = 0; i < 5; i++){
         if(dice[i] === value){
             num++; 
         } 
     }
     return num; 
}
function calculate_chance(dice){
    chance = 0;  
    for(let i = 0; i < 5; i++){
        chance += dice[i];
    }
    return chance; 
}
function calculate_3OfAKind(amount){
    kind3 = 0; 
    for(let i = 0; i < amount.length; i++){
        if(amount[i] >= 3){
            kind3 = (i + 1)*3;
        }
    }
    return kind3;
}
function calculate_4OfAKind(amount){
    kind4 = 0; 
    for(let i = 0; i < amount.length; i++){
        if(amount[i] >= 4){
            kind4 = (i + 1)*4;
        }
    }
    return kind4; 
}
function calculate_yahtzee(amount){
    yahtzee = 0; 
    for(let i = 0; i < amount.length; i++){
        if(amount[i] > 4){
            yahtzee = (i + 1)*4;
        }
    }
    return yahtzee; 
}
function calculate_smallStraight(one,two,three,four,five,six){
    if(one >=  1 && two >=  1 && three >=  1 && four >=  1){
        return 30;
    }else if(two >=  1 && three >=  1 && four >=  1 && five >=  1){
        return 30;
    }else if(three >=  1 && four >=  1 && five >=  1 && six >=  1){
        return 30; 
    }else{
        return 0; 
    }
}
function calculate_largeStraight(one,two,three,four,five,six){
    if(one >= 1 && two >= 1 && three >= 1 && four >=  1 && five >=  1){
        return 40;
    }else if(two >=  1 && three >=  1 && four >=  1 && five >=  1 && six >= 1){
        return 40; 
    }else{
        return 0; 
    }
}
function calculate_fullHouse(one,two,three,four,five,six){
    if(one >= 3){
        if(two >= 2 || three >= 2 || four >= 2 || five >= 2 || six >= 2){
            return 25; 
        }
    }else if(two >= 3){
        if(one >= 2 || three >= 2 || four >= 2 || five >= 2 || six >= 2){
            return 25;
        }
    }else if(three >= 3){
        if(one >= 2 || two >= 2 || four >= 2 || five >= 2 || six >= 2){
            return 25;
        }
    }else if(four >= 3){
        if(one >= 2 || two >= 2 || three >= 2 || five >= 2 || six >= 2){
            return 25;
        }
    }else if(five >= 3){
        if(one >= 2 || two >= 2 || three >= 2 || four >= 2 || six >= 2){
            return 25;
        }
    }else if(six >= 3){
        if(one >= 2 || two >= 2 || three >= 2 || four >= 2 || five >= 2){
            return 25; 
        }
    }else{
        return 0; 
    }
}
// Function after 2 rolls, the gray text should become blank again 
function remove_possible_calculation(){
    const scores = ["aces-score", "twos-score", "threes-score", "fours-score", "fives-score", "sixes-score", "chance-score", "three-of-a-kind-score", "four-of-a-kind-score", "yahtzee-score", "sm-straight-score", "lg-straight-score", "full-house-score"];
    scores.forEach(score => {
        element = document.getElementById(score);
        if (element.style.color === 'rgb(128, 128, 128)') {
            element.innerHTML = "";
        }
    });
}