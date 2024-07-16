$(document).ready(function() {
    var today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00

    // Configurar el datepicker para fecha_inicio
    $('#fecha_inicio').datepicker({
        format: 'dd-mm-yyyy',
        startDate: today,
        autoclose: true,
        todayHighlight: true,
    }).on('changeDate', function(e) {
        var selectedDate = new Date(e.date.valueOf());
        selectedDate.setHours(0, 0, 0, 0); // Set time to 00:00:00
        $('#fecha_fin').datepicker('setStartDate', selectedDate);
        $('#fecha_inicio').valid(); // Forzar la validación cuando se selecciona una fecha
    });

    // Configurar el datepicker para fecha_fin
    $('#fecha_fin').datepicker({
        format: 'dd-mm-yyyy',
        startDate: today,
        autoclose: true,
        todayHighlight: true,
    }).on('changeDate', function() {
        $('#fecha_fin').valid(); // Forzar la validación cuando se selecciona una fecha
    });

    // Método personalizado para validar que la fecha sea posterior a hoy
    $.validator.addMethod('greaterThanToday', function(value, element) {
        var selectedDate = new Date(value.split('-').reverse().join('-'));
        return selectedDate >= today;
    }, 'La fecha de inicio debe ser posterior a la fecha actual');

    // Método personalizado para validar que fecha_fin sea mayor que fecha_inicio
    $.validator.addMethod('greaterThan', function(value, element, param) {
        var startDate = new Date($(param).val().split('-').reverse().join('-'));
        var endDate = new Date(value.split('-').reverse().join('-'));
        return endDate > startDate;
    }, 'La fecha de fin debe ser posterior a la fecha de inicio');

    // Método personalizado para validar que la cantidad no exceda el stock
    $.validator.addMethod('validarStock', function(value, element) {
        var cantidad = parseInt(value);        
        var stockDisponible = parseInt($('#stock_disponible').val());  // Obtener el valor del stock del producto       
        return cantidad <= stockDisponible;
    }, 'La cantidad solicitada excede el stock disponible.');


    $('#formulario_ficha').validate({
        rules: {
            'fecha_inicio': {
                required: true,
                date: true,
                greaterThanToday: true,
            },
            'fecha_fin': {
                required: true,
                date: true,
                greaterThan: '#fecha_inicio',
            },
            'cantidad': {
                required: true,
                digits: true,
                validarStock: true  // Usar el método de validación personalizado para el stock
            }
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
            'cantidad': {
                required: 'Por favor, ingresa la cantidad',
                digits: 'Ingresa un número entero válido',
                validarStock: 'La cantidad solicitada excede el stock disponible.'
            }
        },
        errorPlacement: function(error, element) {
            error.insertAfter(element); // Inserta el mensaje de error después del elemento
            error.addClass('error-message'); // Aplica una clase al mensaje de error
        },
    });

    $('#comprar-ahora').click(function() {
        $('#accion').val('comprar-ahora');
        $('#formulario_ficha').submit();
    });

    $('#agregar-al-carrito').click(function() {
        $('#accion').val('agregar-al-carrito');
        $('#formulario_ficha').submit();
    });
});
