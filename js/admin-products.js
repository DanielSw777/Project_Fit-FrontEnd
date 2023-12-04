const template = document.getElementById("article");
const main = document.querySelector(".main");
const loader = document.querySelector(".pyramid-loader");
const fragment = document.createDocumentFragment();
let data = [];
const loading = (state) => {
    if (state) {
        loader.style.display = "flex";
    } else {
        loader.style.display = "none";
    }
};

function mostrarProductos(productos) {
    if (productos.length !== 0) {
        main.textContent = "";
        productos.forEach(producto => {
            const clone = template.content.cloneNode(true);
            clone.querySelector(".main__article").dataset.id = producto.id;
            clone.querySelector(".main__btn-publicar").dataset.id = producto.id;
            clone.querySelector(".main__btn-editar").dataset.id = producto.id;
            clone.querySelector(".main__btn-eliminar").dataset.id = producto.id;
            if (!producto.activo) {
                clone.querySelector(".main__btn-publicar").textContent = "Publicar"
                clone.querySelector(".main__btn-publicar").style.backgroundColor = "#27C800"
            } else {
                clone.querySelector(".main__btn-publicar").textContent = "Ocultar"
                clone.querySelector(".main__btn-publicar").style.backgroundColor = "#ff7300"
            }

            clone.querySelector(".main__article-img").src = producto.imagen;
            clone.querySelector(".main__article-subtitle").textContent = producto.nombre;
            clone.querySelector(".main__article-price span").textContent = producto.precio;
            clone.querySelector(".main__article-stock span").textContent = producto.stock;
            fragment.appendChild(clone);
        });
        main.appendChild(fragment);
    } else {
        const h2 = document.createElement("h2");
        h2.className = "main__title";
        h2.textContent = "No hay Productos para Mostrar."
        main.appendChild(h2);
    }
}

const eliminarUnProducto = async (id) => {
    try {
        const response = await fetch(`https://gimzeus.pythonanywhere.com/borrar/${id}`, { method: "DELETE" });
        if (response.ok) {
            alert("Producto Eliminado Correctamente.!!!");
        }
    } catch (error) {
        console.log('Error al obtener productos:', error)
    }
};

const eliminarProducto = (event) => {
    main.querySelector(`article[data-id="${event.target.dataset.id}"]`).remove();
    eliminarUnProducto(parseInt(event.target.dataset.id));
    data = data.filter(producto => producto.id !== parseInt(event.target.dataset.id));
    if (data.length === 0) {
        const h2 = document.createElement("h2");
        h2.className = "main__title";
        h2.textContent = "No hay Productos para Mostrar."
        main.appendChild(h2);
    }
};

const cargarProductos = async () => {
    try {
        loading(true);
        const response = await fetch('https://gimzeus.pythonanywhere.com/productos');
        data = await response.json();
        mostrarProductos(data);
    } catch (error) {
        console.log('Error al obtener productos:', error);
        const h2 = document.createElement("h2");
        h2.className = "main__title";
        h2.textContent = "Error de Red"
        main.appendChild(h2);
    } finally {
        loading(false);
    }
};

const actualizarEstado = async (event) => {
    const id = parseInt(event.target.dataset.id);
    const productoSeleccionado = data.find(producto => producto.id === id);

    if (productoSeleccionado) {
        productoSeleccionado.activo = !productoSeleccionado.activo;
        console.log(productoSeleccionado.activo)
        event.target.textContent = productoSeleccionado.activo ? "Ocultar" : "Publicar";
        event.target.style.backgroundColor = !productoSeleccionado.activo ? "#27C800" : "#ff7300";

        try {
            await fetch(`https://gimzeus.pythonanywhere.com/activar-desactivar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ activo: productoSeleccionado.activo }),
            });
        } catch (error) {
            console.error('Error al realizar la solicitud al servidor:', error);
        }
    }
};

document.addEventListener("DOMContentLoaded", cargarProductos);
document.addEventListener("click", (event) => {
    if (event.target.matches(".main__btn-eliminar")) {
        eliminarProducto(event);
    } else if (event.target.matches(".main__btn-editar")) {
        const id = parseInt(event.target.dataset.id);
        const productoSeleccionado = data.find(producto => producto.id === id);

        if (productoSeleccionado) {
            const queryString = Object.keys(productoSeleccionado).map(key => `${key}=${encodeURIComponent(productoSeleccionado[key])}`).join('&');
            window.location.href = `edit-product.html?${queryString}`;
        }
    } else if (event.target.matches(".main__btn-publicar")) {
        actualizarEstado(event);
    }
});
