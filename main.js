const bg = document.getElementById("bg");
const btn = document.getElementById("btn");
const grid = document.getElementById("grid");
const d = document.getElementById("d");
const body = document.body;

spaceList = []
index = 0;
shipX = 45;
left = 0;
right = 0;
bullY = 100;
shot = 1;
n = 0;
started = 0;

document.onkeydown = checkKey;
document.onkeyup = checkKey2;

function start() {
    bg.classList.add("animatedBG")
    btn.remove()
    createGrid()
    createPlayer()
    startTimer()
    setTimeout(function(){
        moveAliens(300)
    }, 3000)
    restart();
}
function restart(){
    var restart = document.createElement("button");
    restart.id = 'restart';
    restart.classList.add("restart");
    restart.addEventListener('click', restartGame);
    var texte = document.createTextNode('RESTART');
    restart.appendChild(texte);
    document.body.appendChild(restart);
}
function restartGame(){
    window.location.reload();
}

function moveAliens(sp) {
    x = 0
    y = 0
    l = false
    o = 2
    setInterval(function () {
        grid.style.left = `calc(-10% + ${49 * (x)}px)`
        grid.style.top = `calc(0vw + ${49 * y}px)`
        if (x == 9 && o == 0) {
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
    }, sp)
}

function createGrid(){
        y = 0
        x = 0
        o = 2
        l = false
    for(let i = 0;i < 42; i++ ){
        space = document.createElement("div")
        space.classList.add("alien")
        space.setAttribute("id", `space${i}`)
        grid.appendChild(space)
        document.getElementById(`space${i}`).style.left = `calc(20vw + ${50*x}px)`
        document.getElementById(`space${i}`).style.top = `calc(${50*y}px)`
        if(x > 12 && o == 0){
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

function startTimer() {
    const timer = document.createElement("p")
    timer.classList.add("timer")
    setTimeout(function () {
        timer.innerHTML = ""
        shot = 0;
        started = 1;
    }, 5000)
    setTimeout(function () {
        timer.innerHTML = ""
        const go = document.createTextNode("GO!!");
        timer.appendChild(go);
        document.body.insertBefore(timer, bg);
    }, 4000)
    setTimeout(function () {
        timer.innerHTML = ""
        const five = document.createTextNode("1");
        timer.appendChild(five);
        document.body.insertBefore(timer, bg);
    }, 3000)
    setTimeout(function () {
        timer.innerHTML = ""
        const four = document.createTextNode("2");
        timer.appendChild(four);
        document.body.insertBefore(timer, bg);
    }, 2000)
    setTimeout(function () {
        timer.innerHTML = ""
        const three = document.createTextNode("3");
        timer.appendChild(three);
        document.body.insertBefore(timer, bg);
    }, 1000)
}

function createPlayer() {
    ship = document.createElement("div")
    ship.classList.add("ship")
    ship.setAttribute("id", "ship")
    document.body.insertBefore(ship, bg)
}

function checkKey(e) {
    e = e || window.event;

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
        if (shipX <= 10) {
            shipX = 10;
        }
        shipP.style.left = `${shipX}%`;
    }
    if (right == 1) {
        console.log("Holding right")
        shipX = shipX + 0.5;
        if (shipX >= 85) {
            shipX = 85;
        }
        shipP.style.left = `${shipX}%`;
    }
}, 10)

function shoot() {
    shot = 1;
    bullY = 90;
    bullet = document.createElement("div");
    bullet.classList.add("bullet");
    bullet.setAttribute("id", `bullet`);
    document.body.insertBefore(bullet, bg);
    bull = document.getElementById(`bullet`);
    bull.style.left = `${shipX+1.8}%`;
    bull.style.top = `${bullY}%`
}

setInterval(function () {
    if (started == 1) {
        bull = document.getElementById(`bullet`);
        bullY = bullY - 1;
        try {
            bull.style.top = `${bullY}%`;
        } catch (error) {
            TypeError;
        }
        if (bullY <= 0) {
            shot = 0;
        }
    } 
}, 10)

setInterval(function () {
    for (i = 0; i < 42; i++) {
        try {
            alien = document.querySelector(`#space${i}`);
            bull = document.querySelector(`#bullet`);
            aXY = alien.getBoundingClientRect()
            bXY = bull.getBoundingClientRect()
            if(inRange(bXY.x, aXY.x, aXY.x + 49) && inRange(bXY.y, aXY.y, aXY.y + 30)){
                console.log("Collision")
                bull.classList.remove("bullet")
                bull.setAttribute("id", "")
                alien.classList.add("explosion")
                setTimeout(function(){
                    exploded = document.querySelector(".explosion")
                    exploded.classList.remove("explosion")
                }, 200)
                alien.classList.remove("alien")
                
            }
        } catch (error) {
            TypeError;
        }
    }
}, 10)

function inRange(x, min, max) {
    return ((x - min) * (x - max) <= 0);
}

setInterval(function detectDivCollision() {
    for (i = 0; i < 42; i++) {
        alien = document.querySelector(`#space${i}`);
        ship = document.querySelector("#ship");

        pos1 = alien.getBoundingClientRect();
        pos2 = ship.getBoundingClientRect();

        if (inRange(pos2.x, pos1.x, pos1.x + 49) && inRange(pos2.y, pos1.y, pos1.y + 30)) {
            console.log('Les divs sont en contact');
        }
    }
}, 10)

setInterval(meteor, 600);
function meteor(){
    const meteor = document.createElement('img');
    meteor.src = "./assets/asteroid.png";
    meteor.classList.add('asteroid');
    meteor.style.height = '30px';
    meteor.style.animationDuration = '5s';
    meteor.style.left = Math.random() * window.innerWidth + 'px';

    body.appendChild(meteor);

    setTimeout(() => {
        meteor.remove();
    },10000)
}
