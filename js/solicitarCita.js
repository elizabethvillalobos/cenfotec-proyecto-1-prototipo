// ------------------------------------------
// CREACION DE UNA NUEVA SOLICITUD
// ------------------------------------------

// ------------------------------------------
// Variables globales
// ------------------------------------------
var btnSelectCurso=document.querySelector('#btnSelectCurso');
var btnSelectInvitado=document.querySelector('#btnSelectInvitado');
var btnEnviar=document.querySelector('#btnEnviar');
var btnClickeado;
var btnVolver =document.querySelector('#btnVolver');
var btnCrearSolicitud=document.querySelector('#crearSolicitud');
var totalSelected=0;

// ------------------------------------------
// Eventos
// ------------------------------------------

var eDatePickers = $('.datepicker');
if (eDatePickers.length) {
	eDatePickers.datepicker({
		dateFormat: 'dd/mm/yy',
		dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
		hideOnSelect: true,
		prevText: 'Prev',
		nextText: 'Sig',
		minDate: new Date(),
		monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
		'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre']
	});
}

if(btnSelectCurso!=null){
	btnSelectCurso.addEventListener('click',function(){
		btnClickeado=btnSelectCurso;
		toggleForms();
	});
}
if(btnSelectInvitado!=null){
	btnSelectInvitado.addEventListener('click',function(){
		btnClickeado=btnSelectInvitado;
		toggleForms();
	});
}
if(btnVolver!=null){
	btnVolver.addEventListener('click',function(){
		getActiveItems();
		var frmSolicitud=document.querySelector('#solicitarCita');
		var frmLista=document.querySelector('#listForm');
		frmSolicitud.className = "frontContent";
		frmLista.className = "backContent";
	});
}
if(btnEnviar!=null){
	btnEnviar.addEventListener('click',function(event){
		if(!inputLlenos('solicitarCita')){
			event.preventDefault();
		}
		if(!hayRadioSeleccionado('rdoLugar'))
		{
			event.preventDefault();
		}
		if(!hayRadioSeleccionado('rdoTipo'))
		{
			event.preventDefault();
		}
	});
}
if(btnCrearSolicitud!=null){
	btnCrearSolicitud.addEventListener('click',function(){
		var url = window.location.pathname;
		var primerDivision = url.split("/");
		primerDivision=primerDivision[primerDivision.length-1];
		if (primerDivision.indexOf("profesor") >= 0)
		{
			window.location = "solicitarCita-profesor.html"
		}
		else
		{
			if (primerDivision.toLowerCase().indexOf("estudiante") >= 0)
			{
				window.location = "solicitarCita-estudiante.html"
			}
			else
			{
				window.location = "solicitarCita.html"
			}
		}
		
	});
}
// ------------------------------------------
// Funciones
// ------------------------------------------
//cambiar del formulario a la lista de cursos e invitados y viseversa
function toggleForms() {
	totalSelected=0;
	var frmSolicitud=document.querySelector('#solicitarCita');
	var frmLista=document.querySelector('#listForm');
    frmSolicitud.className = "backContent";
	frmLista.className = "frontContent";
	var title=document.querySelector('#lblLegent');
	var ul = document.getElementById("listElements");
	while( ul.firstChild ){
		ul.removeChild( ul.firstChild );
	}
	
	if(btnClickeado==btnSelectCurso){		
		title.innerHTML="Seleccionar Curso";
		var listaCurso=["Inglés para tecnologías de información 1","Introducción a la tecnología de información","Fundamentos de programación","Proyecto de ingeniería del software 1","Inglés para tecnologías de información 2","Programación orientada a objetos","Procesos empresariales","Fundamentos de bases de datos","Estructuras discretas"]
		for(i=0;i<listaCurso.length;i++)
		{
			var li = document.createElement("li");
			li.appendChild(document.createTextNode(listaCurso[i]));
			li.setAttribute("value","1");
			li.setAttribute("class","listItem itemAlto");
			ul.appendChild(li);
		}
	}
	else
	{
		if(btnClickeado==btnSelectInvitado){
			title.innerHTML="Seleccionar Invitado";
			var listaInvitados=["Antonio Luna","Álvaro Cordero","Pablo Monestel","Eduardo Solís","Jason Durán","Oscar Morales"]
			for(i=0;i<listaInvitados.length;i++)
			{
				var li = document.createElement("li");
				li.appendChild(document.createTextNode(listaInvitados[i]));
				li.setAttribute("value","1");
				li.setAttribute("class","listItem");
				ul.appendChild(li);
			}
		}
	}
	var listItems=document.getElementsByClassName('listItem');
	for(var i = 0; i < listItems.length; i++) {
		var listItem = listItems[i];
		listItem.onclick = function() {			
			toggleItem(this,1);
		}
	}
}

