const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];

createMaze = () => {
    for (i = 0; i < 15; i++) {
        const rowHolder = document.createElement("div");
        rowHolder.classList.add("mazeRows");
        rowHolder.id = "row" + (i + 1);
        rowHolderDestination = document.getElementById("mazeHolder");
        rowHolderDestination.appendChild(rowHolder);
        for (j = 0; j < 21; j++) {
            const cellHolder = document.createElement("div");
            cellHolder.classList.add("mazeRow" + (i + 1));
            cellHolder.classList.add("mazeCells")
            cellHolder.id = "spot" + ((map[0].length * i) + (j + 1));
            cellHolder.innerHTML = map[i][j];
            rowHolder.appendChild(cellHolder);
        }
    }
}
createMaze();

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}
finishedMaze = new sound("mazeFinishExplosion.mp3");

document.addEventListener('keydown', movePlayer);
let playerLocation = 191;

function movePlayer(playerMovement) {

    if (playerMovement.code === "ArrowUp") {
        if (document.getElementById("spot" + (playerLocation - 21)).innerHTML === " ") {
            document.getElementById("spot" + playerLocation).innerHTML = " ";
            playerLocation -= 21;
            document.getElementById("spot" + playerLocation).innerHTML = "P";
        }
    } else if (playerMovement.code === "ArrowDown") {
        if (document.getElementById("spot" + (playerLocation + 21)).innerHTML === " ") {
            document.getElementById("spot" + playerLocation).innerHTML = " ";
            playerLocation += 21;
            document.getElementById("spot" + playerLocation).innerHTML = "P";
        }
    } else if (playerMovement.code === "ArrowRight") {
        if (document.getElementById("spot" + (playerLocation + 1)).innerHTML === " ") {
            document.getElementById("spot" + playerLocation).innerHTML = " ";
            playerLocation += 1;
            document.getElementById("spot" + playerLocation).innerHTML = "P";
        } else if (document.getElementById("spot" + (playerLocation + 1)).innerHTML === "F") {
            finishedMaze.play();
            //Next two lines are to show I can do this without jquery without the animation
            //document.getElementById("contentHolder").style.display = "none";
            //document.getElementById("BOOMHolder").style.display = "block";
            $("#contentHolder").hide();
            $("#BOOMHolder").fadeIn(2000);
        }
    } else if (playerMovement.code === "ArrowLeft") {
        if (document.getElementById("spot" + (playerLocation - 1)).innerHTML === " ") {
            document.getElementById("spot" + playerLocation).innerHTML = " ";
            playerLocation -= 1;
            document.getElementById("spot" + playerLocation).innerHTML = "P";
        }
    }
    console.log(playerLocation);
}

document.getElementById("restartButton").onclick = () => {
    $("#BOOMHolder").hide();
    $("#contentHolder").show();
    playerLocation = 191;
    document.getElementById("spot191").innerHTML = "P";
    document.getElementById("spot188").innerHTML = " ";

}

window.onload = () => {
    $("#BOOMHolder").hide();
    //next line shows I can do this without jquery but without the animations
    //document.getElemenbById("BOOMHolder").style.display = none;
    document.getElementById("spot191").innerHTML = "P"
}