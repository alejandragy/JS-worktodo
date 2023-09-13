//trayendo elementos de DOM
let inputTablero = document.getElementById('inputTablero');
const btnTablero = document.getElementById('btnTablero');
const ulTableros = document.getElementById('listaTableros');



//globales
const totalTableros = [];


//clases
class Tarea {
    constructor(titulo, duracion) {
        this.titulo = titulo;
        this.duracion = duracion;
        this.realizada = false;
    }
}

class Tablero {
    constructor(titulo) {
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
function crearObjetoTablero(titulo) {
    const tableroNuevo = new Tablero(titulo);
    totalTableros.push(tableroNuevo);
    return tableroNuevo;
}

function crearLiTablero(tablero) {
    let liTablero = document.createElement('li');
    liTablero.innerHTML = `
    <li class="flex justify-center">
        <button class="w-300 h-16 border-solid border-violet-300 border-b-2 bg-white text-gray-800">${tablero.titulo}</button>
    </li>`;
    ulTableros.append(liTablero); 
}

btnTablero.addEventListener('click', () => {
    if (inputTablero.value) {
        crearLiTablero(crearObjetoTablero(inputTablero.value))
        inputTablero.value = null;
    }
});

console.log(totalTableros);







