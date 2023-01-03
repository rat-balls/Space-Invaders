const bg = document.getElementById("bg");
const btn = document.getElementById("btn")

spaceList = []
index = 0;
l = false

function start(){
    bg.classList.add("animatedBG")
    btn.remove()
    createGrid()
    moveAliens()
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
    for(let i = 0;i < 240; i++ ){
        space = document.createElement("div")
        space.classList.add("space")
        space.setAttribute("id", `space${i}`)
        document.body.insertBefore(space, bg)
        document.getElementById(`space${i}`).style.left = `calc(20vw + ${50*x}px)`
        document.getElementById(`space${i}`).style.top = `calc(${50*y}px)`
        if(l == true){
            x = x - 1
        } else {
            x = x + 1
        }
        if(x == 16){
            l = true
            y = y + 1
        } else if(x == 0){
            l = false
            y = y + 1
        }
        console.log(x)
        console.log(y)
        console.log(l)
        spaceList[i] = document.getElementById(`space${i}`)
    }
}