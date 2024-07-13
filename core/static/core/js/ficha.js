$(document).ready(function() {

  // **************************************************************
  // Los botones de pago serán desarrollados en una versión futura
  // **************************************************************
$('#formulario_ficha').validate(
{
  rules: {
    'fecha_inicio': {
      required: true
    },
    'fecha_fin': {
      required: true
    }
  },
  messages: {
    'fecha_inicio': {
      required: 'La fecha de inicio es un campo obligatorio.'
    },
    'fecha_fin': {
      required: 'La fecha de término es un campo requerido.'
    }
  },
  errorPlacement: function(error, element) {
    error.insertAfter(element); // Inserta el mensaje de error después del elemento
    error.addClass('error-message'); // Aplica una clase al mensaje de error
  },
}
); 
  

  $('#comprar-ahora').click(function() {
    $('#accion').val('comprar-ahora');
    $('#formulario-ficha').submit();
  });

  $('#agregar-al-carrito').click(function() {
    $('#accion').val('agregar-al-carrito');
    $('#formulario-ficha').submit();
  });

});
