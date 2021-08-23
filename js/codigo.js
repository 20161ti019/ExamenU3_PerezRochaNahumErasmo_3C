var persons = [];
var listPokemon = [];
var btnRegister = $("#register");
var btnUpdate = $("#update");

const getPokemon = () =>{
    $.ajax({
        type: 'GET',
        url:'https://pokeapi.co/api/v2/pokemon?limit=50&offset=100'
        }).done(function(res){
        listPokemon = res.results;
        let selectPokemon = $("#selectPokemon");

        selectPokemon.append('<option>Selecciona un Pokemon:</option>')
        for (let i = 0; i < listPokemon.length; i++) {
          selectPokemon.append('<option value="'+(i+1)+'">'+ listPokemon[i].name +'</option>')          
          
        }
        
      });
};

const fill = () =>{ 
    let content="";
    if (persons.length > 0) {
        for (let i = 0; i < persons.length; i++) {
            content+=`<tr>
                        <td>${ i+1 }</td>
                        <td>${ persons[i].name } ${ persons[i].lastName } ${ persons[i].surName }</td>
                        <td>${ persons[i].favorite }</td>
                        <td>
                            <button onclick="getUserbyIndex(${i});">Modificar</button>
                            <button onclick="remove(${i});" >Eliminar</button>
                        </td>
                      </tr>`;
            
        }
    }else{
        content=`<tr>
                    <td>No hay personas registradas. </td>
                </tr>`;
    }
    $("#tablePokemon > tbody").html(content);
};

const findAll = () =>{
    if (typeof(Storage) !=="undefined") {
        if(!localStorage.listPersons){
            localStorage.listPersons = JSON.stringify([])
        }
        persons= JSON.parse(localStorage.listPersons);
        fill();
    }else{
        alert("El navegador no soporta el almacenamiento web.")
    }
}

const create = () =>{
     let person = new Object();
     let name = $("#name").val();
     let lastName = $("#lastname").val();
     let surName = $("#surname").val();
     let selectPokemon = $("#selectPokemon option:selected").text();

     person.name = name;
     person.lastName = lastName;
     person.surName = surName;
     person.favorite = selectPokemon;

     persons.push(person);
     localStorage.listPersons= JSON.stringify(persons);
     findAll();
}

const remove = (index) =>{
    for (let i = 0; i < persons.length; i++) {
        if(i==index){
            persons.splice(i,1);
            break;
        }        
    }
    localStorage.listPersons = JSON.stringify(persons);
    findAll();
}

const getUserbyIndex = (index) =>{
    btnUpdate.show();
    btnRegister.hide();
    for (let i = 0; i < persons.length; i++) {
        if (i == index) {
            document.getElementById("name").value = persons[i].name;
            document.getElementById("lastname").value = persons[i].lastName;
            document.getElementById("surname").value = persons[i].surName;
            document.getElementById("index").value = index;

            let selectPokemon = $("#selectPokemon");
            
            for (let j = 0; j < listPokemon.length; j++) {
                if (listPokemon[j].name === persons[i].favorite) {
                    selectPokemon.append('<option selected value="'+ (i + 1) + '">'+listPokemon[j].name+'</option>');                    
                } else{
                    selectPokemon.append('<option value="'+ (i + 1) +'">'+ listPokemon[j].name +'</option>');  
                }
                
            }
        }
        
    }
}

const update = () =>{
    btnUpdate.hide();
    btnRegister.show();
    let index = document.getElementById("index").value;

    for (let i = 0; i < persons.length; i++){
        if (i == index) {
            persons[i].name = $("#name").val();
            persons[i].lastName = $("#lastname").val();
            persons[i].surName = $("#surname").val();
            persons[i].favorite = $("#selectPokemon option:selected").text();
        }        
    }
    localStorage.listPersons = JSON.stringify(persons);
    findAll();
}

btnUpdate.hide();
getPokemon();
findAll();