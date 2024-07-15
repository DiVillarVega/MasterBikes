import sqlite3
from django.contrib.auth.models import User, Permission
from django.db import connection
from datetime import date, timedelta
from random import randint
from core.models import Categoria, Producto, Carrito, Perfil, Talla, Boleta, DetalleBoleta, Bodega

def eliminar_tabla(nombre_tabla):
    conexion = sqlite3.connect('db.sqlite3')
    cursor = conexion.cursor()
    cursor.execute(f"DELETE FROM {nombre_tabla}")
    conexion.commit()
    conexion.close()

def exec_sql(query):
    with connection.cursor() as cursor:
        cursor.execute(query)

def crear_usuario(username, tipo, nombre, apellido, correo, es_superusuario, 
    es_staff, rut, direccion, subscrito, imagen):

    try:
        print(f'Verificar si existe usuario {username}.')

        if User.objects.filter(username=username).exists():
            print(f'   Eliminar {username}')
            User.objects.get(username=username).delete()
            print(f'   Eliminado {username}')
        
        print(f'Iniciando creación de usuario {username}.')

        usuario = None
        if tipo == 'Superusuario':
            print('    Crear Superuser')
            usuario = User.objects.create_superuser(username=username, password='123')
        else:
            print('    Crear User')
            usuario = User.objects.create_user(username=username, password='123')

        if tipo == 'Administrador':
            print('    Es administrador')
            usuario.is_staff = es_staff
            
        usuario.first_name = nombre
        usuario.last_name = apellido
        usuario.email = correo
        usuario.save()

        if tipo == 'Administrador':
            print(f'    Dar permisos a core y apirest')
            permisos = Permission.objects.filter(content_type__app_label__in=['core', 'apirest'])
            usuario.user_permissions.set(permisos)
            usuario.save()
 
        print(f'    Crear perfil: RUT {rut}, Subscrito {subscrito}, Imagen {imagen}')
        Perfil.objects.create(
            usuario=usuario, 
            tipo_usuario=tipo,
            rut=rut,
            direccion=direccion,
            subscrito=subscrito,
            imagen=imagen)
        print("    Creado correctamente")
    except Exception as err:
        print(f"    Error: {err}")

def eliminar_tablas():
    eliminar_tabla('auth_user_groups')
    eliminar_tabla('auth_user_user_permissions')
    eliminar_tabla('auth_group_permissions')
    eliminar_tabla('auth_group')
    eliminar_tabla('auth_permission')
    eliminar_tabla('django_admin_log')
    eliminar_tabla('django_content_type')
    #eliminar_tabla('django_migrations')
    eliminar_tabla('django_session')
    eliminar_tabla('Bodega')
    eliminar_tabla('DetalleBoleta')
    eliminar_tabla('Boleta')
    eliminar_tabla('Perfil')
    eliminar_tabla('Carrito')
    eliminar_tabla('Producto')
    eliminar_tabla('Categoria')
    eliminar_tabla('Talla')
    #eliminar_tabla('authtoken_token')
    eliminar_tabla('auth_user')

