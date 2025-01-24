class Tank extends Target {

    static xSize = 60;
    static ySize = 35;

    static barrelSize = Math.PI / 15;

    constructor(x, y, r, color) {
        super(x, y, r);
        this.color = color;
    }

    circleColor = 'black';

    ammoLoadState = 5;

    rSin = Math.sin(this.r);
    rCos = Math.cos(this.r);

    // body
    bodyPoints = [
        [- Tank.xSize * 9 / 20, - Tank.ySize / 2],
        [- Tank.xSize * 9 / 20, + Tank.ySize / 2],
        [+ Tank.xSize * 11 / 20, + Tank.ySize / 2],
        [+ Tank.xSize * 11 / 20, - Tank.ySize / 2],
        [- Tank.xSize * 9 / 20, - Tank.ySize / 2]
    ];

    // barrel
    #bSin = Target.radius * Math.sin(Tank.barrelSize);
    #bCos = Target.radius * Math.cos(Tank.barrelSize);

    barrelPoints = [
        [this.#bCos, this.#bSin],
        [this.#bCos + Tank.xSize * 9 / 20, this.#bSin],
        [this.#bCos + Tank.xSize * 9 / 20, -this.#bSin],
        [this.#bCos, -this.#bSin]
    ];

    barrelPoints2 = [
        [this.#bCos + Tank.xSize * 8 / 20 + 1, Tank.ySize / 8],
        [this.#bCos + Tank.xSize * 10 / 20 + 1, Tank.ySize / 8],
        [this.#bCos + Tank.xSize * 10 / 20 + 1, -Tank.ySize / 8],
        [this.#bCos + Tank.xSize * 8 / 20 + 1, -Tank.ySize / 8]
    ];

    drawTank() {
        ctx.lineWidth = 2;

        ctx.fillStyle = this.color;
        ctx.strokeStyle = 'black';
        ctx.setLineDash([]);

        // body
        ctx.beginPath();
        this.rotateAndMove(this.bodyPoints);
        ctx.fill();

        ctx.beginPath();
        this.rotateAndMove(this.bodyPoints);
        ctx.stroke();

        // barrel
        
        ctx.fillStyle = 'lightgray';
        ctx.beginPath();
        this.rotateAndMove(this.barrelPoints);
        ctx.fill();

        ctx.strokeStyle = 'gray';
        ctx.beginPath();
        this.rotateAndMove(this.barrelPoints);
        ctx.stroke();


        ctx.beginPath();
        ctx.fillStyle = 'black';
        this.rotateAndMove(this.barrelPoints2);
        ctx.fill();


        // ammo
        this.drawAmmo();

        this.drawTarget('black', this.color);

    }

    rotateAndMove(points) {
        this.moveAlongPath(this.rotatePoints(points));
    }

    rotatePoints(points) {
        var rPoints = [];

        for (const point of points) {
            var rx = this.rCos * point[0] - this.rSin * point[1];
            var ry = this.rSin * point[0] + this.rCos * point[1];
            rPoints.push([rx, ry]);
        }

        return rPoints;
    }

    moveAlongPath(points) {
        ctx.moveTo(this.x + points[0][0], this.y + points[0][1]);
        for (const point of points.slice(1)) {
            ctx.lineTo(this.x + point[0], this.y + point[1]);
        }

    }

    drawAmmo() {

        // ammoSize calculation: five rectangles + four half size spaces between
        const ammoSize = Tank.ySize * 4 / 5 / (5 + 4 / 2);
        ctx.setLineDash([ammoSize, ammoSize / 2]);
        ctx.lineWidth = Tank.xSize * 1 / 12;

        ctx.strokeStyle = 'black';

        ctx.beginPath();
        this.rotateAndMove([
            [- Tank.xSize * 1 / 3, - Tank.ySize * 2 / 5],
            [- Tank.xSize * 1 / 3, Tank.ySize * 2 / 5]
        ])
        ctx.stroke();

        ctx.strokeStyle = 'white';
        if (this.ammoLoadState == 5) ctx.strokeStyle = 'lime';

        ctx.beginPath();
        this.rotateAndMove([
            [- Tank.xSize * 1 / 3, - Tank.ySize * 2 / 5],
            [- Tank.xSize * 1 / 3, Tank.ySize * (-2 + 4 * this.ammoLoadState / 5) / 5]
        ])
        ctx.stroke();

    }

    loadAmmo() {
        for (var i = 1; i <= 5; i++) {
            setTimeout(() => {
                this.ammoLoadState++;
            }, i * 1000);
        }
    }

    drawDirection() {

        const dirLength = Shell.range;
        const barrelLength = this.#bCos + Tank.xSize * 11 / 20 + 1;

        // segment length, space length
        ctx.setLineDash([6, 6]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'yellow';



        ctx.beginPath();
        ctx.moveTo(this.x + this.rCos * (barrelLength + 1), this.y + this.rSin * (barrelLength + 1));
        ctx.lineTo(this.x + this.rCos * dirLength, this.y + this.rSin * dirLength);
        ctx.stroke();

    }

    explode() {
        for (const player of players) {

            var index;

            if (this.color == player.playerColor) {

                new Explosion(this.x, this.y);

                setTimeout(() => { this.createRemains() }, 200);

                index = player.Tanks.indexOf(this);
                player.Tanks.splice(index, 1);
                index = player.selectedTankGroup.indexOf(this);
                if (index != -1) {
                    player.selectedTankGroup.splice(index, 1);
                }
                index = joinedTankList.indexOf(this);
                newJoinedTankList.splice(index, 1);

                if (this === player.selectedTank) {
                    if (player.Tanks.length > 0) {
                        nextTank(player, player.Tanks);
                    } else {
                        player.selectedTank = null;
                    }
                }

                break;
            }
        }
    }

    createRemains() {
        new Remains(this);
    }

}