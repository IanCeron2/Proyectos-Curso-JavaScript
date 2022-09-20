const listado_cursos = document.querySelector("#lista-cursos");
const listado_carrito = document.querySelector("#lista-carrito tbody");
let cursos_carrito = [];

iniciarEventos();
function iniciarEventos(){
    listado_cursos.addEventListener('click', agregarCurso);
}

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }    
}

function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    
    //agregamos el curso al arreglo del carrito
    cursos_carrito.push(infoCurso);

    //cada que se agrega un curso, hay que actualizar la lista del carrito
    carritoHTML();
}

function carritoHTML(){
    //limpiar el HTML previo que tenga el carrito

    //forma lenta de limpiar el HTML
    // listado_carrito.innerHTML = '';

    //forma de limpiar el HTML con mejor performance
    while(listado_carrito.firstChild){
        listado_carrito.removeChild(listado_carrito.firstChild);
    }

    //generar el HTML dinamico
    cursos_carrito.forEach( curso => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><img src="${curso.imagen}" class="imagen-curso"></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            `;
        listado_carrito.appendChild(fila);
    });
}