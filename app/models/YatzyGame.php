<?php
namespace Yatzy\App\Models;

class YatzyGame {

    public $dice;
    public $rerolls;
    public $upper_score;
    public $lower_score;

    function __construct() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        // Initialize session values
        if (!isset($_SESSION["dice"])) {
            $_SESSION["dice"] = [];
        }
        if (!isset($_SESSION["rerolls"])) {
            $_SESSION["rerolls"] = 0;
        }
        if (!isset($_SESSION["upper_score"])) {
            $_SESSION["upper_score"] = 0;
        }
        if (!isset($_SESSION["lower_score"])) {
            $_SESSION["lower_score"] = 0;
        }

        //Load values from $_SESSION
        $this->dice = $_SESSION["dice"];
        $this->rerolls = $_SESSION["rerolls"];
        $this->upper_score = $_SESSION["upper_score"];
        $this->lower_score = $_SESSION["lower_score"];

    }

    function get_dice() {
        return $this->dice;
    }
    function get_rerolls() {
        return $this->rerolls;
    }
    function get_upper_score() {
        return $this->upper_score;
    }
    function get_lower_score() {
        return $this->lower_score;
    }
    function get_bonus() {
        return $this->upper_score >= 63 ? 35 : 0;
    }

    function roll() {
        //Roll all dice
        $d = new Dice();
        $this->dice = $d->multi_roll(5);
        $this->rerolls = 0;
        $this->loadSession();
        return $this->dice;
    }

    function reroll($dice_to_reroll) {

        if ($this->rerolls < 3) {
            $d = new Dice();

            //Reroll select dice
            for($i = 0; $i < count($dice_to_reroll); $i ++) {
                $this->dice[$dice_to_reroll[$i]] = $d->roll();
            }
            $this->rerolls ++;
            $this->loadSession();
            return true;

        }
        return false;

    }

    //Update current score
    function submit_score($score, $category) {
        $upper_scores = ["aces-score", "twos-score", "threes-score", "fours-score", "fives-score", "sixes-score"];
        $is_upper = in_array($category, $upper_scores);
        if ($is_upper) {
            echo "Submitting upper score";
            $this->upper_score += $score;
            $_SESSION["upper_score"] = $this->upper_score;
        }
        else {
            echo "Submitting lower score";
            $this->lower_score += $score;
            $_SESSION["lower_score"] = $this->lower_score;
        }
        console.log($score);
    }

    //Resets scores
    function reset_game() {
        $this->lower_score = 0;
        $this->upper_score = 0;
        $this->rerolls = 0;
        $_SESSION["lower_score"] = 0;
        $_SESSION["upper_score"] = 0;
        $_SESSION["rerolls"] = 0;
    }

    //Updates game state in $_SESSION
    private function loadSession() {
        $_SESSION["dice"] = $this->dice;
        $_SESSION["rerolls"] = $this->rerolls;
    }

}

?>