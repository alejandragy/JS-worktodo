//clases
class Tarea {
    constructor(id, titulo) {
        this.id = id;
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
    /*eliminarTarea(index) {
        this.tareas.splice(index, 1);
    }
    realizarTarea(input) {
        this.tareas[input].realizada = true;
    }*/
}


//trayendo elementos de DOM
const inputTablero = document.getElementById('inputTablero');
const btnTablero = document.getElementById('btnTablero');
const ulTableros = document.getElementById('listaTableros');
const tituloTablero = document.getElementById('tituloTablero');
const inputTarea = document.getElementById('inputTarea');
const btnTarea = document.getElementById('btnTarea');
const ulTareas = document.getElementById('listaTareas');
const txtNotas = document.getElementById('notas');


// variables globales y localStorage
let totalTableros;
localStorage.getItem('totalTableros') ? totalTableros = JSON.parse(localStorage.getItem('totalTableros')) : totalTableros = [];
let contIdTableros = 0;
localStorage.getItem('contadorIdTableros') ? contIdTableros = JSON.parse(localStorage.getItem('contadorIdTableros')) : contIdTableros = parseInt('0');
let idTableroSeleccionado;
let idTarea;
let notas;
localStorage.getItem('notas') ? notas = localStorage.getItem('notas') : notas = '';



/* traer de LS al cargar la página */
function tablerosDesdeLS() {
    const tableros = JSON.parse(localStorage.getItem('totalTableros'));
    tableros.forEach(tablero => { crearTableroDOM(tablero) });
}


window.addEventListener('load', () => { localStorage.getItem('totalTableros') && tablerosDesdeLS(); txtNotas.value = notas; })





/* tableros */
//funciones
function crearObjetoTablero(titulo, id) {
    const tableroNuevo = new Tablero(titulo, id);
    totalTableros.push(tableroNuevo);
    contIdTableros += 1;
    localStorage.setItem('totalTableros', JSON.stringify(totalTableros));
    localStorage.setItem('contadorIdTableros', contIdTableros);
    return tableroNuevo;
}

function crearTableroDOM(objetoTablero) {
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
        seleccionarTablero()
        tituloTablero.innerText = `${objetoTablero.titulo}`
        idTableroSeleccionado = objetoTablero.id;
        localStorage.setItem('idTableroSeleccionado', JSON.stringify(idTableroSeleccionado));
        localStorage.setItem('tableroSeleccionado', JSON.stringify(seleccionarTablero()));
        ulTareas.innerHTML = "";
        mostrarTareas(seleccionarTablero());
    })


}

function seleccionarTablero() {
    const tableroSeleccionado = totalTableros.find((tablero) => tablero.id === idTableroSeleccionado);
    return tableroSeleccionado;
}

//botón para crear tablero 
btnTablero.addEventListener('click', () => {
    if (inputTablero.value) {
        crearTableroDOM(crearObjetoTablero(inputTablero.value, contIdTableros));
        inputTablero.value = null;
    }
});




/* tareas */
function agregarTarea(tablero, tarea) {
    tablero.tareas.push(tarea);
}

//funciones
function crearObjetoTarea(id, tarea) {
    const nuevaTarea = new Tarea(id, tarea);
    const tableroSeleccionado = seleccionarTablero();
    agregarTarea(tableroSeleccionado, nuevaTarea);
    localStorage.setItem('totalTableros', JSON.stringify(totalTableros));
    return nuevaTarea;
}

function crearTareaDOM(objetoTarea) {
    //crear li tarea
    let liTarea = document.createElement('li');
    liTarea.classList.add('w-300', 'min-h-10', 'max-h-28', 'mb-3', 'flex', 'justify-between', 'rounded-md', 'border-solid', 'border-slate-100', 'border-2', 'lg:w-360', `${objetoTarea.id}`)
    ulTareas.append(liTarea);

    //crear btn tarea pendiente
    let btnPendiente = document.createElement('button');
    btnPendiente.classList.add('mr-2');
    btnPendiente.innerHTML = `<img class= "h-5 ml-2" src="./img/pendiente.png" alt="pendiente">`;
    liTarea.append(btnPendiente);

    //crear titulo de tarea
    let pTarea = document.createElement('p');
    pTarea.classList.add('w-60', 'p-1', 'text-gray-800', 'lg:w-280');
    pTarea.innerText = `${objetoTarea.titulo}`
    liTarea.append(pTarea);

    //crear btn eliminar
    let btnEliminar = document.createElement('button');
    btnEliminar.classList.add('mr-3', 'invisible'); 
    btnEliminar.innerHTML = `<img class= "h-5 w-5" src="./img/borrar.png" alt="eliminar">`;
    liTarea.append(btnEliminar);
}

function mostrarTareas(tableroSeleccionado) {
    for (let i = 0; i < tableroSeleccionado.tareas.length; i++) { crearTareaDOM(tableroSeleccionado.tareas[i]) }
}

//botón para crear tarea
btnTarea.addEventListener('click', () => {
    const tableroSeleccionado = seleccionarTablero();
    if (inputTarea.value) {
        const nuevaTarea = crearObjetoTarea(`tarea-tablero${tableroSeleccionado.id}`, inputTarea.value);
        crearTareaDOM(nuevaTarea);
        inputTarea.value = null;
    }
});



/* notas */
txtNotas.addEventListener('input', () => {const notas = txtNotas.value; localStorage.setItem('notas', notas)});