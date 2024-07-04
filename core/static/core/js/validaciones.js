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


  // Validar Números con % como descuentos pa
  $.validator.addMethod("soloNumeros", function(value, element) {

    return this.optional(element) || /^[0-9]+%*$/.test(value);

  }, "Sólo se permiten números.");


    // El siguiente Javascript obliga a que la caja de texto del rut, siempre escriba la letra "K" en mayúscula
     document.getElementById('rut').addEventListener('keyup', function(e) {
       e.target.value = e.target.value.toUpperCase();
     });
  

  // Validar formulario de registro
  $('#formulario_registro').validate(
    {
      rules: {
        rut: {
          required: true,
          rutChileno: true
        },
        nombre: {
          required: true,
          soloLetras: true,
          minlength: 3,
          maxlength: 50
        },
        apellido: {
          required: true,
          minlength: 5,
          maxlength: 50
        },
        correo: {
          required: true,
          emailCompleto: true,
        },
        direccion: {
          required: true,
          minlength: 10,
          maxlength: 80,
        },
        password: {
          required: true,
          minlength: 8,
          maxlength: 15,
        },
        password2: {
          required: true,
          minlength: 8,
          maxlength: 15,
          equalTo: '#password'
        }
      },
      messages: {
        rut: {
          required: "El RUT es un campo requerido",
          rutChileno: "El RUT no es válido (escriba sin puntos y con guión)"
        },        
        nombre: {
          required: 'El nombre es un campo requerido',
          minlength: 'El nombre debe tener un mínimo de 3 caracteres',
          maxlength: 'El nombre debe tener un máximo de 50 caracteres',
          soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
        },
        apellido: {
          required: 'El apellido es un campo requerido',
          minlength: 'El apellido debe tener un mínimo de 5 caracteres',
          maxlength: 'El apellido debe tener un máximo de 50 caracteres',
          soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
        },
        correo: {
          required: 'El correo es un campo obligatorio',
          emailCompleto: 'Ingrese un correo válido'
        },
        direccion: {
          required: 'La dirección es un campo requerido',
          minlength: 'La dirección debe tener un mínimo de 10 caracteres',
          maxlength: 'La dirección debe tener un máximo de 80 caracteres'
        },
        password: {
          required: 'La contraseña es un campo requerido',
          minlength: 'La contraseña debe tener un mínimo de 8 caracteres',
          maxlength: 'La contraseña debe tener un máximo de 15 caracteres', 
        },
        password2: {
          required: 'Repita la contraseña',
          minlength: 'La contraseña debe tener un mínimo de 8 caracteres',
          maxlength: 'La contraseña debe tener un máximo de 15 caracteres', 
          equalTo: 'Las contraseñas deben ser iguales'
        }
      }
    }
  );


  // Validar formulario de mis datos
  $('#formulario_misdatos').validate(
    {
      rules: {
        rut: {
          required: true,
          rutChileno: true
        },
        nombre: {
          required: true,
          soloLetras: true,
          minlength: 3,
          maxlength: 50
        },
        apellido: {
          required: true,
          minlength: 5,
          maxlength: 50
        },
        correo: {
          required: true,
          emailCompleto: true,
        },
        direccion: {
          required: true,
          minlength: 10,
          maxlength: 80,
        },
        password: {
          required: true,
          minlength: 8,
          maxlength: 15,
        },
        password2: {
          required: true,
          minlength: 8,
          maxlength: 15,
          equalTo: '#password'
        }
      },
      messages: {
        rut: {
          required: "El RUT es un campo requerido",
          rutChileno: "El RUT no es válido (escriba sin puntos y con guión)"
        },        
        nombre: {
          required: 'El nombre es un campo requerido',
          minlength: 'El nombre debe tener un mínimo de 3 caracteres',
          maxlength: 'El nombre debe tener un máximo de 50 caracteres',
          soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
        },
        apellido: {
          required: 'El apellido es un campo requerido',
          minlength: 'El apellido debe tener un mínimo de 5 caracteres',
          maxlength: 'El apellido debe tener un máximo de 50 caracteres',
          soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
        },
        correo: {
          required: 'El correo es un campo obligatorio',
          emailCompleto: 'Ingrese un correo válido'
        },
        direccion: {
          required: 'La dirección es un campo requerido',
          minlength: 'La dirección debe tener un mínimo de 10 caracteres',
          maxlength: 'La dirección debe tener un máximo de 80 caracteres'
        },
        password: {
          required: 'La contraseña es un campo requerido',
          minlength: 'La contraseña debe tener un mínimo de 8 caracteres',
          maxlength: 'La contraseña debe tener un máximo de 15 caracteres', 
        },
        password2: {
          required: 'Repita la contraseña',
          minlength: 'La contraseña debe tener un mínimo de 8 caracteres',
          maxlength: 'La contraseña debe tener un máximo de 15 caracteres', 
          equalTo: 'Las contraseñas deben ser iguales'
        }
      }
    }
  );

  // Validar formulario de usuarios
  $('#formulario_usuarios').validate(
    {
      rules: {
        id: {
          required: true,
          soloNumeros: true,
          minlength: 1,
          maxlength: 10
        },
        rut: {
          required: true,
          rutChileno: true
        },
        nombre: {
          required: true,
          soloLetras: true,
          minlength: 3,
          maxlength: 50
        },
        apellido: {
          required: true,
          minlength: 5,
          maxlength: 50
        },
        correo: {
          required: true,
          emailCompleto: true,
        },
        direc: {
          required: true,
          minlength: 10,
          maxlength: 80,
        },
        password: {
          required: true,
          minlength: 8,
          maxlength: 15,
        },
      },
      messages: {
        id: {
          required: "El RUT es un campo requerido",
          minlength: 'El id debe tener un mínimo de 1 digito',
          maxlength: 'El id debe tener un máximo de 10 digito',
          soloNumeros: "El id sólo puede tener numeros",
        },    
        rut: {
          required: "El RUT es un campo requerido",
          rutChileno: "El RUT no es válido (escriba sin puntos y con guión)"
        },    
        nombre: {
          required: 'El nombre es un campo requerido',
          minlength: 'El nombre debe tener un mínimo de 3 caracteres',
          maxlength: 'El nombre debe tener un máximo de 50 caracteres',
          soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
        },
        apellido: {
          required: 'El apellido es un campo requerido',
          minlength: 'El apellido debe tener un mínimo de 5 caracteres',
          maxlength: 'El apellido debe tener un máximo de 50 caracteres',
          soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
        },
        correo: {
          required: 'El correo es un campo obligatorio',
          emailCompleto: 'Ingrese un correo válido'
        },
        direc: {
          required: 'La dirección es un campo requerido',
          minlength: 'La dirección debe tener un mínimo de 10 caracteres',
          maxlength: 'La dirección debe tener un máximo de 80 caracteres'
        },
        password: {
          required: 'La contraseña es un campo requerido',
          minlength: 'La contraseña debe tener un mínimo de 8 caracteres',
          maxlength: 'La contraseña debe tener un máximo de 15 caracteres', 
        },
      }
    }
  );

  // Validar formulario de bodega
  $('#formulario_bodega').validate(
    {
      rules: {
        categoria:{
          required: true
        },
        cantidad: {
          required: true,
          soloNumeros: true
        }
      },
      messages: {
        categoria: {
          required: "Campo obligatorio"
        },
        cantidad: {
          required: "La cantidad es un campo requerido.",
          soloNumeros: "Ingrese solo números."
        }
      }
    }
  );


  // Validar formulario de login
  $('#formulario_login').validate(
    {
      rules: {
        correo: {
          required: true,
          emailCompleto: true,
        },
        contraseña: {
          required: true,
          minlength: 8,
          maxlength: 15,
        }
      },
      messages: {
        correo: {
          required: 'El correo es un campo obligatorio',
          emailCompleto: 'Ingrese un correo válido'
        },
        contraseña: {
          required: 'La contraseña es un campo requerido',
          minlength: 'La contraseña debe tener un mínimo de 8 caracteres',
          maxlength: 'La contraseña debe tener un máximo de 15 caracteres', 
        }
      }
    }
  );

  // Validar formulario de productos
  $('#formulario_productos').validate(
    {
      rules: {
        id: {
          required: true,
          minlength: 1,
          maxlength: 5,
          soloNumeros: true
        },
        nombrep: {
          required: true,
          minlength: 1,
          maxlength: 60
        },
        descripcion: {
          required: true,
          minlength: 10,
          maxlength: 100
        },
        precio: {
          required: true,
          number: true,
          min: 0
        },
        descuentosub: {
          required: true,
          number: true,
          min: 0,
          max: 100
        },
        descuentoof: {
          required: true,
          number: true,
          min: 0,
          max: 100
        }
      },
      messages: {  
        id: {
          required: "El ID es un campo requerido",
          minlength: 'El ID debe tener un mínimo de 1 caracteres',
          maxlength: 'El ID debe tener un máximo de 7 caracteres',
          soloNumeros: 'Ingrese solo números'
        },   
        nombrep: {
          required: 'El nombre es un campo requerido',
          minlength: 'El nombre debe tener un minimo de 1 caracter',
          maxlength: 'El nombre debe tener un máximo de 60 caracteres'
        },
        descripcion: {
          required: 'La descripción es un campo requerido',
          minlength: 'La descripción debe tener un mínimo de 10 caracteres',
          maxlength: 'La descripción debe tener un máximo de 50 caracteres'
        },
        precio: {
          required: 'El precio es un campo requerido',
          minlength: 'El precio debe tener un mínimo de 1 caracteres',
          maxlength: 'El precio debe tener un máximo de 7 caracteres',
          soloNumeros: 'Ingrese solo números'
        },
        descuentosub: {
          required: 'El descuento es un campo requerido',
          minlength: 'El descuento debe tener un mínimo de 1 caracteres',
          maxlength: 'El descuento debe tener un máximo de 5 caracteres',
          soloNumeros: 'Ingrese solo numeros y %'
        },
        descuentoof: {
          required: 'El descuento es un campo requerido',
          minlength: 'El descuento debe tener un mínimo de 1 caracteres',
          maxlength: 'El descuento debe tener un máximo de 5 caracteres',
          soloNumeros: 'Ingrese solo numeros y %'
        }
      }
    }
  );
  // Validar formulario de mis datos
  $('#formulario_misdatos').validate(
    {
      rules: {
        nombres: {
          required: true,
          minlength: 5,
          mxlength: 50
        },
        apellidos: {
          required: true,
          minlength: 5,
          mxlength: 50
        },
        correo: {
          required: true,
          email: true
        },
        direccion: {
          required: true,
          minlength: 10,
          mxlength: 80
        },
        password: {
          required: true,
          minlength: 5
        },
        password2: {
          required: true,
          equalTo: '#password'
        }
      },
      messages: {
        nombres: {
          required: 'El nombre es un campo requerido',
          minlength: 'El nombre debe tener un mínimo de 5 caracteres',
          mxlength: 'El nombre debe tener un máximo de 50 caracteres'
        },
        apellidos: {
          required: 'El apellido es un campo requerido',
          minlength: 'El apellido debe tener un mínimo de 5 caracteres',
          mxlength: 'El apellido debe tener un máximo de 50 caracteres'
        },
        correo: {
          required: 'El correo es un campo obligatorio',
          email: 'Ingrese un correo válido'
        },
        direccion: {
          required: 'La dirección es un campo requerido',
          minlength: 'La dirección debe tener un mínimo de 10 caracteres',
          mxlength: 'La dirección debe tener un máximo de 80 caracteres'
        },
        password: {
          required: 'La contraseña es un campo requerido',
          minlength: 'La contraseña debe tener un mínimo de 5 caracteres'
        },
        password2: {
          required: 'Repita la contraseña',
          equalTo: 'Las contraseñas deben ser iguales'
        }
      }
    }
  );

});