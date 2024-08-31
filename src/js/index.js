"use strict";
//Lista på arbeten
const episodes = document.getElementById("episode-list");
//Tabellhuvud
const tableHead = document.getElementById("thead");
//Tabell-poster
const tableBody = document.getElementById("tbody");
//Plats för meddelanden
const messageEl = document.getElementById("message");

//Funktion som körs vid laddning av sidan
getData();

//Hämta lista med arbeten från databas
async function getData() {
    try{
    const response = await fetch('http://127.0.0.1:3000/curriculums', { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },       

    });
    
    if(!response.ok){
        messageEl.innerHTML = "Lyckades inte hämta data från databasen.";
        return;
    }

    let data = await response.json();
    console.table(data); 

    //Anropa funktion som skriver ut listan
    makeList(data);

} catch (error){

    console.error("Fel när data skulle hämtas: ", error);
    messageEl.innerHTML = "Ett fel uppstod när tabellen skulle hämtas.";
}    
    
};

//Skriv ut listan
function makeList(data){
    //Töm först listan, för att undvika dubletter
    tableBody.innerHTML = "";  
  
          
    data.forEach(dat => {            
      
        tableBody.innerHTML += `
        <tr rowspan="2">
            <td> ${dat.companyname}</td>
            <td> ${dat.startdate}</td>
            <td> ${dat.description}</td>
        </tr>
        <tr>
            <td>${dat.jobtitle}</td>
            <td>${dat.enddate}</td>
            <td></td>
        </tr>

        `;
             
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Radera";
        deleteBtn.id = dat._id; 
        deleteBtn.className = "deleteBtn"; 
        deleteBtn.addEventListener('click', () => deletePost(dat._id));

        tableBody.appendChild(deleteBtn);      
        episodes.appendChild(tableBody);
   
    });   

   
};

async function deletePost(id){
    console.log("Hämtat från DOM: ", id);
    try{
        const response = await fetch(`http://127.0.0.1:3000/curriculums/${id}`, { 
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },      
    });

    if(!response.ok){
        messageEl.innerHTML = "Lyckades inte radera posten!";
        return;
    }

    let data = await response.json();
    console.log("Posten raderad: ", data);
    getData();

} catch (error) {
    console.error("Error: ", error);
    messageEl.innerHTML = "Ett fel uppstod när posten skulle raderas";
}
};