//activar y desactivar elemento de la lista
function toggleItem(clickedItem, maxOfItems) {
	if ( clickedItem.classList.contains("activeItem") ) {
		if ( clickedItem.classList.contains("itemAlto") ) {
			clickedItem.className = "listItem itemAlto";
		}
		else
		{
			clickedItem.className = "listItem";
		}
		totalSelected--;
	}
	else
	{
		if(totalSelected<maxOfItems){	
			if ( clickedItem.classList.contains("itemAlto") ) {
				clickedItem.className = "listItem activeItem itemAlto";
			}
			else
			{
				clickedItem.className = "listItem activeItem";
			}
				totalSelected++;
		}
	}	
}

//obtener los elementos activos de la lista
function getActiveItems() {
	var activeItems=document.querySelectorAll('.activeItem');
	for (i=0; i<activeItems.length; i++)
    {
		if(btnClickeado==btnSelectCurso){		
			var txtCurso =document.querySelector('#txtCurso');	
			txtCurso.value=activeItems[i].innerHTML;
		}
		else
		{
			if(btnClickeado==btnSelectInvitado){
				var txtInvitado =document.querySelector('#txtInvitado');	
				txtInvitado.value=activeItems[i].innerHTML;
			}
		}
	}
}



//obtener el radio activo
function getRadioChecked(radioName){
	var radios = document.getElementsByName(radioName);
	var radioChecked;
	for (var i=0; i<radios.length; i++) {
		if (radios[i].checked) {
			radioChecked=radios[i].value;
		}
	}
	return radioChecked;
}


// ------------------------------------------
// CONFIRMACION Y RECHAZO DE SOLICITUDES
// ------------------------------------------

// ------------------------------------------
// Variables globales
// ------------------------------------------
var btnAceptar=document.querySelector('#btnAceptar');

// ------------------------------------------
// Eventos
// ------------------------------------------
if(btnAceptar!=null){
	btnAceptar.addEventListener('click',function(event){
		if(!inputLlenos('solicitarCita')){
			event.preventDefault();
		}
		else
		{
			var today=new Date();
			today.setHours(0);
			today.setMinutes(0);
			today.setSeconds(0);
			var fecha=document.querySelector('#txtFecha');
			if($('#txtFecha').datepicker("getDate")<today)
			{					
				mostrarMensajeError(fecha,"Debe seleccionar una fecha válida");
				event.preventDefault();
			}
			var horaIni=$('#txtHoraInicio');
			var horaFin=$('#txtHoraFin');
			if(horaIni.val()>horaFin.val())
			{
				mostrarMensajeError(document.querySelector('#txtHoraInicio'),"Debe seleccionar una hora válida");
				mostrarMensajeError(document.querySelector('#txtHoraFin'),"Debe seleccionar una hora válida");
				event.preventDefault();
			}
			
		}
	});
}


// ------------------------------------------
// FUNCIONES COMPARTIDAS
// ------------------------------------------

//verificar si los inputs estan llenos
function inputLlenos(idContainer){
	limpiarMensajesError();
	var estanLlenos=true;
	var myInputs=new Array();
	//select all inputs text
	var inputs = document.getElementById(idContainer).getElementsByTagName('input');	
	for(i=0; i<inputs.length; i++){		
		if((inputs[i].type=="text" || inputs[i].type=="time" )&& inputs[i].getAttribute('id')!="txtCurso")
		{
			myInputs.push(inputs[i]);
		}
	}
	
	for(i=0;i<myInputs.length;i++){
		if(myInputs[i].value.trim()==''){
			mostrarMensajeError(myInputs[i], "Este campo no puede estar vacío.");
			estanLlenos=false;
		}
	}
	return estanLlenos;
}