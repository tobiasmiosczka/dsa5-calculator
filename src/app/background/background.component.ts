import { Component, OnInit } from '@angular/core';

enum BallType {
  NORMAL,
  MOUSE
}

class Ball {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
  r: number = 0;
  phase: number = 0;
  ballType: BallType;

  constructor(x: number, y: number, vx: number, vy: number, r: number, phase: number, ballType: BallType) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.r = r;
    this.phase = phase;
    this.ballType = ballType;
  }
}

class Color {
  r: number = 0;
  g: number = 0;
  b: number = 0;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {

  private ballColor: Color = new Color(255, 255, 255);
  private lineAlpha: number = 0.3;
  private ballCount: number = 200;
  private ballSpeed: number = 0.5;
  private phaseSpeed: number = 0.01;
  private ballSizeMin: number = 1;
  private ballSizeMax: number = 5;
  private lineWidth: number = 0.8;
  private distanceLimit: number = 200;
  private animated: boolean = true;

  private balls = new Array<Ball>();
  private mouseBall: Ball = new Ball(0, 0, 0, 0, this.ballSizeMax, 0, BallType.MOUSE);
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private canvasWidth: number;
  private canvasHeight: number;

  private dx: number = 0;
  private dy: number = 0;

  private randomNum(min: number = 0, max: number): number{
    return Math.random() * (max - min) + min;
  }

  private getRandomBall(): Ball {
    switch(Math.floor(Math.random() * 4)){
      case 0:
        return new Ball(
          this.randomNum(0, this.canvasWidth),
          -this.distanceLimit,
          this.randomNum(-1, 1),
          this.randomNum(0.1, 1),
          this.randomNum(this.ballSizeMin, this.ballSizeMax),
          this.randomNum(0, 10),
          BallType.NORMAL);
      case 1:
        return new Ball(
          this.canvasWidth + this.distanceLimit,
          this.randomNum(0, this.canvasHeight),
          this.randomNum(-1, -0.1),
          this.randomNum(-1, 1),
          this.randomNum(this.ballSizeMin, this.ballSizeMax),
          this.randomNum(0, 10),
          BallType.NORMAL);
      case 2:
        return new Ball(
          this.randomNum(0, this.canvasWidth),
          this.canvasHeight + this.distanceLimit,
          this.randomNum(-1, 1),
          this.randomNum(-1, -0.1),
          this.randomNum(this.ballSizeMin, this.ballSizeMax),
          this.randomNum(0, 10),
          BallType.NORMAL);
      case 3:
        return new Ball(
          -this.distanceLimit,
          this.randomNum(0, this.canvasHeight),
          this.randomNum(0.1, 1),
          this.randomNum(-1, 1),
          this.randomNum(this.ballSizeMin, this.ballSizeMax),
          this.randomNum(0, 10),
          BallType.NORMAL);
    }
  }

  private renderBalls(): void {
    Array.prototype.forEach.call(this.balls, b => {
      this.ctx.fillStyle = 'rgba(' + this.ballColor.r + ',' + this.ballColor.g + ',' + this.ballColor.b + ',' + Math.abs(Math.cos(b.phase)) + ')';
      this.ctx.beginPath();
      this.ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, true);
      this.ctx.closePath();
      this.ctx.fill();
    });
  }

  private updateBalls(): void {
    let new_balls = new Array<Ball>();
    Array.prototype.forEach.call(this.balls, b => {

      if (b.ballType == BallType.NORMAL) {
        b.x += (b.vx + (this.dx * (b.r + 5) * 0.5)) * this.ballSpeed;
        b.y += (b.vy + (this.dy * (b.r + 5) * 0.5)) * this.ballSpeed;
      }
      if (b.x >= -(this.distanceLimit) && b.x <= (this.canvasWidth + this.distanceLimit) && b.y >= -(this.distanceLimit) && b.y <= (this.canvasHeight + this.distanceLimit)) {
        b.phase += this.phaseSpeed;
        new_balls.push(b);
      }
    });
    this.balls = new_balls.slice(0);

    if (this.balls.length < this.ballCount) 
      this.balls.push(this.getRandomBall());
  }

  private renderLines(): void {
    let fraction: number;
    for (let i: number = 0; i < this.balls.length; i++) {
      for (let j: number = i + 1; j < this.balls.length; j++) {
        fraction = this.getDistance(this.balls[i], this.balls[j]) / this.distanceLimit;
        if (fraction < 1){
          this.ctx.strokeStyle = 'rgba(' + this.ballColor.r + ', ' + this.ballColor.g + ', ' + this.ballColor.b + ', ' + (1 - fraction) * this.lineAlpha + ')';
          this.ctx.lineWidth = this.lineWidth;
          this.ctx.beginPath();
          this.ctx.moveTo(this.balls[i].x, this.balls[i].y);
          this.ctx.lineTo(this.balls[j].x, this.balls[j].y);
          this.ctx.stroke();
          this.ctx.closePath();
        }
      }
    }
  }

  private getDistance(b1: Ball, b2: Ball): number {
    let delta_x: number = Math.abs(b1.x - b2.x);
    let delta_y: number = Math.abs(b1.y - b2.y);
    return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
  }

  private loop(): void {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.renderLines();
    this.renderBalls();
    if (this.animated)
      this.updateBalls();
    window.requestAnimationFrame(() => this.loop());
  }
  
  private initCanvas(): void {
    this.canvas.setAttribute('width', "" + window.innerWidth);
    this.canvas.setAttribute('height', "" + window.innerHeight);
    this.canvasWidth = parseInt(this.canvas.getAttribute('width'));
    this.canvasHeight = parseInt(this.canvas.getAttribute('height'));
    this.ballCount = Math.floor(this.canvasWidth * this.canvasHeight * 0.0001);
  }

  constructor() { }

  ngOnInit(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById('background');
    this.ctx = this.canvas.getContext('2d'); 

    window.addEventListener('resize', () => this.initCanvas());
    this.canvas.addEventListener('mouseenter', () => this.balls.push(this.mouseBall));
    this.canvas.addEventListener('mouseleave', () => this.balls.splice(this.balls.indexOf(this.mouseBall), 1));
    this.canvas.addEventListener('click', () => this.animated = !this.animated);

    window.addEventListener('mousemove', (e) => {
      this.mouseBall.x = e.pageX;
      this.mouseBall.y = e.pageY;
      this.dx = 2 * (window.innerWidth / 2 - e.pageX) / window.innerWidth;
      this.dy = 2 * (window.innerHeight / 2 - e.pageY) / window.innerHeight;
    });

    this.initCanvas();

    for (let i: number = 1; i <= this.ballCount; i++){
      this.balls.push(new Ball(
        this.randomNum(0, this.canvasWidth),
        this.randomNum(0, this.canvasHeight),
        this.randomNum(-1, 1),
        this.randomNum(-1, 1),
        this.randomNum(this.ballSizeMin, this.ballSizeMax),
        this.randomNum(0, 10),
        BallType.NORMAL
      ));
    }
    window.requestAnimationFrame(() => this.loop());
  }
}