const showCountriesDiv = document.querySelector(".showCountriesDiv");

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
        renderCountries(country);
       
    })
}

function renderCountries (country){
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
        const continentPresentation = document.createElement("p");
        //Delar upp "Tillhör: " och namnet på världsdelen för att göra endast världsdelen klickbar
        //för att komma till information om världsdelen
        continentPresentation.textContent ="Tillhör: ";
        const continentName = document.createElement("p");
        continentName.classList.add("continentInformationButton");

        //Lägger till eventlistener för världsdelen
        continentName.addEventListener("click", () => {
            showContinentInformation(country.continentId)
        });

        //Lägger till elementen för information om kontinent
        continentInfo.appendChild(continentPresentation);
        continentInfo.appendChild(continentName);
        
        //Behållare för knappar + knappar för redigering/ta bort
        const buttonSection = document.createElement("div");
        const editButton = document.createElement("button");
        editButton.classList.add("editButton");
        editButton.textContent = "Redigera";
        editButton.addEventListener("click", () => {
            editCard(id);
        })

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.textContent = "Ta bort";
        deleteButton.addEventListener("click", () => {
            deleteCard(id);
        });

        //Lägg till knapparna i behållaren
        buttonSection.appendChild(editButton);
        buttonSection.appendChild(deleteButton);
        
        //En switch beroende på vilken kontinent, för stylling och vad
        //det ska stå i kortet
        const dependingOnContinent = country.continentId;
        switch (dependingOnContinent){
            case 1:
                countryCard.classList.add("asia");
                continentName.textContent = "Asien";
                break;
            case 2:
                countryCard.classList.add("africa");
                continentName.textContent = "Afrika";
                break;
            case 3:
                countryCard.classList.add("northAmerica");
                continentName.textContent = "Nordamerika";
                break;
            case 4:
                countryCard.classList.add("southAmerica");
                continentName.textContent = "Sydamerika";
                break;
            case 5:
                countryCard.classList.add("europe");
                continentName.textContent = "Europa";
                break;                
        
            case 6:
                countryCard.classList.add("oceania");
                continentName.textContent = "Oceanien";
                break;
            case 7:
                countryCard.classList.add("antarctica");
                continentName.textContent = "Antarktis";
                break;
            
            default: 
            break;
        }
    
        //Lägger in alla element i kortet
        countryCard.appendChild(countryName);
        countryCard.appendChild(yearVisited);
        countryCard.appendChild(businessOrPleasure);
        countryCard.appendChild(continentInfo);
        countryCard.appendChild(buttonSection);

        //Lägger till kortet i diven för alla länder
        showCountriesDiv.appendChild(countryCard);
    }
showAllCountries();