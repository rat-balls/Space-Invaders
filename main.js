const bg = document.getElementById("bg");
const btn = document.getElementById("btn");
const grid = document.getElementById("grid");
const sc = document.getElementById("sc")
const oScreen = document.createElement("div")
const GOM = new Audio("Musique/GameOverSong.mp3")
const Win = document.createElement("div")


spaceList = []
index = 0;
shipX = 45;
left = 0;
right = 0;
bullY = 100;
shot = 1;
n = 0;
started = 0;
pts = 0;
lost = false;
played = false;

document.onkeydown = checkKey;
document.onkeyup = checkKey2;

function start() {
    bg.classList.add("animatedBG")
    btn.remove()
    createGrid()
    score()
    updateScore()
    oScreen.classList.add("oScreen")
    oScreen.setAttribute("id", "oscreen")
    document.body.insertBefore(oScreen, bg)
    Win.classList.add("Win")
    Win.setAttribute("id", "Win")
    document.body.insertBefore(Win, bg)
    createPlayer()
    moveAliens(500)
    restart();
}

function restart() {
    var restart = document.createElement("button");
    restart.id = 'nouveau';
    restart.classList.add("restart");
    restart.addEventListener('click', restartGame);
    var texte = document.createTextNode('RESTART');
    restart.appendChild(texte);
    document.body.appendChild(restart);
}
function restartGame() {
    window.location.reload();
}

function score() {
    scoreBoard = document.createElement("p")
    scoreBoard.classList.add("scoreBoard")
    scoreBoard.setAttribute("id", "sc");
    document.body.insertBefore(scoreBoard, bg);
}

function updateScore() {
    scoreBoard.innerHTML = ""
    points = document.createTextNode(`Score : ${pts}`);
    scoreBoard.appendChild(points);
}

function moveAliens(sp) {
    x = 0
    y = 0
    l = false
    o = 2
    setInterval(function () {
        if (lost == false) {
            grid.style.left = `calc(21.05% + ${25 * (x)}px)`
            grid.style.top = `calc(6.5% + ${25 * y}px)`
            if (x == 4 && o == 0) {
                l = true
                o = 1
                y = y + 1
            } else if (x == -4 && o == 0) {
                l = false
                o = 1
                y = y + 1
            }
            if (l == true && o == 1) {
                x = x
                o = 2
            } else if (l == false && o == 1) {
                x = x
                o = 2
            } else if (l == false) {
                x = x + 1
                o = 0
            } else if (l == true) {
                x = x - 1
                o = 0
            } if (y > 17) {
                lost = true
            }
        }
    }, sp)
}

function createGrid() {
    y = 0
    x = 0
    o = 2
    l = false
    for (let i = 0; i < 36; i++) {
        space = document.createElement("div")
        space.classList.add("alien")
        space.setAttribute("id", `space${i}`)
        grid.appendChild(space)
        document.getElementById(`space${i}`).style.left = `calc(20vw + ${25 * x}px)`
        document.getElementById(`space${i}`).style.top = `calc(${25 * y}px)`
        if (x > 10 && o == 0) {
            l = true
            o = 1
            y = y + 1
        } else if (x == 0 && o == 0) {
            l = false
            o = 1
            y = y + 1
        }
        if (l == true && o == 1) {
            x = x
            o = 2
        } else if (l == false && o == 1) {
            x = x
            o = 2
        } else if (l == false) {
            x = x + 1
            o = 0
        } else if (l == true) {
            x = x - 1
            o = 0
        }
        spaceList[i] = document.getElementById(`space${i}`)
    }
}


const timer = document.createElement("p")
timer.classList.add("timer")
setTimeout(function () {
    timer.innerHTML = ""
    shot = 0;
    started = 1;
}, 500)

function createPlayer() {
    ship = document.createElement("div")
    ship.classList.add("ship")
    ship.setAttribute("id", "ship")
    document.body.insertBefore(ship, bg)
}

function checkKey(e) {
    e = e || window.event;
    if (lost == false) {
        if (e.keyCode == '37') {
            console.log("Pressed left")
            left = 1;
        }
        if (e.keyCode == '39') {
            console.log("Pressed right")
            right = 1;
        }
        if (e.keyCode == '32') {
            console.log("Pressed space")
            console.log(shot)
            if (shot == 0) {
                shoot()
            }
        }
    }
}

