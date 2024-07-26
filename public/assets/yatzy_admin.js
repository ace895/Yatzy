//Load user information to table
window.onload = async function() {
    //Get users from database
    var users = await callWithoutParam("getUsers");
    var table = document.getElementById("user-table").getElementsByTagName("tbody")[0];
                            
    for (var user of users) {
        //Get user's high score and leaderboard rank
        var score = await callWithParam("getScores", user.username);
        var highScore = score.length > 0 ? score[0].score : "No scores";
        var leaderboard = await callWithoutParam("getLeaderboard");
        var rankEntry = leaderboard.find(entry => entry.username === user.username);
        var rank = rankEntry ? rankEntry.leaderboard_rank : "N/A";
        var deleteButton = "<button class='small delete-btn' onclick='deleteUser('" + user.username + "')'><b>Delete<b></button>"
        var infoButton = "<button class='small' onclick='getUserScores(\"" + user.username + "\")'><b>View Scores<b></button>"

        table.innerHTML += "<tr><td class='info-td'>" + user.username +
                            "</td><td class='info-td'>" + user.registration_date + 
                            "</td><td class='info-td'>" + user.last_login +
                            "</td><td class='info-td'>" + highScore +
                            "</td><td class='info-td'>" + rank + 
                            "</td><td class='blank-td'>" + infoButton + 
                            "</td><td class='blank-td'>" + deleteButton + "</td>";
    }

}

//Remove user from database
function deleteUser(username) {

}

//Display user scores
function getUserScores(username) {
    //Get user scores
    var scores = callWithParam("getScores", username);

    //Update UI components
    var table = document.getElementById("user-scores-table");
    var header = document.getElementById("score-header");
    header.innerHTML = username + "'s Scores";

    //Load table with scores
    for(var s of scores) {
        table.innerHTML += "<tr><td class='info-td'>" + s.score +
                            "</td><td class='info-td'>" + s.date_scored + "</td>";
    }

    table.style.visibility = "visible";
}