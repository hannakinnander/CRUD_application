import { saveNewCountry } from "./addNewCountry.js";
import { showSpecificContinent } from "./continents.js";

const showCountriesDiv = document.querySelector(".showCountriesDiv");
const continentSelector = document.getElementById("continentSelector");
const addDestinationField = document.querySelector(".addDestinationField");
const addDestinationButton = document.querySelector(".addDestinationButton");
const saveDestinationButton = document.querySelector(".saveDestinationButton");
const closeAddingField = document.querySelector(".closeAddingField");


saveDestinationButton.addEventListener("click", ()=> {
    saveNewCountry();
})


import { renderCountry } from "./renderCountry.js";

export async function getCountries () {
    const response = await fetch ("http://localhost:3000/countries");
    const countries = await response.json();
    return countries;
}

//Målar ut alla sparade resemål
async function showAllCountries () {
    //Får arrayen countries
    const countries = await getCountries();

    //Loopa igenom hela arrayen
    countries.forEach((country) =>{
        renderCountry(country);
    })
}
showAllCountries();
continentSelector.addEventListener("change", () =>{
    addDestinationField.classList.add("hidden");
    showCountriesDiv.innerHTML = "";
if (continentSelector.value === ""){
    showAllCountries();
}
else{
    showSpecificContinent(Number(continentSelector.value));
}
});

