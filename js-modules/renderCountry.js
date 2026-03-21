import { deleteCard } from "./handleCards.js";
import { editCard } from "./handleCards.js";
import { showContinentInformation } from "./continents.js";
import { currentContinentSelected } from "./script.js";
import { showCountriesDiv } from "./script.js";

//Kallas på när man skapar kort i spara-knappen på addNewCountry
export function renderCountry (country){
    //Skapa "kort" för varje resa
    const countryCard = document.createElement("div");
    countryCard.classList.add("countryCard");

    //Lägger till land, vilket år man åkte dit, typ av resa
    const countryName = document.createElement("h2");
    countryName.textContent = country.countryName;
    const yearVisited = document.createElement("p");
    yearVisited.textContent = `Besöktes år: ${country.yearVisited}`;
    const businessOrPleasure = document.createElement("p");
    businessOrPleasure.textContent = `Typ av resa: ${country.businessOrPleasure}`;
        
    //Gör en div för kontinent-info
    const continentInfo = document.createElement("div");
    continentInfo.classList.add("continentInfo");
    const continentPresentation = document.createElement("p");

    //Delar upp "Tillhör: " och namnet på världsdelen för att göra endast världsdelen klickbar
    //för att komma till information om världsdelen
    continentPresentation.textContent ="Världsdel: ";
    const continentName = document.createElement("p");
    continentName.classList.add("continentInformationButton");

    //Lägger till eventlistener för världsdelen
    continentName.addEventListener("click", () => {
        showContinentInformation(country.continentId);
    });

    //Lägger till elementen för information om kontinent
    continentInfo.append(continentPresentation, continentName);
    
    //Behållare för knappar i kort
    const buttonSection = document.createElement("div");
    buttonSection.classList.add("buttonSection");

    //Redigera-knapp
    const editButton = document.createElement("button");
    editButton.classList.add("editButton", "cardButton");
    editButton.textContent = "Redigera";
    editButton.addEventListener("click", () => {
        console.log("Vald kolumn:" + currentContinentSelected);
        editCard(countryCard, country);
    });

    //Delete-knapp
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton", "cardButton");
    deleteButton.textContent = "Ta bort";
    deleteButton.addEventListener("click", async() => {
        const deletedCard = await deleteCard(country.id);
        // await checkContinentValue();
        // console.log(deletedCard);
    });

    //Lägg till knapparna i behållaren
    buttonSection.append(editButton, deleteButton);
        
    //En switch beroende på vilken kontinent, för styling och vad
    //det ska stå i kortet
    const dependingOnContinent = country.continentId;
    switch (dependingOnContinent){
        case "1":
            countryCard.classList.add("asia");
            continentName.textContent = "Asien";
            break;
        case "2":
            countryCard.classList.add("africa");
            continentName.textContent = "Afrika";
            break;
        case "3":
            countryCard.classList.add("northAmerica");
            continentName.textContent = "Nordamerika";
            break;
        case "4":
            countryCard.classList.add("southAmerica");
            continentName.textContent = "Sydamerika";
            break;
        case "5":
            countryCard.classList.add("europe");
            continentName.textContent = "Europa";
            break;                
        
        case "6":
            countryCard.classList.add("oceania");
            continentName.textContent = "Oceanien";
            break;
        case "7":
            countryCard.classList.add("antarctica");
            continentName.textContent = "Antarktis";
            break;
        
        default: 
        break;
    }

        //Lägger in alla element i kortet
        countryCard.append(countryName, yearVisited, businessOrPleasure, continentInfo, buttonSection);

        //Lägger till kortet i diven för alla länder OM man står inne på rätt flik för nya landet
        showCountriesDiv.appendChild(countryCard);
    }
    
    