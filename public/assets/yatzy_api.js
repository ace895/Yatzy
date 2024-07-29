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
            action: "login",
            username: username,
            password: password
        }
    });
    if (response.value) {
        window.location.href = "http://localhost:4000/start_page.html";
    }
    else {
        //Display error
        document.getElementById("loginError").innerHTML = "<b>Username or password incorrect</b>";
    }
}

//Login admin
function loginAdmin() {
    var password = window.prompt("Please enter the password");
    if (password == "theadminpassword") {
        window.location.href = "http://localhost:4000/manager_page.html";
    }
}

//Sign up user
async function signup() {

    var fName = document.getElementById("first-name").value;
    var lName = document.getElementById("last-name").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;
    
    //Check if passwords match
    if (fName == "" || lName == "" || username == " " || password == " ") {
        document.getElementById("signupError").innerHTML = "<b>Please fill in all fields</b>";
    }
    else if (password != confirmPassword) {
        document.getElementById("signupError").innerHTML = "<b>Passwords do not match</b>";
    } 
    else {
        //Create account
        const response = await $.ajax({
            type: "GET",
            url: "../api.php",
            data: {
                action: "signup",
                firstName: fName,
                lastName: lName,
                username: username,
                password: password
            }
        });
        //Check if username is unique
        if (response.value) {
            window.location.href = "http://localhost:4000/login.html";
        }
        else {
            document.getElementById("signupError").innerHTML = "<b>Username already taken</b>";
        }
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