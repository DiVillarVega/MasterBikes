$(document).ready(function() {

  $('[data-toggle="tooltip"]').tooltip();

  // TABLA AVANZADA: Si hay una tabla con el id "tabla-principal", la transformará en "DataTable Avanzada"
  // Ver sitio web https://datatables.net/
  if ($('#tabla-principal').length > 0) {
    var table = new DataTable('#tabla-principal', {
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json',
        },
    });
  }

  // BOTON LIMPIAR FORMULARIO: Permite limpiar el formulario y las validaciones en rojo si las hubiera
  if ($('#limpiar_formulario').length > 0) {
    $('#limpiar_formulario').click(function(event) {
      $("#form").validate().resetForm();
      document.getElementById("form").reset();
    });
  }

  // BOTON IMAGEN: Prepara el botón de  
  // 1. Ocultar la etiqueta que acompaña al botón de "Seleccionar archivo" (el clásico botón input type file)
  // 2. Mueve el botón de "Seleccionar archivo" debajo del "cuadro_imagen" que es el "img" que muestra la foto
  // 3. Oculta parcialmente el botón de "Seleccionar archivo", así el error de jquery validate 
  //    se mostrará debajo de la imagen cuando el usuario no haya seleccionado alguna.
  // 4. En la página que usa el botón de "Seleccionar archivo" se debe poner otro en su reemplazo
  if ($('#id_imagen').length > 0) {
    $("label[for='id_imagen']").hide();
    $('#id_imagen').insertAfter('#cuadro-imagen');
    $("#id_imagen").css("opacity", "0");
    $("#id_imagen").css("height", "0px");
    $("#id_imagen").css("width", "0px");
    $('#form').removeAttr('style');
  }

  // CHECKBOX SUBSCRITO: Cambiar la gráfica del checkbox de "subscrito" para agregarle un texto de ayuda
  if ($('#id_subscrito').length > 0) {
    $('#id_subscrito').wrap('<div class="row"></div>');
    $('#id_subscrito').wrap('<div class="col-sm-1" id="checkbox-subscrito"></div>');
    $('#checkbox-subscrito').after('<div id="help_text_id_subscrito" class="col-sm-11"></div>');
    $('#help_text_id_subscrito').text(`Deseo subscribirme con un aporte
      de $3.000 mensuales a la fundación "Help a Brother" y obtner un 
      5% de descuento en todas mis compras.`);
  }

  // BOTON DE SELECCIONAR IMAGEN: Cuando se selecciona una nueva imagen usando el botón,
  // entonces se carga la imagen en el tag "img" que tiene el id "cuadro-imagen" 
  if ($('#id_imagen').length > 0) {
    $('#id_imagen').change(function() {
      var input = this;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
          $('#cuadro-imagen').attr('src', e.target.result).show();
        };
        reader.readAsDataURL(input.files[0]);
      }
    });

    
  // AGREGAR METODO DE VALIDACION PARA REVISAR SI UN VALOR SE ENCUENTRA DENTRO DE UNA LISTA DEFINIDA
  // POR EJEMPLO PARA REVISAR SI EL TIPO DE USUARIO ESTÁ DENTRO DE LA LISTA ['Administrador', 'Superusuario']
  $.validator.addMethod("inList", function(value, element, param) {
    return $.inArray(value, param) !== -1;
  }, "Por favor, selecciona un valor válido.");


  }});


