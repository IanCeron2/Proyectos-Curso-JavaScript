const listado_cursos = document.querySelector("#lista-cursos");
const listado_carrito = document.querySelector("#lista-carrito tbody");
const carrito = document.querySelector("#carrito");
const vaciar_carrito = document.querySelector('#vaciar-carrito')
let cursos_carrito = [];

iniciarEventos();
function iniciarEventos(){
    listado_cursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciar_carrito.addEventListener('click', vaciarCarrito);
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
    
    //revisamos si ya existe el curso en el arreglo
    const existe = cursos_carrito.some(curso => curso.id === infoCurso.id);
    
    if(existe){ //modificamos la cantidad del elemento que ya existe
        const cursos = cursos_carrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            } else{
                return curso;
            }
        });
        cursos_carrito = [...cursos];
    } else{ //agregamos el curso al arreglo del carrito
        cursos_carrito = [...cursos_carrito, infoCurso];        
    }

    //cada que se agrega un curso, hay que actualizar la lista del carrito en el HTML
    carritoHTML();
}

function carritoHTML(){
    //limpiar el HTML previo que tenga el carrito

    //forma lenta de limpiar el HTML
    // listado_carrito.innerHTML = '';

    limpiarHTML();

    //generar el HTML dinamico
    cursos_carrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
            `;
        listado_carrito.appendChild(fila);
    });
}

function limpiarHTML(){
    //forma de limpiar el HTML con mejor performance
    while(listado_carrito.firstChild){
        listado_carrito.removeChild(listado_carrito.firstChild);
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains("borrar-curso")){
        const idCurso = e.target.getAttribute("data-id");

        //construimos de nuevo el arreglo, sin incluir el curso que eliminamos
        cursos_carrito = cursos_carrito.filter(curso => curso.id !== idCurso);
        carritoHTML();
    }
}

function vaciarCarrito(e){
    e.preventDefault();
    if(cursos_carrito.length > 0){
        cursos_carrito = [];
        limpiarHTML();
    }
}