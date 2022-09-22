const botonEnviar = document.querySelector("#enviar");
const inputCorreo = document.querySelector("#email");
const inputAsunto = document.querySelector("#asunto");
const inputMensaje = document.querySelector("#mensaje");
const formEnviarEmail = document.querySelector('#enviar-mail');

agregarEventLiseners()
function agregarEventLiseners() {
    // Cuando se carga el documento
    document.addEventListener('DOMContentLoaded', cargarDocumento);

    // Validando el formulario...
    inputCorreo.addEventListener('blur', validaFormulario);
    inputAsunto.addEventListener('blur', validaFormulario);
    inputMensaje.addEventListener('blur', validaFormulario);
}

function cargarDocumento() {
    botonEnviar.disabled = true;

}

function validaFormulario(e) {
    if(e.target.value.length > 0) {
        e.target.classList.remove('border', 'border-red-500');
    } else{
        e.target.classList.add('border', 'border-red-500');

        mensajeError();
    }
}

function mensajeError() {
    const existe = document.querySelector(".campos-necesarios");
    
    // Validamos que el campo no existe, para que no se duplique
    if(existe === null){
        const mensajeError = document.createElement('p');
        mensajeError.textContent = "Todos los campos son necesarios";
        mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500',
        'p-3', 'mt-5', 'text-center', 'campos-necesarios');
        formEnviarEmail.appendChild(mensajeError);
    }
}