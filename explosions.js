class Explosion {

    x;
    y;

    timer = 0;

    static finalSize = 50;

    constructor(x, y) {
        this.x = x;
        this.y = y;

        explosionList.push(this);
        this.explode();
    }

    explode() {

        for (var i = 1; i <= 800; i++) {
            setTimeout(() => {
                this.timer++;
            }, i * 4);
        }
        boomSfx.play();

    }

    draw() {

        var size = Math.min(Explosion.finalSize, this.timer);;
        var size2 = Math.min(50, this.timer / 2) % Explosion.finalSize;
        var size3 = Math.min(50, this.timer / 4) % Explosion.finalSize;

        var transparency =
            Math.min(1,
                Math.max(0,
                    4 / 3 - this.timer / 600));


        ctx.fillStyle = `rgba(0,0,0,${transparency})`;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, size, size, 0, 0, 2 * Math.PI)
        ctx.fill();

        ctx.fillStyle = 'rgb(250,0,0)';
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, size2, size2, 0, 0, 2 * Math.PI)
        ctx.fill();

        ctx.fillStyle = 'rgb(240,240,0)';
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, size3, size3, 0, 0, 2 * Math.PI)
        ctx.fill();

    }

}

class Remains {

    x;
    y;

    color;

    static radius = 40;
    static maxSize = 8;

    pieces = [];


    constructor(tank) {
        this.x = tank.x;
        this.y = tank.y;
        this.color = tank.color;

        remainsList.push(this);
        this.createPieces();
    }

    createPieces() {
        for (var i = 0; i < 60; i++) {
            var d = Math.floor(Math.random() * Remains.radius);
            var r = Math.random() * Math.PI * 2;

            var x = Math.floor(d * Math.cos(r));
            var y = Math.floor(d * Math.sin(r));
            var xLength = Math.floor(1 + Math.random() * Remains.maxSize);
            var yLength = Math.floor(1 + Math.random() * Remains.maxSize);

            this.pieces.push({ x: x, y: y, xLength: xLength, yLength: yLength });
        }
    }

    draw() {
        for (const piece of this.pieces) {
            ctx.fillStyle = this.color;
            ctx.fillRect(
                this.x + piece.x,
                this.y + piece.y,
                piece.xLength, piece.yLength);

            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.rect(
                this.x + piece.x,
                this.y + piece.y,
                piece.xLength, piece.yLength); // Add a rectangle to the current path
            ctx.stroke(); 
        }
    }

}