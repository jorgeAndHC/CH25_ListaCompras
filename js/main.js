let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAgregar = document.getElementById("btnAgregar");
let btnClaer = document.getElementById("btnClear");
let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

let tabla = document.getElementById("tablaListaCompras");
let cuerpoTabla = tabla.getElementsByTagName("tbody");

let contadorProductos =document.getElementById("contadorProductos");
let productosTotal=document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");


let isValid = true;
let idTimeout;
let precio = 0;
let contador = 0;
let totalEnProductos= 0;
let costoTotal = 0;
 

//Limpiar campos
btnClaer.addEventListener("click", function (event) {
    event.preventDefault();
    txtNombre.value = "";
    txtNumber.value = "";
    cuerpoTabla[0].innerHTML = "";
    
    contador= 0;
    totalEnProductos= 0;
    costoTotal= 0;
    
    contadorProductos.innerText= "0";
    costoTotal.innerText= "0";
    precioTotal.innerText= "$ 0";


});//click btnclear


function validatCantidad() {
    if (txtNumber.value.length == 0) {
        return false;
    }
    if (isNaN(txtNumber.value)) {
        return false;
    }
    if (parseFloat(txtNumber.value) <= 0) {
        return false;
    }

    return true;

}//validarCantidad


function getPrecio() {
    return Math.floor(Math.random() * 50 * 100) / 100;
}//.floor quita los decimales 

//boton de agregar
btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();
    isValid = true;
    console.log(getPrecio());
    clearTimeout(idTimeout);
    // txtNombre.value=txtNombre.value.trim(); // hasta que se de agregar da la opcion de alerta
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";

    let lista = "Los siguientes campos deben ser llenados correctamente: <ul>";

    if (txtNombre.value.length < 2) {
        txtNombre.style.border = " solid thin red"; //thin es delgado
        lista += "<li> Se debe escribir un nombre Válido</li>";
        alertValidaciones.style.display = "block";
        isValid = false;

    } else {
        txtNombre.style.border = "";
    }
    //if txtNombre

    if (!validatCantidad()) { // ! voltea el signo 
        txtNumber.style.border = " solid thin red"; //thin es delgado
        lista += "<li> Se debe escribir una cantidad Válida</li>";
        alertValidaciones.style.display = "block";
        isValid = false;
    
    } else {
        txtNumber.style.border = "";
    } // if Number
    lista += "</ul;>";
    alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);
    idTimeout = setTimeout(function () {//primer parametro funcion y segundo el tiempo en milisegundos
        alertValidaciones.style.display = "none";
    }, 5000);
    if(isValid){
    precio = getPrecio();
    contador ++;
    
    let row =`<tr>
               <th>${contador}</th>
               <td>${txtNombre.value}</td>
               <td>${txtNumber.value}</td>
               <td>${precio}</td>
               </tr>`;
    
    cuerpoTabla[0].insertAdjacentHTML("beforeend",row);           
    contadorProductos.innerText=contador;  
    totalEnProductos += parseFloat(txtNumber.value);
    productosTotal.innerHTML=totalEnProductos;
    costoTotal +=precio * parseFloat(txtNumber.value);
    precioTotal.innerHTML=`${costoTotal.toFixed(2)} `;
    
    txtNombre.value="";
    txtNumber.value="";
    txtNombre.focus();
} //if valid

});
txtNumber.addEventListener("blur", function (event) {
    event.preventDefault();
    txtNumber.value = txtNumber.value.trim();
});
txtNombre.addEventListener("blur", function (event) {
    event.preventDefault();
    txtNombre.value = txtNombre.value.trim();
}); //txtnombre blur se utiliz en vez de la de arriba 




