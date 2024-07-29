<?php
    session_start();
    require_once('_config.php');
    use Yatzy\App\Models\Dice;
    use Yatzy\App\Models\YatzyGame;
    use Yatzy\App\Models\YatzyEngine;
    use Yatzy\App\Models\Leaderboard;
    use Yatzy\App\Models\YatzyDatabase;

    $game = new YatzyGame();
    $engine = new YatzyEngine();
    $db = new YatzyDatabase();

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
        $username= $_GET["playerName"];
        $totalScore = $_GET["totalScore"];
        $data = ["value" => $db->add_score($username, $totalScore)];
        break;
    case "leaderboard":
        $data = ["value" => $db->get_leaderboard()];
        break;
    case "getSession" :
        $data = ["value" => $_SESSION];
        break;
    case "resetGame":
        $data = ["value" => $game->reset_game()];
        break;
    
    //Database related calls
    case "login":
        $username= $_GET["username"];
        $password = $_GET["password"];
        $data = ["value" => $db->login_user($username, $password)];
        break;
    case "signup":
        $fName = $_GET["firstName"];
        $lName = $_GET["lastName"];
        $username = $_GET["username"];
        $password = $_GET["password"];
        $data = ["value" => $db->register_user($fName, $lName, $username, $password)];
        break;
    case "getUsers":
        $data = ["value" => $db->get_users()];
        break;
    case "getScores":
        $username = $_GET["param"];
        $data = ["value" => $db->get_scores($username)];
        break;
    case "deleteUser":
        $username = $_GET["param"];
        $data = ["value" => $db->delete_user($username)];
        break;
    case "getUserInfo":
        $username = $_SESSION['username'] ?? null;
        $data = ["value" => $db->get_user_info($username)];
        break;
    case "getTopScores":
        $username = $_SESSION['username'] ?? null;
        if ($username) {
            $data = ["value" => $db->get_top_scores($username)];
        } else {
            $data = ["error" => "User not logged in"];
        }
        break;
    default:
        $data = null;
    }

    header("Content-Type: application/json");
    echo json_encode($data);

?>

