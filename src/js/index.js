"use strict";
//Lista på arbeten
const episodes = document.getElementById("episode-list");
const newEl = document.getElementById("table-body");

getData();

//Hämta list med arbeten från databas
async function getData() {
    const response = await fetch('http://127.0.0.1:3000/curriculums', { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },       

    });

    let data = await response.json();
    console.table(data); 

    makeList(data);
    
    
};

//Skriv ut listan
function makeList(data){
    let datatwo = data;



    if(newEl){

        newEl.innerHTML = "";
        datatwo.forEach(dat => {
                  
         newEl.innerHTML +=`
         <tr rowspan="2">
             <td> ${dat.companyname} </td>
             <td>${dat.jobtitle} </td>
             <td>${dat.startdate} </td>
        </tr>
        <tr>
            <td></td>
             <td> ${dat.description}</td>
             <td>${dat.enddate}  </td>
             `;

             let deleteBtn = document.createElement('button');
             deleteBtn.textContent = "Radera";
             deleteBtn.id = dat._id;
             deleteBtn.className = "deleteBtn";
             deleteBtn.addEventListener('click', () => deletePost(dat._id));
             newEl.appendChild(deleteBtn);
             episodes.appendChild(newEl);

        });
    };
    
};

//Ta bort post i listan
//ObjectId('${id}'
async function deletePost(id){
    const response = await fetch(`http://127.0.0.1:3000/curriculums/${id}`, { 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },       

    });

    let data = await response.json();
   console.log(data);

    getData();
}




