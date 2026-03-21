import { renderCountry } from "./renderCountry.js";
import { checkContinentValue } from "./script.js";
import { dataError } from "./script.js";
const countryInput = document.getElementById("countryInput");
const yearInput = document.getElementById("yearInput");
const businessOrPleasureSelector = document.getElementById("businessOrPleasureSelector");
const addContinentSelector = document.getElementById("addContinentSelector");
export const countryError = document.querySelector(".countryError");
const yearError = document.querySelector(".yearError");
const saved = document.querySelector(".saved");

//Ska köras på sparaknappen i script.js. Tar med vilken världsdel man står i.
export async function saveNewCountry (currentContinentSelected){

    //Kontrollera inputs. Får tillbaka nya resan som objekt om alla inputs var okej.
    const newCountry = checkInputs();
    if (!newCountry){
        return;
    }
    //Försöker lägga till nya landet till db.json
    try {
        const addCountry = await addCountryToDb(newCountry);
        //Får man tillbaka null så vet man att det inte gått bra. Då kastas fel.
        if (addCountry === null){
            throw new Error("Kunde inte spara resa");
        }
        //Om man står på världsdel som matchar kortet eller hade tryckt "visa alla" så målas kortet ut.
        else if (newCountry.continentId === currentContinentSelected || currentContinentSelected === "all"){
            saved.textContent = "Sparad!"
            renderCountry(country);
        }
        else {
            saved.textContent = "Sparad!"
            return;
        }
    }
    catch (error){
        dataError.textContent = "Kunde inte spara resa. Saknar kontakt med servern."
        return;
    }
}

//Kontrollerar det användaren har skrivit in och valt i selektorerna(ny resa)
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
        throw new Error("Kunde inte lägga till resa");
    }

    } 
    catch (error){
        return null;
    }
    
}