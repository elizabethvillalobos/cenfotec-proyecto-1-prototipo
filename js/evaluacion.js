// document.getElementById('no').onclick = 
// function mostrarForm(){
//   document.getElementById('wrapperItems');
//   wrapperItems.classList.remove("mostrarForm");
//   wrapperItems.classList.add("ocultarForm");            
// }

var eRadiosChecked = document.querySelectorAll('.radio'),
    aPuntajes = document.querySelectorAll('.nbr'),
    ePromedio = document.querySelector('#promedio');

if (eRadiosChecked) {
	for(var i=0; i < eRadiosChecked.length; i++) {
		eRadiosChecked[i].addEventListener('click', function(event) {
			var eEl = event.currentTarget,
				eElParent = closestParentNode(eEl, 'accordion-detail'),
				eWrapperItems = eElParent.querySelector('.wrapperItems');

			if (eEl.querySelector('input[type="radio"]').value == 'si') {
				eWrapperItems.className += ' visible';
			} else {
				removeClass(eWrapperItems, 'visible');
			}
		});
	}
}

for(var i=0; i < aPuntajes.length; i++) {
    aPuntajes[i].addEventListener('change', function(event){
        
        var eEl = event.currentTarget,
            eElParent = closestParentNode(eEl, 'wrapperItems'),
            aPuntajesParent = eElParent.querySelectorAll('input'),
            ePromedioParent = eElParent.querySelector('#promedio');
        
        var promedio = calcularPromedio(aPuntajesParent);
        ePromedioParent.innerHTML=promedio;
    });
}

/*
if(ebtnEva) {
	ebtnEva.addEventListener('click',function(){

		for (var j = 0; j < eRadiosChecked.length; j++) {
			if(eRadiosChecked[j].value = 'si' || eRadiosChecked[j].value = 'no'){
				eFormu.submit();
			}	
			else{
				alert('Debe responder a la pregunta #1');
							
			}
		}			 		       
	});
	
}

*/