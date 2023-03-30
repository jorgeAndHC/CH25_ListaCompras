let txtNombre = document.getElementById ("Name");
    let txtNumber = document.getElementById("Number");
    
    let btnAgregar = document.getElementById("btnAgregar");
    let btnClear = document.getElementById("btnClear");
    
    let alertValidaciones = document.getElementById("alertValidaciones");
    let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

    let tabla = document.getElementById("tablaListaCompras"); //traer un elemento por su id
    let cuerpoTabla = tabla.getElementsByTagName("tbody");

    let contadorProductos = document.getElementById ("contadorProductos");
    let productosTotal = document.getElementById ("productosTotal");
    let precioTotal = document.getElementById("precioTotal");

    let isValid = true;
    let idTimeout; //variables
    let precio = 0;
    let contador =0;
    let totalEnProductos = 0;
    let costoTotal = 0;

    // Limpiar campos
    btnClear.addEventListener("click", function (event) {
        event.preventDefault();
        txtNombre.value=""; //limpiar campos
        txtNumber.value=""; //limpiar campos
        cuerpoTabla[0].innerHTML=""; //limpiar todo

        contador =0;
        totalEnProductos = 0;
        costoTotal = 0;
        contadorProductos.innerText = "0";
        productosTotal.innerText = "0";
        precioTotal.innerText= "$ 0";

        localStorage.setItem("contadorProductos",contador);
        localStorage.setItem("totalEnProductos", totalEnProductos);
        localStorage.setItem("costoTotal", costoTotal.toFixed(2));
    }); //click btnClear

    function validarCantidad(){
        if (txtNumber.value.length==0){
            return false;
        } //if validar que haya dato

        if (isNaN(txtNumber.value)){
            return false;
        }//if validar si es número

        if (parseFloat(txtNumber.value)<=0){
            return false;
        }//if validar que sea mayor a 0

        return true;
    } //validarcantidad

    function getPrecio(){
        return Math.floor(Math.random() * 50 * 100 ) /100;
    }//getPrecio

    btnAgregar.addEventListener("click", function (event) {
        event.preventDefault();
        isValid = true;
        clearTimeout(idTimeout);
        alertValidacionesTexto.innerHTML="";
        alertValidaciones.style.display="none";
        let lista = "los siguientes campos deben ser llenados correctamente:<ul>";
        if (txtNombre.value.length<2){
            txtNombre.style.border="solid thin red";
            lista += "<li> Se debe escribir un nombre válido</li>";
            alertValidaciones.style.display="block";
            isValid = false;
        } else{
            txtNombre.style.border="";
        }//if txtNombre

        if (! validarCantidad()){
            txtNumber.style.border="solid thin red";
            lista +="<li> Se debe escribir una cantidad válida</li>";
            alertValidaciones.style.display="block"; //para que se vea la alerta
            isValid = false;
        } else{
            txtNumber.style.border="";
        }//if txtNumber
        lista += "</ul>";
        alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);
        idTimeout=setTimeout (function(){ //permite establecer tiempo de un función
            alertValidaciones.style.display="none";
        }, 5000);
        if (isValid){
            precio = getPrecio();
            contador++;
            let row = `<tr> 
                          <th>${contador}</th>
                          <td>${txtNombre.value}</td> 
                          <td>${txtNumber.value}</td>
                          <td>$ ${precio}</td>
                         </tr>`; //table road, table head, table data     
            cuerpoTabla[0].insertAdjacentHTML("beforeend", row);
            contadorProductos.innerText=contador;
            totalEnProductos += parseFloat(txtNumber.value);
            productosTotal.innerText=totalEnProductos;
            costoTotal += precio * parseFloat(txtNumber.value);
            precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
            localStorage.setItem("contadorProductos",contador);
            localStorage.setItem("totalEnProductos", totalEnProductos);
            localStorage.setItem("costoTotal", costoTotal.toFixed(2));
            txtNombre.value=""; //limpiar campos
            txtNumber.value=""; //limpiar campos
            txtNombre.focus();
            }//if isValid               
    }); // btnAgregar click
    
    txtNumber.addEventListener("blur", function(event){
        event.preventDefault();
        txtNumber.value = txtNumber.value.trim();
    }); // txtNumber.blur
        
    txtNombre.addEventListener("blur", function(event){
        event.preventDefault();
        txtNombre.value = txtNombre.value.trim();
    }); // txtNombre.blur

    window.addEventListener("load", function(event){
        if (localStorage.getItem("contadorProductos")==null){
            localStorage.setItem("contadorProductos", "0");
        }//if
        if (localStorage.getItem("totalEnProductos")==null){
            localStorage.setItem("totalEnProductos", "0");
        }

        if (localStorage.getItem("costoTotal")==null){
            localStorage.setItem("costoTotal", "0.0");
        }//if
        
        contador = parseInt(localStorage.getItem("contadorProductos"));
        totalEnProductos = parseInt(localStorage.getItem("totalEnProductos"));
        costoTotal = parseFloat(localStorage.getItem("costoTotal"));

        contadorProductos.innerText=contador;
        productosTotal.innerText=totalEnProductos;
        precioTotal.innerText= `$ ${costoTotal}`;
    });


