/* clases */
class Tablero {
    constructor(id, titulo, notas) {
        this.id = id;
        this.titulo = titulo;
        this.tareas = [];
        this.notas = notas;
    }
}


class Tarea {
    constructor(id, titulo) {
        this.id = id;
        this.titulo = titulo;
        this.realizada = false;
    }
}



/* trayendo elementos de DOM */
const inputTablero = document.getElementById('inputTablero');
const btnTablero = document.getElementById('btnTablero');
const ulTableros = document.getElementById('listaTableros');
const tituloTablero = document.getElementById('tituloTablero');
const divcontainerTableroSeleccionado = document.getElementById('containerTableroSeleccionado')
const divcontainerTareas = document.getElementById('containerTareas');
const inputTarea = document.getElementById('inputTarea');
const btnTarea = document.getElementById('btnTarea');
const ulTareas = document.getElementById('listaTareas');
const btnFiltroTodas = document.getElementById('btnFiltroTodas');
const btnFiltroPendientes = document.getElementById('btnFiltroPendientes');
const btnFiltroRealizadas = document.getElementById('btnFiltroRealizadas');
const divcontainerNotas = document.getElementById('containerNotas');
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
let advertencia = './img/advertencia.png'
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
    localStorage.setItem('contadorIdTableros', contIdTableros);
    return tableroNuevo;
}

function crearTableroDOM(objetoTablero) {
    //crear li tablero
    let liTablero = document.createElement('li');
    liTablero.classList.add('flex', 'w-300', 'gap-2', 'rounded-md', 'mb-3', 'mt-2', 'bg-white', 'hover:scale-105', 'duration-75','transition-opacity', 'duration-700');
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
        liTablero.classList.add('opacity-0')
        setTimeout(()=>{
            liTablero.remove();
        }, 500)
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

function seleccionarTablero() {
    const tableroSeleccionado = totalTableros.find((tablero) => tablero.id === idTableroSeleccionado);
    return tableroSeleccionado;
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
    ulTareas.classList.add('overflow-y-scroll');
    //crear li tarea
    let liTarea = document.createElement('li');
    liTarea.classList.add('w-300', 'min-h-10', 'max-h-28', 'mb-3', 'flex', 'rounded-md', 'border-solid', 'border-slate-100', 'border-2', 'lg:w-460', `${objetoTarea.id}`, 'transition-opacity', 'duration-700');
    liTarea.setAttribute('id', `${objetoTarea.id}`);
    ulTareas.append(liTarea);

    //crear botón tarea pendiente
    let buttonEstado = document.createElement('button');
    buttonEstado.classList.add('mr-2');
    objetoTarea.realizada ? buttonEstado.innerHTML = `<img class= "h-5 ml-2" src="${realizada}" alt="realizada">` : buttonEstado.innerHTML = `<img class= "h-5 ml-2" src="${pendiente}" alt="pendiente">`;
    liTarea.append(buttonEstado);

    //crear título de tarea
    let pTarea = document.createElement('p');
    objetoTarea.realizada ? pTarea.classList.add('w-60', 'p-1', 'text-gray-800', 'line-through', 'lg:w-396') : pTarea.classList.add('w-60', 'p-1', 'text-gray-800', 'lg:w-396');
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
        if (!tareaSeleccionada.realizada) {
            tareaSeleccionada.realizada = true; //marcar objeto como realizado
            guardarTablerosEnLS();
            //marcar como realizada en DOM
            buttonEstado.innerHTML = `<img class= "h-5 ml-2" src="${realizada}" alt="realizada">`;
            pTarea.classList.add('line-through');
        }
        //marcar tarea como pendiente
        else {
            tareaSeleccionada.realizada = false; //marcar objeto como pendiente
            guardarTablerosEnLS();
            //marcar como pendiente en DOM
            buttonEstado.innerHTML = `<img class= "h-5 ml-2" src="${pendiente}" alt="pendiente">`;
            pTarea.classList.remove('line-through');
        }
    })

    //evento para eliminar tareas
    buttonEliminar.addEventListener('click', () => {
        const liTarea = buttonEliminar.parentNode;
        //eliminar objeto tarea
        eliminarTarea(liTarea);
        guardarTablerosEnLS();
        //eliminar tarea en DOM
        liTarea.classList.add('opacity-0')
        setTimeout(()=>{
            liTarea.remove();
        }, 600)
        
        Toastify({
            text: "Tarea eliminada!",
            className: "info",
            style: {
                background: "linear-gradient(to right, #e93a2b, #fb887e)",
                'border-radius': '5px',
            }
        }).showToast();
    })
}

function agregarTarea(tablero, tarea) {
    tablero.tareas.push(tarea);
}

function eliminarTarea(tarea) {
    const tareaSeleccionada = seleccionarTarea(seleccionarTablero(), tarea.id);
    const tareasDelTablero = seleccionarTablero().tareas;
    const indexTareaSeleccionada = tareasDelTablero.indexOf(tareaSeleccionada);
    tareasDelTablero.splice(indexTareaSeleccionada, 1);
}

function mostrarTareas(tableroSeleccionado) {
    tableroSeleccionado.tareas.forEach((tarea) => crearTareaDOM(tarea));

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


/* filtros de tareas */
//todas
btnFiltroTodas.addEventListener('click', () => {
    ulTareas.innerHTML = "";
    mostrarTareas(seleccionarTablero());
})

//pendientes
btnFiltroPendientes.addEventListener('click', () => {
    ulTareas.innerHTML = "";
    const tablero = seleccionarTablero();
    const tareasPendientes = tablero.tareas.filter((tarea) => !tarea.realizada);
    tareasPendientes.forEach((tarea) => { crearTareaDOM(tarea) });
})

//realizadas
btnFiltroRealizadas.addEventListener('click', () => {
    ulTareas.innerHTML = "";
    const tablero = seleccionarTablero();
    const tareasRealizadas = tablero.tareas.filter((tarea) => tarea.realizada);
    tareasRealizadas.forEach((tarea) => { crearTareaDOM(tarea) });
})




/* notas */
function crearNotas() {
    const notas = txtNotas.value;
    const tableroSeleccionado = seleccionarTablero()
    tableroSeleccionado.notas = notas;
    guardarTablerosEnLS();
}

function mostrarNotas() {
    const tablero = seleccionarTablero();
    if (tablero.notas != null) { txtNotas.value = `${tablero.notas}`; }
}

txtNotas.addEventListener('input', () => { crearNotas() });




/* div fetch gestión del tiempo*/
const h2TituloMetodo = document.getElementById('titulo-metodo');
const pDescripcionMetodo = document.getElementById('descripcion-metodo');
const pObjetivoMetodo = document.getElementById('objetivo-metodo');
const btnMetodo = document.getElementById('button-metodo');

btnMetodo.addEventListener('click', () => {
    mostrarMetodoAleatorio();
})

function mostrarMetodoAleatorio() {
    fetch('/data.json')
        .then((res) => res.json())
        .then((data) => {
            if (data && data.length > 0) {
                const indexAleatorio = Math.floor(Math.random() * data.length);
                const metodoAleatorio = data[indexAleatorio];

                h2TituloMetodo.innerText = metodoAleatorio.metodo;
                pDescripcionMetodo.innerText = metodoAleatorio.descripcion;
                pObjetivoMetodo.innerText = metodoAleatorio.objetivo;
            }
        })
}


