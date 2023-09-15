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
const totalTableros = [];
let idTableros = 0;
let idTableroSeleccionado;


//clases
class Tarea {
    constructor(titulo, duracion) {
        this.titulo = titulo;
        this.duracion = duracion;
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


/* creación de tablero */
function crearObjetoTablero(titulo, id) {
    const tableroNuevo = new Tablero(titulo, id);
    totalTableros.push(tableroNuevo);
    idTableros += 1;
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
        mostrarTareas(objetoTablero);
    })
}

inputTablero.addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
        crearTablero(crearObjetoTablero(inputTablero.value, idTableros));
        inputTablero.value = null;
    }
})

btnTablero.addEventListener('click', () => {
    if (inputTablero.value) {
        crearTablero(crearObjetoTablero(inputTablero.value, idTableros));
        inputTablero.value = null;
    }

});


/* seleccionar tablero */
function seleccionarTablero() {
    const tableroSeleccionado = totalTableros.find((el) => el.id === idTableroSeleccionado);
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

























