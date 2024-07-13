<?php
namespace Yatzy\App\Models;

class YatzyEngine {

    public $game;
    function __construct() {
        $this->game = new YatzyGame();
    }

    function calc_score($category) {

        $count = array_count_values($this->game->dice);
        if($category == "aces-score") {
            return array_key_exists(1, $count) ? $count[1] : 0;
        }
        else if($category == "twos-score") {
            return array_key_exists(2, $count) ? $count[2]*2 : 0;
        }
        else if($category == "threes-score") {
            return array_key_exists(3, $count) ? $count[3]*3 : 0;
        }
        else if($category == "fours-score") {
            return array_key_exists(4, $count) ? $count[4]*4 : 0;
        }
        else if($category == "fives-score") {
            return array_key_exists(5, $count) ? $count[5]*5 : 0;
        }
        else if($category == "sixes-score") {
            return array_key_exists(6, $count) ? $count[6]*6 : 0;
        }
        else if($category == "three-of-a-kind-score") {
            $total = 0;
            $isThreeOfAKind = false;
            foreach ($count as $num => $c) {
                if ($c >= 3) {
                    $total = $num*3;
                    $isThreeOfAKind = true;
                }
            }
            return $isThreeOfAKind ? $total : 0;
        }
        else if($category == "four-of-a-kind-score") {
            $total = 0;
            $isFourOfAKind = false;
            foreach ($count as $num => $c) {
                if ($c >= 4) {
                    $total = $num*4;
                    $isFourOfAKind = true;
                }
            }
            return $isFourOfAKind ? $total : 0;
        }
        else if($category == "yahtzee-score") {
            foreach ($count as $num => $c) {
                if ($c == 5) {
                    return 50;
                }
            }
            return 0;
        }
        else if($category == "chance-score"){
            $chance = 0;  
            for($i = 0; $i < 5; $i++){
                $chance += $this->game->dice[$i];
            }
            return $chance; 
        }
        else if($category == "sm-straight-score"){
            if ((array_key_exists(1, $count) && array_key_exists(2, $count) && array_key_exists(3, $count) && array_key_exists(4, $count)) ||
                (array_key_exists(2, $count) && array_key_exists(3, $count) && array_key_exists(4, $count) && array_key_exists(5, $count)) ||
                (array_key_exists(3, $count) && array_key_exists(4, $count) && array_key_exists(5, $count) && array_key_exists(6, $count))) {
                return 30;
            }
            return 0; 
        }
        else if($category == "lg-straight-score"){
            if ((array_key_exists(1, $count) && array_key_exists(2, $count) && array_key_exists(3, $count) && array_key_exists(4, $count) && array_key_exists(5, $count)) ||
                (array_key_exists(2, $count) && array_key_exists(3, $count) && array_key_exists(4, $count) && array_key_exists(5, $count) && array_key_exists(6, $count))) {
                return 40; 
            }
            return 0; 
        }
        else if($category == "full-house-score"){
            $three = false;
            $two = false;
            foreach ($count as $num => $c) {
                if ($c == 3) {
                    $three = true;
                }
                if ($c == 2) {
                    $two = true;
                }
            }
            if ($three && $two) {
                return 25;
            }
            return 0; 
        }
    }

}

?>