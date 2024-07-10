<?php
namespace Yatzy\App\Models;

class YatzyGame {

    public $dice;
    public $rerolls;

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

        //Load values from $_SESSION
        $this->dice = $_SESSION["dice"];
        $this->rerolls = $_SESSION["rerolls"];
    }

    function get_dice() {
        return $this->dice;
    }
    function get_rerolls() {
        return $this->rerolls;
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

    //Updates game state in $_SESSION
    private function loadSession() {
        $_SESSION["dice"] = $this->dice;
        $_SESSION["rerolls"] = $this->rerolls;
    }

}

?>