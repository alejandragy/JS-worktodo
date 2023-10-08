class Tablero {
    constructor(id, titulo, notas) {
        this.id = id;
        this.titulo = titulo;
        this.tareas = [];
        this.notas = notas;
    }
}


const inputTablero = document.getElementById('inputTablero');
const btnTablero = document.getElementById('btnTablero');
const ulTableros = document.getElementById('listaTableros');
const tituloTablero = document.getElementById('tituloTablero');


let totalTableros;
localStorage.getItem('totalTableros') ? totalTableros = JSON.parse(localStorage.getItem('totalTableros')) : totalTableros = [];
let contIdTableros = 0;
localStorage.getItem('contadorIdTableros') ? contIdTableros = JSON.parse(localStorage.getItem('contadorIdTableros')) : contIdTableros = parseInt('0');
let idTableroSeleccionado;
let borrarIndigo = './img/borrar-indigo.png';


//funciones
function crearObjetoTablero(id, titulo) {
    const tableroNuevo = new Tablero(id, titulo);
    totalTableros.push(tableroNuevo);
    contIdTableros += 1;
    guardarTablerosEnLS();
    localStorage.setItem('contadorIdTableros', contIdTableros);
    return tableroNuevo;
}

function crearTableroDOM(objetoTablero) {
    //crear li tablero
    let liTablero = document.createElement('li');
    liTablero.classList.add('flex', 'w-300', 'gap-2', 'rounded-md', 'mb-3', 'mt-2', 'bg-white', 'hover:scale-105', 'duration-75');
    liTablero.setAttribute('id', `tablero-${objetoTablero.id}`)
    ulTableros.append(liTablero);

    //crear botón tablero
    let buttonTablero = document.createElement('button');
    buttonTablero.classList.add('w-64', 'text-left', 'pl-2', 'h-16', 'text-gray-800', 'rounded-l-md', 'text-lg', 'tablero');
    buttonTablero.innerText = `${objetoTablero.titulo}`;
    liTablero.append(buttonTablero);

    //crear botón eliminar tablero
    let buttonEliminar = document.createElement('button');
    buttonEliminar.classList.add('mr-3', 'pl-2', 'opacity-30', 'hover:opacity-100');
    buttonEliminar.innerHTML = `<img class= "h-5 w-5" src="${borrarIndigo}" alt="eliminar">`;
    liTablero.append(buttonEliminar);

    //evento para seleccionar tablero
    buttonTablero.addEventListener('click', () => {
        divcontainerTableroSeleccionado.classList.remove('invisible');
        divcontainerTareas.classList.remove('opacity-0')
        divcontainerNotas.classList.remove('opacity-0');
        seleccionarTablero()
        tituloTablero.innerText = `${objetoTablero.titulo}`
        idTableroSeleccionado = objetoTablero.id;
        ulTareas.innerHTML = "";
        mostrarTareas(seleccionarTablero());
        txtNotas.value = '';
        mostrarNotas();
    })

    //evento para eliminar tablero
    buttonEliminar.addEventListener('click', () => {
        //eliminar objeto tablero
        idTableroSeleccionado = objetoTablero.id;
        const tableroSeleccionado = seleccionarTablero();
        const liTablero = buttonEliminar.parentNode;
        const indexTableroSeleccionado = totalTableros.indexOf(tableroSeleccionado);
        totalTableros.splice(indexTableroSeleccionado, 1);
        guardarTablerosEnLS();
        //eliminar tablero en DOM
        liTablero.remove();
        divcontainerTareas.classList.add('opacity-0');
        divcontainerNotas.classList.add('opacity-0');
        divcontainerTableroSeleccionado.classList.add('invisible');
        Toastify({
            text: "Tablero eliminado!",
            className: "info",
            style: {
                background: "linear-gradient(to right, #fb887e, #e93a2b)",
                'border-radius': '5px',
            }
        }).showToast();
    })
}


//eventos para crear tableros
btnTablero.addEventListener('click', () => {
    if (inputTablero.value) {
        crearTableroDOM(crearObjetoTablero(`tablero-${contIdTableros}`, inputTablero.value)); inputTablero.value = null;
        if (totalTableros.length == 1) {
            Swal.fire({
                title: 'Creaste tu primer tablero!',
                text: 'Selecciona el nuevo tablero para ver su detalle y empezar a agregar tareas',
                icon: 'success',
            })
        }
    }
});

inputTablero.addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
        if (inputTablero.value) {
            crearTableroDOM(crearObjetoTablero(`tablero-${contIdTableros}`, inputTablero.value)); inputTablero.value = null;
            if (totalTableros.length == 1) {
                Swal.fire({
                    title: 'Creaste tu primer tablero!',
                    text: 'Selecciona el nuevo tablero para ver su detalle y empezar a agregar tareas',
                    icon: 'success',
                })
            }
        }
    }
});