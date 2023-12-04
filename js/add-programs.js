const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let nombre_ingresado = document.getElementById("nombre").value
    let precio_ingresado = document.getElementById("precio").value
    let imagen_ingresada = document.getElementById("image").value

    let datos = {
        nombre: nombre_ingresado,
        precio: precio_ingresado,
        imagen: imagen_ingresada
    }

    let url = "https://gimzeus.pythonanywhere.com/registro-programa"
    var options = {
        body: JSON.stringify(datos),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(url, options)
        .then(function () {
            window.location.href = "../templates/admin-programs.html";
        })
        .catch(err => {
            alert("Error al grabar")
            console.error(err);
        })
});
