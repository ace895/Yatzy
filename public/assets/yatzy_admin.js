var users;

//Load user information to table
window.onload = async function() {
    //Get users from database
    users = await callWithoutParam("getUsers");
    var table = document.getElementById("user-table").getElementsByTagName("tbody")[0];
                            
    for (var user of users) {
        //Get user's high score and leaderboard rank
        var score = await callWithParam("getScores", user.username);
        var highScore = score.length > 0 ? score[0].score : "No scores";
        var leaderboard = await callWithoutParam("leaderboard");
        var rankEntry = leaderboard == null ? null : leaderboard.find(entry => entry.username == user.username);
        var rank = rankEntry != null && rankEntry ? rankEntry.leaderboard_rank : "N/A";

        user["rank"] = rank;
        user["highScore"] = highScore;

        var deleteButton = "<button class='small delete-btn' onclick='deleteUser(\"" + user.username + "\")'><b>Delete<b></button>";
        var infoButton = "<button class='small' onclick='getUserScores(\"" + user.username + "\")'><b>View Scores<b></button>";
        var editButton = "<button class='small'style=\"width: 80px\" onclick='editUser(\"" + user.username + "\", \"" + user.first_name 
                        + "\", \"" + user.last_name + "\")'><b>Edit<b></button>";

        table.innerHTML += "<tr><td class='info-td'>" + user.first_name + " " + user.last_name +
                            "</td><td class='info-td'>" + user.username +
                            "</td><td class='info-td'>" + user.registration_date + 
                            "</td><td class='info-td'>" + user.last_login +
                            "</td><td class='info-td'>" + user.highScore +
                            "</td><td class='info-td'>" + user.rank + 
                            "</td><td class='blank-td'>" + infoButton + 
                            "</td><td class='blank-td'>" + editButton + 
                            "</td><td class='blank-td'>" + deleteButton + "</td></tr>";
    }

}

//Remove user from database
function deleteUser(username) {
    callWithParam("deleteUser", username);
    location.reload();
}

//Display user scores
async function getUserScores(username) {
    //Hide user editting form if needed
    document.getElementById("edit-user").style.visibility = "hidden";

    //Get user scores
    var scores = await callWithParam("getScores", username);

    //Update UI components
    var table = document.getElementById("user-scores-table");
    var header = document.getElementById("score-header");
    header.style.visibility = "visible";
    header.innerHTML = username + "'s Scores";
    table.innerHTML = "<thead><tr><td class=\"info-td-head\">Score</td><td class=\"info-td-head\">Date</td></tr> </thead>"

    //Load table with scores
    for(var s of scores) {
        table.innerHTML += "<tr><td class='info-td'>" + s.score +
                            "</td><td class='info-td'>" + s.date_scored + "</td>";
    }

    table.style.visibility = "visible";
}

//Allow admin to edit user info
function editUser(username, firstName, lastName) {
    document.getElementById("user-scores-table").style.visibility = "hidden";
    document.getElementById("score-header").style.visibility = "hidden";
    document.getElementById("edit-user").style.visibility = "visible";

    //Load placeholders and title
    document.getElementById("edit-header").innerHTML = "Edit " + username + "'s Information";
    var fNameIn = document.getElementById("first-name");
    var lNameIn = document.getElementById("last-name");
    var usernameIn = document.getElementById("username");
    fNameIn.setAttribute("value", firstName);
    lNameIn.setAttribute("value", lastName);
    usernameIn.setAttribute("value", username);
}

//Updates user info in the database
async function updateUser() {
    var username = document.getElementById("username").value;
    var firstName = document.getElementById("first-name").value;
    var lastName = document.getElementById("last-name").value;
    var response = await $.ajax({
        type: "GET",
        url: "../api.php",
        data: {
            action: "updateUser",
            username: username,
            firstName: firstName,
            lastName: lastName
        }
    });
    location.reload();
}

function rankByName() {
    users.sort((a, b) => {
        if (a.first_name + " " + a.last_name < b.first_name + " " + b.last_name) {
            return -1;
        }
        if (a.first_name + " " + a.last_name > b.first_name + " " + b.last_name) {
            return 1;
        }
        return 0;
    });
    loadUsersTable();
}

function rankByUsername() {
    users.sort((a, b) => {
        if (a.username < b.username) {
            return -1;
        }
        if (a.username > b.username) {
            return 1;
        }
        return 0;
    });
    loadUsersTable();
}

function rankByRegDate() {
    users.sort((a, b) => {
        let dateA = new Date(a.registration_date);
        let dateB = new Date(b.registration_date);
        return dateB - dateA; 
    });
    loadUsersTable();
}

function rankByLastLogin() {
    users.sort((a, b) => {
        let dateA = new Date(a.last_login);
        let dateB = new Date(b.last_login);
        return dateB - dateA; 
    });
    loadUsersTable();
}


function rankByHighscore() {
    users.sort((a, b) => {
        if (a.rank == "N/A" || a.rank < b.rank) {
            return -1;
        }
        if (b.rank == "N/A" || a.rank > b.rank) {
            return 1;
        }
        return 0;
    });
    loadUsersTable();
}

function rankByRank() {
    users.sort((a, b) => {
        if (a.rank == "N/A" || a.rank < b.rank) {
            return -1;
        }
        if (b.rank == "N/A" || a.rank > b.rank) {
            return 1;
        }
        return 0;
    });
    loadUsersTable();
}

function loadUsersTable() {
    var table = document.getElementById("user-table").getElementsByTagName("tbody")[0];
    table.innerHTML = ""; 

    for (var user of users) {
        var deleteButton = "<button class='small delete-btn' onclick='deleteUser(\"" + user.username + "\")'><b>Delete<b></button>";
        var infoButton = "<button class='small' onclick='getUserScores(\"" + user.username + "\")'><b>View Scores<b></button>";
        var editButton = "<button class='small'style=\"width: 80px\" onclick='editUser(\"" + user.username + "\", \"" + user.first_name 
        + "\", \"" + user.last_name + "\")'><b>Edit<b></button>";

        table.innerHTML += "<tr><td onclick=\"rankByName()\" class='info-td'>" + user.first_name + " " + user.last_name +
            "</td><td onclick=\"rankByUsername()\" class='info-td'>" + user.username +
            "</td><td onclick=\"rankByRegDate()\" class='info-td'>" + user.registration_date +
            "</td><td onclick=\"rankByLastLogin()\" class='info-td'>" + user.last_login +
            "</td><td onclick=\"rankByHighscore()\" class='info-td'>" + user.highScore +
            "</td><td onclick=\"rankByRank()\" class='info-td'>" + user.rank +
            "</td><td class='blank-td'>" + infoButton +
            "</td><td class='blank-td'>" + editButton +
            "</td><td class='blank-td'>" + deleteButton + "</td></tr>";

    }
}