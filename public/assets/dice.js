export var Dice = (function(){
    var entity = {
        "history": []
      };    
    entity.dice_roll = function() {
        var roll = Math.floor(Math.random() * 6) + 1;
        this.history.push(roll);
        console.log(roll);
        return roll; 
    }
    entity.multi_dice_roll = function() {
        var results = []; 
        for(let i = 0; i < num; i++){
            var roll = Math.floor(Math.random() * 6) + 1;
            results.push(roll); 
            this.history.push(roll);
        }
    return results; 
    }
})(); 
