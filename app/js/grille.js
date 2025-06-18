const numero = document.getElementById("numero");
const numero_chance = document.getElementById("numero-chance");

const numeroDisabled = document.getElementById("numero2");
const numero_chanceDisabled = document.getElementById("numero-chance2");
const numeroDisabled2 = document.getElementById("numero2");
const numero_chanceDisabled2 = document.getElementById("numero-chance2");
const numeroDisabled3 = document.getElementById("numero2");
const numero_chanceDisabled3 = document.getElementById("numero-chance2");
const numeroDisabled4 = document.getElementById("numero2");
const numero_chanceDisabled4 = document.getElementById("numero-chance2");

const numListe = [];
const numChanceListe = [];
const MAX_NUM = 5;
const MAX_NUM_CHANCE = 1;

numero.addEventListener("click", selected);
numero_chance.addEventListener("click", selected);

async function checkCombinaison() {
  const gains = new Map([
    ["0n1c", 2],
    ["1n1c", 2],
    ["2n0c", 5],
    ["2n1c", 5],
    ["3n0c", 10],
    ["3n1c", 10],
    ["4n0c", 1086],
    ["4n1c", 1086],
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

    let bonneChance;
    if (chance === combiChance) {
      bonneChance = 1;
    } else {
      bonneChance = 0;
    }
    const key = `${nbCorrects}n${bonneChance}c`;

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
}

for (let index = 1; index <= 12; index++) {
  let num = document.createElement("div");
  num.classList.add("case");
  num.classList.add("chance");
  num.innerText = index;
  numero_chance.appendChild(num);
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
