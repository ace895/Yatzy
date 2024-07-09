<?php
namespace Yatzy\App\Models;

class YatzyEngine {

    public $game;
    private $upperScores;
    private $lowerScores;
    private $scores;
    protected $dom;
    function __construct() {
        $this->game = new YatzyGame();
        $this->upperScores = ["aces-score", "twos-score", "threes-score", "fours-score", "fives-score", "sixes-score"];
        $this->lowerScores = ["chance-score", "three-of-a-kind-score", "four-of-a-kind-score", "yahtzee-score", "sm-straight-score", "lg-straight-score", "full-house-score"];
        $this->scores = array_merge($this->upperScores, $this->lowerScores);
        //$this->loadHTML();
    }

    function calc_score($category) {

        $count = array_count_values($this->game->dice);
        if($category == "aces-score") {
            return array_key_exists(1, $count) ? $count[1] : 0;
        }
        else if($category == "twos-score") {
            return array_key_exists(1, $count) ? $count[2]*2 : 0;
        }
        else if($category == "threes-score") {
            return array_key_exists(1, $count) ? $count[3]*3 : 0;
        }
        else if($category == "fours-score") {
            return array_key_exists(1, $count) ? $count[4]*4 : 0;
        }
        else if($category == "fives-score") {
            return array_key_exists(1, $count) ? $count[5]*5 : 0;
        }
        else if($category == "sixes-score") {
            return array_key_exists(1, $count) ? $count[6]*6 : 0;
        }
        else if($category == "three-of-a-kind-score") {
            foreach ($count as $num => $c) {
                if ($c == 3) {
                    return $num * 3;
                }
            }
        }
        else if($category == "four-of-a-kind-score") {
            foreach ($count as $num => $c) {
                if ($c == 4) {
                    return $num * 4;
                }
            }
        }
        else if($category == "yahtzee-score") {
            foreach ($count as $num => $c) {
                if ($c == 5) {
                    return $num * 5;
                }
            }
        }
        else if($category == "chance-score"){
            $chance = 0;  
            for($i = 0; $i < 5; $i++){
                $chance += $this->game->dice[$i];
            }
            return $chance; 
        }
        else if($category == "sm-straight-score"){
            if($count[1] >=  1 && $count[2] >=  1 && $count[3] >=  1 && $count[4] >=  1){
                return 30;
            }else if($count[2] >=  1 && $count[3] >=  1 && $count[4] >=  1 && $count[5] >=  1){
                return 30;
            }else if($count[3] >=  1 && $count[4] >=  1 && $count[5] >=  1 && $count[6] >=  1){
                return 30; 
            }else{
                return 0; 
            }
        }
        else if($category == "lg-straight-score"){
            if($count[1] >=  1 && $count[2] >=  1 && $count[3] >=  1 && $count[4] >=  1 && $count[5] >=  1){
                return 40;
            }else if($count[2] >=  1 && $count[3] >=  1 && $count[4] >=  1 && $count[5] >=  1 && $count[6] >=  1){
                return 40; 
            }else{
                return 0; 
            }
        }
        else if($category == "full-house-score"){
            if($count[1] >= 3 && ($count[2] >= 2 || $count[3] >= 2 || $count[4] >= 2 || $count[5] >= 2 || $count[6] >= 2)){
                return 25;
            }else if($count[2] >= 3 && ($count[1] >= 2 || $count[3] >= 2 || $count[4] >= 2 || $count[5] >= 2 || $count[6] >= 2)){
                return 25;
            }else if($count[3] >= 3 && ($count[1] >= 2 || $count[2] >= 2 || $count[4] >= 2 || $count[5] >= 2 || $count[6] >= 2)){
                return 25;
            }else if($count[4] >= 3 && ($count[1] >= 2 || $count[2] >= 2 || $count[3] >= 2 || $count[5] >= 2 || $count[6] >= 2)){
                return 25;
            }else if($count[5] >= 3 && ($count[1] >= 2 || $count[2] >= 2 || $count[3] >= 2 || $count[4] >= 2 || $count[6] >= 2)){
                return 25;
            }else if($count[6] >= 3 && ($count[1] >= 2 || $count[2] >= 2 || $count[3] >= 2 || $count[4] >= 2 || $count[5] >= 2)){
                return 25;
            }else{
                return 0; 
            }
        }
    }

    public function getUpperScore(\DOMDocument $dom): int {
        $upperScore = 0;
        foreach ($this->upperScores as $score) {
            $element = $dom->getElementById($score);
            if ($element) {
                $upperScore += (int)$element->nodeValue;
            }
        }
        return $upperScore;
    }

    public function getBonus(\DOMDocument $dom): int {
        return $this->getUpperScore($dom) >= 63 ? 35 : 0;
    }

    public function getLowerScore(\DOMDocument $dom): int {
        $lowerScore = 0;
        foreach ($this->lowerScores as $score) {
            $element = $dom->getElementById($score);
            if ($element) {
                $lowerScore += (int)$element->nodeValue;
            }
        }
        return $lowerScore;
    }
    public function loadHtmlDom(string $filePath): \DOMDocument {
        $html = file_get_contents($filePath);
        $dom = new \DOMDocument;
        libxml_use_internal_errors(true);
        $dom->loadHTML($html);
        libxml_clear_errors();
        return $dom;
    }

}

?>