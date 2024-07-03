<?php
namespace Yatzy\App\Models;

class Dice {

    function roll() {
        return rand(1, 6);
    }

    function multi_roll($n) {
        $dice = [];
        for($i = 0; $i < $n; $i ++) {
            $dice[$i] = $this->roll();
        }
        return $dice;
    }
}

?>