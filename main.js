const bg = document.getElementById("bg");
const btn = document.getElementById("btn");
const grid = document.getElementById("grid");
const d = document.getElementById("d");

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

function start(){
    bg.classList.add("animatedBG")
    btn.remove()
    createGrid()
    createAliens()
}

function moveAliens(sp){
    x = 0
    y = 0
    l = false
    o = 2
    setInterval(function(){
       grid.style.left = `calc(-10% + ${49*(x)}px)`
       grid.style.top = `calc(0vw + ${49*y}px)`
       if(x == 9 && o == 0){
        l = true
        o = 1
        y = y + 1
    } else if(x == 0 && o == 0){
        l = false
        o = 1
        y = y + 1
    }
    if(l == true && o == 1){
        x = x
        o = 2
    } else if (l == false && o == 1){
        x = x
        o = 2
    } else if (l == false){
        x = x + 1
        o = 0
    } else if (l == true){
        x = x - 1
        o = 0
    }
        }, sp)
}

function createGrid(){
        y = 0
        x = 0
    for(let i = 0;i < 160; i++ ){
        space = document.createElement("div")
        space.classList.add("space")
        space.setAttribute("id", `space${i}`)
        document.body.insertBefore(space, bg)
        document.getElementById(`space${i}`).style.left = `calc(20vw + ${50*x}px)`
        document.getElementById(`space${i}`).style.top = `calc(${50*y}px)`
        x = x + 1
        if(x >= 16){
            x = 0
            y = y + 1
        }
        if(l == true && o == 1){
            x = x
            o = 2
        } else if (l == false && o == 1){
            x = x
            o = 2
        } else if (l == false){
            x = x + 1
            o = 0
        } else if (l == true){
            x = x - 1
            o = 0
        }
        spaceList[i] = document.getElementById(`space${i}`)
    }
}

function startTimer(){
    const timer = document.createElement("p")
    timer.classList.add("timer")
    setTimeout(function(){
        timer.innerHTML=""
        shot = 0;
        started = 1;
    }, 5000)
    setTimeout(function(){
        timer.innerHTML=""
        const go = document.createTextNode("GO!!");
        timer.appendChild(go);
        document.body.insertBefore(timer, bg);
    }, 4000)
    setTimeout(function(){
        timer.innerHTML=""
        const five = document.createTextNode("1");
        timer.appendChild(five);
        document.body.insertBefore(timer, bg);
    }, 3000)
    setTimeout(function(){
        timer.innerHTML=""
        const four = document.createTextNode("2");
        timer.appendChild(four);
        document.body.insertBefore(timer, bg);
    }, 2000)
    setTimeout(function(){
        timer.innerHTML=""
        const three = document.createTextNode("3");
        timer.appendChild(three);
        document.body.insertBefore(timer, bg);
    }, 1000)
}

function createPlayer(){
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
        if(shot == 0){
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
