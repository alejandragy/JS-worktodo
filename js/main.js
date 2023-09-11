//variables
const totalTableros = [];
let titulosTableros;
let concatTitulos;
let tableroSeleccionado;
let tareasSeleccionadas;
let tareasDetalle;
let concatTareas;
let tareaSeleccionada;
const tarea = [];
let input;


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

//funciones chiquitas que repito
function guardarTitulos() { //titulos de los tableros en un nuevo array y en string
    titulosTableros = totalTableros.map((tablero, index) => `${index + 1} · ${tablero.titulo}`);
    concatTitulos = titulosTableros.join('\n');
}


//funciones específicas
function crearTablero() {
    let titulo = prompt('Ingresá el título para el nuevo tablerito');
    while (titulo === '' || titulo === null) {
        alert('⚠️\n\nIngresá al menos un caracter para el título')
        titulo = prompt('Ingresá el título para el nuevo tablerito');
    }
    const tableroNuevo = new Tablero(titulo);
    totalTableros.push(tableroNuevo);
    return `Tablerito "${titulo}" creado exitosamente! 🐨`;
}


function verTableros() {
    if (totalTableros.length > 0) {
        guardarTitulos();

        //detalle de los tableros
        input = parseInt(prompt(`Para ver el detalle de alguno de tus tableritos ingresá su número:\n${concatTitulos}\n0 · Para salir del programa ⚠️`));
        if (input >= 1 && input <= titulosTableros.length) {
            tableroSeleccionado = totalTableros[input - 1]; //elige el tablero
            tareasSeleccionadas = tableroSeleccionado.tareas; //muestra el array de objetos tareas[] del tablero seleccionado
            tareasDetalle = tareasSeleccionadas.map((tarea) => `${tarea.titulo} · 🕐 ${tarea.duracion} minutos`);
            concatTareas = tareasDetalle.join('\n');
            alert(`Tareas del Tablerito "${tableroSeleccionado.titulo}" 🐨\n${concatTareas}`);

            //detalle de las tareas
            let input2 = parseInt(prompt(`Ingresá una opción para ver el detalle de las tareas del tablerito "${tableroSeleccionado.titulo}" \n1 · Ver tareas pendientes \n2 · Ver tareas realizadas`));
            if (input2 === 1) {
                let tareasPendientes = tareasSeleccionadas.filter((tarea) => !tarea.realizada);
                if (tareasPendientes.length > 0) {
                    let tareasPendientesDetalle = tareasPendientes.map((tarea) => `${tarea.titulo} · 🕐 ${tarea.duracion} minutos`)
                    let concatTareasPendientes = tareasPendientesDetalle.join('\n');
                    return `Tareas pendientes del Tablerito "${tableroSeleccionado.titulo}" 🐨\n${concatTareasPendientes}`;
                }
                else {
                    return `No hay tareas pendientes en el tablerito "${tableroSeleccionado.titulo}" 🐨`;
                }
            }
            else if (input2 === 2) {
                let tareasRealizadas = tareasSeleccionadas.filter((tarea) => tarea.realizada);
                if (tareasRealizadas.length > 0) {
                    let tareasRealizadasDetalle = tareasRealizadas.map((tarea) => `${tarea.titulo} · 🕐 ${tarea.duracion} minutos`)
                    let concatTareasRealizadas = tareasRealizadasDetalle.join('\n');
                    return `Tareas realizadas del Tablerito "${tableroSeleccionado.titulo}" 🐨\n${concatTareasRealizadas}`;
                }
                else {
                    return `No hay tareas realizadas en el tablerito "${tableroSeleccionado.titulo}" 🐨`;
                }
            }
        }
        else if (input === 0){
            return 'Adiós! 🐨';
        }
        else{
            return 'Ingresá una opción válida';
        }
    }
    else {
        return '⚠️\n\nNo hay tableritos creados!';
    }
}

