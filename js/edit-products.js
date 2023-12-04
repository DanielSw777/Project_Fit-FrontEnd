const form = document.getElementById("form");

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const nombre = params.get("nombre");
    const precio = params.get("precio");
    const stock = params.get("stock");
    const imagen = params.get("imagen");

    // Llenar el formulario con los valores recuperados
    form.querySelector("#nombre").value = nombre;
    form.querySelector("#precio").value = precio;
    form.querySelector("#stock").value = stock;
    form.querySelector("#image").value = imagen;


    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        let product = {
            nombre: form.querySelector("#nombre").value,
            precio: form.querySelector("#precio").value,
            stock: form.querySelector("#stock").value,
            imagen: form.querySelector("#image").value
        }
        try {
            let url = "https://gimzeus.pythonanywhere.com/update/" + id;
            var options = {
                body: JSON.stringify(product),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            };
            await fetch(url, options);
            window.location.href = `admin-products.html`;
        } catch (err) {
            console.error(err);
        }
    });

});
