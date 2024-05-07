"use strict";

//Formulärfält
const inputCompanyname = document.getElementById("companyname");
const inputJobtitle = document.getElementById("jobtitle");
const inputStartdate = document.getElementById("startdate");
const inputEnddate = document.getElementById("enddate");
const inputDescription = document.getElementById("description");
const addBtn = document.getElementById("addBtn");
const formEl = document.getElementById("course-form");
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

    
    const response = await fetch('http://127.0.0.1:3000/curriculums', {
        method: "POST",
        
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(job)
    });

    let data = await response.json();   
    messageEl.innerHTML = "Posten har lagts till i listan!";
    
    inputCompanyname.value = '';
    inputJobtitle.value = '';
    inputStartdate.value = '';
    inputEnddate.value = '';
    inputDescription.value = '';

    return data;

    
    




  
}
    




