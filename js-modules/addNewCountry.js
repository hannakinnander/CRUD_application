import { checkContinentValue } from "./script.js";
import { dataError } from "./script.js";
const countryInput = document.getElementById("countryInput");
const yearInput = document.getElementById("yearInput");
const businessOrPleasureSelector = document.getElementById("businessOrPleasureSelector");
const addContinentSelector = document.getElementById("addContinentSelector");
const countryError = document.querySelector(".countryError");
const yearError = document.querySelector(".yearError");

//Ska köras på sparaknappen i script.js
export async function saveNewCountry (currentContinentSelected){
    const newCountry = checkInputs();
    if (!newCountry){
        return;
    }
    try {
        await addCountryToDb(newCountry);
        await checkContinentValue(currentContinentSelected);
    } catch (error) {
        console.log(error);
        const dataError = document.querySelector(".dataError");
        dataError.textContent = "Failed to add country. Check if server is running.";
    }
}

function checkInputs () {
    Number(yearInput.value);
    if (countryInput.value ==="" && isNaN(yearInput.value)){
        countryError.textContent = "Får inte lämnas tomt"
        yearError.textContent = "Måste vara siffror"
    }
    else if (countryInput.value ==="" && yearInput.value===""){
        countryError.textContent = "Får inte lämnas tomt"
        yearError.textContent = "Får inte lämnas tomt"
        }

    else if (countryInput.value ===""){
            countryError.textContent = "Får inte lämnas tomt"
            yearError.textContent="";
    }
    else if(isNaN(yearInput.value)){
        yearError.textContent = "Måste vara siffror"
    }
    else if (yearInput.value ===""){
        yearError.textContent = "Får inte lämnas tomt"       
    }
   else {
    countryError.textContent =="";
    yearError.textContent=="";
    const newCountry = {
        countryName: countryInput.value,
        yearVisited: Number(yearInput.value),
        businessOrPleasure: businessOrPleasureSelector.value,
        continentId: addContinentSelector.value
    }
    return newCountry;
    }
}
async function addCountryToDb (newCountry){
    try {
        const response = await fetch("http://localhost:3000/countries/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCountry)
    });
    if (!response.ok) {
        throw new Error(`Failed to add: ${response.status}`);
    }
    } 
    catch (error){
        console.log(error);
        throw error;  // Re-throw
    }
    
}