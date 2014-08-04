(function($) {
	var eAgenda = $('#agenda-fecha');
	if (eAgenda.length) {
		eAgenda.datepicker({
			dateFormat: 'dd/mm/yy',
			dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
			hideOnSelect: false,
			minDate: new Date(),
			monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
			'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			nextText: 'Sig',
			prevText: 'Prev'
		});
		eAgenda.datepicker('show');
	}
	$('#agenda-fecha').on('change', actualizarCitas);
})(jQuery);

function actualizarCitas(event) {
	var $el = $(event.currentTarget),
		$citasPorDia = $('.cita-' + $el.val().replace(new RegExp('/', 'g'), '-'));

	$('.cita').removeClass('visible');
	if ($citasPorDia.length) {
		$citasPorDia.toggleClass('visible');
	} else {
		$('.no-cita').toggleClass('visible');
	}
}
