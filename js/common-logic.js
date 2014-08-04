
//Variables de datos quemados para usuario 

var codigoActivacion = localStorage.getItem('codigoActivacion'),
    correoAdmin = 'admin@ucenfotec.ac.cr',
    pwAdmin = 'Cenfo2014',
    aCorreos = ["acordero@ucenfotec.ac.cr", "pmonestel@ucenfotec.ac.cr", "dbarillasv@ucenfotec.ac.cr"],
    aContrasenas = ["Admin2014", "Prof2014", "Estu2014"],
    aVistasRol = ["../index.html", "../index-Profesor.html", "../index-Estudiante.html"];

// ------------------------------------------
// Funciones generales
// ------------------------------------------

// Agrega un nuevo elemento/nodo al DOM.
// @pTag: tipo de elemento a crear (div, span, etc.)
// @pId: ID que va a tener el nuevo elemento.
// @pClassName: clases que va a tener el nuevo elemento.
// pText: texto que va a tener el elemento.
// @pNode: elemento/nodo al que hay que agregar el nuevo elemento
function addElementToDOM(pTag, pId, pClassName, pText, pNode) { 
    var pId = pId || '',
        pClassName = pClassName || '',
        pText = pText || '',
        eEl = document.createElement(pTag),
        eContent = document.createTextNode(pText);

    eEl.id = pId;
    eEl.className = pClassName;
    eEl.appendChild(eContent); 
    pNode.appendChild(eEl);
}

// Busca el nodo padre mas cercano que tenga la clase 
// pParentName
// @pChildObj: elemento del DOM a partir de donde se realiza la busqueda
// @pParentName: nombre de la clase a buscar
function closestParentNode(pChildObj, pParentName) {
    var node = pChildObj.parentNode;
    while (!hasClass(node, pParentName)) {
        node = node.parentNode;
    }
    return node;
}

// Devuelve true o false si en un elemento del DOM tiene la clase
// que se pasa por parametro.
// @pEl: elemento del DOM a verificar.
// @pClassName: clase a verificar.
function hasClass(pEl, pClassName) {
    return pEl.className.indexOf(pClassName) > -1 ? true : false;
}

// Muestra una ventana modal.
// Esta funcion utliza tres clases en el HTML:
//   .js-modal: elemento que abre el modal window.
//   .js-modal-close: elemento para cerrar el modal window.
//   .js-modal-window: este es la ventana modal a mostrarse.
// Ver el pattern library como referencia para el HTML.
function modalWindow() {
    var eModalItems = document.querySelectorAll('.js-modal'),
        eModalCloseItems = document.querySelectorAll('.js-modal-close'),
        eBody = document.querySelector('body');

    if (eModalItems) {
        // Elementos que abren el modal window
        for (var modal=0; modal < eModalItems.length; modal++) {
            eModalItems[modal].addEventListener('click', function(event) {
                event.preventDefault();
                var sModalId = event.currentTarget.dataset.modalId,
                    eModalWindow = document.querySelector('#' + sModalId);
                eModalWindow.className = eModalWindow.className.trim() + ' visible';
                addElementToDOM('div', 'overlay', 'overlay', '', eBody);
            });
        }
    }

    if (eModalCloseItems) {
        // Elementos que cierran el modal window
        for (var modalClose=0; modalClose < eModalCloseItems.length; modalClose++) {
            eModalCloseItems[modalClose].addEventListener('click', function(event) {
                event.preventDefault();
                var eModalWindow = closestParentNode(event.currentTarget, 'js-modal-window'),
                    eOverlay = document.querySelector('#overlay');

                removeClass(eModalWindow, 'visible');
                eBody.removeChild(eOverlay);
            });
        }
    }
};

// Eliminar una clase de un elemento HTML
function removeClass(pEl, pClassName) {
    pEl.className = pEl.className.replace(pClassName, '').trim();
}

// Validar que solo puedan introducirse letras
function soloLetras(e){
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = "8-37-39-46";

    tecla_especial = false
    for(var i in especiales) {
        if(key == especiales[i]){
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla)==-1 && !tecla_especial) {
        return false;
    } else {
        return true;
    }
}

// Hace toggle de una clase a un elemento del DOM.
// Las clases a asignar son: "collapsed" y "expanded".
// @pEl: elemento del DOM a verificar.
//
// Ejemplo:
// Antes
//  <div class="accordion collapsed"></div>
// Despues:
//  <div class="accordion expanded"></div>
function toggleClass(pEl) {
    if (hasClass(pEl, 'collapsed')) {
        if (pEl.className.indexOf(' collapsed') != -1) {
            removeClass(pEl, 'collapsed');
        }
        pEl.className += ' expanded';        
    } else {
        if (pEl.className.indexOf('expanded') != -1) {
            removeClass(pEl, 'expanded');
        }
        pEl.className += ' collapsed';
    }
};

