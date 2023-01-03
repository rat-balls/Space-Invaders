function start(){
    bg.classList.add("animatedBG")
    btn.remove()
    createGrid()
    createAliens()
}

function createAliens(){
    for(let i = 0;i < 12; i++ ){
        document.getElementById(`space${i}`).classList.add("alien")
    }
}

function createGrid(){
        y = 0;
        x = 0;
    for(let i = 0;i < 160; i++ ){
        space = document.createElement("div");
        space.classList.add("space");
        space.setAttribute("id", `space${i}`);
        document.body.insertBefore(space, bg);
        document.getElementById(`space${i}`).style.left = `calc(20vw + ${50*x}px)`;
        document.getElementById(`space${i}`).style.top = `calc(${50*y}px)`;
        x = x + 1;
        if(x >= 16){
            x = 0;
            y = y + 1;
        }
    }
}
function createVaisseau(){
    x = 0;
    y = 0;
    
}
