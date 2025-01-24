class Target {

  // Coordinates
  x;
  y;

  // Rotation (direction)
  r;

  circleColor = 'black';
  speed = 0;

  static radius = 14;

  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  isHit(x, y) {
    let distSquared = (this.x - x) ^ 2 + (this.y - y) ^ 2;

    return (distSquared < radius ^ 2);

  }

  drawTarget(strokeColor = 'black', fillColor = 'black') {
    
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, Target.radius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.strokeStyle = strokeColor;
    ctx.setLineDash([]);
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(this.x, this.y, Target.radius, 0, 2 * Math.PI);
    ctx.stroke();

    
    ctx.fillStyle = 'lightgray';
    ctx.beginPath();
    ctx.arc(this.x + this.rSin * 5, this.y - this.rCos * 5, Target.radius/3, 0, 2 * Math.PI);
    ctx.fill();

  }

}