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
        $d = new Dice();
        $data = ["value" => $d->roll()];
        break;
    case "reroll":
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
        $data =  ["value" => $engine->calculateScore($param)];
        break;
    default:
        $data = null;
    }

    header("Content-Type: application/json");
    echo json_encode($data);
?>

