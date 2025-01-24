const fullField = canvas.width + canvas.height;
const midField = fullField / 2

const creepSpeed = 2.25;

var gameOverState = midField + 100 * creepSpeed;
var winner;

var stalemateMusic = new Audio('assets/miert.mp3');
var redMusic = new Audio('assets/amuri.mp3');
var blueMusic = new Audio('assets/carmagnole.mp3');

function intro() {

    if (gameOverState > 0 && winner == undefined) {
        gameOverState -= creepSpeed;

        var creepPosition = Math.min(midField, gameOverState);

        redCreep(creepPosition);
        blueCreep(creepPosition);

        var transparency = (creepPosition / midField) ** 2;

        ctx.strokeStyle = `rgba(0,0,0,${transparency})`;
        ctx.setLineDash([]);
        ctx.lineWidth = 2;

        ctx.fillStyle = `rgba(255,255,255,${transparency})`;
        ctx.font = '120px serif';
        ctx.textAlign = 'center';
        const ratio = 0.42;
        ctx.fillText("Papi", canvas.width * ratio, canvas.height * ratio);
        ctx.fillText("Tank", canvas.width * (1 - ratio), canvas.height * (1 - ratio));
        ctx.strokeText("Papi", canvas.width * ratio, canvas.height * ratio);
        ctx.strokeText("Tank", canvas.width * (1 - ratio), canvas.height * (1 - ratio));
    } else if (winner == undefined) {
        gameOverState = 0;
    }
}


function gameOver() {

    if (gameOverState == 0) {
        if (redPlayer.Tanks.length == 0 && bluePlayer.Tanks.length == 0) {
            // stalemate
            winner = null;
            stalemateMusic.play();
        } else if (bluePlayer.Tanks.length == 0) {
            // red wins
            winner = 0;
            redMusic.play();
        } else {
            // blue wins
            winner = 1;
            blueMusic.play();
        }
    }


    if (winner == null) {
        redCreep(gameOverState);
        blueCreep(gameOverState);

        if (gameOverState < canvas.height * 3 / 2) {
            gameOverState += creepSpeed;
        } else {
            ctx.fillStyle = 'white';
            ctx.font = '120px serif';
            ctx.textAlign = 'center';
            ctx.fillText("Stalemate", canvas.width / 2, canvas.height / 2);
        }
    }

    if (winner != null) {
        if (gameOverState < midField) {
            gameOverState += creepSpeed;
            redCreep(gameOverState);
            blueCreep(gameOverState);
        } else {
            if (winner == 0) { // red wins
                redCreep(gameOverState);
                // blue uncreep
                blueCreep(2 * midField - gameOverState);
            } else { // blue wins
                blueCreep(gameOverState);
                // red uncreep
                redCreep(2 * midField - gameOverState);
            }
            if (gameOverState < fullField) {
                gameOverState += creepSpeed;
            } else {
                ctx.fillStyle = 'white';
                ctx.font = '120px serif';
                ctx.textAlign = 'center';
                if (winner == 0) {
                    ctx.fillText("Red Victory", canvas.width / 2, canvas.height / 2);
                } else {
                    ctx.fillText("Blue Victory", canvas.width / 2, canvas.height / 2);
                }
            }
        }
    }
}

function redCreep(extent) {
    ctx.fillStyle = 'rgba(255,0,0,0.8)';
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(0, canvas.height - extent);
    ctx.lineTo(extent, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fill();
}

function blueCreep(extent) {
    ctx.fillStyle = 'rgba(0,0,255,0.8)';
    ctx.beginPath();
    ctx.moveTo(canvas.width, 0);
    ctx.lineTo(canvas.width, extent);
    ctx.lineTo(canvas.width - extent, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.fill();
}