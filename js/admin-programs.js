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

function mostrarProgramas(programas) {
    if (programas.length !== 0) {
        main.textContent = "";
        programas.forEach(programa => {
            const clone = template.content.cloneNode(true);
            clone.querySelector(".main__article").dataset.id = programa.id;
            clone.querySelector(".main__btn-publicar").dataset.id = programa.id;
            clone.querySelector(".main__btn-editar").dataset.id = programa.id;
            clone.querySelector(".main__btn-eliminar").dataset.id = programa.id;
            if (!programa.activo) {
                clone.querySelector(".main__btn-publicar").textContent = "Publicar"
                clone.querySelector(".main__btn-publicar").style.backgroundColor = "#27C800"
            } else {
                clone.querySelector(".main__btn-publicar").textContent = "Ocultar"
                clone.querySelector(".main__btn-publicar").style.backgroundColor = "#ff7300"
            }

            clone.querySelector(".main__article-img").src = programa.imagen;
            clone.querySelector(".main__article-subtitle").textContent = programa.nombre;
            clone.querySelector(".main__article-price span").textContent = programa.precio;
            fragment.appendChild(clone);
        });
        main.appendChild(fragment);
    } else {
        const h2 = document.createElement("h2");
        h2.className = "main__title";
        h2.textContent = "No hay Programas para Mostrar."
        main.appendChild(h2);
    }
}

const eliminarUnPrograma = async (id) => {
    try {
        const response = await fetch(`https://gimzeus.pythonanywhere.com/borrar-programa/${id}`, { method: "DELETE" });
        if (response.ok) {
            alert("Programa Eliminado Correctamente.!!!");
        }
    } catch (error) {
        console.log('Error al obtener programas:', error)
    }
};

const eliminarPrograma = (event) => {
    main.querySelector(`article[data-id="${event.target.dataset.id}"]`).remove();
    eliminarUnPrograma(parseInt(event.target.dataset.id));
    data = data.filter(programa => programa.id !== parseInt(event.target.dataset.id));
    if (data.length === 0) {
        const h2 = document.createElement("h2");
        h2.className = "main__title";
        h2.textContent = "No hay Programas para Mostrar."
        main.appendChild(h2);
    }
};

const cargarProgramas = async () => {
    try {
        loading(true);
        const response = await fetch('https://gimzeus.pythonanywhere.com/programas');
        data = await response.json();
        mostrarProgramas(data);
    } catch (error) {
        console.log('Error al obtener programas:', error);
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
    const programaseleccionado = data.find(programa => programa.id === id);

    if (programaseleccionado) {
        programaseleccionado.activo = !programaseleccionado.activo;
        console.log(programaseleccionado.activo)
        event.target.textContent = programaseleccionado.activo ? "Ocultar" : "Publicar";
        event.target.style.backgroundColor = !programaseleccionado.activo ? "#27C800" : "#ff7300";

        try {
            await fetch(`https://gimzeus.pythonanywhere.com/activar-desactivar-programa/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ activo: programaseleccionado.activo }),
            });
        } catch (error) {
            console.error('Error al realizar la solicitud al servidor:', error);
        }
    }
};

document.addEventListener("DOMContentLoaded", cargarProgramas);
document.addEventListener("click", (event) => {
    if (event.target.matches(".main__btn-eliminar")) {
        eliminarPrograma(event);
    } else if (event.target.matches(".main__btn-editar")) {
        const id = parseInt(event.target.dataset.id);
        const programaseleccionado = data.find(programa => programa.id === id);

        if (programaseleccionado) {
            const queryString = Object.keys(programaseleccionado).map(key => `${key}=${encodeURIComponent(programaseleccionado[key])}`).join('&');
            window.location.href = `edit-programs.html?${queryString}`;
        }
    } else if (event.target.matches(".main__btn-publicar")) {
        actualizarEstado(event);
    }
});