// Validar que dos campos contengan la misma informacion.
function validarCamposIguales(pValor1, pValor2, pElementoError, pMsjError){
    var iguales=false;
    
    if(pValor1===pValor2){
        iguales=true;
    }else{
        
        pElementoError.innerHTML=pMsjError;
        pElementoError.className += ' error';
    }
    
    return iguales;
};

// Validar que los campos de un formulario esten llenos.
function validarCamposLlenos(pArreglo, pElementoError, pMsjError){
   var campoVacio=false;
    for(var i=0; i<pArreglo.length; i++){
        
        if(pArreglo[i].value=='') {  
           campoVacio=true;
        }
    }
    
    if(campoVacio){
        pElementoError.innerHTML=pMsjError;
        pElementoError.className += ' error';
    }
    
    return campoVacio;
};

// Validar que correo sea valido y pertenezca el dominio de Cenfotec.
function validarCorreo(pCorreo, pElementoError, pMsjError) { 
  var expreg = /^\w+@ucenfotec.ac.cr$/,
      correcto=true;
  
  if(!expreg.test(pCorreo)){
      correcto=false;
    pElementoError.innerHTML=pMsjError;
    pElementoError.className += ' error';
  }
    
   return  correcto;
}

//Validar que el correo se encuentre registrado

function validarCorreoRegistrado(pCorreo, pElementoError, pMsjError){
    var registrado=false;
    
    for(var i=0; i<aCorreos.length; i++){
        
        if(pCorreo==aCorreos[i]){
            registrado=true;
        }
    }
    
    if(registrado==false){
        pElementoError.innerHTML=pMsjError;
        pElementoError.className += ' error';
    }
    
    return registrado;

}

// Validar que la contraseña sea valida para el usuario.
function validarContrasena(pCorreo, pContrasena, pElementoError, pMsjError) { 
    var coincide=false;
    
    for(var i=0; i<aCorreos.length; i++){
        if(pCorreo==aCorreos[i]){
            if(pContrasena==aContrasenas[i]){
                coincide=true;
            }
        }
    }
  
    if(!coincide){
        Error.innerHTML=pMsjError;
        pElementoError.className += ' error';
      
    }
    
    return coincide;
}

//Validar la vista que tendra el usuario segun sea el rol
function validarVistaRol(pCorreo, pFormulario){
    var indice;
    
    for(var i=0; i<aCorreos.length; i++){
        if(pCorreo==aCorreos[i]){
            indice = i;
        }
        
    }
    
    pFormulario.action = aVistasRol[indice];

}

