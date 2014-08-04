var eBtnActivar = document.querySelector('#btnActivar'),
    aInputs = document.querySelectorAll('form .form-control'),
    eError = document.querySelector('.alert-error'),
    regis=false;

eBtnActivar.addEventListener('click', function (evento) {

    var eCodigoActivacion = document.querySelector('#codigoAct').value,
        formulario = document.querySelector('#activacion');
    
    evento.preventDefault();
    
    var camposVacios=validarCamposLlenos(aInputs, eError, 'Todos los campos deben estar llenos');
    if(!camposVacios){
        var correcta=validarClave(eCodigoActivacion, eError, 'El código ingresado no coincide con el suministrado');
        if(correcta){
            formulario.submit();
        }
    }
        





});