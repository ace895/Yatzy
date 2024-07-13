<?php
namespace Yatzy\App\Models;

class Leaderboard {

    private $players;

    function __construct() {
        if (isset($_SESSION['leaderboard'])) {
            $this->players = $_SESSION['leaderboard'];
        } else {
            $this->players = [];
        }
    }

    public function addPlayer($playerName, $score) {
        $this->players[] = ['player' => $playerName, 'score' => $score];
        usort($this->players, function($a, $b) {
            return $b['score'] <=> $a['score'];
        });
        $_SESSION['leaderboard'] = $this->players;
    }

    public function getTopScores($limit = 10) {
        return array_slice($this->players, 0, $limit);
    }
}

