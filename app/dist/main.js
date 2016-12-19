var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
// var spaceShip = createImg('images/spaceship.png', 'oies', 'oies')
// var spaceShip = document.getElementById('spaceShip');
var spaceShip = new Image;
spaceShip.src = 'images/spaceship.png';

var myGameArea = {
  keys: [],
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

var shooting = false;


function update() {
  ctx.clearRect(0, 0, c.width, c.height);
  if (myGameArea.keys && myGameArea.keys[37]) {
    ship.x-= ship.speed;
    if(!shooting) {
      laser.x-= ship.speed;
    }
  }
  if (myGameArea.keys && myGameArea.keys[39]) {
    ship.x+= ship.speed;
    if(!shooting) {
      laser.x+= ship.speed;
    }
  }
  if (myGameArea.keys && myGameArea.keys[38]) {
    ship.y-= ship.speed;
    if(!shooting) {
      laser.y-= ship.speed;
    }
  }
  if (myGameArea.keys && myGameArea.keys[40]) {
    ship.y+= ship.speed;
    if(!shooting) {
      laser.y+= ship.speed;
    }
  }
  if (myGameArea.keys && myGameArea.keys[32]) {
    shoot();
  }
  // ship
  ctx.drawImage(ship.img, ship.x, ship.y, ship.width, ship.height);
  if(shooting) {
    // laser
    ctx.rect(laser.x, laser.y, laser.width, laser.height);
    ctx.strokeStyle="#FF0000";
    ctx.stroke();
  }
}

function shoot(){
  console.log(shooting)
  if(!shooting) {
    shooting = true;
    var laserLife = setInterval(function() {
      laser.y-= laser.speed;
      if (laser.y + 10 < 0) {
        laser.y = ship.y;
        laser.x = ship.x
        shooting = false;
        window.clearInterval(laserLife);
        laserLife = false;
      }
    }, 10);
  }
}

var ship = {
  x: 0,
  y: 0,
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
  height: 2,
}
