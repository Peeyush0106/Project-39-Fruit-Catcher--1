class Game {
    constructor() {
    }
    // Get the state of the game
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        });
        if (gameState === 1) {
            clear();
            text("Try playing again later... Player limit has reached. Oher players are playing.", 10, 300);
        }
    }
    // Update the game state to the database
    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    // Start the game and show the form
    async start() {
        console.log("Game start");
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        // Create Players
        ////////////////////////////////////////////////////////////////////////
        /**/ player1 = createSprite(200, 500);                                //
        /**/ player1.addImage("player1", player_img);                         //
        /**/ player2 = createSprite(800, 500);                                //
        /**/ player2.addImage("player2", player_img);                         //
        /**/ players = [player1, player2];                                    //
        /**/ for (var i in players) {                                         //
        /**/     var playerObj = players[i];                                  //
        /**/     playerObj.bounceOff(edges[0]);                               //
        /**/     playerObj.bounceOff(edges[1]);                               //
        }                                                                     //
        ////////////////////////////////////////////////////////////////////////
    }
    // When the players are playing the game
    play() {
        // Hide form
        form.greeting.hide();
        form.button.hide();
        form.input.hide();
        form.title.hide();

        //Get player information
        Player.getPlayerInfo();

        // Show the background as it clears with the clear() function
        image(back_img, 0, 0, 1000, 800);

        // SHow play buttons
        for (var m in buttons) {
            var button = buttons[m];
            button.show();
        }

        // Create Fruits
        ////////////////////////////////////////////////////////////////////////
        /**/if (frameCount % 30 === 0) {                                      //
        /**/    var fruit = createSprite(random(100, 900), -100, 100, 100);   //
        /**/    fruit.velocityY = 6;                                          //
        /**/    var rand = Math.round(random(1, 5));                          //
        /**/                                                                  //
        /**/switch (rand) {                                                   //
        /**/   case 1: fruit.addImage("fruit1", fruit1_img);                  //
        /**/   break;                                                         //
        /**/   case 2: fruit.addImage("fruit1", fruit2_img);                  //
        /**/   break;                                                         //
        /**/   case 3: fruit.addImage("fruit1", fruit3_img);                  //
        /**/   break;                                                         //
        /**/   case 4: fruit.addImage("fruit1", fruit4_img);                  //
        /**/   break;                                                         //
        /**/   case 5: fruit.addImage("fruit1", fruit5_img);                  //
        /**/   break;                                                         //
            }                                                                 //
        /**/    fruits.push(fruit);                                           //
        }                                                                     //
        ////////////////////////////////////////////////////////////////////////

        var x = 100;
        var y = 200;
        var index = 0;
        drawSprites();
        for (var l in fruits) {
            var fruitLocal = fruits[l];
            if (fruitLocal.isTouching(players[player.index - 1])) {
                fruitLocal.destroy();
            }
            if (fruitLocal.isTouching(edges[2])) {
                fruitLocal.destroy();
            }
        }
        for (var plr in allPlayers) {
            index = index + 1;
            x = 500 - allPlayers[plr].distance;
            y = 500;
            players[index - 1].x = x;
            players[index - 1].y = y;
            fill("black");
            textSize(25);
            text(allPlayers[plr].name, x - 25, y + 25);
        }
        for (var k in players) {
            var playerObj = players[k];
            if (!(playerObj.isTouching(edges[0])) && !(playerObj.isTouching(edges[1]))) {
                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    moveRight = true;
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    moveLeft = true;
                }
            }
        }
    }
    createPlayButtons() {
        function isTouchDevice() {
            return typeof window.ontouchstart !== 'undefined';
        }
        if (isTouchDevice() === true) {
            this.createTouchPlayButtons();
        }
        else {
            this.createNonTouchPlayButtons();
        }
    }
    // Also check style.css for knowing the styles added to these buttons
    createNonTouchPlayButtons() {
        buttons.push(createButton("Left").attribute("class", "buttonsClass").position(x1, 500).mousePressed(() => {
            moveLeft = true;
        }).hide());

        buttons.push(createButton("Right").attribute("class", "buttonsClass").position(x2, 500).mousePressed(() => {
            moveRight = true;
        }).hide());
    }
    createTouchPlayButtons() {
        button1 = createButton("Left");
        button2 = createButton("Right");

        button1.position(x1, 500);
        button1.style("background-color", "blue");
        button1.style("width", "85px");
        button1.style("height", "50px");
        button1.style("font-size", "22px");
        button1.style("color", "white");
        button1.mousePressed(() => {
            moveLeft = true;
            button1.style("background-color", "green");
        });
        button1.hide();
        buttons.push(button1);
        

        button2.position(x2, 500);
        button2.style("background-color", "blue");
        button2.style("width", "85px");
        button2.style("height", "50px");
        button2.style("font-size", "22px");
        button2.style("color", "white");
        button2.mousePressed(() => {
            moveRight = true;
            button2.style("background-color", "green");
        });
        button2.hide()
        buttons.push(button2);
    }
}