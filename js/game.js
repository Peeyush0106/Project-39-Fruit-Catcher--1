class Game {
    constructor() {
    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        });
    }
    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
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
    play() {
        form.hide();
        Player.getPlayerInfo();
        for (var m in buttons) {
            var button = buttons[m];
            button.show();
        }

        // Create Fruits
        ////////////////////////////////////////////////////////////////////////
        /**/if (frameCount % 20 === 0) {                                      //
        /**/    var fruit = createSprite(random(100, 900), -100, 100, 100);   //
        /**/    fruit.velocityY = 6;                                          //
        /**/    var rand = Math.round(random(1, 5));                          //
        /**/                                                                  //
        /**/switch (rand) {                                                   //
        /**/   case 1: fruit.addImage("fruit1", fruit1_img);                  //
        /**/     break;                                                       //
        /**/       case 2: fruit.addImage("fruit1", fruit2_img);              //
        /**/          break;                                                  //
        /**/       case 3: fruit.addImage("fruit1", fruit3_img);              //
        /**/         break;                                                   //
        /**/       case 4: fruit.addImage("fruit1", fruit4_img);              //
        /**/          break;                                                  //
        /**/        case 5: fruit.addImage("fruit1", fruit5_img);             //
        /**/          break;                                                  //
            }                                                                 //
        /**/    fruits.push(fruit);                                           //
        }                                                                     //
        ////////////////////////////////////////////////////////////////////////

        image(back_img, 0, 0, 1000, 800);
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
    // useJoystickDrag() {
    //     var distance = dist(mouseX, mouseY, (centerOfStick + (150 / 2)), (500 + (150 / 2)));
    //     console.log(distance);
    //     if (distance < 400) {
    //         if (mouseX < centerOfStick) {
    //             x = centerOfStick - distance;
    //             player.distance += 10
    //             player.update();
    //         }
    //         if (mouseX > centerOfStick) {
    //             x = centerOfStick + distance;
    //             player.distance -= 10
    //             player.update();
    //         }
    //     }
    // }
    createPlayButtons() {
        buttons.push(createButton("Left").style("background-color", "blue").style("border", "none").style("color", "white").style("padding", "20px").style("text-align", "center").style("text-decoration", "none").style("display", "inline-block").style("font-size", "16px").style("border-radius", "90%").position(x1, 500).mousePressed(() => {
            moveLeft = true;
        }).hide());

        buttons.push(createButton("Right").style("background-color", "blue").style("border", "none").style("color", "white").style("padding", "20px").style("text-align", "center").style("text-decoration", "none").style("display", "inline-block").style("font-size", "16px").style("border-radius", "90%").position(x2, 500).mousePressed(() => {
            moveRight = true;
        }).hide());

        // if (this.mousePressedOnEllipse(x1, 500, 100)) {
        //     var distance = this.getDistanceFromButton(x1, 500);
        //     x = x1 - distance;
        //     player.distance += 10
        //     player.update();
        //     // console.log("Have to move left");
        // }
        // if (this.mousePressedOnEllipse(x2, 500, 100)) {
        //     var distance = this.getDistanceFromButton(x2, 500);
        //     x = x2 + distance;
        //     player.distance -= 10
        //     player.update();
        //     // console.log("Have to move right");
        // }
    }
    // mousePressedOnEllipse(x, y, maxVal) {
    //     var distance = this.getDistanceFromButton(x,y);
    //     return (distance <= maxVal, distance);
    // }
    // getDistanceFromButton(x, y) {
    //     var distance = dist(mouseX, mouseY, x, y);
    //     return (distance);
    // }
}