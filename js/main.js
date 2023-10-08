///cargar contenido al abrir el sitio
function tablerosDesdeLS() {
    const tableros = JSON.parse(localStorage.getItem('totalTableros'));
    tableros.forEach(tablero => { crearTableroDOM(tablero) });
}
window.addEventListener('load', () => { localStorage.getItem('totalTableros') && tablerosDesdeLS(); txtNotas.value = notas; mostarCalendario() })

//guardar tableros en localStorage
const guardarTablerosEnLS = () => localStorage.setItem('totalTableros', JSON.stringify(totalTableros));


//seleccionar tablero
function seleccionarTablero() {
    const tableroSeleccionado = totalTableros.find((tablero) => tablero.id === idTableroSeleccionado);
    return tableroSeleccionado;
}







