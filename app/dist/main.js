var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var spaceShip = new Image;
spaceShip.src = 'images/spaceship.png';

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
}

function generateEnemy(x) {
    myGameArea.hasEnemy = true;
    enemy.x = x;
    enemy.y = 0;
    ctx.beginPath();
    ctx.rect(enemy.x, enemy.y, enemy.width, enemy.height);
    ctx.strokeStyle="#ff23da";
    ctx.stroke();
}

function moveEnemy() {
    ctx.beginPath();
    enemy.y += enemy.speed;
    ctx.rect(enemy.x, enemy.y, enemy.width, enemy.height);
    ctx.strokeStyle="#ff23da";
    ctx.stroke();
    if(enemy.y + enemy.height > c.height) {
        myGameArea.hasEnemy = false;
    }

    if((laser.x >= enemy.x && laser.x <= enemy.x + enemy.width) && (laser.y >= enemy.y && laser.y <= enemy.y + enemy.height)) {
        myGameArea.hasEnemy = false;
        myGameArea.shooting = false;
    }

}

function shoot(){
    ctx.beginPath();
    laser.y-= laser.speed;
    ctx.rect(laser.x, laser.y, laser.width, laser.height);
    ctx.strokeStyle="#fffb0f";
    ctx.stroke();
    if (laser.y - laser.speed < 0) {
      laser.y = ship.y;
      laser.x = ship.x
      myGameArea.shooting = false;
    }
}

var ship = {
  x: Math.floor((c.width / 2) - 5),
  y: c.height - 15,
  speed: 1,
  img: spaceShip,
  width: 10,
  height: 15,
}

var laser = {
  x: 0,
  y: 0,
  speed: 5,
  width: 2,
  height: 5,
}

var enemy = {
  x: 0,
  y: 0,
  speed: .5,
  width: 10,
  height: 7,
}
