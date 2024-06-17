//Game is the current state 
//Category is which spot the player is going to add to their table 
function calculateScore(dice, category){
    var one,two,three,four,five,six = count_dice(dice);
    const amount = [one,two,three,four,five,six];
    if(category === "aces-score" && one !== 0 && document.getElementById("aces-score") === null){
        document.getElementById("aces-score").innerHTML = one * 1;
        document.getElementById("aces-score").style.color = '#000000'; 
    }else if(category === "twos-score" && two !== 0 && document.getElementById("twos-score") === null){
        document.getElementById("twos-score").innerHTML = two * 2; 
        document.getElementById("twos-score").style.color = '#000000'; 
    }else if(category === "threes-score" && three !== 0 && document.getElementById("threes-score") === null){
        document.getElementById("threes-score").innerHTML = three * 3; 
        document.getElementById("threes-score").style.color = '#000000'; 
    }else if(category === "fours-score" && four !== 0  && document.getElementById("fours-score") === null){
        document.getElementById("fours-score").innerHTML = four * 4; 
        document.getElementById("fours-score").style.color = '#000000'; 
    }else if(category === "fives-score" && five !== 0 && document.getElementById("fives-score") === null){
        document.getElementById("fives-score").innerHTML = five * 5; 
        document.getElementById("fives-score").style.color = '#000000';
    }else if(category === "sixes-score" && six !== 0 && document.getElementById("sixes-score") === null){
        document.getElementById("sixes-score").innerHTML = six * 6; 
        document.getElementById("sixes-score").style.color = '#000000';
    }else if(category === "chance-score" && document.getElementById("chance-score") === null){
        const chance = calculate_chance(dice);
        document.getElementById("chance-score").innerHTML = chance;
        document.getElementById("chance-score").style.color = '#000000';
    }else if(category === "three-of-a-kind-score" && document.getElementById("three-of-a-kind-score") === null){
        kind3 = calculate_3OfAKind(amount);
        document.getElementById("three-of-a-kind-score").innerHTML = kind3;
        document.getElementById("three-of-a-kind-score").style.color = '#000000';

    }else if(category === "four-of-a-kind-score" && document.getElementById("four-of-a-kind-score") === null){
        kind4 = calculate_4OfAKind(amount);
        document.getElementById("four-of-a-kind-score").innerHTML = kind4;
        document.getElementById("four-of-a-kind-score").style.color = '#000000'; 
    }else if(category === "yahtzee-score" && document.getElementById("yahtzee-score") === null){
        yahtzee = calculate_yahtzee(amount);
        document.getElementById("yahtzee-score").innerHTML = yahtzee;
        document.getElementById("yahtzee-score").style.color = '#000000';
    }else if(category === "sm-straight-score" && document.getElementById("sm-straight-score") === null){
        sm = calculate_largeStraight(one,two,three,four,five,six);
        if(sm === 30){
            document.getElementById("sm-straight-score").innerHTML = 30;
            document.getElementById("sm-straight-score").style.color = '#000000';
        }
    }else if(category === "lg-straight-score" && document.getElementById("lg-straight-score") === null){
        lg = calculate_largeStraight(one,two,three,four,five,six);
        if(lg === 40){
            document.getElementById("lg-straight-score").innerHTML = 40;
            document.getElementById("lg-straight-score").style.color = '#000000';
        }
    }else if(category === "full-house-score" && document.getElementById("full-house-score") === null){
        full_house = calculate_fullHouse(one,two,three,four,five,six);
        if (full_house === 25){
            document.getElementById("full-house-score").innerHTML = 25;
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
    var one,two,three,four,five,six = count_dice(dice);
    var chance = calculate_chance(dice);
    if(document.getElementById("chance-score") === null ){
        document.getElementById("chance-score").innerHTML = chance;
        document.getElementById("chance-score").style.color = '#808080';
    }
    if(one !== 0 && document.getElementById("aces-score") === null ){
        document.getElementById("aces-score").innerHTML = one * 1;
        document.getElementById("aces-score").style.color = '#808080'; 
    }if (two !== 0 && document.getElementById("twos-score") === null ){
        document.getElementById("twos-score").innerHTML = two * 2; 
        document.getElementById("twos-score").style.color = '#808080';
    }if (three !== 0 && document.getElementById("threes-score") === null ){
        document.getElementById("threes-score").innerHTML = three * 3; 
        document.getElementById("threes-score").style.color = '#808080';
    }if (four !== 0  && document.getElementById("fours-score") === null){
        document.getElementById("fours-score").innerHTML = four * 4; 
        document.getElementById("fours-score").style.color = '#808080';
    }if (five !== 0 && document.getElementById("fives-score") === null){
        document.getElementById("fives-score").innerHTML = five * 5; 
        document.getElementById("fives-score").style.color = '#808080';
    }if (six !== 0 && document.getElementById("sixes-score") === null){
        document.getElementById("sixes-score").innerHTML = six * 6; 
        document.getElementById("sixes-score").style.color = '#808080';
    }
    const amount = [one,two,three,four,five,six]; 
    kind3 = calculate_3OfAKind(amount);
    kind4 = calculate_4OfAKind(amount); 
    yahtzee = calculate_yahtzee(amount);
    if(document.getElementById("three-of-a-kind-score") === null){
        document.getElementById("three-of-a-kind-score").innerHTML = kind3;
        document.getElementById("three-of-a-kind-score").style.color = '#808080';
    }
    if(document.getElementById("four-of-a-kind-score") === null){
        document.getElementById("four-of-a-kind-score").innerHTML = kind4;
        document.getElementById("four-of-a-kind-score").style.color = '#808080'; 
    }
    if(document.getElementById("yahtzee-score") === null){
        document.getElementById("yahtzee-score").innerHTML = yahtzee;
        document.getElementById("yahtzee-score").style.color = '#808080';
    }
    //small straight 
    if(document.getElementById("sm-straight-score") === null){
        sm = calculate_largeStraight(one,two,three,four,five,six);
        if(sm === 30){
            document.getElementById("sm-straight-score").innerHTML = 30;
            document.getElementById("sm-straight-score").style.color = '#808080';
        }
    }   
    //large straight
    if(document.getElementById("lg-straight-score") === null){
        lg = calculate_largeStraight(one,two,three,four,five,six);
        if(lg === 40){
            document.getElementById("lg-straight-score").innerHTML = 40;
            document.getElementById("lg-straight-score").style.color = '#808080';
        }
    }
    //Full house 
    if(document.getElementById("full-house-score") === null){
        full_house = calculate_fullHouse(one,two,three,four,five,six);
        if (full_house === 25){
            document.getElementById("full-house-score").innerHTML = 25;
            document.getElementById("full-house-score").style.color = '#808080';
        }
    }

}

function count_dice(dice){
     //gives us the number of each side of the dices 
     let one = 0; 
     let two = 0; 
     let three = 0; 
     let four = 0; 
     let five = 0; 
     let six = 0;
     //See how much we have eac dice 
     for(let i = 0; i < 5; i++){
         if(dice[i] === 1){
             one++; 
         } else if (dice[i] === 2){
             two++; 
         } else if (dice[i] === 3){
             three++; 
         } else if (dice[i] === 4){
             four++;
         } else if (dice[i] === 5){
             five++;
         }else{
             six++; 
         }
     }
     return one,two,three,four,five,six; 
}
function calculate_chance(dice){
    const chance = 0;  
    for(let i = 0; i < 5; i++){
        chance += dice[i];
    }
    return chance; 
}
function calculate_3OfAKind(amount){
    const kind3 = 0; 
    for(let i = 0; i < length(amount); i++){
        if(amount[i] > 3){
            kind3 = (i + 1)*3;
        }
    }
    return kind3;
}
function calculate_4OfAKind(amount){
    const kind4 = 0; 
    for(let i = 0; i < length(amount); i++){
        if(amount[i] > 4){
            kind4 = (i + 1)*4;
        }
    }
    return kind4; 
}
function calculate_yahtzee(amount){
    const yahtzee = 0; 
    for(let i = 0; i < length(amount); i++){
        if(amount[i] > 4){
            yahtzee = (i + 1)*4;
        }
    }
    return yahtzee; 
}
function calculate_smallStraight(one,two,three,four,five,six){
    if((one >=  1 && two >=  1 && three >=  1 && four >=  1) || (two >=  1 && three >=  1 && four >=  1 && five >=  1) || (three >=  1 && four >=  1 && five >=  1 && six >=  1)){
        return 30;
    }else{
        return 0; 
    }
}
function calculate_largeStraight(one,two,three,four,five,six){
    if((one >= 1 && two >= 1 && three >= 1 && four >=  1 && five >=  1) || (two >=  1 && three >=  1 && four >=  1 && five >=  1 && six >= 1)){
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
        const element = document.getElementById(score);
        if (element.style.color === '#808080') {
            element.innerHTML = "";
        }
    });
}
