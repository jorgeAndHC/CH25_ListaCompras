/* Creación de variables */
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

let tabla = document.getElementById("tablaListaCompras");
let cuerpoTabla = tabla.getElementsByTagName("tbody");

let contadorProductos = document.getElementById("contadorProductos");
let totalProductos = document.getElementById("totalProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

let isValid = true;
let idTimeOut; /* Valiable del setTimeout */
let precio = 0;
let contador = 0;
let totalEnProductos = 0;
let costoTotal = 0;
let datos = []; /* Para almacenar los datos de la tabla */

/* Boton de limpiar */
btnClear.addEventListener("click", function (event) {
    event.preventDefault();
    txtNombre.value = "";
    txtNumber.value = "";
    cuerpoTabla[0].innerHTML = ""


    contador = 0;
    totalEnProductos = 0;
    costoTotal = 0;
    contadorProductos.innerHTML = "0";
    productosTotal.innerHTML = "0";
    precioTotal.innerHTML = "$ 0";
    localStorage.setItem("contadorProductos", contador); /* Agrega en el localStorage los resumenes */
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal.toFixed(2));/* toFixed es para redondear a 3 decimas */
});

/* Condiciones para ejecurtar condiciones sobre los números */
function validarCantidad() {
    if (txtNumber.value.length == 0) { /* Igual a cero regresa falso */
        return false;
    }
    if (isNaN(txtNumber.value)) { /* No es un número, regresa un falso */
        return false;
    }
    if (parseFloat(txtNumber.value) <= 0) {
        return false;
    }
    return true;
}

/* Función para generar un precio de manera aleatoria */
function getPrecio() {
    return Math.floor(Math.random() * 50 * 100) / 100;
}//.floor quita los decimales 

/* Boton de agregar */
btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();
    isValid = true;
    clearTimeout(idTimeOut); /* Cancela la función del setTimeout */
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    let lista = "Los siguientes campos deben ser llenados correctamente: <ul>";
    if (txtNombre.value.length < 2) {
        txtNombre.style.border = "solid thin red";/* thin es tipo de borde */
        lista += "<li> Se debe escribir un nombre válido.</li>";
        alertValidaciones.style.display = "block";
        isValid = false;
    } else {
        txtNombre.style.border = "";
    }
    if (!validarCantidad()) { /* Se utiliza la función anterior para hacer la validación (! es una negación de la función) */
        txtNumber.style.border = "solid thin red";
        lista += "<li> Se debe escribir un número válido. </li>";
        /*         alertValidaciones.innerHTML="Se debe escribir un número valido"; */
        alertValidaciones.style.display = "block";
        isValid = false;
    } else {
        txtNumber.style.border = "";
    }
    lista += "</ul>";
    alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);
    idTimeOut = setTimeout(function () {
        alertValidaciones.style.display = "none"; /* Acciones que se debe realizar */
    }, 5000); /* Tiempo en milisegundos */
    if (isValid) {
        precio = getPrecio();
        contador++;
        let row = `<tr>
               <th>${contador}</th>
               <td>${txtNombre.value}</td>
               <td>${txtNumber.value}</td>
               <td>$${precio}</td>
               </tr>`; /* El th lo pone en negritas */
        let elemento = `{
                        "id"      :        ${contador},
                        "nombre"  :    "${txtNombre.value}",
                        "cantidad":  "${txtNumber.value}",
                        "precio"  :      "${precio}"
        }`; 
        datos.push(JSON.parse(elemento));

        localStorage.setItem("datos", JSON.stringify(datos));


        cuerpoTabla[0].insertAdjacentHTML("beforeend", row); /* Agrega elementos a la tabla 0 */
        contadorProductos.innerHTML = contador; /* Pone en acción el circulo rojo de Resúmen */
        totalEnProductos += parseFloat(txtNumber.value);
        productosTotal.innerHTML = totalEnProductos;
        costoTotal += precio * parseFloat(txtNumber.value);
        precioTotal.innerHTML = `$ ${costoTotal.toFixed(2)}`;
        let resumen = `{"contadorProductos" : ${contador},
                        "totalEnProductos" : ${totalEnProductos},
                        "costoTotal"       : ${costoTotal.toFixed(2)}}`; //para realizar una tabla para json
        localStorage.setItem("resumen", resumen);
        //localStorage.setItem("contadorProductos",contador); /* Agrega en el localStorage los resumenes; se realizo al inicio */
        //localStorage.setItem("totalEnProductos", totalEnProductos);
        //localStorage.setItem("costoTotal",costoTotal.toFixed(2));/* toFixed es para redondear a 3 decimas */
        txtNombre.value = "";
        txtNumber.value = "";
        txtNombre.focus();
    }
});


/* Boton para salirse del foto */
txtNumber.addEventListener("blur", function (event) {/* Se sale del campo con blur */
    event.preventDefault();
    txtNumber.value = txtNumber.value.trim();
});

txtNombre.addEventListener("blur", function (event) {/* Se sale del campo con blur */
    event.preventDefault();
    txtNombre.value = txtNombre.value.trim();
});

window.addEventListener("load", function (event) {
    if (localStorage.getItem("resumen") == null) {
        let resumen = `{ "contadorProductos": ${contador},
                         "totalEnProductos" : ${totalEnProductos},
                         "costoTotal"       : ${costoTotal.toFixed(2)}}`
        localStorage.setItem("resumen", resumen); /* Se debe declarar para poder usarlos */
    }
    let res = JSON.parse(localStorage.getItem("resumen"));
   if(localStorage.getItem("datos")!=null){
    datos = JSON.parse(localStorage.getItem("datos"));

    datos.forEach( r => {
        let row =`<tr>
        <th> ${r.id}</th>
        <th> ${r.nombre}</th>
        <th> ${r.cantidad}</th>
        <th>$ ${r.precio}</th>

        </tr>`;
        cuerpoTabla[0].insertAdjacentHTML("beforeend",row);
    });



   }

    //if(localStorage.getItem("contadorProductos")==null){ /* Para poner los valores en ceros cuando se eliminan los valores del localStorage desde la pagina */
    //    localStorage.setItem("contadorProductos", "0");
    //}
    //if(localStorage.getItem("totalEnProductos")==null){
    //    localStorage.setItem("totalEnProductos", "0");
    //}
    //if(localStorage.getItem("costoTotal")==null){
    //    localStorage.setItem("costoTotal", "0");
    //}

    contador = res.contadorProductos;
    totalEnProductos = res.totalEnProductos;
    costoTotal = res.costoTotal;


    //contador = parseInt(localStorage.getItem("contadorProductos")); /* Se deben convertir para que pueda funcionar */
    //totalEnProductos = parseInt(localStorage.getItem//("totalEnProductos", totalEnProductos));
    //costoTotal = parseFloat(localStorage.getItem("costoTotal"));

    contadorProductos.innerHTML = contador;
    productosTotal.innerHTML = totalEnProductos;
    precioTotal.innerHTML = `$ ${costoTotal}`;
});



