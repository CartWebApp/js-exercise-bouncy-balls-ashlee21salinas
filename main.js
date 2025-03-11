// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;



function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

let testBall = new Ball(50, 100, 4, 4, 'blue', 10);
testBall.draw()

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

function Particle(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
  this.life = 1;
}

Particle.prototype.update = function() {
  this.x += this.velX;
  this.y += thisvelY;
  this.size *= 0.98;
  this.life -= 0.02;
}

Particle.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = `rgba (${this.color}, ${this.life})`;
  ctx.arc(rhis.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[j].size) {
          this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0, 255) + ')';
          balls[j].color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';

          for (let i = 0; i < 10; i++) {
            let particle = new Particle(
              this.x,
              this.y,
              random(-5, 5),
              random(-5, 5),
              random(0, 255) + ',' + random(0,255), + ',' +  random(0, 255),
              random(2, 5)
            );
            particles.push(particle);
          }
        }
      }
    }
  }


let balls = [];
let particles = [];

while (balls.length < 4) {
  let size = random(10, 20);
  let ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')',
    size
  );

  balls.push(ball);
}

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  
    if(particles[i].life <= 0) {
      particles.splice(i, 1);
      i--;
    }
  } 
    
  requestAnimationFrame(loop);
}

loop();