function checkKey2(e) {
    e = e || window.event;

    if (e.keyCode == '37') {
        left = 0;
    }
    if (e.keyCode == '39') {
        right = 0;
    }
}

setInterval(function () {
    shipP = document.getElementById("ship");

    if (left == 1) {
        console.log("Holding left")
        shipX = shipX - 0.5;
        if (shipX <= 35.5) {
            shipX = 35.5;
        }
        shipP.style.left = `${shipX}%`;
    }
    if (right == 1) {
        console.log("Holding right")
        shipX = shipX + 0.5;
        if (shipX >= 63) {
            shipX = 63;
        }
        shipP.style.left = `${shipX}%`;
    }
}, 10)

function shoot() {
    shot = 1;
    bullY = 62;
    bullet = document.createElement("div")
    bullet.classList.add("bullet")
    bullet.setAttribute("id", `bullet`)
    document.body.insertBefore(bullet, bg)
    bull = document.getElementById(`bullet`);
    bull.style.left = `${shipX + 0.45}%`;
    bull.style.top = `${bullY}%`
}

setInterval(function () {
    if (started == 1) {
        bull = document.getElementById(`bullet`);
        bullY = bullY - 1
        try {
            bull.style.top = `${bullY}%`
        } catch (error) {
            TypeError
        }
        if (bullY <= 0) {
            shot = 0;
        }
    }
}, 10)

setInterval(function () {
    for (i = 0; i < 36; i++) {
        try {
            alien = document.querySelector(`#space${i}`)
            bull = document.querySelector(`#bullet`);
            aXY = alien.getBoundingClientRect()
            bXY = bull.getBoundingClientRect()
            if (inRange(bXY.x, aXY.x, aXY.x + 49) && inRange(bXY.y, aXY.y, aXY.y + 30)) {
                console.log("Collision")
                bull.remove()
                alien.classList.add("explosion")
                pts = pts + 1;
                updateScore()
                setTimeout(function () {
                    exploded = document.querySelector(".explosion")
                    exploded.classList.remove("explosion")
                }, 200)
                alien.classList.remove("alien")

            }
        } catch (error) {
            TypeError
        }
    }
}, 10)

function inRange(x, min, max) {
    return ((x - min) * (x - max) <= 0);
}

/*
setInterval(function(){
    rnd = Math.floor(Math.random() * 10000)
    if(rnd > 9900){
        console.log("Shoot")
        rndAlien = Math.floor(Math.random() * 42)
        alien = document.querySelector(`#space${rndAlien}`)
        console.log("Alien div space" + rndAlien)
        aBullet = document.createElement("div")
        aBullet.classList.add("bullet")
        aBullet.setAttribute("id", `alienBullet`)
        document.body.insertBefore(aBullet, bg)
        aBull = document.getElementById(`alienBullet`);
        aXY = alien.getBoundingClientRect()
        aBx = aXY.x
        aBy = aXY.y
        aBullet.style.left = `${(aBx*0.1) - 10}%`;
        aBullet.style.top = `${aBy}%`
    }
}, 10)
*/

setInterval(function detectDivCollision() {
    for (let i = 0; i < 36; i++) {
        const alien = document.querySelector(`#space${i}`);
        const ship = document.querySelector("#ship");
        const pos1 = alien.getBoundingClientRect();
        const pos2 = ship.getBoundingClientRect();

        if (inRange(pos2.x, pos1.x, pos1.x + 49) && inRange(pos2.y, pos1.y, pos1.y + 30)) {
            console.log('Les divs sont en contact');
            lost = true;
            ship.style.backgroundColor = "red"
            const oscreen = document.getElementById("oscreen")
            oscreen.style.visibility = "visible";
            if (played == false) {
                GOM.play();
                played = true
            }
        }

    }
}, 10);

setInterval(function Win() {
    if (pts >= 36) {
        win();
    }
}, 100);

function win() {
    lost = true
    console.log("Vous avez gagné!");
    const win = document.getElementById("Win")
    win.style.visibility = "visible";
}
