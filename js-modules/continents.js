import { renderCountry } from "./renderCountry.js";
import { getCountries } from "./script.js";
import { showCountriesDiv } from "./script.js";
import { dataError } from "./script.js";
import { overlay } from "./handleCards.js"


//Hämtar länder/resor och filtrerar ut på resornas continentId och världsdelarnas id.
export async function showSpecificContinent (id){
    showCountriesDiv.innerHTML= "";
    
    //Funktionen getCountries finns i script.js
    const countries = await getCountries();
    //Om fetchen misslyckats eller man får tillbaka en tom array skickas felmeddelande ut och funktionen avslutas
    if (countries === null){
        dataError.textContent = "Kunde inte ladda resor. Kontrollera server.";
        return;
    }
    else if (countries.length === 0){
        dataError.textContent = "Det finns inga sparade resor till denna världsdel";
        return;
    }
    else{
        //Filtrerar ut resor där continentId är samma som världsdelens id
        const specificCountries = countries.filter((country) => country.continentId === id);
        //Loopa igenom hela arrayen och måla ut varje kort med hjälp av renderCountry
        specificCountries.forEach((country) =>{
        renderCountry(country);
        });
    }
};

//Hämtar en världsdel utifrån id
async function getContinent (id){
    try {
        const response = await fetch(`http://localhost:3000/continents/${id}`);
        
        if (!response.ok){
            throw new Error("Kunde inte hämta resor");
        }
        const continent = await response.json();
        return continent;
    }
    catch (error){
        console.log("Kunde inte hämta continent");
        return null;
    }
}
//Visar information utifrån ett objekt (världsdel) genom att man får id från världsdelens namn
//Körs om man trycker på världsdelens namn i kortet. Eventlistener skapas i renderCountry (där kortet skapas).
export async function showContinentInformation(id) {
    const continent = await getContinent(id);

    if (continent === null){
        dataError.textContent = "Kunde inte hämta informationen. Kontrollera servern.";
        return;
    }

    //Skapar informationsruta och tilldelar den värden från den hämtade världsdelen
    const informationDiv = document.createElement("div");
    informationDiv.classList.add("informationDiv");

    const closeButton = document.createElement("button");
    closeButton.classList.add("closeInformationField", "closeButton");
    closeButton.textContent = "✕"
    closeButton.addEventListener("click", ()=>{
        overlay.classList.add("hidden");
        showCountriesDiv.removeChild(informationDiv);
    });

    const title = document.createElement("h2");
    title.textContent = continent.continentName;

    const description = document.createElement("p");
    description.textContent = continent.description;

    const image = document.createElement("img");
    image.src = continent.image;
    image.alt = `${continent.continentName} utmarkerat på kartan.`

    informationDiv.append(title, description, image, closeButton);
    showCountriesDiv.appendChild(informationDiv);
    overlay.classList.remove("hidden");
};