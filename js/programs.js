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

function mostrarProgramas(programas) {
    if (programas.length !== 0) {
        main.textContent = "";
        programas.forEach(programa => {
            if (programa.activo) {
                const clone = template.content.cloneNode(true);
                clone.querySelector(".main__article").dataset.id = programa.id;
                clone.querySelector(".main__article-img").src = programa.imagen;
                clone.querySelector(".main__article-subtitle").textContent = programa.nombre;
                clone.querySelector(".main__article-price span").textContent = programa.precio;
                fragment.appendChild(clone);
            }
        });
        if(fragment.textContent === "") {
            const h2 = document.createElement("h2");
            h2.className = "main__title";
            h2.style.paddingTop = "5rem"
            h2.style.paddingBottom = "5rem"
            h2.textContent = "No hay Programas para Mostrar"
            main.appendChild(h2);
        }
        main.appendChild(fragment);
    } else {
        const h2 = document.createElement("h2");
        h2.className = "main__title";
        h2.style.paddingTop = "5rem"
        h2.style.paddingBottom = "5rem"
        h2.textContent = "No hay Programas para Mostrar"
        main.appendChild(h2);
    }
}
const cargarProgramas = async () => {
    try {
        loading(true);
        const response = await fetch('https://gimzeus.pythonanywhere.com/programas');
        data = await response.json();
        console.log(data);
        mostrarProgramas(data);
    } catch (error) {
        console.log('Error al obtener programas:', error);
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
document.addEventListener("DOMContentLoaded", cargarProgramas);
