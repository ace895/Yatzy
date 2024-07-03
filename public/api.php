<?php
require_once('_config.php');

use Yatzy\App\Models\Dice;

switch ($_GET["action"] ?? "version") {
case "roll":
    $d = new Dice(1, 6);
    $data = ["value" => $d->roll()];
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

