function movementInput() {
    var deltaRotation = [0, 0];
    var deltaVelocity = [0, 0];
    var group = [keysDown['ShiftLeftIsDown'], keysDown['ShiftRightIsDown']];

    if (keysDown['ArrowLeftIsDown']) deltaRotation[1] -= 1;
    if (keysDown['ArrowRightIsDown']) deltaRotation[1] += 1;
    if (keysDown['ArrowUpIsDown']) deltaVelocity[1] += 1;
    if (keysDown['ArrowDownIsDown']) deltaVelocity[1] -= 1;
    if (keysDown['KeyAIsDown']) deltaRotation[0] -= 1;
    if (keysDown['KeyDIsDown']) deltaRotation[0] += 1;
    if (keysDown['KeyWIsDown']) deltaVelocity[0] += 1;
    if (keysDown['KeySIsDown']) deltaVelocity[0] -= 1;

    return {
        deltaRotation: deltaRotation,
        deltaVelocity: deltaVelocity,
        group: group
    };

}

function applyMovement(playerNo) {

    var movement = movementInput();
    var deltaR = movement.deltaRotation[playerNo] / 100;
    var deltaSpeed = movement.deltaVelocity[playerNo];

    if (players[playerNo].selectedTank !== null) {
        if (movement.group[playerNo]) {
            for (const tank of players[playerNo].selectedTankGroup) {
                moveTank(tank, deltaR, deltaSpeed);
            }
        } else {
            var tank = players[playerNo].selectedTank;
            moveTank(tank, deltaR, deltaSpeed);
        }
    }
}

function moveTank(tank, deltaR, deltaSpeed) {

    var tank;

    // Change in rotation (no angular momentum)
    tank.r += deltaR;
    tank.rCos = Math.cos(tank.r);
    tank.rSin = Math.sin(tank.r);

    // Acceleration
    tank.speed += deltaSpeed;
    // TODO: move magic number
    const speedLimit = 100;
    tank.speed = Math.min(Math.max(tank.speed, -speedLimit), speedLimit);
}

function moveObjects(target) {

    var vx = target.rCos * target.speed;
    var vy = target.rSin * target.speed;

    //Change in position (momentum exists)
    target.x += vx / 100;
    target.y += vy / 100;

    if (target.heading !== undefined) {

        // console.log('distance:' + (Math.abs(target.heading.x - target.x) + Math.abs(target.heading.y - target.y)));

        // Explosion if shell is closer than 1.5 to 'heading'
        if (Math.abs(target.heading.x - target.x) + Math.abs(target.heading.y - target.y) < 1.5) {
            console.log('boom');
            const indexOfShell = shellList.indexOf(target);

            new Explosion(target.x, target.y);
            shellList.splice(indexOfShell, 1);
        }
    }
}



