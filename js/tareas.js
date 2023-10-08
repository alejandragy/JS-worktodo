class Tarea {
    constructor(id, titulo) {
        this.id = id;
        this.titulo = titulo;
        this.fecha = null;
        this.realizada = false;
    }
}


const divcontainerTableroSeleccionado = document.getElementById('containerTableroSeleccionado')
const divcontainerTareas = document.getElementById('containerTareas');
const inputTarea = document.getElementById('inputTarea');
const btnTarea = document.getElementById('btnTarea');
const ulTareas = document.getElementById('listaTareas');
const btnFiltroTodas = document.getElementById('btnFiltroTodas');
const btnFiltroPendientes = document.getElementById('btnFiltroPendientes');
const btnFiltroRealizadas = document.getElementById('btnFiltroRealizadas');


let contIdTareas = 0;
localStorage.getItem('contadorIdTareas') ? contIdTareas = JSON.parse(localStorage.getItem('contadorIdTareas')) : contIdTareas = parseInt('0');
let advertencia = './img/advertencia.png'
let realizada = './img/realizada.png';
let pendiente = './img/pendiente.png';
let borrarBlanco = './img/borrar.png';
let calendario = './img/calendario.png';


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

    //crear botón agendar 
    let buttonAgendar = document.createElement('button');
    buttonAgendar.classList.add('mr-3', 'opacity-30', 'hover:opacity-100');
    buttonAgendar.innerHTML = `<img class= "h-6 w-6" src="${calendario}" alt="eliminar">`;
    liTarea.append(buttonAgendar);

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
        setTimeout(() => {
            liTarea.remove();
        }, 600)
        setTimeout(() => {
            if (seleccionarTablero().tareas.length == 0) {
                ulTareas.innerHTML = 'No hay tareas';
            }
        }, 700)

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
    if (tableroSeleccionado.tareas.length > 0) {
        ulTareas.innerHTML = '';
        tableroSeleccionado.tareas.forEach((tarea) => crearTareaDOM(tarea));
    }
    else {
        ulTareas.innerHTML = 'No hay tareas';
    }

}

function seleccionarTarea(tablero, idTarea) {
    const tareaSeleccionada = tablero.tareas.find((tarea) => tarea.id === idTarea);
    return tareaSeleccionada;
}


//eventos para crear tareas
btnTarea.addEventListener('click', () => {
    if (inputTarea.value) {
        if (seleccionarTablero().tareas.length == 0) {
            ulTareas.innerHTML = '';
        }
        const nuevaTarea = crearObjetoTarea(`tarea-${contIdTareas}`, inputTarea.value);
        crearTareaDOM(nuevaTarea);
        inputTarea.value = null;
    }
});

inputTarea.addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
        if (inputTarea.value) {
            if (seleccionarTablero().tareas.length == 0) {
                ulTareas.innerHTML = '';
            }
            const nuevaTarea = crearObjetoTarea(`tarea-${contIdTareas}`, inputTarea.value);
            crearTareaDOM(nuevaTarea);
            inputTarea.value = null;
        }
    }
});


/* filtros de tareas */
//todas
btnFiltroTodas.addEventListener('click', () => {
    ulTareas.innerHTML = '';
    mostrarTareas(seleccionarTablero());
})

//pendientes
btnFiltroPendientes.addEventListener('click', () => {
    ulTareas.innerHTML = '';
    const tablero = seleccionarTablero();
    const tareasPendientes = tablero.tareas.filter((tarea) => !tarea.realizada);
    if (tareasPendientes.length > 0) {
        tareasPendientes.forEach((tarea) => { crearTareaDOM(tarea) });
    }
    else {
        ulTareas.innerHTML = 'No hay tareas pendientes';
    }
})

//realizadas
btnFiltroRealizadas.addEventListener('click', () => {
    ulTareas.innerHTML = '';
    const tablero = seleccionarTablero();
    const tareasRealizadas = tablero.tareas.filter((tarea) => tarea.realizada);
    if (tareasRealizadas.length > 0) {
        tareasRealizadas.forEach((tarea) => { crearTareaDOM(tarea) });
    }
    else {
        ulTareas.innerHTML = 'No hay tareas realizadas';
    }
})

