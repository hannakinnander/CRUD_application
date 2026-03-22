import { renderCountry } from "./renderCountry.js";
import { dataError } from "./script.js";
import { addCountryToDb } from "./crud.js";

//Hämtar nödvändiga element
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
        const addedCountry = await addCountryToDb(newCountry);
        //Får man tillbaka null så vet man att det inte gått bra. Då kastas fel.
        if (addedCountry === null){
            throw new Error("Kunde inte spara resa");
        }
        //Om man står på världsdel som matchar kortet eller hade tryckt "visa alla" så målas kortet ut.
        else if (addedCountry.continentId === currentContinentSelected || currentContinentSelected === "all") {
            saved.textContent = "Sparad!"
            setTimeout(()=>{
                saved.textContent = "";
            }, 2000);
            resetInputsAndErrors();
            renderCountry(addedCountry);
        }
        else {
            resetInputsAndErrors();
            saved.textContent = "Sparad!"
            setTimeout(()=>{
                saved.textContent = "";
            }, 2000);
            return;
        }
    }
    catch (error){
        resetInputsAndErrors();
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
        countryInput.textContent = "";
    }
    else if (yearInput.value ===""){
        yearError.textContent = "Får inte lämnas tomt"
        countryInput.textContent = "";       
    }
    else {
        const newCountry = {
            countryName: countryInput.value,
            yearVisited: Number(yearInput.value),
            businessOrPleasure: businessOrPleasureSelector.value,
            continentId: addContinentSelector.value
        }
        resetInputsAndErrors();
        return newCountry;
    }
}

//Återställer inputfält och felmeddelanden
function resetInputsAndErrors (){
    dataError.textContent = "";
    countryError.textContent = "";
    yearError.textContent = "";
    countryInput.value = "";
    yearInput.value = "";
};