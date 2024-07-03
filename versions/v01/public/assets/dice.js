var Dice = {
    history: [],

    dice_roll() {
        const roll = Math.floor(Math.random() * 6) + 1;
        this.history.push(roll);
        return roll;
    },

    multi_dice_roll(num) {
        results = [];
        for (let i = 0; i < num; i++) {
            const roll = Math.floor(Math.random() * 6) + 1;
            results.push(roll);
            this.history.push(roll);
        }
        return results;
    }
};