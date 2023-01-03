const bg = document.getElementById("bg");
const btn = document.getElementById("btn")

spaceList = []
index = 0;
function start(){
    bg.classList.add("animatedBG")
    btn.remove()
    createGrid()
    speed = 1000
    setInterval(function(){
        if((index%16) === 0){
            console.log(index)
            speed = speed * 0.95
            console.log("The aliens are advancing faster!")
        }
        moveAliens(speed)
    }, 1000)
    
}

function moveAliens(sp){
    setInterval(function(){
        spaceList[index].classList.add("alien")
        index = index + 1
        console.log("Speed is " + sp)
        if(spaceList[index-24].classList.contains("alien")){
            spaceList[index-24].classList.remove("alien")
        }
        }, sp)
}

function createGrid(){
        y = 0
        x = 0
        o = 2
        l = false
        p = false
    for(let i = 0;i < 320; i++ ){
        space = document.createElement("div")
        space.classList.add("space")
        space.setAttribute("id", `space${i}`)
        document.body.insertBefore(space, bg)
        document.getElementById(`space${i}`).style.left = `calc(20vw + ${50*x}px)`
        document.getElementById(`space${i}`).style.top = `calc(${50*y}px)`
        if(x > 16 && o == 0){
            l = true
            o = 1
            y = y + 1
        } else if(x < 0 && o == 0){
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
        console.log(o)
        console.log(x)
        console.log(y)
        console.log(l)
        spaceList[i] = document.getElementById(`space${i}`)
    }
}
