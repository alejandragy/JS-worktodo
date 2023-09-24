/* clases */
class Tarea {
    constructor(id, titulo) {
        this.id = id;
        this.titulo = titulo;
        this.realizada = false;
    }
}

class Tablero {
    constructor(id, titulo) {
        this.id = id;
        this.titulo = titulo;
        this.tareas = [];
    }
}


/* trayendo elementos de DOM */
const inputTablero = document.getElementById('inputTablero');
const btnTablero = document.getElementById('btnTablero');
const ulTableros = document.getElementById('listaTableros');
const tituloTablero = document.getElementById('tituloTablero');
const inputTarea = document.getElementById('inputTarea');
const btnTarea = document.getElementById('btnTarea');
const ulTareas = document.getElementById('listaTareas');
const txtNotas = document.getElementById('notas');


/* variables globales y localStorage */
//tableros
let totalTableros;
localStorage.getItem('totalTableros') ? totalTableros = JSON.parse(localStorage.getItem('totalTableros')) : totalTableros = [];
let contIdTableros = 0;
localStorage.getItem('contadorIdTableros') ? contIdTableros = JSON.parse(localStorage.getItem('contadorIdTableros')) : contIdTableros = parseInt('0');
let idTableroSeleccionado;
let borrarIndigo = './img/borrar-indigo.png';
//tareas
let contIdTareas = 0;
localStorage.getItem('contadorIdTareas') ? contIdTareas = JSON.parse(localStorage.getItem('contadorIdTareas')) : contIdTareas = parseInt('0');
let realizada = './img/realizada.png';
let pendiente = './img/pendiente.png';
let borrarBlanco = './img/borrar.png';
//notas
let notas;
localStorage.getItem('notas') ? notas = localStorage.getItem('notas') : notas = '';



/* localStorage */
//cargar tableros al abrir la página
function tablerosDesdeLS() {
    const tableros = JSON.parse(localStorage.getItem('totalTableros'));
    tableros.forEach(tablero => { crearTableroDOM(tablero) });
}
window.addEventListener('load', () => { localStorage.getItem('totalTableros') && tablerosDesdeLS(); txtNotas.value = notas; })

//guardar tableros en localStorage
const guardarTablerosEnLS = () => localStorage.setItem('totalTableros', JSON.stringify(totalTableros));




/* tableros */
//funciones
function crearObjetoTablero(id, titulo) {
    const tableroNuevo = new Tablero(id, titulo);
    totalTableros.push(tableroNuevo);
    contIdTableros += 1;
    guardarTablerosEnLS();
    //localStorage.setItem('contadorIdTableros', contIdTableros);
    localStorage.setItem('contadorIdTableros',contIdTableros);
    return tableroNuevo;
}

function crearTableroDOM(objetoTablero) {
    //crear li tablero
    let liTablero = document.createElement('li');
    liTablero.classList.add('flex', 'w-300', 'gap-2', 'rounded-md', 'mb-3', 'bg-white', 'hover:bg-slate-100');
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
        seleccionarTablero()
        tituloTablero.innerText = `${objetoTablero.titulo}`
        idTableroSeleccionado = objetoTablero.id;
        ulTareas.innerHTML = "";
        mostrarTareas(seleccionarTablero());
    })

    //evento para eliminar tablero
    buttonEliminar.addEventListener('click', ()=> {
        //eliminar objeto tablero
        idTableroSeleccionado = objetoTablero.id;
        const tableroSeleccionado = seleccionarTablero();
        const liTablero = buttonEliminar.parentNode;
        const indexTableroSeleccionado = totalTableros.indexOf(tableroSeleccionado);
        totalTableros.splice(indexTableroSeleccionado, 1);
        guardarTablerosEnLS();
        //eliminar tablero en DOM
        liTablero.remove();
        tituloTablero.innerText = 'Selecciona o crea un tablero';
        ulTareas.innerText = '';
    })
}

function seleccionarTablero() {
    const tableroSeleccionado = totalTableros.find((tablero) => tablero.id === idTableroSeleccionado);
    return tableroSeleccionado;
}

//eventos para crear tableros
btnTablero.addEventListener('click', () => {
    inputTablero.value && crearTableroDOM(crearObjetoTablero(`tablero-${contIdTableros}`, inputTablero.value)); inputTablero.value = null;
});

inputTablero.addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
        inputTablero.value && crearTableroDOM(crearObjetoTablero(`tablero-${contIdTableros}`, inputTablero.value)); inputTablero.value = null;
    }
});




/* tareas */
//funciones
function crearObjetoTarea(id, tarea) {
    const nuevaTarea = new Tarea(id, tarea);
    const tableroSeleccionado = seleccionarTablero();
    agregarTarea(tableroSeleccionado, nuevaTarea);
    contIdTareas += 1;
    guardarTablerosEnLS();
    localStorage.setItem('contadorIdTareas', contIdTareas);
    return nuevaTarea;
}

