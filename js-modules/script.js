import { saveNewCountry } from "./addNewCountry.js";
import { showSpecificContinent } from "./continents.js";
import { renderCountry } from "./renderCountry.js";

export const continentSelector = document.getElementById("continentSelector");
const saveDestinationButton = document.querySelector(".saveDestinationButton");
export const dataError = document.querySelector(".dataError");
const showAllButton = document.querySelector(".showAllButton");
export let currentContinentSelected;
export const showCountriesDiv = document.querySelector(".showCountriesDiv");

//Kör funktion för att spara kort, finns i addNewCountry-modulen
saveDestinationButton.addEventListener("click", async()=> {
    await saveNewCountry(currentContinentSelected);
})

showAllButton.addEventListener("click", async()=>{
    currentContinentSelected = "all";
    console.log(currentContinentSelected);
    await showAllCountries();
})


export async function getCountries () {
    try {
        const response = await fetch ("http://localhost:3000/countries");
        const countries = await response.json();
        return countries;
    }
    catch {
        dataError.textContent = "Kunde inte ladda resor";
        return [];  // Return empty array to prevent errors
    }
 
}

//Målar ut alla sparade resemål
async function showAllCountries () {
    showCountriesDiv.innerHTML= "";
    //Får arrayen countries
    const countries = await getCountries();

    //Loopa igenom hela arrayen
    countries.forEach((country) =>{
        renderCountry(country);
    })
}

// //Kollar vilken inställning man står på i världsdelsselektorn och visar kort utifrån det
export async function checkContinentValue (currentContinentSelected) {
    currentContinentSelected = continentSelector.value;
    
    if (currentContinentSelected === "all"){
        await showAllCountries();
    }
    else{
        await showSpecificContinent(currentContinentSelected);
    }
}

continentSelector.addEventListener("change", async() =>{
    console.log("ändrat state");
    currentContinentSelected = continentSelector.value;
    await checkContinentValue();
});

