<?php
namespace Yatzy\App\Models;

class YatzyGame {

    public $dice;
    public $rerolls;
    public $roll_num;

    function __construct() {
        $this->dice = [];
        $this->rerolls = 0;
        $this->roll_num = 0;
    }

    function get_dice() {
        return $this->dice;
    }
    function get_rerolls() {
        return $this->rerolls;
    }

    function roll() {
        //Roll all dice
        $d = new Dice(1, 6);
        $this->dice = $d->multi_roll(5);
        $this->roll_num ++;
        $this->rerolls = 0;
    }

    function reroll($dice_to_reroll) {

        if ($this->rerolls < 3) {
            $d = new Dice(1, 6);

            //Reroll select dice
            for($i = 0; $i < count($dice_to_reroll); $i ++) {
                $this->dice[$dice_to_reroll[$i]] = $d->roll();
            }
            $this->rerolls ++;
            return true;

        }
        return false;

    }

}

?>