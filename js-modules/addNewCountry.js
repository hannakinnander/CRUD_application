
const countryInput = document.getElementById("countryInput");
const yearInput = document.getElementById("yearInput");
const businessOrPleasureSelector = document.getElementById("businessOrPleasureSelector");
const continentSelector = document.getElementById("addContinentSelector");




//Ska köras på sparaknappen
export function saveNewCountry (){
    const newCountry = {
        countryName: countryInput.value,
        yearVisited: Number(yearInput.value),
        businessOrPleasure: businessOrPleasureSelector.value,
        continentId: Number(continentSelector.value)
    }
    addCountryToDb(newCountry);
}

async function addCountryToDb (newCountry){
     await fetch("http://localhost:3000/countries/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCountry)
    })
    
}