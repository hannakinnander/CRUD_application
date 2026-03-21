import { renderCountry } from "./renderCountry.js";
import { checkContinentValue } from "./script.js";
import { showCountriesDiv } from "./script.js";
import { dataError } from "./script.js";

export const overlay = document.querySelector(".overlay");


//Läggs i eventlistener för knappen som skapas i renderCountry
export async function deleteCard (id){
    try {
    const response = await fetch(`http://localhost:3000/countries/${id}`, {
       method: "DELETE" 
    });
    if (!response.ok) {
        throw new Error(`Failed to delete: ${response.status}`);
    }
    const deletedCard = await response.json();
    console.log(deletedCard);
    return deletedCard;
    }
    catch (error){
        console.log(error);
        throw error;  // Re-throw
    }
    
}

//Körs på Redigera-knappen som skapas i renderCountry.js
export function editCard (countryCard, country){
    countryCard.innerHTML = "";
    countryCard.classList.add("editMode");
    overlay.classList.remove("hidden");
    
    //Ändra landet
    const countryInput = document.createElement("input");
    countryInput.id ="editCountry";
    countryInput.value = country.countryName;

    //Element som behövs för året
    const yearVisitedDiv = document.createElement("div");
    yearVisitedDiv.classList.add("makeFlex");
    const yearVisited = document.createElement("p");
    yearVisited.textContent = "Besöktes år: ";
    const yearVisitedInput = document.createElement("input");
    yearVisitedInput.id = "editYear";
    yearVisitedInput.value = country.yearVisited;

    //Element som behövs för typ av resa
    const businessOrPleasureDiv = document.createElement("div");
    businessOrPleasureDiv.classList.add("makeFlex");
    const businessOrPleasure = document.createElement("p");
    businessOrPleasure.textContent = "Typ av resa: ";
    const businessOrPleasureSelector = document.createElement("select");
    businessOrPleasureSelector.id = "editBusinessPleasure";
    businessOrPleasureSelector.classList.add("editSelector");
    const businessOption = document.createElement("option");
    businessOption.value = "business";
    businessOption.textContent = "Business";
    const pleasureOption = document.createElement("option");
    pleasureOption.value = "pleasure";
    pleasureOption.textContent = "Pleasure";
    
    //Lägger in options till selector och sätter värdet till det gamla
    businessOrPleasureSelector.append(businessOption, pleasureOption);
    businessOrPleasureSelector.value = country.businessOrPleasure;

    //Element för att ändra världsdel
    const continentDiv = document.createElement("div");
    continentDiv.classList.add("makeFlex");
    const continentPresentation= document.createElement("p");
    continentPresentation.textContent = "Tillhör: ";
    const continentSelectorEdit = document.createElement("select");
    continentSelectorEdit.id = "continentSelectorEdit"
    continentSelectorEdit.classList.add("editSelector");
    const asiaOption = document.createElement("option");
    asiaOption.value = "1";
    asiaOption.textContent = "Asien"; 
    const africaOption = document.createElement("option");
    africaOption.value = "2";
    africaOption.textContent = "Afrika";
    const northAmericaOption = document.createElement("option");
    northAmericaOption.value = "3";
    northAmericaOption.textContent = "Nordamerika";
    const southAmericaOption = document.createElement("option");
    southAmericaOption.value = "4";
    southAmericaOption.textContent = "Sydamerika";
    const europeOption = document.createElement("option");
    europeOption.value = "5";
    europeOption.textContent = "Europa"; 
    const oceaniaOption = document.createElement("option");
    oceaniaOption.value = "6";
    oceaniaOption.textContent = "Oceanien"; 
    const antarcticaOption = document.createElement("option"); 
    antarcticaOption.value = "7";
    antarcticaOption.textContent = "Antarktis";  

    //Lägger till options till selector och sätter värdet till det gamla
    continentSelectorEdit.append(asiaOption, africaOption, northAmericaOption,
        southAmericaOption, europeOption, oceaniaOption, antarcticaOption);
    continentSelectorEdit.value = country.continentId;
    
    //Tillbaka-knapp
    const closeButton = document.createElement("button");
    closeButton.classList.add("closeEdit", "closeButton");
    closeButton.textContent = "↩";
    closeButton.addEventListener("click", async()=>{
        showCountriesDiv.removeChild(countryCard);
        countryCard.classList.remove("editMode");
        overlay.classList.add("hidden");
        await checkContinentValue();
 
    });
        
    const saveButton = document.createElement("button");
    saveButton.classList.add("cardButton", "saveChanges");
    saveButton.textContent = "Spara";
    saveButton.addEventListener("click", async() =>{
        
        console.log("KLICK");
        try {
            const updatedCard = {
            id: country.id,
            countryName: countryInput.value,
            yearVisited: Number(yearVisitedInput.value),
            businessOrPleasure: businessOrPleasureSelector.value,
            continentId: continentSelectorEdit.value
        }
        countryCard.classList.remove("editMode");
        overlay.classList.add("hidden");

        //Få det ändrade objektet
        const updatedData = await updateDb(country.id, updatedCard);
        console.log(updatedData);
        await checkContinentValue();        
        }
       catch (error){
        console.log(error);
        const dataError = document.querySelector(".dataError");
        dataError.textContent = "Kunde inte ändra. Kontrollera server";
       }
        
    });

    //Lägger in elementen i sina parents
    businessOrPleasureDiv.append(businessOrPleasure, businessOrPleasureSelector);
    yearVisitedDiv.append(yearVisited, yearVisitedInput);
    
        continentDiv.append(continentPresentation, continentSelectorEdit);
    countryCard.append(countryInput, yearVisitedDiv, businessOrPleasureDiv, 
        continentDiv, saveButton, closeButton);
};

export async function updateDb(id, updatedCard) {
    
    try {
    const response = await fetch(`http://localhost:3000/countries/${id}`, {
       method: "PUT",
       headers: {
        "Content-Type": "application/json"
       },
       body: JSON.stringify(updatedCard)
       
    });
    if (!response.ok) {
        throw new Error(`Failed to update: ${response.status}`);
    }
    const upDatedData = await response.json();
    return upDatedData;
    
    }
    catch (error) {
        console.log(error);
        throw error;  // Re-throw to be caught in save button
    }
    
}


