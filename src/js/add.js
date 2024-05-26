"use strict";

//Formulärfält
const inputCompanyname = document.getElementById("companyname");
const inputJobtitle = document.getElementById("jobtitle");
const inputStartdate = document.getElementById("startdate");
const inputEnddate = document.getElementById("enddate");
const inputDescription = document.getElementById("description");
//Knapp: lägg till
const addBtn = document.getElementById("addBtn");
//Formuläret
const formEl = document.getElementById("course-form");
//Felmeddelanden med mera
const messageEl = document.getElementById("action-message");

//Knapp: lägg till nytt arbete
addBtn.addEventListener("click", addJob, false);

//Lägg till arbete, posta till databas
async function addJob(e){
   
    e.preventDefault();

    let job = {    
        companyname: inputCompanyname.value,
        jobtitle: inputJobtitle.value,
        startdate: inputStartdate.value,
        enddate: inputEnddate.value,
        description: inputDescription.value
    };

    if(companyname.value === 0 || jobtitle.value === 0){
        messageEl.innerHTML = "Du måste fylla i fälten 'Företag' och 'Titel'!";
    }
    
    const response = await fetch('http://127.0.0.1:3000/curriculums', {
        method: "POST",
        
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(job)
    });

      
    if(!response.ok){
        messageEl.innerHTML = "Kunde inte lägga till nytt arbete.";
        return;
    }

    let data = await response.json(); 
    messageEl.innerHTML = "Posten har lagts till i listan!";
    
    //Töm input-fälten
    inputCompanyname.value = '';
    inputJobtitle.value = '';
    inputStartdate.value = '';
    inputEnddate.value = '';
    inputDescription.value = '';

    //Dirigerar om till startsidan
    window.location.href = "/src/index.html";
    return data;

    
    




  
}
    




