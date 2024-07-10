<?php
namespace Yatzy\App\Models;

class Leaderboard {

    private $scores;

    function __construct() {
        $this->scores = [];
    }

    public function addScore($playerName, $score) {
        $this->scores[] = [
            'player' => $playerName,
            'score' => $score
        ];
        // Sort scores in descending order based on score
        usort($this->scores, function($a, $b) {
            return $b['score'] - $a['score'];
        });
    }

    public function getTopScores($limit = 10) {
        return array_slice($this->scores, 0, $limit);
    }

    public function clearScores() {
        $this->scores = [];
    }
}

