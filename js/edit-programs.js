const form = document.getElementById("form");

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const nombre = params.get("nombre");
    const precio = params.get("precio");
    const imagen = params.get("imagen");

    // Llenar el formulario con los valores recuperados
    form.querySelector("#nombre").value = nombre;
    form.querySelector("#precio").value = precio;
    form.querySelector("#image").value = imagen;


    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        let program = {
            nombre: form.querySelector("#nombre").value,
            precio: form.querySelector("#precio").value,
            imagen: form.querySelector("#image").value
        }
        try {
            let url = "https://gimzeus.pythonanywhere.com/update-programa/" + id;
            var options = {
                body: JSON.stringify(program),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            };
            await fetch(url, options);
            window.location.href = `admin-programs.html`;
        } catch (err) {
            console.error(err);
        }
    });

});
