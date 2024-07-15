$(document).ready(function() {

  // **************************************************************
  // Los botones de pago serán desarrollados en una versión futura
  // **************************************************************

$('#formulario_ficha').validate({
  rules: {
      'fecha_inicio': {
          required: true,
          date: true, // Asegura que la fecha tenga un formato válido
          greaterThanToday: true, // Validar que la fecha de inicio sea mayor que la fecha actual
      },
      'fecha_fin': {
          required: true,
          date: true, // Asegura que la fecha tenga un formato válido
          greaterThan: '#fecha_inicio', // Agregar regla personalizada para validar que fecha_fin sea mayor que fecha_inicio
      },
  },
  messages: {
      'fecha_inicio': {
          required: 'Por favor, selecciona la fecha de inicio',
          date: 'Ingresa una fecha válida',
          greaterThanToday: 'La fecha de inicio debe ser posterior a la fecha actual',
      },
      'fecha_fin': {
          required: 'Por favor, selecciona la fecha de fin',
          date: 'Ingresa una fecha válida',
          greaterThan: 'La fecha de fin debe ser posterior a la fecha de inicio',
      },
  },
  errorPlacement: function(error, element) {
      error.insertAfter(element); // Inserta el mensaje de error después del elemento
      error.addClass('error-message'); // Aplica una clase al mensaje de error
  },
});

$.validator.addMethod('greaterThanToday', function(value, element) {
  var today = new Date();
  var selectedDate = new Date(value);
  return selectedDate > today;
}, 'La fecha de inicio debe ser posterior a la fecha actual');

// Regla personalizada para validar que fecha_fin sea mayor que fecha_inicio
$.validator.addMethod('greaterThan', function(value, element, param) {
  return new Date(value) > new Date($(param).val());
}, 'La fecha de fin debe ser posterior a la fecha de inicio');

$('#fecha_inicio').on('change', function() {
  $(this).valid(); // Dispara la validación cuando cambia la fecha_inicio
});


  $('#comprar-ahora').click(function() {
    $('#accion').val('comprar-ahora');
    $('#formulario-ficha').submit();
  });

  $('#agregar-al-carrito').click(function() {
    $('#accion').val('agregar-al-carrito');
    $('#formulario-ficha').submit();
  });

});
