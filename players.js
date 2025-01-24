class Player {

    payerIndex;
    playerColor;

    selectionColor = 'yellow';

    // 0 faces to the right, Math.PI faces left
    playerDirection;

    // TODO: move this const elsewhere later
    static startingTanks = 7;

    Tanks = [];

    selectedTankGroup = [];

    selectedTank;

    constructor(playerIndex, playerColor, playerDirection) {
        this.playerIndex = playerIndex;
        this.playerColor = playerColor;
        this.playerDirection = playerDirection;

        // TODO: move constant elsewhere
        var x = 50;
        if (playerDirection == Math.PI) x = canvas.width - 50;


        for (var i = 0; i < Player.startingTanks; i++) {

            var tank = new Tank(x, 50 + i * 100, playerDirection,playerColor);

            this.Tanks.push(tank);
        }

        this.selectedTank = this.Tanks[0];

    }
}