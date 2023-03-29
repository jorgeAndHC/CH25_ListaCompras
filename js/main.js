let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAgregar = document.getElementById("btnAgregar");
let btnClaer = document.getElementById("btnClear"); 
let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

//Limpiar campos
btnClaer.addEventListener("click",function(event){
    event.preventDefault();
txtNombre.value="";
txtNumber.value="";
});

//boton de agregar
btnAgregar.addEventListener("click",function(event){
    event.preventDefault();
    // txtNombre.value=txtNombre.value.trim(); // hasta que se de agregar da la opcion de alerta
alertValidacionesTexto.innerHTML="";
alertValidaciones.style.display="none";
let lista ="Los siguientes campos deben ser llenados correctamente: <ul>";

    if (txtNombre.value.length==0){
        txtNombre.style.border=" solid thin red"; //thin es delgado
        lista +="<li> Se debe escribir un nombre Válido</li>";
        alertValidaciones.style.display="block";
    
    }else {
        txtNombre.style.border="";
    }
    //if txtNombre

    
    if (txtNumber.value.length==0){
        txtNumber.style.border=" solid thin red"; //thin es delgado
        lista +="<li> Se debe escribir un número Válido</li>";
        alertValidaciones.style.display="block";
    }else {
        txtNumber.style.border="";
    } // if Number
lista +="</ul;>";
 alertValidacionesTexto.insertAdjacentHTML("beforeend",lista);


});
txtNumber.addEventListener("blur", function(event){
event.preventDefault();
txtNumber.value = txtNumber.value.trim();
});
txtNombre.addEventListener("blur", function(event){
    event.preventDefault();
    txtNombre.value = txtNombre.value.trim();
    }); //txtnombre blur se utiliz en vez de la de arriba 




