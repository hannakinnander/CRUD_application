const showCountriesDiv = document.querySelector(".showCountriesDiv");
import { renderCountry } from "./renderCountry.js";

import { getCountries } from "./script.js";

export async function showSpecificContinent (id){
    
    const countries = await getCountries();
    
    const specificCountries = countries.filter((country) => country.continentId === id)

    specificCountries.forEach((country) =>{
        renderCountry(country);
    })
}

// async function getContinents (){
//     const response = await fetch("http://localhost:3000/continents");
//     const continents = await response.json();
//     return continents;
// }