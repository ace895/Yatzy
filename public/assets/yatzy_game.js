/*In `yatzy_game.js`, implement a current state of a game.

A yatzy game comprises of a turn, which includes

* Which roll you are on (0, 1, 2, or 3)
* Current value on each of the 5 dice
* Keep / re-roll state of each dice

The `YatzyGame` should focus on tracking the state of the game
without knowing much about the rules, that comes next!*/

//Get dice module
import {Dice} from './dice.js';

var Game = (function() {

    var NUM_OF_DICE = 5;
    var MAX_REROLLS = 2;
    var this_game = {
        "roll_num": 0, //Stores current roll
        "rerolls": new Array(NUM_OF_DICE).fill(0), //Stores number of rerolls for each dice
        "dice": new Array(NUM_OF_DICE) //Stores value of each dice
    }

    //Get access to variables
    this_game.get_roll_num = function() {
        return this.roll_num;
    }
    this_game.get_dice = function() {
        return this.dice;
    }
    this_game.get_rerolls = function () {
        return this.rerolls;
    }

    //Start (or restart) game, initialize variables
    this_game.start_game = function() {
        this.roll_num = 0;
        this.dice = new Array(NUM_OF_DICE);
        this.rerolls = new Array(NUM_OF_DICE).fill(0);
    }

    //Roll all dice
    this_game.roll = function() {
        this.roll_num ++;
        this.rerolls.fill(0); //Reset rerolls
        this.dice = Dice.multi_dice_roll(NUM_OF_DICE); //Roll all dice
    }

    //Reroll dice n if it has less than 2 rerolls
    this_game.reroll() = function(n) {
        if (this.rerolls[n] == MAX_REROLLS) {
            return;
        }
        this.dice[n] = Dice.dice_roll();
        this.rerolls[n] ++;
    }

    return this_game;

})();


