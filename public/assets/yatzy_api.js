//Functions used to handle AJAX calls with and without parameters
async function callWithoutParam(f) {
    var response = await $.ajax({
        type: "GET",
        url: ("../api.php?action=" + f)
    });
    return response.value;
}

async function callWithParam(f, param) {
    const response = await $.ajax({
        type: "GET",
        url: "../api.php",
        data: {
            action: f,
            param: JSON.stringify(param)
        }
    });
    return response.value;
}

async function addScore(score, category) {
    await $.ajax({
        type: "GET",
        url: "../api.php",
        data: {
            action: "submitScore",
            score: score,
            category: category,
        }
    });
}

async function addToFinalScore(playerName, totalScore){
    await $.ajax({
        type: "GET",
        url: "../api.php",
        data: {
            action: "submit_final_score",
            playerName: playerName,
            totalScore: totalScore,
        }
    });
}

//Try to login user
async function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    const response = await $.ajax({
        type: "GET",
        url: "../api.php",
        data: {
            action: f,
            username: username,
            password: password
        }
    });
    
    if (response.value) {
        window.href = "https://localhost:4000/start_page.html";
    }
    else {
        //Display error
        document.getElementById("loginError").innerHTML = "<b>Username or password incorrect</b>";
    }
}

//Debugging purposes
async function getSession() { 
    const response = await $.ajax({
        type: "GET",
        url: "../api.php?action=getSession"
    });
    console.log("SESSION");
    console.log(response);
}