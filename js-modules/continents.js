
import { renderCountry } from "./renderCountry.js";
import { getCountries } from "./script.js";

const main = document.querySelector("main");

export async function showSpecificContinent (id){
    const countries = await getCountries();
    
    const specificCountries = countries.filter((country) => country.continentId === id)

    specificCountries.forEach((country) =>{
        renderCountry(country);
    })
}

async function getContinents (){
    const response = await fetch("http://localhost:3000/continents");
    const continents = await response.json();
    return continents;
}

export async function showContinentInformation(id) {
    
    
    const continents = await getContinents();

    const continent = continents.find((continent) => Number(continent.id) === Number(id));

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