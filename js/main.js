//trayendo elementos de DOM
const inputTablero = document.getElementById('inputTablero');
const btnTablero = document.getElementById('btnTablero');
const ulTableros = document.getElementById('listaTableros');
const tableros = document.getElementsByClassName('tablero'); //no se si voy a usarlo
const tituloTablero = document.getElementById('tituloTablero');


// variables globales
const totalTableros = [];
let idTableros= 0; //no se si voy a usarlo 


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
    agregarTarea(titulo, duracion) {
        const nuevaTarea = new Tarea(titulo, duracion);
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
    const tableroNuevo = new Tablero(titulo,id);
    totalTableros.push(tableroNuevo);
    idTableros += 1;
    return tableroNuevo;
}

function crearTablero(tablero) {
    let liTablero = document.createElement('li');
    liTablero.classList.add('flex','justify-center');

    let buttonTablero = document.createElement('button');
    buttonTablero.className += "w-300 h-16 border-solid border-violet-300 border-b-2 bg-white text-gray-800 tablero";
    buttonTablero.setAttribute("id", `tablero-${tablero.id}`);
    buttonTablero.innerText = `${tablero.titulo}`;

    buttonTablero.addEventListener('click', () => {
        tituloTablero.innerText = `${tablero.titulo}` //modifica el texto dentro del h2 de tablero seleccionado
    })

    ulTableros.append(liTablero); 
    liTablero.appendChild(buttonTablero);
}

inputTablero.addEventListener('keyup', function(e){
    if(e.key=='Enter'){
        crearTablero(crearObjetoTablero(inputTablero.value, idTableros));
        inputTablero.value = null;
    }
})

btnTablero.addEventListener('click', () => {
    if (inputTablero.value) {
        crearTablero(crearObjetoTablero(inputTablero.value));
        inputTablero.value = null;
    }
});

















