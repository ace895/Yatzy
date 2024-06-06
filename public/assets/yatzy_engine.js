import {Game} from './yatzy_game.js';

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
