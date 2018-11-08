// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //initializing
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x >= 505) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 400);
    }

    if (player.x >= this.x - 80 &&
        player.x - 80 <= this.x &&
        player.y <= this.y &&
        player.y + 60 >= this.y) {//to check if the enemy and player are touching.
        alert("You lose!");
        player.x = 200;
        player.y = 400;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class player {
    constructor(x, y, speed) {
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
        this.speed = speed;

    }
    update() {
        //prevent player from moving off the grid
        if (this.y > 380)
            this.y = 380;
        if (this.x > 480)
            this.x = 480;
        if (this.x < 0)
            this.x = 0;
        if (this.y < 0) {

            this.x = 200;
            this.y = 400;
            alert("you won");
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(pos) {//to update the postion of player on cursor press
        if (pos == 'left' && this.x >= 80)
            this.x -= 100;
        if (pos == 'up' && this.y > -60)
            this.y -= 80;
        if (pos == 'right' && this.x < 400)
            this.x += 100;
        if (pos == 'down' && this.y <= 600)
            this.y += 80;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
player = new player(200, 400, 50);
let allEnemies = []
var pos = [60, 140, 220];
for (i = 0; i < 3; i++) {
    enemy = new Enemy(0, pos[i], 150 + Math.floor(Math.random() * 40));
    allEnemies[i] = enemy;
}
