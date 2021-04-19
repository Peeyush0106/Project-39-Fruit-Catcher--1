class Player {
    constructor() {
        this.index = null;
        this.distance = 0;
        this.name = null;
        this.score = 0;
    }
    // Get the count of the player
    getCount() {
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value", (data) => {
            playerCount = data.val();
        });
    }
    // Update the count of the player
    updateCount(count) {
        database.ref('/').update({
            playerCount: count
        });
    }
    // Update Player Information
    update() {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance,
            score: this.score
        });
    }
    // Get Player Information
    static getPlayerInfo() {
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value", (data) => {
            allPlayers = data.val();
        });
    }
}
