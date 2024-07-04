$(document).ready(function() {

   // Agregar método de validación para correo
   $.validator.addMethod("emailCompleto", function(value, element) {

    // Expresión regular para validar correo electrónico
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,}))$/;

    // Validar correo electrónico con la expresión regular
    return regex.test(value);

  }, 'El formato del correo no es válido');

   // Validar formulario de login
   $('#formulario_login').validate(
    {
      rules: {
        'username': {
          required: true
        },
        'password': {
          required: true
        }
      },
      messages: {
        'username': {
          required: 'El usuario es un campo obligatorio.'
        },
        'password': {
          required: 'La contraseña es un campo requerido.'
        }
      },
      errorPlacement: function(error, element) {
        error.insertAfter(element); // Inserta el mensaje de error después del elemento
        error.addClass('error-message'); // Aplica una clase al mensaje de error
      },
    }
  );
});