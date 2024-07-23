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

        table.innerHTML += "<tr><td>" + user.username +
                            "</td><td>" + user.registrationDate + 
                            "</td><td>" + user.lastLogin +
                            "</td><td>" + highScore +
                            "</td><td>" + rank + "<td>";
    }

}