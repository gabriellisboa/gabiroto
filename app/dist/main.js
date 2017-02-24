var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var spaceShip = new Image;
var score = 0;
spaceShip.src = 'images/spaceship1.png';

var levels = {
  one: 100,
  two: 300,
  three: 600,
  four: 1500,
  five: 5000,
};

var currentLevel = 1;

var points = 10;

window.onload = function () {
  c.width = window.innerWidth;
  c.height = window.innerHeight;

  ship.x = Math.floor((c.width / 2) - 25);
  ship.y = Math.floor(c.height -60);
}

var myGameArea = {
  keys: [],
  shooting: false,
  hasEnemy: false,
};

spaceShip.onload = function(){
  setInterval(function() {
    update();
  }, 10)
};



window.addEventListener('keydown', function (e) {
  myGameArea.keys = (myGameArea.keys || []);
  myGameArea.keys[e.keyCode] = true;
})

window.addEventListener('keyup', function (e) {
  myGameArea.keys[e.keyCode] = false;
})


function update() {
  if (myGameArea.keys && myGameArea.keys[37]) {
    if (ship.x - ship.speed > 0) {
        ship.x-= ship.speed;
    }
    if(!myGameArea.shooting) {
      laser.x-= ship.speed;
    }
  }
  if (myGameArea.keys && myGameArea.keys[39]) {
    if (ship.x + ship.speed < (c.width - ship.width)) {
        ship.x+= ship.speed;
    }
    if(!myGameArea.shooting) {
      laser.x+= ship.speed;
    }
  }
  if (myGameArea.keys && myGameArea.keys[38]) {
    if (ship.y - ship.speed > 0) {
      ship.y-= ship.speed;
    }
    if(!myGameArea.shooting) {
      laser.y-= ship.speed;
    }
  }
  if (myGameArea.keys && myGameArea.keys[40]) {
    if (ship.y + ship.speed < (c.height - ship.height)) {
      ship.y+= ship.speed;
    }
    if(!myGameArea.shooting) {
      laser.y+= ship.speed;
    }
  }
  if (myGameArea.keys && myGameArea.keys[32]) {
      if(!myGameArea.shooting) {
          myGameArea.shooting = true;
      }
  }

  ctx.clearRect(0, 0, c.width, c.height);
  // ship
  ctx.drawImage(ship.img, ship.x, ship.y, ship.width, ship.height);

  // laser
  if(myGameArea.shooting) {
    shoot();
  }
  if(!myGameArea.hasEnemy) {
      generateEnemy(Math.floor((Math.random() * c.width - 20) + 1));
  } else {
      moveEnemy();
  }

  // score
  ctx.font = '30px Arial';
  ctx.fillStyle = '#ff74d0'
  ctx.fillText("Score: " + score,10,50);

  ctx.font = '30px Arial';
  ctx.fillStyle = '#ff74d0'
  ctx.fillText("Level: " + currentLevel,c.width - 150, 50);
}

function generateEnemy(x) {
    myGameArea.hasEnemy = true;
    enemy.x = x;
    enemy.y = 0;
    enemy.img = new Image;
    var number = Math.floor(Math.random() * 3);
    enemy.img.src = 'images/monster' + number + '.png';
    ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
}

function moveEnemy() {
    ctx.beginPath();
    enemy.y += enemy.speed;
    ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
    if(enemy.y + enemy.height > c.height) {
        myGameArea.hasEnemy = false;
    }

    if((laser.x >= enemy.x && laser.x <= enemy.x + enemy.width) && (laser.y >= enemy.y && laser.y <= enemy.y + enemy.height)) {
        myGameArea.hasEnemy = false;
        myGameArea.shooting = false;
        updateScore();
    }

}

function shoot(){
    ctx.beginPath();
    laser.y-= laser.speed;
    ctx.rect(laser.x, laser.y, laser.width, laser.height);
    ctx.fillStyle="#fffb0f";
    ctx.fill();
    if (laser.y - laser.speed < 0) {
      laser.y = ship.y;
      laser.x = ship.x + 20
      myGameArea.shooting = false;
    }
}

function updateScore() {
    switch (score) {
      case levels.one:
          points = 20;
          enemy.speed = 3;
          laser.speed++;
          currentLevel++;
          break;
      case levels.two:
          points = 30;
          enemy.speed = 3.5;
          ship.speed = 6;
          laser.speed++;
          currentLevel++;
          break;
      case levels.three:
          points = 60;
          enemy.speed = 4;
          ship.speed = 7;
          laser.speed++;
          currentLevel++;
          break;
      case levels.four:
          points = 100;
          enemy.speed = 4.5;
          ship.speed = 8;
          laser.speed++;
          currentLevel++;
          break;
        case levels.five:
          points = 200;
          enemy.speed = 5;
          ship.speed = 9;
          laser.speed++;
          currentLevel++;
          break;
    }
    score+= points;
}

var ship = {
  x: Math.floor((c.width / 2)),
  y: c.height - 15,
  speed: 5,
  img: spaceShip,
  width: 50,
  height: 60,
}

var laser = {
  x: 0,
  y: 0,
  speed: 15,
  width: 8,
  height: 10,
}

var enemy = {
  x: 0,
  y: 0,
  speed: 2,
  width: 40,
  height: 28,
  img: '',
}
