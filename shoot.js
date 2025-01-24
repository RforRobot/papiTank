function fireInput() {

    if (keysDown['EndIsDown']) {
        if (keysDown['ShiftRightIsDown']) {
            for(const tank of bluePlayer.selectedTankGroup) {
                shoot(tank);
            }
         } else {
            shoot(bluePlayer.selectedTank);
        }
    }

    if (keysDown['KeyVIsDown']) {
        if (keysDown['ShiftLeftIsDown']) {
            for(const tank of redPlayer.selectedTankGroup) {
                shoot(tank);
            }
         } else {
            //new Shell(redPlayer.selectedTank);
            shoot(redPlayer.selectedTank);
        }
    }
}

function shoot(tank) {
    if(tank.ammoLoadState == 5) {
        new Shell(tank);
        pewSfx.play();
        tank.ammoLoadState = 0;
        tank.loadAmmo();
    } 
}

class Shell {

    static range = 500;
    speed = 300;
    static size = 5;
    // Coordinates    
    x;
    y;

    rCos;
    rSin;

    heading;

    constructor(tank) {
        this.x = tank.x + Tank.xSize * 3 / 5 * tank.rCos;
        this.y = tank.y + Tank.xSize * 3 / 5 * tank.rSin;

        this.rCos = tank.rCos;
        this.rSin = tank.rSin;

        this.heading = {
            x: tank.x + tank.rCos * Shell.range,
            y: tank.y + tank.rSin * Shell.range
        }

        shellList.push(this);
    }

    draw() {
        ctx.setLineDash([]);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.rCos * Shell.size, this.y + this.rSin * Shell.size);
        ctx.stroke();
    }
}