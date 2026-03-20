
import { renderCountry } from "./renderCountry.js";
import { getCountries } from "./script.js";
import { showCountriesDiv } from "./script.js";

const main = document.querySelector("main");

export async function showSpecificContinent (id){
    showCountriesDiv.innerHTML= "";
    const countries = await getCountries();
    
    const specificCountries = countries.filter((country) => country.continentId === id)

    specificCountries.forEach((country) =>{
        renderCountry(country);
    })
}

//Hämtar en världsdel utifrån id
async function getContinent (id){
    try {
        const response = await fetch(`http://localhost:3000/continents/${id}`);
        const continent = await response.json();
        return continent;
    }
    catch {
        console.log("Kunde inte hämta continent");
    }
}
//Visar information utifrån ett objekt (världsdel) genom att man får id från världsdelens namn
export async function showContinentInformation(id) {
    const continent = await getContinent(id);

    const informationDiv = document.createElement("div");
    informationDiv.classList.add("informationDiv");

    const closeButton = document.createElement("button");
    closeButton.classList.add("closeInformationField", "closeButton");
    closeButton.textContent = "✕"
    closeButton.addEventListener("click", ()=>{
        overlay.classList.add("hidden");
        main.removeChild(informationDiv);
    })

    const title = document.createElement("h2");
    title.textContent = continent.continentName;

    const description = document.createElement("p");
    description.textContent = continent.description;

    const image = document.createElement("img");
    image.src = continent.image;
    image.alt = `${continent.continentName} utmarkerat på kartan.`

    informationDiv.append(title, description, image, closeButton);
    main.appendChild(informationDiv);
    const overlay = document.querySelector(".overlay");
    overlay.classList.remove("hidden");
}