function crearTarea() {
    guardarTitulos();

    if (totalTableros.length > 0) {
        //seleccionar tablero
        let input = prompt(`Seleccioná un tablerito para agregarle una nueva tarea: \n${concatTitulos}`);
        let tableroSeleccionado = totalTableros[input - 1];

        if (input >= 1 && input <= totalTableros.length) {
            //crear la tarea nueva
            let titulo = prompt('Ingresá el título para tu nueva tarea');
            while (titulo === '') {
                alert('⚠️\n\nIngresá al menos un caracter para el título')
                titulo = prompt('Ingresá el título para tu nueva tarea');
            }
            let duracion = prompt('Ingresá la cantidad de minutos que querés destinar a la tarea:');
            while (isNaN(duracion) || duracion <= 0 || duracion === '') {
                alert('⚠️\n\nSolo podés ingresar números mayores a 0')
                duracion = prompt('Ingresá la cantidad de minutos que querés destinar a la tarea (sólo núneros mayores a 0) ')
            }
            tarea.push(titulo, duracion);

            //subir tarea al tablero elegido
            tableroSeleccionado.agregarTarea(titulo, duracion);
            return `Tarea agregada exitósamente al tablerito "${tableroSeleccionado.titulo}" 🐨 `;
        }
        else {
            return 'Ingresá una opción válida';
        }
    }
    else {
        return '⚠️\n\nPara agregar una tarea primero debes crear un tablerito!';
    }
}

function completarYBorrarTarea() {
    guardarTitulos();

    if (totalTableros.length > 0) {
        let input = prompt(`Seleccioná el tablerito donde se encuentra la tarea que terminaste: \n${concatTitulos}\n`);
        if (input >= 1 && input <= totalTableros.length) {
            tableroSeleccionado = totalTableros[input - 1];
            tareasSeleccionadas = tableroSeleccionado.tareas;
            tareasDetalle = tareasSeleccionadas.map((tarea, index) => `${index + 1} · ${tarea.titulo} · 🕐 ${tarea.duracion} minutos`);
            concatTareas = tareasDetalle.join('\n');
            if (tareasSeleccionadas.length === 0) {
                return 'No hay tareas creadas en este tablerito'
            }
            else {
                input = prompt(`Seleccioná la tarea a marcar como terminada del Tablerito "${tableroSeleccionado.titulo}" 🐨\n${concatTareas}`);
                if (input >= 1 && input <= tareasSeleccionadas.length) {
                    tableroSeleccionado.realizarTarea(input - 1);
                    alert(`Tarea marcada como terminada! 🐨`);
                    let input2 = parseInt(prompt(`¿Querés eliminar la tarea finalizada? \n1 · Si \n2 · No`))
                    if (input2 === 1) {
                        tableroSeleccionado.eliminarTarea(input - 1);
                        return 'Tarea eliminada! 🐨'
                    }
                    else if (input2 === 2) {
                        return 'Tarea conservada! 🐨'
                    }
                }
                else {
                    return '⚠️\n\nNo seleccionaste ninguna tarea. \nSeleccioná correctamente ingresando el número que está ubicado a la izquierda de la tarea que querés elegir.'
                }
            }
        }
        else {
            return '⚠️\n\nNo seleccionaste ningún tablerito. \nSeleccioná correctamente ingresando el número que está ubicado a la izquierda del tablero que querés elegir.';
        }
    }
    else {
        return '⚠️\n\nNo hay tareas creadas!';
    }
}

//programita
do {
    input = parseInt(prompt('Bievenidx a Tableritos! 🐨 \nOrganizá tu estudio en tableros personalizados dedicados a cursos, temas o materias. 📊 \n\nComenzá: \n1 · Crear nuevo tablerito \n2 · Ver detalle de tableritos y tareas \n3 · Agregar una tarea \n4 · Completar y eliminar una tarea \n0 · Salir'));

    switch (input) {
        case 1:
            alert(crearTablero());
            break;

        case 2:
            alert(verTableros());
            break;

        case 3:
            alert(crearTarea());
            break;

        case 4:
            alert(completarYBorrarTarea());
            break;

        case 0:
            break;

        default:
            alert('Seleccioná una opción válida');
            break;
    }
}
while (input != 0);