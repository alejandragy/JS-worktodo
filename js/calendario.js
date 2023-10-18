const pFechaActual = document.getElementById('fecha-actual');
const ulDias = document.getElementById('dias');
const btnMeses = document.querySelectorAll('.btnMes')


let fecha = new Date()
let anio = fecha.getFullYear();
let mes = fecha.getMonth();
let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']


//funciones
function mostarCalendario() {
    let primerDiaMes = new Date(anio, mes, 0).getDay();
    let ultimaFechaMes = new Date(anio, mes + 1, 0).getDate();
    let ultimoDiaMes = new Date(anio, mes, ultimaFechaMes).getDay();
    let ultimoDiaUltimoMEs = new Date(anio, mes, 0).getDate();
    let liDias = '';

    for (let i = primerDiaMes; i > 0; i--) {
        liDias += `<li class="text-slate-300 w-8 h-8 pt-1"><span>${ultimoDiaUltimoMEs - i + 1}</span></li>`;
    }

    for (i = 1; i <= ultimaFechaMes; i++) {
        liDias += `<li><button class="w-8 h-8  rounded-2xl hover:bg-slate-100 focus:bg-indigo-400" id="${anio}-${mes + 1}-${i}">${i}</button></li>`;
    }

    for (i = ultimoDiaMes; i < 7; i++) {
        liDias += `<li class="text-slate-300 w-8 h-8 pt-1"><span>${i - ultimoDiaMes + 1}</span></li>`;
    }

    pFechaActual.innerText = `${meses[mes]} ${anio}`;
    ulDias.innerHTML = liDias;
}


//eventos
btnMeses.forEach(btn => {
    btn.addEventListener('click', () => {
        mes = btn.id === "mesAnterior" ? mes - 1 : mes + 1;
        if (mes < 0 || mes > 11) {
            fecha = new Date(anio, mes);
            anio = fecha.getFullYear()
            mes = fecha.getMonth()
        }
        else {
            fecha = new Date();
        }
        mostarCalendario();
    })
})

ulDias.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'BUTTON') {
        const diaSeleccionado = target.id;
        const tareas = seleccionarTablero().tareas
        const fechas = tareas.filter((tarea) => tarea.fecha == diaSeleccionado);
        ulTareas.innerHTML = '';
        if (fechas.length > 0) {
            fechas.forEach((tarea) => { crearTareaDOM(tarea) });
        }
        else{
            ulTareas.innerHTML = 'No hay tareas programadas para esta fecha';
        }
    }

});