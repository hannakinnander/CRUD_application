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