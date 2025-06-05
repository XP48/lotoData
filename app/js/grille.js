const numero = document.getElementById("numero")

for (let index = 1; index < 50; index++) {
    console.log(index)
    let num = document.createElement("div")
    num.classList.add("case")
    num.innerText = index
    numero.appendChild(num)
}