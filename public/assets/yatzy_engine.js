//Game is the current state 
//Category is which spot the player is going to add to their table 
function calculateScore(game, category ){
    const dice = game.this_game.get_dice(); 
    switch (category) {
        case 'ones':
            return dice.filter(die => die === 1).length * 1;
        case 'twos':
            return dice.filter(die => die === 2).length * 2;
        case 'threes':
            return dice.filter(die => die === 3).length * 3;
        case 'fours':
            return dice.filter(die => die === 4).length * 4;
        case 'fives':
            return dice.filter(die => die === 5).length * 5;
        case 'sixes':
            return dice.filter(die => die === 6).length * 6;
    }
}
function updateOverallScore(game){
    const sectionCategories = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];
    let sectionScore = 0;
    for (let category of sectionCategories) {
        if (game.scores[category] !== null) {
            sectionScore += game.scores[category];
        }
    }
    game.sectionScore = sectionScore;
    game.bonus = sectionScore >= 63 ? 35 : 0;
    game.totalScore = sectionScore + game.bonus + Object.values(game.scores).reduce((acc, score) => acc + (score || 0), 0);
}
//This function should always be called after the dice is rolled 
function calculatePossibleScore(dice){
    //gives us the number of each side of the dices 
    const one = 0; 
    const two = 0; 
    const three = 0; 
    const four = 0; 
    const five = 0; 
    const six = 0;
    chance = 0; 
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
        chance += dice[i];
    }
    if(document.getElementById('chance-score') === null ){
        document.getElementById('chance-score').innerHTML() = chance;
        document.getElementById('chance-score').style.color = '#808080';
    }
    //Checks what the player can get 
    // make sure the text is grey since its the real answer 
    if(one !== 0){
        document.getElementsById('aces-score').innerHTML() = one * 1;
        document.getElementById('aces-score').style.color = '#808080'; 
    }if (two !== 0){
        document.getElementsById('twos-score').innerHTML() = two * 2; 
        document.getElementById('twos-score').style.color = '#808080';
    }if (three !== 0){
        document.getElementsById('threes-score').innerHTML() = three * 3; 
        document.getElementById('threes-score').style.color = '#808080';
    }if (four !== 0){
        document.getElementsById('fours-score').innerHTML() = four * 4; 
        document.getElementById('fours-score').style.color = '#808080';
    }if (five !== 0){
        document.getElementsById('fives-score').innerHTML() = five * 5; 
        document.getElementById('fives-score').style.color = '#808080';
    }if (six !== 0){
        document.getElementsById('sixes-score').innerHTML() = six * 6; 
        document.getElementById('sixes-score').style.color = '#808080';
    }
    const amount = [one,two,three,four,five,six]; 
    ofaKind3 = 0; 
    ofaKind4 = 0; 
    yahtzee = 0; 
    for(let i = 0; i < length(amount); i++){
        if(amount[i] > 3){
            ofaKind3 = (i + 1)*3;
        }if(amount[i] > 4){
            ofaKind4 = (i + 1)*3;
        }if(amount[i] > 5){
            yahtzee = 50; 
        }
    }
    if(document.getElementById('three-of-a-kind-score') === null){
        document.getElementById('three-of-a-kind-score').innerHTML() = ofaKind3;
        document.getElementById('three-of-a-kind-score').style.color = '#808080';
    }
    if(document.getElementById('four-of-a-kind-score') === null){
        document.getElementById('four-of-a-kind-score').innerHTML() = ofaKind4;
        document.getElementById('four-of-a-kind-score').style.color = '#808080'; 
    }
    if(document.getElementById('yahtzee-score') === null){
        document.getElementById('yahtzee-score').innerHTML() = yahtzee;
        document.getElementById('yahtzee-score').style.color = '#808080';
    }
    //small straight 
    if(((one >=  1 && two >=  1 && three >=  1 && four >=  1) || (two >=  1 && three >=  1 && four >=  1 && five >=  1) || (three >=  1 && four >=  1 && five >=  1 && six >=  1)) && document.getElementById('sm-straight-score') === null){
        document.getElementById('sm-straight-score').innerHTML() = 30; 
        document.getElementById('sm-straight-score').style.color = '#808080';
    }
    //large straight
    if(((one >= 1 && two >= 1 && three >= 1 && four >=  1 && five >=  1) || (tw0 >=  1 && three >=  1 && four >=  1 && five >=  1 && six >= 1)) && document.getElementById('lg-straight-score') === null){
        document.getElementById('lg-straight-score').innerHTML() = 40 ; 
        document.getElementById('lg-straight-score').style.color = '#808080';
    }
    //Full house 
    if(document.getElementById('full-house-score') === null){
        if(one >= 3){
            if(two >= 2 || three >= 2 || four >= 2 || five >= 2 || six >= 2){
                document.getElementById('full-house-score').innerHTML() = 25;
            }
        }else if(two >= 3){
            if(one >= 2 || three >= 2 || four >= 2 || five >= 2 || six >= 2){
                document.getElementById('full-house-score').innerHTML() = 25;
            }
        }else if(three >= 3){
            if(one >= 2 || two >= 2 || four >= 2 || five >= 2 || six >= 2){
                document.getElementById('full-house-score').innerHTML() = 25;
            }
        }else if(four >= 3){
            if(one >= 2 || two >= 2 || three >= 2 || five >= 2 || six >= 2){
                document.getElementById('full-house-score').innerHTML() = 25;
            }
        }else if(five >= 3){
            if(one >= 2 || two >= 2 || three >= 2 || four >= 2 || six >= 2){
                document.getElementById('full-house-score').innerHTML() = 25;
            }
        }else if(six >= 3){
            if(one >= 2 || two >= 2 || three >= 2 || four >= 2 || five >= 2){
                document.getElementById('full-house-score').innerHTML() = 25;
            }
        }
        document.getElementById('full-house-score').style.color = '#808080';
    }

}
// Function after 2 rolls, the gray text should become blank again 
