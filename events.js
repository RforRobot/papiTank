// Listeners
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(event) {
    // console.log("Event.code " + event.code + " key is down.");
        
    keysDown[event.code + "IsDown"] = true;
}

function keyUpHandler(event) {
    // console.log("Event.code " + event.code + " key is up.");

    keysDown[event.code + "IsDown"] = false;
}