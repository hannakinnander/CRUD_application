import { saveNewCountry } from "./addNewCountry.js";
import { showSpecificContinent } from "./continents.js";
import { renderCountry } from "./renderCountry.js";
import { countryError } from "./addNewCountry.js";

//Hämtar nödvändiga element
export const continentSelector = document.getElementById("continentSelector");
const saveDestinationButton = document.querySelector(".saveDestinationButton");
export const dataError = document.querySelector(".dataError");
const showAllButton = document.querySelector(".showAllButton");
export let currentContinentSelected;
export const showCountriesDiv = document.querySelector(".showCountriesDiv");

//Kör funktion för att spara kort, finns i addNewCountry-modulen
saveDestinationButton.addEventListener("click", async()=> {
    try {
        await saveNewCountry(currentContinentSelected);
    }
    catch {
        countryError.textContent = "Kunde inte spara resa";
        return;
    }
    
})

showAllButton.addEventListener("click", async()=>{
    currentContinentSelected = "all";
    await showAllCountries();
})


export async function getCountries () {
    try {
        const response = await fetch ("http://localhost:3000/countries");

        if (!response.ok){
            throw new Error("Kunde inte hämta resor");
        }
        const countries = await response.json();
        return countries;
    }
    catch (error){
        console.log(error);
        return null;
    }
}
//Målar ut alla sparade resemål
async function showAllCountries () {
        //Får arrayen countries
        const countries = await getCountries();

        //Om fetchen misslyckats eller man får tillbaka en tom array skickas felmeddelande ut och funktionen avslutas
        if (countries === null){
            dataError.textContent = "Kunde inte ladda resor. Kontrollera server";
            return;
        }
        else if (countries.length === 0){
            dataError.textContent = "Det finns inga sparade resor";
            return;
        }
        else{
            //Loopa igenom hela arrayen och måla ut varje kort med hjälp av renderCountry
            countries.forEach((country) =>{
            renderCountry(country);
        });
        } 
    }

// //Kollar vilken inställning man står på i världsdelsselektorn och visar kort utifrån det
export async function checkContinentValue (currentContinentSelected) {
    currentContinentSelected = continentSelector.value;
    showCountriesDiv.innerHTML= "";
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

