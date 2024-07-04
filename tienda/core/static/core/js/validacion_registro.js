$(document).ready(function() {

  // Agregar método de validación para RUT chileno
  $.validator.addMethod("rutChileno", function(value, element) {

    // Validar que el RUT tenga el formato correcto (8 o 9 dígitos + guión + dígito verificador)
    var rutPattern = /^\d{7,8}-[\dK]$/;
    if (!rutPattern.test(value)) {
        return false;
    }

    // Validar el dígito verificador
    var rutSinGuion = value.replace("-", "");
    var rut = rutSinGuion.slice(0, -1);
    var dv = rutSinGuion.slice(-1);
    var factor = 2;
    var sum = 0;
    for (var i = rut.length - 1; i >= 0; i--) {
        sum += parseInt(rut.charAt(i)) * factor;
        factor = factor === 7 ? 2 : factor + 1;
    }
    var dvCalculado = 11 - (sum % 11);
    dvCalculado = dvCalculado === 11 ? "0" : dvCalculado === 10 ? "K" : dvCalculado.toString();

    return dv === dvCalculado;
  }, "El RUT no es válido (escriba sin puntos y con guión)");

  
  // Agregar método de validación para correo
  $.validator.addMethod("emailCompleto", function(value, element) {

    // Expresión regular para validar correo electrónico
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,}))$/;

    // Validar correo electrónico con la expresión regular
    return regex.test(value);

  }, 'El formato del correo no es válido');
  
    // Agregar método de validación para que un campo sólo acepte 
  // letras y espacios en blanco, pero no números ni símbolos,
  // ideal para campos como nombres y apellidos
  $.validator.addMethod("soloLetras", function(value, element) {

    return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);

  }, "Sólo se permiten letras y espacios en blanco.");

    // El siguiente Javascript obliga a que la caja de texto del rut, siempre escriba la letra "K" en mayúscula
     document.getElementById('id_rut').addEventListener('keyup', function(e) {
       e.target.value = e.target.value.toUpperCase();
     });
  

  $(document).ready(function() {

  // Asignar placeholders para ayudar a los usuarios
  $('#id_username').attr('placeholder', 'Ej: cgomezv, cevans, sjohasson');
  $('#id_first_name').attr('placeholder', 'Ej: Cristián, Chris, Scarlett');
  $('#id_last_name').attr('placeholder', 'Ej: Gómez Vega, Evans, Johansson');
  $('#id_email').attr('placeholder', 'Ej: cevans@marvels.com');
  $('#id_password1').attr('placeholder', '8 caracteres como mínimo');
  $('#id_password2').attr('placeholder', 'Repetir la contraseña escogida');
  $('#id_rut').attr('placeholder', 'Ej: 11111111-1 (sin puntos y con guión)');
  $('#id_direccion').attr('placeholder', 'Calle, n° casa o edificio, n° departamento o piso\n'
    + 'localidad o ciudad, código postal o de área\n'
    + 'estado o provincia, ciudad, país');

  // Agregar una validación por defecto para que la imagen la exija como campo obligatorio
  $.extend($.validator.messages, {
    required: "Este campo es requerido",
  });

  $('#formulario_registro').validate({ 
      rules: {
        'username': {
          required: true,
        },
        'first_name': {
          required: true,
          soloLetras: true,
        },
        'last_name': {
          required: true,
          soloLetras: true,
        },
        'email': {
          required: true,
          emailCompleto: true,
          email: true
        },
        'rut': {
          required: true,
          rutChileno: true,
        },
        'direccion': {
          required: true,
        },
        'password1': {
          required: true,
          minlength: 8,
        },
        'password2': {
          required: true,
          equalTo: '#id_password1'
        }
      },
      messages: {
        'username': {
          required: 'Debe ingresar un nombre de usuario',
        },
        'first_name': {
          required: 'Debe ingresar su nombre',
          soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
        },
        'last_name': {
          required: 'Debe ingresar sus apellidos',
          soloLetras: "Los apellidos sólo pueden contener letras y espacios en blanco",
        },
        'email': {
          required: 'El correo es un campo obligatorio',
          emailCompleto: 'Ingrese un correo válido',
          email: 'Ingrese un correo válido'
        },
        'rut': {
          required: 'Debe ingresar su RUT',
          rutChileno: 'El formato del RUT no es válido',
        },
        'direccion': {
          required: 'Debe ingresar su dirección',
        },
        'password1': {
          required: 'Debe ingresar una contraseña',
          minlength: 'La contraseña debe tener al menos 8 caracteres',
        },
        'password2': {
          required: 'Debe ingresar una contraseña',
          equalTo: 'Debe repetir la contraseña anterior'
        }
      },
      errorPlacement: function(error, element) {
        error.insertAfter(element); // Inserta el mensaje de error después del elemento
        error.addClass('error-message'); // Aplica una clase al mensaje de error
      },
  });

  // BOTON LIMPIAR FORMULARIO: Permite limpiar el formulario y las validaciones en rojo si las hubiera
  if ($('#limpiar_formulario_registro').length > 0) {
    $('#limpiar_formulario_registro').click(function(event) {
      $("#formulario_registro").validate().resetForm();
      document.getElementById("formulario_registro").reset();
    });
  }
});
});