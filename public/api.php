<?php
    require_once('_config.php');
    use Yatzy\App\Models\Dice;
    use Yatzy\App\Models\YatzyGame;
    use Yatzy\App\Models\YatzyEngine;

    $game = new YatzyGame();
    $engine = new YatzyEngine();
    $dom = $engine->loadHtmlDom("game_board.html");

    switch ($_GET["action"] ?? "version") {
    case "roll":
        $data = ["value" => $game->roll()];
        break;
    case "reroll":
        $param = json_decode($_GET["param"], true);
        $data = ["value" => $game->reroll($param)];
        break;
    case "getRerolls":
        $data = ["value" => $game->get_rerolls()];
        break;
    case "getDice":
        $data = ["value" => $game->get_dice()];
        break;
    case "getBonus":
        $data =  ["value" => $engine->getBonus($dom)];
        break;
    case "getUpperScore":
        $data =  ["value" => $engine->getUpperScore($dom)];
        break;
    case "getLowerScore":
        $data =  ["value" => $engine->getLowerScore($dom)];
        break;
    case "calculateScore":
        $param = $_GET["param"];
        $category = substr($param, 1, -1);
        $data =  ["value" => $engine->calc_score($category)];
        break;
    case "submit_score":
        $category = $_POST["category"] ?? null;
        if ($category && in_array($category, $yatzyEngine->scores)) {
            // Calculate score in YatzyEngine and add to Leaderboard
            $newScore = $yatzyEngine->calc_score($category);
            $leaderboard->addScore("Player1", $newScore); 
            $data = ["message" => "Score submitted successfully"];
        } else {
            $data = ["error" => "Invalid category or missing category parameter"];
        }
        break;
    case "leaderboard":
        $limit = $_GET["limit"] ?? 10; // Default limit is 10
        $topScores = $leaderboard->getTopScores($limit);
        $data = ["leaderboard" => $topScores];
        break;
    default:
        $data = null;
    }

    header("Content-Type: application/json");
    echo json_encode($data);

?>