def poblar_bd(test_user_email=''):
    eliminar_tablas()

    crear_usuario(
        username='cevans',
        tipo='Cliente', 
        nombre='Chris', 
        apellido='Evans', 
        correo=test_user_email if test_user_email else 'cevans@marvel.com', 
        es_superusuario=False, 
        es_staff=False, 
        rut='25.747.200-0',	
        direccion='123 Main Street, Los Angeles, \nCalifornia 90001 \nEstados Unidos', 
        subscrito=True, 
        imagen='perfiles/cevans.jpg')

    crear_usuario(
        username='eolsen',
        tipo='Cliente', 
        nombre='Elizabeth', 
        apellido='Olsen', 
        correo=test_user_email if test_user_email else 'eolsen@marvel.com', 
        es_superusuario=False, 
        es_staff=False, 
        rut='12.202.357-5', 
        direccion='Albert Street, New York, \nNew York 10001 \nEstados Unidos', 
        subscrito=True, 
        imagen='perfiles/eolsen.jpg')

    crear_usuario(
        username='tholland',
        tipo='Cliente', 
        nombre='Tom', 
        apellido='Holland', 
        correo=test_user_email if test_user_email else 'tholland@marvel.com', 
        es_superusuario=False, 
        es_staff=False, 
        rut='11.991.600-3', 
        direccion='105 Apple Park Way, \nCupertino, CA 95014 \nEstados Unidos', 
        subscrito=False, 
        imagen='perfiles/tholland.jpg')

    crear_usuario(
        username='sjohansson',
        tipo='Cliente', 
        nombre='Scarlett', 
        apellido='Johansson', 
        correo=test_user_email if test_user_email else 'sjohansson@marvel.com', 
        es_superusuario=False, 
        es_staff=False, 
        rut='16.469.725-8', 
        direccion='350 5th Ave, \nNew York, NY 10118 \nEstados Unidos', 
        subscrito=False, 
        imagen='perfiles/sjohansson.jpg')

    crear_usuario(
        username='cpratt',
        tipo='Administrador', 
        nombre='Chris', 
        apellido='Pratt', 
        correo=test_user_email if test_user_email else 'cpratt@marvel.com', 
        es_superusuario=False, 
        es_staff=True, 
        rut='19.441.980-5', 
        direccion='10 Pine Road, Miami, \nFlorida 33101 \nEstados Unidos', 
        subscrito=False, 
        imagen='perfiles/cpratt.jpg')
    
    crear_usuario(
        username='mruffalo',
        tipo='Administrador', 
        nombre='Mark', 
        apellido='Ruffalo', 
        correo=test_user_email if test_user_email else 'mruffalo@marvel.com', 
        es_superusuario=False, 
        es_staff=True, 
        rut='21.708.052-5', 
        direccion='1600 Pennsylvania Avenue NW, \nWashington, D.C. \nEstados Unidos', 
        subscrito=False, 
        imagen='perfiles/mruffalo.jpg')

    crear_usuario(
        username='super',
        tipo='Superusuario',
        nombre='Robert',
        apellido='Downey Jr.',
        correo=test_user_email if test_user_email else 'rdowneyjr@marvel.com',
        es_superusuario=True,
        es_staff=True,
        rut='13.029.317-4',
        direccion='15 Oak Street, Los Angeles, \nCalifornia 90001 \nEstados Unidos',
        subscrito=False,
        imagen='perfiles/rdowneyjr.jpg')
    
    categorias_data = [
        { 'id': 1, 'nombre': 'MTB'},
        { 'id': 2, 'nombre': 'Ruta'},
        { 'id': 3, 'nombre': 'Urbana'},
        { 'id': 4, 'nombre': 'BMX'},
        { 'id': 5, 'nombre': 'Infantil'},
    ]

    tallas_data = [
        { 'id': 1, 'nombre': 'S'},
        { 'id': 2, 'nombre': 'M'},
        { 'id': 3, 'nombre': 'L'},
        { 'id': 4, 'nombre': 'XL'},
    ]

    print('Crear categorías')
    for categoria in categorias_data:
        Categoria.objects.create(**categoria)
    print('Categorías creadas correctamente')

    print('Crear tallas')
    for talla in tallas_data:
        Talla.objects.create(**talla)
    print('Tallas creadas correctamente')

    productos_data = [
        # Categoría "MTB" (8 juegos)
        {
            'id': 1,
            'categoria': Categoria.objects.get(id=1),
            'talla': Talla.objects.get(id=1),
            'nombre': 'BICICLETA RALEIGH AGILE NARANJA',
            'descripcion': 'Bicicleta con marco de aluminio, discos mecánicos delantero y trasero, horquilla con suspensión.',
            'precio': 10000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 15,
            'imagen': 'productos/mtb1.jpg'
        },
        {
            'id': 2,
            'categoria': Categoria.objects.get(id=1),
            'talla': Talla.objects.get(id=2),
            'nombre': 'BICICLETA BEST OTIS',
            'descripcion': 'Bicicleta marco de aluminio, discos mecanicos.',
            'precio': 10000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 10,
            'imagen': 'productos/mtb2.jpg'
        },
        {
            'id': 3,
            'categoria': Categoria.objects.get(id=1),
            'talla': Talla.objects.get(id=3),
            'nombre': 'BICICLETA VISION KRYPTON',
            'descripcion': 'Marco MTB Aluminio, Frenos Disco Mecánico.',
            'precio': 9000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 0,
            'imagen': 'productos/mtb3.jpg'
        },
        {
            'id': 4,
            'categoria': Categoria.objects.get(id=1),
            'talla': Talla.objects.get(id=4),
            'nombre': 'BICICLETA BEST CYGNUS',
            'descripcion': 'Marco de aluminio y frenos de disco mecánicos.',
            'precio': 10500,
            'descuento_subscriptor': 5,
            'descuento_oferta': 5,
            'imagen': 'productos/mtb4.jpg'
        },
        {
            'id': 5,
            'categoria': Categoria.objects.get(id=1),
            'talla': Talla.objects.get(id=1),
            'nombre': 'BICICLETA UPLAND X90-650B BLANCO',
            'descripcion': 'Doble disco mecánico, cambios Shimano, marco light de aluminio.',
            'precio': 12000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 20,
            'imagen': 'productos/mtb5.jpg'
        },
        {
            'id': 6,
            'categoria': Categoria.objects.get(id=1),
            'talla': Talla.objects.get(id=2),
            'nombre': 'BICICLETA RALEIGH HONOR NEGRO/VERDE',
            'descripcion': 'Marco de aluminio, discos hidráulicos, suspensión delantera.',
            'precio': 14000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 10,
            'imagen': 'productos/mtb6.jpg'
        },
        {
            'id': 7,
            'categoria': Categoria.objects.get(id=1),
            'talla': Talla.objects.get(id=3),
            'nombre': 'BICICLETA RANSOM 920 2022',
            'descripcion': 'La 920 viene equipada con la horquilla FOX 38, nuestro sistema de suspensión TwinLoc.',
            'precio': 50000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 0,
            'imagen': 'productos/mtb7.jpg'
        },
        {
            'id': 8,
            'categoria': Categoria.objects.get(id=1),
            'talla': Talla.objects.get(id=4),
            'nombre': 'BICICLETA BEST STORK SUSPENSION',
            'descripcion': 'Marco de acero, horquilla con suspensión delantera, cambios Shimano.',
            'precio': 10000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 15,
            'imagen': 'productos/mtb8.jpg'
        },
        # Categoría "Ruta" (4 juegos)
        {
            'id': 9,
            'categoria': Categoria.objects.get(id=2),
            'talla': Talla.objects.get(id=1),
            'nombre': 'BICICLETA RALEIGH VULTURE',
            'descripcion': 'Marco de aluminio, sin suspensión , cambios Shimano.',
            'precio': 12000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 0,
            'imagen': 'productos/ruta1.jpg'
        },
        {
            'id': 10,
            'categoria': Categoria.objects.get(id=2),
            'talla': Talla.objects.get(id=2),
            'nombre': 'BICICLETA MERIDA SCULTURA',
            'descripcion': 'Bicicleta con marco de aluminio, cambios Shimano.',
            'precio': 25000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 20,
            'imagen': 'productos/ruta2.jpg'
        },
        {
            'id': 11,
            'categoria': Categoria.objects.get(id=2),
            'talla': Talla.objects.get(id=3),
            'nombre': 'BICICLETA RUTA BEST LARK T:S',
            'descripcion': 'BICICLETA BEST RUTA 700" LARK T:S o 50 geometría baja 2022',
            'precio': 17000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 10,
            'imagen': 'productos/ruta3.jpg'
        },
        {
            'id': 12,
            'categoria': Categoria.objects.get(id=2),
            'talla': Talla.objects.get(id=4),
            'nombre': 'BICICLETA BEST GARZA',
            'descripcion': 'Una buena bicicleta se caracteriza por su resistencia y fabricación con los materiales de la más alta calidad.',
            'precio': 12000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 15,
            'imagen': 'productos/ruta4.jpg'
        },
        # Categoría "Urbana" (4 juegos)
        {
            'id': 13,
            'categoria': Categoria.objects.get(id=3),
            'talla': Talla.objects.get(id=1),
            'nombre': 'BICICLETA MERIDA CROSSWAY',
            'descripcion': 'Bicicleta confiable para la ciudad, con marco de acero al igual que su horquilla.',
            'precio': 12000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 5,
            'imagen': 'productos/urb1.jpg'
        },
        {
            'id': 14,
            'categoria': Categoria.objects.get(id=3),
            'talla': Talla.objects.get(id=2),
            'nombre': 'BICICLETA RALEIGH GIAN',
            'descripcion': 'Diseñada para aventuras inigualables, marco de aluminio y piñon fijo.',
            'precio': 10000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 15,
            'imagen': 'productos/urb2.jpg'
        },
        {
            'id': 15,
            'categoria': Categoria.objects.get(id=3),
            'talla': Talla.objects.get(id=3),
            'nombre': 'BICICLETA UPLAND EMILY 700 GRIS',
            'descripcion': 'Marco de aluminio, cambios Shimano.',
            'precio': 14000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 0,
            'imagen': 'productos/urb3.jpg'
        },
        {
            'id': 16,
            'categoria': Categoria.objects.get(id=3),
            'talla': Talla.objects.get(id=4),
            'nombre': 'Bicicleta Artemisa',
            'descripcion': 'Marco de acero al igual que su horquilla, con ejes de aluminio.',
            'precio': 14000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 10,
            'imagen': 'productos/urb4.jpg'
        },
        # Categoría "BMX" (4 juegos)
        {
            'id': 17,
            'categoria': Categoria.objects.get(id=4),
            'talla': Talla.objects.get(id=1),
            'nombre': 'BICICLETA BMX HUFFY REVOLT',
            'descripcion': 'Bicicleta perfecta para iniciar en el mundo de las acrobacias.',
            'precio': 10000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 10,
            'imagen': 'productos/bmx1.jpg'
        },
        {
            'id': 18,
            'categoria': Categoria.objects.get(id=4),
            'talla': Talla.objects.get(id=2),
            'nombre': 'BICICLETA BMX KINK CURB',
            'descripcion': 'Diseñada para ciclistas principiantes que buscan una experiencia de calidad profesional',
            'precio': 15000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 5,
            'imagen': 'productos/bmx2.jpg'
        },
        {
            'id': 19,
            'categoria': Categoria.objects.get(id=4),
            'talla': Talla.objects.get(id=3),
            'nombre': 'BICICLETA BMX SUNDAY PRIMER',
            'descripcion': 'Construido alrededor de una geometría de nivel profesional en una amplia gama de tamaños de tubos superiores.',
            'precio': 17000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 15,
            'imagen': 'productos/bmx3.jpg'
        },
        {
            'id': 20,
            'categoria': Categoria.objects.get(id=4),
            'talla': Talla.objects.get(id=4),
            'nombre': 'BICICLETA BMX WTP CRYSIS',
            'descripcion': 'Su construcción excepcional desata la envidia de la competencia, ya que supera a la mayoría de los modelos en el mercado de piezas de recambios.',
            'precio': 20000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 0,
            'imagen': 'productos/bmx4.jpg'
        }
    ]

    print('Crear productos')
    for producto in productos_data:
        Producto.objects.create(**producto)
    print('Productos creados correctamente')

    print('Crear carritos')
    for rut in ['25.747.200-0', '11.991.600-3']:
        cliente = Perfil.objects.get(rut=rut)
        for cantidad_productos in range(1, 11):
            producto = Producto.objects.get(pk=randint(1, 10))
            if cliente.subscrito:
                descuento_subscriptor = producto.descuento_subscriptor
            else:
                descuento_subscriptor = 0
            descuento_oferta = producto.descuento_oferta
            descuento_total = descuento_subscriptor + descuento_oferta
            descuentos = int(round(producto.precio * descuento_total / 100))
            precio_a_pagar = producto.precio - descuentos
            Carrito.objects.create(
                cliente=cliente,
                producto=producto,
                precio=producto.precio,
                descuento_subscriptor=descuento_subscriptor,
                descuento_oferta=descuento_oferta,
                descuento_total=descuento_total,
                descuentos=descuentos,
                precio_a_pagar=precio_a_pagar
            )
    print('Carritos creados correctamente')

    print('Crear boletas')
    nro_boleta = 0
    perfiles_cliente = Perfil.objects.filter(tipo_usuario='Cliente')
    for cliente in perfiles_cliente:
        estado_index = -1
        for cant_boletas in range(1, randint(6, 21)):
            nro_boleta += 1
            estado_index += 1
            if estado_index > 3:
                estado_index = 0
            estado = Boleta.ESTADO_CHOICES[estado_index][1]
            fecha_venta = date(2023, randint(1, 5), randint(1, 28))
            fecha_despacho = fecha_venta + timedelta(days=randint(0, 3))
            fecha_entrega = fecha_despacho + timedelta(days=randint(0, 3))
            if estado == 'Anulado':
                fecha_despacho = None
                fecha_entrega = None
            elif estado == 'Vendido':
                fecha_despacho = None
                fecha_entrega = None
            elif estado == 'Despachado':
                fecha_entrega = None
            boleta = Boleta.objects.create(
                nro_boleta=nro_boleta, 
                cliente=cliente,
                monto_sin_iva=0,
                iva=0,
                total_a_pagar=0,
                fecha_venta=fecha_venta,
                fecha_despacho=fecha_despacho,
                fecha_entrega=fecha_entrega,
                estado=estado)
            detalle_boleta = []
            total_a_pagar = 0
            for cant_productos in range(1, randint(4, 6)):
                producto_id = randint(1, 10)
                producto = Producto.objects.get(id=producto_id)
                precio = producto.precio
                descuento_subscriptor = 0
                if cliente.subscrito:
                    descuento_subscriptor = producto.descuento_subscriptor
                descuento_oferta = producto.descuento_oferta
                descuento_total = descuento_subscriptor + descuento_oferta
                descuentos = int(round(precio * descuento_total / 100))
                precio_a_pagar = precio - descuentos
                bodega = Bodega.objects.create(producto=producto)
                DetalleBoleta.objects.create(
                    boleta=boleta,
                    bodega=bodega,
                    precio=precio,
                    descuento_subscriptor=descuento_subscriptor,
                    descuento_oferta=descuento_oferta,
                    descuento_total=descuento_total,
                    descuentos=descuentos,
                    precio_a_pagar=precio_a_pagar)
                total_a_pagar += precio_a_pagar
            monto_sin_iva = int(round(total_a_pagar / 1.19))
            iva = total_a_pagar - monto_sin_iva
            boleta.monto_sin_iva = monto_sin_iva
            boleta.iva = iva
            boleta.total_a_pagar = total_a_pagar
            boleta.fecha_venta = fecha_venta
            boleta.fecha_despacho = fecha_despacho
            boleta.fecha_entrega = fecha_entrega
            boleta.estado = estado
            boleta.save()
            print(f'    Creada boleta Nro={nro_boleta} Cliente={cliente.usuario.first_name} {cliente.usuario.last_name}')
    print('Boletas creadas correctamente')

    print('Agregar productos a bodega')
    for producto_id in range(1, 11):
        producto = Producto.objects.get(id=producto_id)
        cantidad = 0
        for cantidad in range(1, randint(2, 31)):
            Bodega.objects.create(producto=producto)
        print(f'    Agregados {cantidad} "{producto.nombre}" a la bodega')
    print('Productos agregados a bodega')

