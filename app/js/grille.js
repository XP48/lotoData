const numero = document.getElementById("numero")
const numero_chance = document.getElementById("numero-chance")

const numeroDisabled = document.getElementById("numero2")
const numero_chanceDisabled = document.getElementById("numero-chance2")
const numeroDisabled2 = document.getElementById("numero2")
const numero_chanceDisabled2 = document.getElementById("numero-chance2")
const numeroDisabled3 = document.getElementById("numero2")
const numero_chanceDisabled3 = document.getElementById("numero-chance2")
const numeroDisabled4 = document.getElementById("numero2")
const numero_chanceDisabled4 = document.getElementById("numero-chance2")

const numListe = [];
const numChanceListe = [];
const MAX_NUM = 5
const MAX_NUM_CHANCE = 1

numero.addEventListener("click", selected)
numero_chance.addEventListener("click", selected)


for (let index = 1; index <= 50; index++) {
    let num = document.createElement("div")
    num.classList.add("case")
    num.innerText = index
    numero.appendChild(num)
}

for (let index = 1; index <= 10; index++) {
    let num = document.createElement("div")
    num.classList.add("case")
    num.classList.add("chance")
    num.innerText = index
    numero_chance.appendChild(num)
}

function selected(event){
    if(event.target.classList.contains("case")){
        if(event.target.classList.contains("selected")){
            if(!(event.target.classList.contains("chance"))){
                const index = numListe.indexOf(event.target.innerText);
                if (index > -1) {
                    numListe.splice(index, 1);
                }
                 event.target.classList.toggle("selected")
            } else {
                const index = numChanceListe.indexOf(event.target.innerText);
            if (index > -1) {
                numChanceListe.splice(index, 1);
            }
             event.target.classList.toggle("selected")
            }
        } else {
            if(!(event.target.classList.contains("chance"))){
                if(!(numListe.length == MAX_NUM)){
                    numListe.push(event.target.innerText)
                    event.target.classList.toggle("selected")
                }
            } else {
                if(!(numChanceListe.length == MAX_NUM_CHANCE)){
                    numChanceListe.push(event.target.innerText)
                    event.target.classList.toggle("selected")
                }
            }
        }
    }
    console.log(numListe)
    console.log(numChanceListe)
}