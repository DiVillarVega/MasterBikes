$(document).ready(function() {
  
  // Agregar método de validación para que un campo sólo acepte 
  // letras y espacios en blanco, pero no números ni símbolos,
  // ideal para campos como nombres y apellidos
  $.validator.addMethod("soloLetras", function(value, element) {

    return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);

  }, "Sólo se permiten letras y espacios en blanco.");


  // Validar Números con % como descuentos pa
  $.validator.addMethod("soloNumeros", function(value, element) {

    return this.optional(element) || /^[0-9]+%*$/.test(value);

  }, "Sólo se permiten números.");

  $.extend($.validator.messages, {
    required: "Este campo es requerido",
  });

  // Validar formulario de productos
  $('#formulario_productos').validate(
    {
      rules: {
        'categoria': {
          required: true
        },
        'nombre': {
          required: true,
          minlength: 1,
          maxlength: 60
        },
        'descripcion': {
          required: true,
          minlength: 20,
          maxlength: 400
        },
        'precio': {
          required: true,
          number: true,
          min: 0
        },
        'descuento_subscriptor': {
          required: true,
          number: true,
          min: 0,
          max: 100
        },
        'descuento_oferta': {
          required: true,
          number: true,
          min: 0,
          max: 100
        }
      },
      messages: {  
        'categoria': {
          required: "La categoría es un campo requerido"
        },
        'nombre': {
          required: 'El nombre es un campo requerido',
          minlength: 'El nombre debe tener un minimo de 1 caracter',
          maxlength: 'El nombre debe tener un máximo de 60 caracteres'
        },
        'descripcion': {
          required: 'La descripción es un campo requerido',
          minlength: 'La descripción debe tener un mínimo de 20 caracteres',
          maxlength: 'La descripción debe tener un máximo de 400 caracteres'
        },
        'precio': {
          required: 'El precio es un campo requerido',
          soloNumeros: 'Ingrese solo números',
          min: 'El precio debe ser mayor a 0'
        },
        'descuento_subscriptor': {
          required: 'El descuento es un campo requerido',
          soloNumeros: 'Ingrese solo numeros y %',
          min: 'El descuento debe ser mayor a 0',
          max: 'El descuento debe ser menor a 100'
        },
        'descuento_oferta': {
          required: 'El descuento es un campo requerido',
          soloNumeros: 'Ingrese solo numeros y %',
          min: 'El descuento debe ser mayor a 0',
          max: 'El descuento debe ser menor a 100'
        }
      },
      errorPlacement: function(error, element) {
        error.insertAfter(element); // Inserta el mensaje de error después del elemento
        error.addClass('error-message'); // Aplica una clase al mensaje de error
    },      
    });

  

});