// Retorna true/false si el correo es valido.
function validarEmail(pEmail) {
    var re = new RegExp(/^\"?[\w-_\.]*\"?@ucenfotec\.ac\.cr$/);
    return re.test(pEmail);
}

// Retorna true/false si el telefono es valido.
function validarTelefono(pPhone) {
    var re = new RegExp(/^[0-9]{4}\-[0-9]{4}$/);
    return re.test(pPhone);
}

// Validar un formulario.
function validarForm(pFormId) {
    var bValido = true,
        eInputs = document.querySelectorAll('#' + pFormId + ' input[required], textarea[required]'),
        eSelects = document.querySelectorAll('#' + pFormId + ' select[required]'),
        eTextareas = document.querySelectorAll('#' + pFormId + ' textarea[required]'),
        eInputsPhone = document.querySelectorAll('#' + pFormId + ' input[data-validate-type="phone"]');

    // Validar que los inputs requeridos esten llenos.
    for(var i=0; i < eInputs.length; i++) {
        if (eInputs[i].value == '') {
            bValido = false;
            mostrarMensajeError(eInputs[i], 'Este campo no puede estar vacío.');
        } else if (eInputs[i].dataset.validateType) {
            switch(eInputs[i].dataset.validateType) {
                case 'email':
                    if (!validarEmail(eInputs[i].value)) {
                        bValido = false;
                        mostrarMensajeError(eInputs[i], 'El correo electrónico no es válido.');
                    }
                    break;
                case 'number':
                    if (!validateNumber(eInputs[i].value)) {
                        bValido = false;
                        mostrarMensajeError(eInputs[i], 'Este campo solo admite números.');
                    }
                    break;
                case 'string':
                    // Pendiente...
                    console.log('validate string');
                    break;
                case 'letters':
                    // Pendiente...
                    console.log('validate letras');
                    break;
            }
        }
    }
    // Validar que los selects tengan un valor
    if (eSelects.length) {
        for(var j=0; j < eSelects.length; j++) {
            var eSelectedOption = eSelects[j].querySelector('option[selected]');

            if (eSelectedOption == 'selected') {
                bValido = false;
                mostrarMensajeError(eSelects[j], 'Debe seleccionar una opción.');
            }
        }
    }

    if (eInputsPhone.length) {
        for(var p=0; p < eInputsPhone.length; p++) {
            if (!validarTelefono(eInputsPhone[p].value)) {
                bValido = false;
                mostrarMensajeError(eInputsPhone[p], 'El formato del número de teléfono es inválido. Ejemplo: 5555-5555');
            }
        }
    }

    return bValido;
}

//Validar que la contraseña sea segura (de 8 a 10 caracteres inlcuye letra y numero sin caracteres especiales)
function validarSeguridadContrasena(pContrasena, pElementoError, pMsjError) { 
  var expreg = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      segura=true;
  
  if(!expreg.test(pContrasena)){
      segura=false;
    pElementoError.innerHTML=pMsjError;
    pElementoError.className += ' error';
  }
    
   return  segura;
}

function validarNumero(pNumber) {
    return !isNaN(Number(pNumber));
}

//Generar código aleatorio alfanumerico
function rand_code(chars, lon){
    var code = "";
    for (x=0; x < lon; x++){
        rand = Math.floor(Math.random()*chars.length);
        code += chars.substr(rand, 1);
    }

    return code;
}

//Calcular el promedio de evlacion de cita
function calcularPromedio(paNumeros){
    var sumatoria=0;
    
    for(var i=0; i<paNumeros.length; i++){
        sumatoria+=parseInt(paNumeros[i].value);
    }
    
    var promedio = sumatoria/paNumeros.length;
    
    promedio = promedio.toFixed(2);
    return promedio;
}

//Validar clave de activacion de cuenta
function validarClave(pClave, pElementoError, pMsjError){
    var correcta=false;
    
    if(pClave==codigoActivacion){
        correcta=true;
    }else{
        pElementoError.innerHTML=pMsjError;
        pElementoError.className += ' error';
    }

    return correcta;
}

// Crear un nuevo nodo <p class="alert-error"> que muestra
// el mensaje de texto pasado por parametro dentro del nodo tambien
// pasado por parametro.
function mostrarMensajeError(pEl, pMsg) {
	// Buscar el parentNode del input.
	var eFormRow = closestParentNode(pEl, 'form-row');
	// Agregar la clase "error" al div en que se encuentra el input.
	eFormRow.className += ' error';
	// Crear un elemento p para mostrar el error del input en especifico.
	addElementToDOM('p', '', 'alert-error flaticon-remove11', pMsg, eFormRow);
}

// Limpiar mensajes de error
function limpiarMensajesError() {
	var eFormRows = document.querySelectorAll('.form-row.error'),
		eAlertErrors = document.querySelectorAll('p.alert-error');
	
	// Eliminar la clase "error" de los "div.form-row".
	if (eFormRows) {
		for (var i=0; i < eFormRows.length; i++) {
			removeClass(eFormRows[i], 'error');
		}
	}
	// Eliminar los nodos p que son mensajes de error.
	if (eAlertErrors) {
		for (var j=0; j < eAlertErrors.length; j++) {
			var eAlertErrorParent = eAlertErrors[j].parentNode;
			eAlertErrorParent.removeChild(eAlertErrors[j]);
		}
	}
}

//validar si hay al menos un radio seleccionado en un grupo de radios
function hayRadioSeleccionado(radioName){
	var radios = document.getElementsByName(radioName);
	var isChecked=false;
	for (var i=0; i<radios.length; i++) {
		if (radios[i].checked) {
			isChecked=true;
		}
	}
	if(!isChecked){
		mostrarMensajeError(radios[0],"Debe seleccionar una opción.");
	}
	return isChecked;
}

// ------------------------------------------
// Inicializar funcionalidades
// ------------------------------------------

// Inicializar acordeones
var eAccordionItems = document.querySelectorAll('.accordion-item > a');
if (eAccordionItems) {
    for (var i=0; i < eAccordionItems.length; i++) {
        var eItem = eAccordionItems[i].parentNode;

        if (eItem.querySelectorAll('.accordion-detail').length) {
            // Agregar la clase collapsed a los elementos del sidebar no activos.
            if (!hasClass(eItem, 'expanded')) {
                eItem.className += ' collapsed';
            }

            eAccordionItems[i].addEventListener('click', function(event) {
                event.preventDefault();
                toggleClass(event.currentTarget.parentNode);
            });
        }
    }
}

// Inicializar modal windows
// ------------------------------------------
modalWindow();

//Imprimir código de activacion en la página de mensaje
var eCodigoActivacion = document.querySelector('#codigoActiv');
if (eCodigoActivacion) {
    eCodigoActivacion.innerHTML = codigoActivacion;
}

