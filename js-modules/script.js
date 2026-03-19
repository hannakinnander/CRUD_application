import { saveNewCountry } from "./addNewCountry.js";

const addDestinationField = document.querySelector(".addDestinationField");
const addDestinationButton = document.querySelector(".addDestinationButton");
const saveDestinationButton = document.querySelector(".saveDestinationButton");
const closeAddingField = document.querySelector(".closeAddingField");

addDestinationButton.addEventListener("click", () =>{
    addDestinationField.classList.remove("hidden");
}) 

saveDestinationButton.addEventListener("click", ()=> {
    saveNewCountry();
})

closeAddingField.addEventListener("click", ()=>{
    addDestinationField.classList.add("hidden");
})


import { renderCountry } from "./renderCountry.js";

async function getCountries () {
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

