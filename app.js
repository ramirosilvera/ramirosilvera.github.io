// Lista de páginas web disponibles para cambiar
var paginas = [
    "juegos/memoria/memoria.html",
    "juegos/numeros/numeros.html",

  ];
  
  // Función para cambiar aleatoriamente la página web del iframe
  function cambiarPagina() {
    var iframe = document.getElementById("juego-iframe");
    var paginaAleatoria = paginas[Math.floor(Math.random() * paginas.length)];
    iframe.src = paginaAleatoria;
  }
  
  // Asignar la función al botón
  var boton = document.getElementById("cambiar-pagina");
  boton.addEventListener("click", cambiarPagina);

  // Función para iniciar la página con un juego distinto
function iniciarConJuegoDistinto() {
  var iframe = document.getElementById("juego-iframe");
  var paginaAleatoria = paginas[Math.floor(Math.random() * paginas.length)];
  iframe.src = paginaAleatoria;
}

// Llamar la función para iniciar con un juego distinto al cargar la página
window.addEventListener("load", iniciarConJuegoDistinto);