import { Dice } from './dice.js'; 

class Game{
    constructor(){
        const dice = new Array(5); 
        const roll_num  = 0; 
        const rerolls = 0; 
    }
    get_roll_num = function() {
        return this.roll_num;
    }
    get_dice = function() {
        return this.dice;
    }
    get_rerolls = function () {
        return this.rerolls;
    }
    //Start (or restart) game, initialize variables
    start_game = function() {
        this.roll_num = 0;
        this.dice = new Array(5);
        this.rerolls = new Array(5).fill(0);
    }
    //Roll all dice
    roll = function() {
        this.roll_num ++;
        this.rerolls.fill(0); //Reset rerolls
        this.dice = Dice.multi_dice_roll(5); //Roll all dice
    }
    //Takes integer array of dice to reroll and rerolls them
    reroll = function(dice_to_reroll) {
        if (this.rerolls >= 2) {
            return;
        }
        for(var i = 0; i < dice_to_reroll.length; i ++) {
            this.dice[dice_to_reroll[i]] = Dice.dice_roll();
        }
        this.rerolls ++;
    }
}

