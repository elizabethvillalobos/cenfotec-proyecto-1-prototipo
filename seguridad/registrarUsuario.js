var eBtnRegistrar = document.querySelector('#btnRegistrar'),
    aInputs = document.querySelectorAll('form .form-control'),
    eError = document.querySelector('.alert-error'),
    regis=false;

eBtnRegistrar.addEventListener('click', function (evento) {
    
    var eCorreo = document.querySelector('#email').value,
        eContrasena = document.querySelector('#contrasena').value,
        eConfirmContrasena = document.querySelector('#confirmContrasena').value,
        eCodigoActiv = document.querySelector('#codigoActiv'),
        caracteres = "0123456789abcdefABCDEF",
        longitud = 8,
        formulario = document.querySelector('#form-registro');
    
    evento.preventDefault();
    
    var camposVacios=validarCamposLlenos(aInputs, eError, 'Todos los campos deben estar llenos');
    if(!camposVacios){
        var correoCorrecto=validarCorreo(eCorreo, eError, 'El correo es incorrecto');
        if(correoCorrecto){
            var segura=validarSeguridadContrasena(eContrasena, eError, 'La contraseña debe contener de 8 a 10 caracteres incluyendo numeros, sin caracteres especiales.');
            if(segura){
                var iguales=validarCamposIguales(eContrasena, eConfirmContrasena, eError, 'Las contraseñas no coinciden');
                if(iguales){
                    var codigo = rand_code(caracteres, longitud);
//                    alert('El codigo de activacion es : '+codigo);

                    localStorage.setItem('codigoActivacion', codigo);
                    formulario.submit();
                }
            }
        }
    }
    

    
}); /*addEvenListener = Observador del evento y function ejecuta la funcion dentro de  los corchetes cuando se ejecuta la funcion*/
