function dice_roll(){
    return Math.floor(Math.random() * 6) + 1; 
}

function multi_dice_roll(num){
    var results = []; 
    for(let i = 0; i < num; i++){
        results.push(dice_roll()); 
    }
    return results; 
}
console.log(dice_roll());

//console.log(multi_dice_roll(3)); // An example of how this function is used

