const bg = document.getElementById("bg");
const btn = document.getElementById("btn")

spaceList = []
index = 0;
l = false

function start(){
    bg.classList.add("animatedBG")
    btn.remove()
    createGrid()
    createAliens()
}

function moveAliens(){
    setInterval(function(){
        spaceList[index].classList.add("alien")
        index = index + 1
        if(spaceList[index-12].classList.contains("alien")){
            spaceList[index-12].classList.remove("alien")
        }
        }, 1000)
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
        console.log(x)
        console.log(y)
        console.log(l)
        spaceList[i] = document.getElementById(`space${i}`)
    }
}

function createVaisseau(){
    vaisseau = document.createElement("img");
    vaisseau.classList.add("vaisseau");
    document.getElementById("vaisseau").addChild('<img src="./assets/space-invaders.png" alt="vaisseau">')
}