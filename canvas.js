// Wrapper
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function drawIt() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const remains of remainsList) {
        remains.draw();
    }

    for (const player of players) {
        for (const tank of player.Tanks) {
            tank.drawTank();
        }
    }

    for (const player of players) {
        for (const tank of player.selectedTankGroup) {
            tank.drawTarget(player.selectionColor, tank.color);
            // tank.drawDirection();
        }

        if (player.selectedTank !== null) {
            player.selectedTank.drawTarget('black', player.selectionColor);
            player.selectedTank.drawDirection();
        }
    }

    for (const shell of shellList) {
        shell.draw();
    }

    for (const expl of explosionList) {
        expl.draw();
    }

}