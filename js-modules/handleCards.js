export function deleteCard (id){
    fetch(`http://localhost:3000/countries/${id}`, {
       method: "DELETE" 
    });
}