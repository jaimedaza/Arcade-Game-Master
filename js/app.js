///////////////////////// ENEMY CLASS AND METHODS //////////////////////

// Enemy constructor function

var Enemy = function(x, y, speed) {
  // Enemies need and X and Y coordinate to appear in the board (canvas) and a speed variable to 'move' along the board
  this.x = x;
  this.y = y;
  this.speed = speed;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.

Enemy.prototype.update = function(dt) {
  // Moves the enemies along the X axis.
  this.x += this.speed * dt;

  // Reset the enemy position when it crosses the board so it can cross again.
  if (this.x > 510) {
    this.x = -80;
    // Modifies the enemy speed when it crosses the board to avoid a predictable enemy behavior.
    this.speed = 150 + Math.floor(Math.random() * 400);
  }

  // Check for collision between player and enemies
  // The 4 conditions in the IF are used to simulate that the enemy and the player are occupying "the same espace" in the XY coordinates plane.
  if (
    player.x < this.x + 50 &&
    player.x + 40 > this.x &&
    player.y < this.y + 30 &&
    player.y + 30 > this.y
  ) {
    player.x = 202;
    player.y = 404;
  }
};

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

///////////////////////// PLAYER CLASS AND METHODS //////////////////////

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//Player constructor function

var Player = function(x, y) {
  // Player needs and X and Y coordinate to appear in the board (canvas).
  this.x = x;
  this.y = y;
  this.sprite = "images/char-boy.png";
};

//Player update() method. This method prevents the player from moving beyond board boundaries
// and reset the player position when it reaches the water.

Player.prototype.update = function() {
  if (this.y > 404) {
    this.y = 404;
  }
  if (this.x > 404) {
    this.x = 404;
  }
  if (this.x < 0) {
    this.x = 0;
  }

  // Returns the player to the original position when it reaches the water
  if (this.y < 0) {
    //checkWin();
    updateLevel();
    this.x = 202;
    this.y = 404;
  }
};

//Player render() method used to draw the player on the screen

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player handleInput() method. This method is the one responsable for the player movement.

Player.prototype.handleInput = function(key) {
  switch (key) {
    case "left":
      this.x -= 100;
      break;
    case "up":
      this.y -= 80;
      break;
    case "right":
      this.x += 100;
      break;
    case "down":
      this.y += 80;
      break;
  }
};

///////////////////////// OBJECTS INSTANTIATION //////////////////////

// Place all enemy objects in an array called allEnemies

var allEnemies = [];

// array with the board Y coordinate where the enemies will be created

var enemyRow = [60, 140, 220];

// creates an enemy for each Y coordinate in the board (the 3 stone rows)

enemyRow.forEach(function(y) {
  //for the 3rd parameter (speed) its used the math.random function to create random values for the enemies speed so they move different.
  var enemy = new Enemy(0, y, 150 + Math.floor(Math.random() * 400));
  allEnemies.push(enemy);
});

// Place the player object in a variable called player
// These values are determined by trial and error. These values indicate the start position of the player in the board.

var player = new Player(202, 404);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    // Each keyboard character has a keycode value.
    // In this case 37-38-39-40 represent each of the keyboard arrows
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

////////////////////////// OTHER FUNCTIONS /////////////////////////

// Variable to keep track of the levels

let level = 1;

// Function to update the level the player is.

function updateLevel() {
  level += 1;
  const levelUp = document.querySelector(".level");
  levelUp.innerHTML = level;
  if (level == 6) {
    checkWin();
    level -= 1;
    levelUp.innerHTML = level;
  }
}

// Function to check if the player has won

function checkWin() {
  if (level == 6) {
    const message = document.getElementById("winnerPopup");
    const playAgain = document.getElementById("playAgainButton");
    playAgain.addEventListener("click", function() {
      location.reload();
    });
    message.style.display = "block";
  }
}