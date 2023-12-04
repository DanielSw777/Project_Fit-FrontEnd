const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let nombre_ingresado = document.getElementById("nombre").value //input
    let precio_ingresado = document.getElementById("precio").value
    let stock_ingresado = document.getElementById("stock").value
    let imagen_ingresada = document.getElementById("image").value


    console.log(nombre_ingresado, precio_ingresado, stock_ingresado, imagen_ingresada);
    // Se arma el objeto de js
    let datos = {
        nombre: nombre_ingresado,
        precio: precio_ingresado,
        stock: stock_ingresado,
        imagen: imagen_ingresada
    }
    console.log(datos);

    let url = "https://gimzeus.pythonanywhere.com/registro"
    var options = {
        body: JSON.stringify(datos),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(url, options)
        .then(function () {
            window.location.href = "../templates/admin-products.html";
        })
        .catch(err => {
            //this.errored = true
            alert("Error al grabar")
            console.error(err);
        })
});
