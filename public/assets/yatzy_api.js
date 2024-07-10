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

//Debugging purposes
async function getSession() { 
    const response = await $.ajax({
        type: "GET",
        url: "../api.php?action=getSession"
    });
    console.log("SESSION");
    console.log(response);
}
