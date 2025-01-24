
function main(tFrame) {

    window.requestAnimFrame(main);

    // getting player inputs
    if (gameOverState == 0) {
        for (const player of players) {
            applyMovement(player.playerIndex);
            fireInput();
            groupToggleInput();
            tankSwitchInput();
        }
    }

    // moving stuff
    for (const player of players) {
        for (const tank of player.Tanks) {
            moveObjects(tank);
        }
    }

    for (const shell of shellList) {
        moveObjects(shell);
    }

    // Checking for collisions and hits
    joinedTankList = newJoinedTankList;
    var jTLLength = joinedTankList.length;


    for (var i = 1; i < jTLLength; i++) {
        for (var j = 0; j < i; j++) {
            collisionCheck(joinedTankList[i], joinedTankList[j]);
        }
    }

    for (const tank of joinedTankList) {
        for (const shell of shellList) {
            collisionCheck(tank, shell);
        }
    }

    // keeping tanks within canvas borders
    for (const tank of joinedTankList) {
        if (typeof tank === 'undefined') continue;
        bounceCheck(tank);
    }

    // TODO: audio
    // nice to have: trackmarks as path

    drawIt();


    intro();

    if (redPlayer.Tanks.length == 0 || bluePlayer.Tanks.length == 0) {
        gameOver();
    }

}

function collisionCheck(obj1, obj2) {

    if (typeof obj1 === 'undefined') return;
    if (typeof obj2 === 'undefined') return;

    var criticalDist = Target.radius * 2

    if (obj2 instanceof Shell) {
        criticalDist /= 2;
    }

    if ((obj1.x - obj2.x) ** 2 + (obj1.y - obj2.y) ** 2 < criticalDist ** 2) {

        obj1.explode();

        if (obj2 instanceof Tank) {
            obj2.explode();
        } else {
            // remove shell
            shellList.splice(shellList.indexOf(obj2), 1);
        }
    }

}

function bounceCheck(tank) {
    if (tank.x < 0 || tank.x > canvas.width ||
        tank.y < 0 || tank.y > canvas.height) {
        tank.x = Math.max(Math.min(tank.x, canvas.width - 3), 3);
        tank.y = Math.max(Math.min(tank.y, canvas.height - 3), 3);
        tank.speed = -3 * Math.sign(tank.speed);
    }
}

// function to test game over feature
function armageddon() {
    for (const player of players) {
        const num = player.Tanks.length;
        for (var i = 0; i < num; i++) {
            player.Tanks[0].explode();
        }
    }
}

const redPlayer = new Player(0, 'red', 0);

const bluePlayer = new Player(1, 'blue', Math.PI);

var joinedTankList = bluePlayer.Tanks.concat(redPlayer.Tanks);

// shallow copy
var newJoinedTankList = [...joinedTankList];

const players = [redPlayer, bluePlayer];

var shellList = [];

var remainsList = [];

var explosionList = [];

main();