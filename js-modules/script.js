import { saveNewCountry } from "./addNewCountry.js";
import { showSpecificContinent } from "./continents.js";
import { renderCountry } from "./renderCountry.js";
import { getCountries } from "./crud.js";

//Hämtar nödvändiga element
export const continentSelector = document.getElementById("continentSelector");
const saveDestinationButton = document.querySelector(".saveDestinationButton");
export const dataError = document.querySelector(".dataError");
export const showCountriesDiv = document.querySelector(".showCountriesDiv");

export let currentContinentSelected = "all";

if (currentContinentSelected === "all"){
    await showAllCountries();
}

//Kör funktion för att spara kort, finns i addNewCountry-modulen
saveDestinationButton.addEventListener("click", async()=> {
    currentContinentSelected = continentSelector.value;
    console.log(currentContinentSelected);
    await saveNewCountry(currentContinentSelected);
});

//Målar ut alla sparade resemål
async function showAllCountries () {
    showCountriesDiv.innerHTML= "";
    //Får arrayen countries
    const countries = await getCountries();

    //Om fetchen misslyckats eller man får tillbaka en tom array skickas felmeddelande ut och funktionen avslutas
    if (countries === null){
        dataError.textContent = "Kunde inte ladda resor. Kontrollera server.";
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

// //Kollar vilken inställning man står på i världsdelsselektorn och visar kort utifrån det.
//Körs vid ändring i selektorn och när man uppdaterar kort från editmode.
export async function checkContinentValue (currentContinentSelected) {
    
    if (currentContinentSelected === "all"){
        await showAllCountries();
    }
    else{
        await showSpecificContinent(currentContinentSelected);
    }
}

continentSelector.addEventListener("change", async() =>{
    currentContinentSelected = continentSelector.value;
    await checkContinentValue(currentContinentSelected);
});

