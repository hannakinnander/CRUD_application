//Alla funktioner som är kopplade till db.json

//Hämta alla länder/resor
export async function getCountries () {
    try {
        const response = await fetch ("http://localhost:3000/countries");

        if (!response.ok){
            throw new Error("Kunde inte hämta resor");
        }
        const countries = await response.json();
        return countries;
    }
    catch (error){
        console.log(error);
        return null;
    }
};

//Uppdatera kort. Läggs på sparaknappen i kortets "editmode"
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
            throw new Error("Kunde inte uppdatera kortet");
        }
        const upDatedData = await response.json();
        return upDatedData;
    }
    catch (error) {
        return null;
    }
};

//Radera kort
// Läggs i eventlistener för deleteknappen som skapas i renderCountry
export async function deleteCard (id){
    try {
    const response = await fetch(`http://localhost:3000/countries/${id}`, {
       method: "DELETE" 
    });
    if (!response.ok) {
        throw new Error("Kunde inte radera");
    }
    const deletedCard = await response.json();
    return deletedCard;
    }
    catch (error){
        return null;
    }
};

//Lägga till ny resa
export async function addCountryToDb (newCountry){
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
};

//Hämtar en världsdel utifrån id (när man trycker på världsdelen i kortet)
export async function getContinent (id){
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
};