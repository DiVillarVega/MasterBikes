
// index funcion ready
$(document).ready(function() {



  // index consumo API "http://fakestoreapi.com/products"
  $.get("http://fakestoreapi.com/products", function(data) {
      // Limpiar fila de ropa

      // index $each para recorrer los registros con la ropa
      $.each(data, function(i, item) {
          // Crear string con HTML de un "card de bootstrap" para formatear ropa

          

          // Agregar string con el card a fila de ropa
          var card = `
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 text-center">
              <div class="card mb-4 box-shadow" style="padding: 30px;">
                <div class="text-center">
                  <img class="card-img-top thumbnail-product" src="${item.image}" alt="">
                  <div class="card-body">
                    <h5 class="card-title">
                        ${item.title}
                    </h5>
                    <h6>
                        ${item.category}
                    </h6>
                    <p class="card-text">
                        ${item.description}
                    </p>
                    <a class="btn btn-primary" target="_blank"
                        href="https://www.amazon.com/s?k=${item.title}">
                        Buscar en Amazon
                    </a>
                  </div>
                </div>                    
                

              </div>
            </div>
          `;

          $('#fila-ropa').append(card);
      // FIN $each
      });
  // FIN consumo API
  });
// FIN funcion ready
});