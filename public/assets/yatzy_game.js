var Game = {
    dice: new Array(5),
    roll_num: 0,
    rerolls: 0,

    //Roll all dice
    roll() {
        this.roll_num ++;
        this.rerolls = 0; //Reset rerolls
        this.dice = Dice.multi_dice_roll(5); //Roll all dice
    },

    //Takes integer array of dice to reroll and rerolls them
    reroll(dice_to_reroll) {
        if (this.rerolls >= 3) {
            return;
        }
        for(var i = 0; i < dice_to_reroll.length; i ++) {
            this.dice[dice_to_reroll[i]] = Dice.dice_roll();
        }
        this.rerolls ++;
    }
}