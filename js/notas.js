const divcontainerNotas = document.getElementById('containerNotas');
const txtNotas = document.getElementById('notas');


let notas;
localStorage.getItem('notas') ? notas = localStorage.getItem('notas') : notas = '';


//funciones
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