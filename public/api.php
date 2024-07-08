<?php
require_once('_config.php');

use Yatzy\App\Models\Dice;
use Yatzy\App\Models\YatzyGame;
use Yatzy\App\Models\YatzyEngine;

$yatzyGame = new YatzyGame();
$yatzyEngine = new YatzyEngine();

switch ($_GET["action"] ?? "version") {
case "roll":
    $yatzyGame->roll();
    $data = ["dice" => $yatzyGame->dice];
    break;
case "reroll":
    $dice_to_reroll = $_POST["dice_to_reroll"] ?? [];
    $yatzyGame->reroll($dice_to_reroll);
    $data = ["dice" => $yatzyGame->dice];
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
case "version":
default:
    $data = ["version" => "1.0"];
}

header("Content-Type: application/json");
echo json_encode($data);

function jsonReply(Response $response, $data)
{
    $payload = json_encode($data);
    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
}

?>

