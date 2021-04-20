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
        var databaseRef = database.ref('/').update({
            playerCount: count
        });
        if (databaseRef === undefined) {
            alert("Seems like your internet speed is not quite good");
        }
    }
    // Update Player Information
    update() {
        var playerIndex = "players/player" + this.index;
        var playerIndexRef = database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance,
            score: this.score
        });
        if (playerIndexRef === undefined) {
            alert("Seems like your internet speed is not quite good");
        }
    }
    // Get Player Information
    static getPlayerInfo() {
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value", (data) => {
            allPlayers = data.val();
        });
        if (playerInfoRef === undefined) {
            alert("Seems like your internet speed is not quite good");
        }
    }
}
