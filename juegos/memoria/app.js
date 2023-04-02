const cartas = document.querySelectorAll('.carta');
let cartaSeleccionada = null;
let intentosFallidos = 0;

function seleccionarCarta() {
  if (this === cartaSeleccionada) return;

  this.classList.add('seleccionada');

  if (!cartaSeleccionada) {
    cartaSeleccionada = this;
    return;
  }

  if (this.dataset.valor === cartaSeleccionada.dataset.valor) {
    cartaSeleccionada = null;
    if (document.querySelectorAll('.acertada').length === 10) {
      setTimeout(() => {
        alert('¡Ganaste!');
        reiniciarJuego();
      }, 500);
    }
    this.classList.add('acertada');
    cartaSeleccionada.classList.add('acertada');
  } else {
    intentosFallidos++;
    actualizarIntentosFallidos();
    setTimeout(() => {
      this.classList.remove('seleccionada');
      cartaSeleccionada.classList.remove('seleccionada');
      cartaSeleccionada = null;
    }, 500);
  }
}

function reiniciarJuego() {
    intentosFallidos = 0;
    actualizarIntentosFallidos();
    cartaSeleccionada = null;
    cartas.forEach(carta => {
      carta.classList.remove('seleccionada');
      carta.classList.remove('acertada');
    });
    setTimeout(() => {
      barajarCartas();
    }, 500);
  }

function actualizarIntentosFallidos() {
  document.getElementById('intentos-fallidos').textContent = intentosFallidos;
}

function barajarCartas() {
  cartas.forEach(carta => {
    let posicionAleatoria = Math.floor(Math.random() * 20);
    carta.style.order = posicionAleatoria;
  });
}

barajarCartas();

cartas.forEach(carta => {
  carta.addEventListener('click', seleccionarCarta);
});

function actualizarIntentosFallidos() {
  document.getElementById('intentos-fallidos').textContent = intentosFallidos;
}

const btnReiniciar = document.getElementById('btn-reiniciar');
btnReiniciar.addEventListener('click', () => {
  location.reload();
});
