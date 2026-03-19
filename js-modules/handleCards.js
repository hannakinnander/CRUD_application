export function deleteCard (id){
    fetch(`http://localhost:3000/countries/${id}`, {
       method: "DELETE" 
    });
}

export function editCard (countryCard, country){
    countryCard.innerHTML = "";
    countryCard.classList.add("editMode");

    //Ändra landet
    const countryInput = document.createElement("input");
    countryInput.classList.add("editCountry");
    countryInput.value = country.countryName;

    //Element som behövs för året
    const yearVisitedDiv = document.createElement("div");
    yearVisitedDiv.classList.add("makeFlex");
    const yearVisited = document.createElement("p");
    yearVisited.textContent = "Besöktes år: ";
    const yearVisitedInput = document.createElement("input");
    yearVisitedInput.classList.add("editYear");
    yearVisitedInput.value = country.yearVisited;

    //Element som behövs för typ av resa
    const businessOrPleasureDiv = document.createElement("div");
    businessOrPleasureDiv.classList.add("makeFlex");
    const businessOrPleasure = document.createElement("p");
    businessOrPleasure.textContent = "Typ av resa: ";
    const businessOrPleasureSelector = document.createElement("select");
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
    const continentSelector = document.createElement("select");
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
    continentSelector.append(asiaOption, africaOption, northAmericaOption,
        southAmericaOption, europeOption, oceaniaOption, antarcticaOption);
    continentSelector.value = country.continentId;


    const saveButton = document.createElement("button");
    saveButton.textContent = "Spara";
    saveButton.addEventListener("click", () =>{
        const updatedCard = {
            id: country.id,
            countryName: countryInput.value,
            yearVisited: Number(yearVisitedInput.value),
            businessOrPleasure: businessOrPleasureSelector.value,
            continentId: Number(continentSelector.value)
    }
        updateDb(country.id, updatedCard)
    }
    )

    //Lägger in elementen i sina parents
    
    businessOrPleasureDiv.append(businessOrPleasure, businessOrPleasureSelector);
    yearVisitedDiv.append(yearVisited, yearVisitedInput);
    
        continentDiv.append(continentPresentation, continentSelector);
    countryCard.append(countryInput, yearVisitedDiv, businessOrPleasureDiv, 
        continentDiv, saveButton);
};

export async function updateDb(id, updatedCard) {
    await fetch(`http://localhost:3000/countries/${id}`, {
       method: "PUT",
       headers: {
        "Content-Type": "application/json"
       },
       body: JSON.stringify(updatedCard)
    });
}


