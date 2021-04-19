var database;
var back_img;
var gameState = 0;
var playerCount = 0;
var allPlayers;

var player, form, game;
var player1, player2;
var players;
var fruits = [];
var fruit1_img, fruit2_img, fruit3_img, fruit4_img, fruit5_img;
var player_img;

var edges;

var edgeLeft, edgeRight, edgeDown;

var x, buttons;

var moveLeft, moveRight;

function preload() {
    back_img = loadImage("images/jungle.jpg");
    player_img = loadImage("images/basket2.png");
    fruit1_img = loadImage("images/apple2.png");
    fruit2_img = loadImage("images/banana2.png");
    fruit3_img = loadImage("images/melon2.png");
    fruit4_img = loadImage("images/orange2.png");
    fruit5_img = loadImage("images/pineapple2.png");
}

function setup() {
    createCanvas(1000, 600);
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();
    buttons = [];

    edgeLeft = createSprite(1025, canvas.height / 2, 50, canvas.height);
    edgeRight = createSprite(-25, canvas.height / 2, 50, canvas.height);
    edgeDown = createSprite(canvas.width / 2, 700, canvas.width, 50);

    edges = [edgeLeft, edgeRight, edgeDown];
    x1 = 730;
    x2 = 840;
    game.createPlayButtons();
}

function draw() {
    background(back_img);

    if (playerCount === 2) {
        game.update(1);
    }
    if (gameState === 1) {
        clear();
        game.play();
    }
    if (gameState === 2) {
        game.end();
    }
    // push();
    // fill("blue");
    // ellipse(x1, 500, 80);
    // fill("darkblue");
    // ellipse(x2, 500, 80);
    // pop();

    if (moveLeft === true) {
        moveRight = false;
        player.distance += 10
        player.update();
    }
    if (moveRight === true) {
        moveLeft = false;
        player.distance -= 10
        player.update();
    }

    if (firebase === undefined) {
        alert("Seems like your internet speed is not quite good");
    }
}

function mouseReleased() {
    moveLeft = false;
    moveRight = false;
}