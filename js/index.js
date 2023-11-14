const planetButtons = document.querySelectorAll(".planets > aside"); // Väljer alla aside
const planetInfo = document.querySelector(".planets_info"); // Väljer var planetens information ska visas
const planetInfoElements = {
  name: document.getElementById("name"),
  latin: document.getElementById("latin"),
  desc: document.getElementById("desc"),
  circumference: document.getElementById("circumference"),
  distance: document.getElementById("distance"),
  maxTemp: document.getElementById("max_temp"),
  minTemp: document.getElementById("min_temp"),
  moons: document.getElementById("moons"),
};

let planetsData = []; // Skapar array som ska lagra json arrayen

async function retrieveAPI() {
  // Förfrågan om att hämta API-nyckeln
  const response = await fetch(
    "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys",
    {
      method: "POST",
    }
  );
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  console.log(data);
  // Returnerar API-nyckeln från datan
  return data.key;
}

// Hämtar planeter
async function getPlanets() {
  // Hämtar API
  const key = await retrieveAPI();
  if (!key) {
    console.log("o API key retrieved");
  }
  const response = await fetch(
    "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies",
    {
      headers: { "x-zocom": `${key}` },
    }
  );
  if (!response.ok) {
    console.log(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  planetsData = data.bodies;
  console.log(data.bodies);
  return data.bodies;
}

// Visa planet information funktionen
function displayPlanetInformation(index) {
  const planet = planetsData[index];
  if (planet) {
    const info = {
      name: planet.name,
      latin: planet.latinName,
      desc: planet.desc,
      circumference: planet.circumference,
      distance: planet.distance,
      maxTemp: planet.temp.day,
      minTemp: planet.temp.night,
      moons:
        planet.moons && planet.moons.length > 0 ? planet.moons : "Inga månar",
    };

    for (const key in info) {
      //Loopar igenom arrayen och hämtar planet
      if (planetInfoElements[key]) {
        planetInfoElements[key].textContent = info[key];
      }
    }

    planetInfo.classList.add("show"); 
  } else {
    console.log("Planet not found");
  }
}

// Lägger till clickevents för varje planet
planetButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const milkyway = document.getElementById("milkyway");
    milkyway.classList.toggle("none");
    displayPlanetInformation(index);
  });
});

getPlanets();
