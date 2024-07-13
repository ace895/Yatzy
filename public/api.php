<?php
    session_start();
    require_once('_config.php');
    use Yatzy\App\Models\Dice;
    use Yatzy\App\Models\YatzyGame;
    use Yatzy\App\Models\YatzyEngine;
    use Yatzy\App\Models\Leaderboard;

    $game = new YatzyGame();
    $engine = new YatzyEngine();
    $leaderboard = new Leaderboard();

    switch ($_GET["action"] ?? "version") {
    case "roll":
        $data = ["value" => $game->roll()];
        break;
    case "reroll":
        $param = json_decode($_GET["param"], true);
        $data = ["value" => $game->reroll($param)];
        break;
    case "submitScore":
        $score = $_GET["score"];
        $category = $_GET["category"];
        $game->submit_score($score, $category);
        $data = ["value" => $_SESSION];
        break;
    case "getRerolls":
        $data = ["value" => $game->get_rerolls()];
        break;
    case "getDice":
        $data = ["value" => $game->get_dice()];
        break;
    case "getBonus":
        $data =  ["value" => $game->get_bonus()];
        break;
    case "getUpperScore":
        $data =  ["value" => $game->get_upper_score()];
        break;
    case "getLowerScore":
        $data =  ["value" => $game->get_lower_score()];
        break;
    case "calculateScore":
        $param = $_GET["param"];
        $category = substr($param, 1, -1);
        $data =  ["value" => $engine->calc_score($category)];
        break;
    case "submit_final_score":
        $playerName= $_GET["playerName"];
        $totalScore = $_GET["totalScore"];
        $leaderboard->addPlayer($playerName, $totalScore);
        $data = ["value" => $_SESSION];
        break;
    case "leaderboard":
        $data = ['leaderboard' => $leaderboard->getTopScores()];
        break;
    case "getSession" :
        $data = ["value" => $_SESSION];
        break;
    case "resetGame":
        $data = ["value" => $game->reset_game()];
        break;
    default:
        $data = null;
    }

    header("Content-Type: application/json");
    echo json_encode($data);

?>

