"use strict";
//Lista på arbeten
const episodes = document.getElementById("episode-list");
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
    episodes.innerHTML = "";  
    //Skapa nytt element för tabell
    let newEl = document.createElement("tbody");
    newEl.className = "table-body";
    
          
    data.forEach(dat => {     
        
        let upperRow = document.createElement("tr");
        upperRow.id = `job${dat._id}`;
        upperRow.setAttribute("rowspan", "2");

         upperRow.innerHTML =`
             <td> ${dat.companyname} </td>
             <td> ${dat.startdate}</td>
             <td> ${dat.description}</td>
        `;

        let lowerRow = document.createElement("tr");
        lowerRow.className = "divideline";
        lowerRow.innerHTML = `
            <td>${dat.jobtitle}</td>
            <td>${dat.enddate}</td>
            
        `;  

        let deleteTd = document.createElement('td');
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Radera";
        deleteBtn.id = dat._id; 
        deleteBtn.className = "deleteBtn"; 
        deleteBtn.addEventListener('click', () => deletePost(dat._id));

        deleteTd.appendChild(deleteBtn);
        lowerRow.appendChild(deleteTd);

        newEl.appendChild(upperRow);
        newEl.appendChild(lowerRow);
   
    });   

    episodes.appendChild(newEl);
   
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

