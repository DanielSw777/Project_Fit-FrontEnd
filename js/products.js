const template = document.getElementById("article");
const main = document.querySelector(".main__container-article");
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
            if (producto.activo) {
                const clone = template.content.cloneNode(true);
                clone.querySelector(".main__article").dataset.id = producto.id;
                clone.querySelector(".main__article-img").src = producto.imagen;
                clone.querySelector(".main__article-subtitle").textContent = producto.nombre;
                clone.querySelector(".main__article-price span").textContent = producto.precio;
                fragment.appendChild(clone);
            }
        });
        if(fragment.textContent === "") {
            const h2 = document.createElement("h2");
            h2.className = "main__title";
            h2.style.paddingTop = "5rem"
            h2.style.paddingBottom = "5rem"
            h2.textContent = "No hay Productos para Mostrar"
            main.appendChild(h2);
        }
        main.appendChild(fragment);
    } else {
        const h2 = document.createElement("h2");
        h2.className = "main__title";
        h2.style.paddingTop = "5rem"
        h2.style.paddingBottom = "5rem"
        h2.textContent = "No hay Productos para Mostrar"
        main.appendChild(h2);
    }
}
const cargarProductos = async () => {
    try {
        loading(true);
        const response = await fetch('https://gimzeus.pythonanywhere.com/productos');
        data = await response.json();
        console.log(data);
        mostrarProductos(data);
    } catch (error) {
        console.log('Error al obtener productos:', error);
        const h2 = document.createElement("h2");
        h2.className = "main__title";
        h2.style.paddingTop = "5rem"
        h2.style.paddingBottom = "5rem"
        h2.textContent = "Error de Red"
        main.appendChild(h2);
    } finally {
        loading(false);
    }
};
document.addEventListener("DOMContentLoaded", cargarProductos);
