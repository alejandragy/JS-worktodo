//clases
class Tarea {
    constructor(titulo) {
        this.titulo = titulo;
        this.realizada = false;
    }
}

class Tablero {
    constructor(titulo, id) {
        this.id = id;
        this.titulo = titulo;
        this.tareas = [];
    }
    agregarTarea(titulo) {
        const nuevaTarea = new Tarea(titulo);
        this.tareas.push(nuevaTarea);
    }
    eliminarTarea(index) {
        this.tareas.splice(index, 1);
    }
    realizarTarea(input) {
        this.tareas[input].realizada = true;
    }
}

//trayendo elementos de DOM
const inputTablero = document.getElementById('inputTablero');
const btnTablero = document.getElementById('btnTablero');
const ulTableros = document.getElementById('listaTableros');
const tableros = document.getElementsByClassName('tablero'); //no se si voy a usarlo
const tituloTablero = document.getElementById('tituloTablero');

const inputTarea = document.getElementById('inputTarea');
const btnTarea = document.getElementById('btnTarea'); /**/
const ulTareas = document.getElementById('listaTareas'); /**/

// variables globales
let idTableroSeleccionado;

// variables globales y localStorage
let totalTableros;
if (localStorage.getItem('totalTableros')) {
    totalTableros = JSON.parse(localStorage.getItem('totalTableros'));
}
else {
    totalTableros = [];
}

let idTableros = 0;
if (localStorage.getItem('idTableros')) {
    idTableros = JSON.parse(localStorage.getItem('idTableros'));
}
else {
    idTableros = parseInt('0');
}


/* funciones para crear nuevo tablero */
function crearObjetoTablero(titulo, id) {
    const tableroNuevo = new Tablero(titulo, id);
    totalTableros.push(tableroNuevo);
    localStorage.setItem('totalTableros', JSON.stringify(totalTableros));
    idTableros += 1;
    localStorage.setItem('idTableros', JSON.stringify(idTableros));
    return tableroNuevo;
}

function crearTablero(objetoTablero) {
    //crear li tablero
    let liTablero = document.createElement('li');
    liTablero.classList.add('flex', 'justify-center');
    ulTableros.append(liTablero);

    //crear boton tablero
    let buttonTablero = document.createElement('button');
    buttonTablero.classList.add('w-300', 'h-16', 'border-solid', 'border-violet-300', 'border-b-2', 'bg-white', 'text-gray-800', 'tablero');
    buttonTablero.setAttribute('id', `tablero-${objetoTablero.id}`);
    buttonTablero.innerText = `${objetoTablero.titulo}`;
    liTablero.append(buttonTablero);

    buttonTablero.addEventListener('click', () => {
        tituloTablero.innerText = `${objetoTablero.titulo}`
        idTableroSeleccionado = objetoTablero.id;
    })
}

/* cargar tableros desde localStorage al cargar la página */
function tablerosDesdeLocalStorage() {
    const tablerosDeLocalStorage = JSON.parse(localStorage.getItem('totalTableros')) || [];
    for (const tablero of tablerosDeLocalStorage) {
        crearTablero(tablero);
    }
}
window.addEventListener('load', () => {tablerosDesdeLocalStorage();});

/* crear nuevo tablero en DOM */
btnTablero.addEventListener('click', () => {
    if (inputTablero.value) {
        crearTablero(crearObjetoTablero(inputTablero.value, idTableros));
        inputTablero.value = null;
    }

});




/* seleccionar tablero */
function seleccionarTablero() {
    const tableroSeleccionado = totalTableros.find((tablero) => tablero.id === idTableroSeleccionado);
    return tableroSeleccionado;
}

/* agregar tarea */
function crearTarea(tablero, tarea) {
    tablero.agregarTarea(`${tarea}`);
}


function mostrarTareas(tableroSeleccionado) {
    const arrayTareas = tableroSeleccionado.tareas;

    /*arrayTareas.forEach(tarea => {
        //crear li tarea
        let liTarea = document.createElement('li');
        liTarea.classList.add('w-300', 'h-10', 'mb-3', 'flex', 'rounded-md', 'border-solid', 'border-slate-100', 'border-2', 'lg:w-360')
        ulTareas.append(liTarea);

        //crear img tarea pendiente
        let imgPendiente = document.createElement('img');
        imgPendiente.classList.add('h-7', 'pt-2', 'ml-2');
        imgPendiente.setAttribute('src', './img/pendiente.png');
        imgPendiente.setAttribute('alt', 'pendiente');
        liTarea.append(imgPendiente);

        //crear img tarea realizada
        let imgRealizada = document.createElement('img');
        imgRealizada.classList.add('h-7', 'pt-2', 'ml-2', 'hidden');
        imgRealizada.setAttribute('src', './img/listo.png');
        imgRealizada.setAttribute('alt', 'realizada');
        liTarea.append(imgRealizada);

        //crear titulo de tarea
        let pTarea = document.createElement('p');
        pTarea.classList.add('pt-2', 'ml-2', 'text-gray-800');
        pTarea.innerText = `${tarea.titulo}`
        liTarea.append(pTarea);

        //crear img eliminar
        let imgEliminar = document.createElement('img');
        imgEliminar.classList.add('invisible');
        //imgEliminar.setAttribute('src', );
        imgEliminar.setAttribute('alt', 'eliminar');


    ulTareas.innerHTML= `
    <li class="'w-300 h-10 mb-3 flex rounded-md border-solid border-slate-100 border-2 lg:w-360">
        <img src="./img/pendiente.png" class="h-7 pt-2 ml-2" alt="tarea pendiente">
        <img src="./img/listo.png" class="h-7 pt-2 ml-2 hidden" alt="tarea realizada">
        <p class="pt-2 ml-2 text-gray-800">${tarea.titulo}</p>
        <img src="./img/" class="invisible" alt="eliminar">
    </li>`
    });*/

}


btnTarea.addEventListener('click', () => {
    if (inputTarea.value) {
        crearTarea(seleccionarTablero(), inputTarea.value);
        inputTarea.value = null;
    }
});

