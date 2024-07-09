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
        url: ("../api.php?action=" + f + "&param=" + param)
    });
    return response.value;
}
