function groupToggleInput() {
    if (!keysDown['HomeIsDown']) {
        groupToggle(bluePlayer);
        keysDown['HomeIsDown'] = true;
    }
    if (!keysDown['KeyFIsDown']) {
        groupToggle(redPlayer);
        keysDown['KeyFIsDown'] = true;
    }
}

function groupToggle(player) {

//    console.log("Group toggling");

    var group = player.selectedTankGroup;
    var tank = player.selectedTank;

    if (group.indexOf(tank) === -1) {
        // Current Tank is not in the select group
        if (keysDown['ShiftRightIsDown']) {
            // clear group 
            // originally this also added the current tank
            group.length = 0;
        } else {
            // add the tank
            player.selectedTankGroup.push(tank);
        }
    } else {
        // Current Tank is in the select group
        if (keysDown['ShiftRightIsDown']) {
            // clear group
            group.length = 0;
        } else {
            // remove the tank
            group.splice(group.indexOf(tank), 1);
        }
    }
}

function tankSwitchInput() {

    if (keysDown['ShiftRightIsDown']) {
        if (!keysDown['PageDownIsDown']) {
            prevTank(bluePlayer, bluePlayer.selectedTankGroup);
            keysDown['PageDownIsDown'] = true;
        }
        if (!keysDown['PageUpIsDown']) {
            nextTank(bluePlayer, bluePlayer.selectedTankGroup);
            keysDown['PageUpIsDown'] = true;
        }
    } else {
        if (!keysDown['PageDownIsDown']) {
            prevTank(bluePlayer, bluePlayer.Tanks);
            keysDown['PageDownIsDown'] = true;
        }
        if (!keysDown['PageUpIsDown']) {
            nextTank(bluePlayer, bluePlayer.Tanks);
            keysDown['PageUpIsDown'] = true;
        }
    }

    if (keysDown['ShiftLeftIsDown']) {
        if (!keysDown['KeyBIsDown']) {
            prevTank(redPlayer, redPlayer.selectedTankGroup);
            keysDown['KeyBIsDown'] = true;
        }
        if (!keysDown['KeyGIsDown']) {
            nextTank(redPlayer, redPlayer.selectedTankGroup);
            keysDown['KeyGIsDown'] = true;
        }
    } else {
        if (!keysDown['KeyBIsDown']) {
            prevTank(redPlayer, redPlayer.Tanks);
            keysDown['KeyBIsDown'] = true;
        }
        if (!keysDown['KeyGIsDown']) {
            nextTank(redPlayer, redPlayer.Tanks);
            keysDown['KeyGIsDown'] = true;
        }
    }
}

function nextTank(player, group) {
    tankGroupIterator(player, group, 1);
}

function prevTank(player, group) {
    tankGroupIterator(player, group, -1);
}


function tankGroupIterator(player, group, direction) {

    var index = player.Tanks.indexOf(player.selectedTank);

    var stepCounter = 0;

    // negativeModCorrection
    var mod = player.Tanks.length;
    for (var i = index + direction; i != index; i = (mod + i + direction) % mod) {
      
        var tank = player.Tanks[i];
        if (group.indexOf(tank) !== -1) {
            player.selectedTank = tank;
        }

        stepCounter++;
        if (stepCounter > 7) break;
        // Note: in case this is the select group and is empty
        // no switch is made. This is as intended.
    }
}
