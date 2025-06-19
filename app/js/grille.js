const numero = document.getElementById("numero");
const numero_chance = document.getElementById("numero-chance");

const numeroDisabled = document.getElementById("numero2");
const numero_chanceDisabled = document.getElementById("numero-chance2");
const numeroDisabled2 = document.getElementById("numero3");
const numero_chanceDisabled2 = document.getElementById("numero-chance3");
const numeroDisabled3 = document.getElementById("numero4");
const numero_chanceDisabled3 = document.getElementById("numero-chance4");
const numeroDisabled4 = document.getElementById("numero5");
const numero_chanceDisabled4 = document.getElementById("numero-chance5");

const numListe = [];
const numChanceListe = [];
const MAX_NUM = 5;
const MAX_NUM_CHANCE = 1;

const boules = [
  document.getElementById("boule1"),
  document.getElementById("boule2"),
  document.getElementById("boule3"),
  document.getElementById("boule4"),
  document.getElementById("boule5"),
  document.getElementById("boule6"),
];

const somme = document.getElementById("somme");
const date = document.getElementById("date");

numero.addEventListener("click", selected);
numero_chance.addEventListener("click", selected);

async function checkCombinaison() {
  const gains = new Map([
    ["0n1c", 2], //0 numero 1 chance
    ["1n1c", 2],
    ["2n0c", 5],
    ["2n1c", 7],
    ["3n0c", 10],
    ["3n1c", 12],
    ["4n0c", 1086],
    ["4n1c", 1088],
    ["5n0c", 102634],
    ["5n1c", 5701258],
  ]);

  const combinaisons = await loadCSV();

  const nums = numListe.map((n) => parseInt(n)).sort((a, b) => a - b);
  const chance = parseInt(numChanceListe[0]);

  let meilleurGain = 0;
  let meilleureCombinaison = null;

  for (const combinaison of combinaisons) {
    const [boules, numChance] = combinaison.split("+");
    const combiBoules = boules.split("-").map((n) => parseInt(n));
    const combiChance = parseInt(numChance);

    let nbCorrects = 0;
    for (const num of nums) {
      if (combiBoules.includes(num)) {
        nbCorrects++;
      }
    }

    let nbChance;
    if (chance === combiChance) {
      nbChance = 1;
    } else {
      nbChance = 0;
    }
    const key = `${nbCorrects}n${nbChance}c`;

    if (gains.has(key)) {
      const gain = gains.get(key);
      if (gain > meilleurGain) {
        meilleurGain = gain;
        meilleureCombinaison = {
          key,
          gain,
          nums: combiBoules,
          chance: combiChance,
        };
      }
    }
  }

  if (meilleurGain > 0) {
    somme.innerText = meilleurGain + "€";
    date.innerText = ``;
    console.log(
      `Tu aurais gagner ${meilleurGain}€ avec ${
        meilleureCombinaison.key
      } (${nums.join(",")} + ${chance})`
    );
    console.log(
      `Combinaison : ${meilleureCombinaison.nums.join(",")} + ${
        meilleureCombinaison.chance
      }`
    );
    return meilleurGain;
  } else {
    console.log("0€");
    return 0;
  }
}

for (let index = 1; index <= 50; index++) {
  let num = document.createElement("div");
  num.classList.add("case");
  num.innerText = index;
  numero.appendChild(num);

  let copy = num.cloneNode(true);
  copy.classList.add("disabled");
  numeroDisabled.appendChild(copy);
  let copy2 = num.cloneNode(true);
  copy2.classList.add("disabled");
  numeroDisabled2.appendChild(copy2);
  let copy3 = num.cloneNode(true);
  copy3.classList.add("disabled");
  numeroDisabled3.appendChild(copy3);
  let copy4 = num.cloneNode(true);
  copy4.classList.add("disabled");
  numeroDisabled4.appendChild(copy4);
}

for (let index = 1; index <= 10; index++) {
  let num = document.createElement("div");
  num.classList.add("case");
  num.classList.add("chance");
  num.innerText = index;
  numero_chance.appendChild(num);

  let copy = num.cloneNode(true);
  copy.classList.add("disabled");
  numero_chanceDisabled.appendChild(copy);
  let copy2 = num.cloneNode(true);
  copy2.classList.add("disabled");
  numero_chanceDisabled2.appendChild(copy2);
  let copy3 = num.cloneNode(true);
  copy3.classList.add("disabled");
  numero_chanceDisabled3.appendChild(copy3);
  let copy4 = num.cloneNode(true);
  copy4.classList.add("disabled");
  numero_chanceDisabled4.appendChild(copy4);
}

function selected(event) {
  if (event.target.classList.contains("case")) {
    if (event.target.classList.contains("selected")) {
      if (!event.target.classList.contains("chance")) {
        const index = numListe.indexOf(event.target.innerText);
        if (index > -1) {
          numListe.splice(index, 1);
        }
        event.target.classList.toggle("selected");
      } else {
        const index = numChanceListe.indexOf(event.target.innerText);
        if (index > -1) {
          numChanceListe.splice(index, 1);
        }
        event.target.classList.toggle("selected");
      }
    } else {
      if (!event.target.classList.contains("chance")) {
        if (!(numListe.length == MAX_NUM)) {
          numListe.push(event.target.innerText);
          event.target.classList.toggle("selected");
        }
      } else {
        if (!(numChanceListe.length == MAX_NUM_CHANCE)) {
          numChanceListe.push(event.target.innerText);
          event.target.classList.toggle("selected");
        }
      }
    }
  }
  if (numChanceListe.length == MAX_NUM_CHANCE && numListe.length == MAX_NUM) {
    for (let i = 0; i < numListe.length; i++) {
      boules[i].innerText = numListe[i];
      console.log(`boule${i}`, numListe[i]);
    }
    boules[5].innerText = numChanceListe[0];
    console.log(numChanceListe);
    console.log(numListe);
    loadCSV();
    checkCombinaison();
  }
}

async function loadCSV() {
  const response = await fetch("./src/data/loto_201911.csv");
  const csvData = await response.text();
  const results = parseCSV(csvData);
  return results;
}

function parseCSV(csvText) {
  const lines = csvText.split("\n");
  const results = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line) {
      const columns = line.split(";");
      if (columns.length > 10) {
        results.push(columns[10]);
      }
    }
  }

  return results;
}
