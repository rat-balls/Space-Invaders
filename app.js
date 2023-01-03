// const bg = document.getElementById("bg");
// const btn = document.getElementById("btn")

// function start(){
//     bg.classList.add("animatedBG")
//     btn.remove()
// )
const nbLignes = 10;
const nbColonnes = 10;
let x = 10;
let y = 10;

for (let i = 0; i < 240; i++){
    let trELt = document.createElement('tr');
    trELt.id = 'line-' + i;
    document.querySelector('#grille').appendChild(trELt);
}