function crearTareaDOM(objetoTarea) {
    //crear li tarea
    let liTarea = document.createElement('li');
    liTarea.classList.add('w-300', 'min-h-10', 'max-h-28', 'mb-3', 'flex', 'justify-between', 'rounded-md', 'border-solid', 'border-slate-100', 'border-2', 'lg:w-360', `${objetoTarea.id}`)
    liTarea.setAttribute('id', `${objetoTarea.id}`);
    ulTareas.append(liTarea);

    //crear botón tarea pendiente
    let buttonEstado = document.createElement('button');
    buttonEstado.classList.add('mr-2');
    objetoTarea.realizada ? buttonEstado.innerHTML = `<img class= "h-5 ml-2" src="${realizada}" alt="realizada">` : buttonEstado.innerHTML = `<img class= "h-5 ml-2" src="${pendiente}" alt="pendiente">`;
    liTarea.append(buttonEstado);

    //crear título de tarea
    let pTarea = document.createElement('p');
    objetoTarea.realizada ? pTarea.classList.add('w-60', 'p-1', 'text-gray-800', 'lg:w-280', 'line-through') : pTarea.classList.add('w-60', 'p-1', 'text-gray-800', 'lg:w-280');
    pTarea.innerText = `${objetoTarea.titulo}`
    liTarea.append(pTarea);

    //crear botón eliminar
    let buttonEliminar = document.createElement('button');
    buttonEliminar.classList.add('mr-3', 'opacity-30', 'hover:opacity-100');
    buttonEliminar.innerHTML = `<img class= "h-5 w-5" src="${borrarBlanco}" alt="eliminar">`;
    liTarea.append(buttonEliminar);

    //evento para marcar tareas como realizadas o pendientes 
    buttonEstado.addEventListener('click', () => {
        const liTarea = buttonEstado.parentNode;
        const tableroSeleccionado = seleccionarTablero();
        const tareaSeleccionada = seleccionarTarea(tableroSeleccionado, liTarea.id);
        //marcar tarea como realizada
        if (tareaSeleccionada.realizada === false) {
            //marcar objeto como realizado
            tareaSeleccionada.realizada = true;
            guardarTablerosEnLS();
            //marcar como realizada en DOM
            buttonEstado.innerHTML = `<img class= "h-5 ml-2" src="${realizada}" alt="realizada">`;
            pTarea.classList.add('line-through');
        }
        //marcar tarea como pendiente
        else {
            //marcar objeto como pendiente
            tareaSeleccionada.realizada = false;
            guardarTablerosEnLS();
            //marcar como pendiente en DOM
            buttonEstado.innerHTML = `<img class= "h-5 ml-2" src="${pendiente}" alt="pendiente">`;
            pTarea.classList.remove('line-through');
        }
    })

    //evento para eliminar tareas
    buttonEliminar.addEventListener('click', ()=> {
        const liTarea = buttonEliminar.parentNode;
        //eliminar objeto tarea
        const tableroSeleccionado = seleccionarTablero();
        const tareaSeleccionada = seleccionarTarea(tableroSeleccionado, liTarea.id); 
        const tareasDelTablero = tableroSeleccionado.tareas;
        const indexTareaSeleccionada = tareasDelTablero.indexOf(tareaSeleccionada);
        tareasDelTablero.splice(indexTareaSeleccionada, 1);
        guardarTablerosEnLS();
        //eliminar tarea en DOM
        liTarea.remove();  
    })
}

function agregarTarea(tablero, tarea) {
    tablero.tareas.push(tarea);
}

function mostrarTareas(tableroSeleccionado) {
    for (let i = 0; i < tableroSeleccionado.tareas.length; i++) { crearTareaDOM(tableroSeleccionado.tareas[i]) }
}

function seleccionarTarea(tablero, idTarea) {
    const tareaSeleccionada = tablero.tareas.find((tarea) => tarea.id === idTarea);
    return tareaSeleccionada;
}

//eventos para crear tareas
btnTarea.addEventListener('click', () => {
    if (inputTarea.value) {
        const nuevaTarea = crearObjetoTarea(`tarea-${contIdTareas}`, inputTarea.value);
        crearTareaDOM(nuevaTarea);
        inputTarea.value = null;
    }
});

inputTarea.addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
        if (inputTarea.value) {
            const nuevaTarea = crearObjetoTarea(`tarea-${contIdTareas}`, inputTarea.value);
            crearTareaDOM(nuevaTarea);
            inputTarea.value = null;
        }
    }
});




/* notas */
txtNotas.addEventListener('input', () => { const notas = txtNotas.value; localStorage.setItem('notas', notas) });