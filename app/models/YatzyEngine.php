<?php
namespace Yatzy\App\Models;

class YatzyEngine {

    public $game;
    
    function __construct() {
        $this->game = new YatzyGame();
    }

    function calc_score($category) {

        $count = array_count_values($this->game->dice);
        if($category == "ones") {
            return array_key_exists(1, $count) ? $count[1] : 0;
        }
        else if($category == "twos") {
            return array_key_exists(1, $count) ? $count[2]*2 : 0;
        }
        else if($category == "threes") {
            return array_key_exists(1, $count) ? $count[3]*3 : 0;
        }
        else if($category == "fours") {
            return array_key_exists(1, $count) ? $count[4]*4 : 0;
        }
        else if($category == "fives") {
            return array_key_exists(1, $count) ? $count[5]*5 : 0;
        }
        else if($category == "sixes") {
            return array_key_exists(1, $count) ? $count[6]*6 : 0;
        }
        else if($category == "three-of-a-kind") {
            foreach ($count as $num => $c) {
                if ($c == 3) {
                    return $num * 3;
                }
            }
        }
        else if($category == "four-of-a-kind") {
            foreach ($count as $num => $c) {
                if ($c == 4) {
                    return $num * 4;
                }
            }
        }
        else if($category == "yahtzee") {
            foreach ($count as $num => $c) {
                if ($c == 5) {
                    return $num * 5;
                }
            }
        }
        //etc..

    }

}

?>