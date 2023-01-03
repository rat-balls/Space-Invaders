function start(){
    bg.classList.add("animatedBG")
    btn.remove()
    setTimeout(function(){
        aliens.forEach(element => {
            setInterval(function() {moveInvader(element)} , 1000)}, 1000);
            iterations = iterations + 1
        });
}


function createGrid(){
        y = 0
        x = 0
    for(let i = 0;i < 120; i++ ){
        space = document.createElement("div")
        space.classList.add("space")
        space.setAttribute("id", `space${i}`)
        document.body.insertBefore(space, bg)
        document.getElementById(`space${i}`).style.left = `calc(20vw + ${50*x}px)`
        document.getElementById(`space${i}`).style.top = `calc(${50*y}px)`
        x = x + 1
        if(x >= 12){
            x = 0
            y = y + 1
        }
    }
}
