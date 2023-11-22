window.onload = () => {
  console.log("pagina cargada");

  const svg = document.getElementById("pong");
  const ancho = svg.getAttribute("width");
  const alto = svg.getAttribute("height");

  const anchoPaleta = 10;
  const altoPaleta = 80;
  const radioBola = 10;
  const velocidadPaleta = 5;
  let velocidadBola = 5;

  let jugador1Y = (alto - altoPaleta) / 2;
  let jugador2Y = (alto - altoPaleta) / 2;
  let bolaX = ancho / 2;
  let bolaY = alto / 2;
  let velocidadBolaX = velocidadBola;
  let velocidadBolaY = velocidadBola;
  var punP1 = document.getElementById("pun1");
  var punP2 = document.getElementById("pun2");
  var puntos1=0;
  var puntos2=0;

  function actualizarJuego() {
    // Limpiar el área del juego
    svg.innerHTML = "";

    // Actualizar la posición de la bola
    bolaX += velocidadBolaX;
    bolaY += velocidadBolaY;

    // Comprobar colisiones con las paredes superior e inferior
    if (bolaY - radioBola < 0 || bolaY + radioBola > alto) {
      velocidadBolaY = -velocidadBolaY;
    }
    if (jugador1Y - altoPaleta/2 < 0 || jugador2Y + altoPaleta/2 > alto) {
      velocidadBolaY = -velocidadBolaY;
    }

    // Comprobar colisiones con las paletas
    if (
      (bolaX - radioBola < anchoPaleta && bolaY > jugador1Y && bolaY < jugador1Y + altoPaleta) || // Paleta izquierda
      (bolaX + radioBola > ancho - anchoPaleta && bolaY > jugador2Y && bolaY < jugador2Y + altoPaleta) // Paleta derecha
    ) {
      if (bolaY < jugador1Y + altoPaleta / 2 || bolaY > jugador2Y + altoPaleta / 2) {
        // Si la bola toca la parte superior o inferior de la paleta
        velocidadBolaY = -velocidadBolaY;
      }
      if (bolaY < jugador1Y + altoPaleta / 4 || bolaY > jugador2Y + altoPaleta / 4) {
        // Si la bola toca la parte superior o inferior de la paleta
        velocidadBolaY = -velocidadBolaY-3;
      }

      
      velocidadBolaX = -velocidadBolaX;
      velocidadBola += 0.2; // Aumentar la velocidad de la bola después de un rebote en una paleta
    }
    

    // Comprobar si se anotó un punto
    if (bolaX - radioBola < 0) {
      // Jugador 2 anota un punto
      puntos2+=1;
        punP2.textContent = puntos2
      bolaX = ancho / 2;
      bolaY = alto / 2;
      velocidadBolaX = velocidadBola;
      velocidadBolaY = velocidadBola;
      velocidadBola = 5; // Restablecer la velocidad de la bola
    } else if (bolaX + radioBola > ancho) {
      // Jugador 1 anota un punto
      puntos1+=1;
      punP1.textContent = puntos1
      bolaX = ancho / 2;
      bolaY = alto / 2;
      velocidadBolaX = -velocidadBola;
      velocidadBolaY = -velocidadBola;
      velocidadBola = 5; // Restablecer la velocidad de la bola
    }

    // Dibujar las paletas y la bola
    dibujarPaleta(0, jugador1Y);
    dibujarPaleta(ancho - anchoPaleta, jugador2Y);
    dibujarBola(bolaX, bolaY);
  }

  function dibujarPaleta(x, y) {
    const paleta = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    paleta.setAttribute("x", x);
    paleta.setAttribute("y", y);
    paleta.setAttribute("width", anchoPaleta);
    paleta.setAttribute("height", altoPaleta);
    paleta.setAttribute("fill", "white");
    svg.appendChild(paleta);
  }

  function dibujarBola(x, y) {
    const bola = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    bola.setAttribute("cx", x);
    bola.setAttribute("cy", y);
    bola.setAttribute("r", radioBola);
    bola.setAttribute("fill", "white");
    svg.appendChild(bola);
  }

 // Crear un objeto para rastrear las teclas presionadas
const teclasPresionadas = {};

document.addEventListener("keydown", function (evento) {
  teclasPresionadas[evento.key] = true;
});

document.addEventListener("keyup", function (evento) {
  delete teclasPresionadas[evento.key];
});

function actualizarPosicionPaletas() {


  if ("ArrowUp" in teclasPresionadas && jugador2Y > 0) {
    jugador2Y -= velocidadPaleta;
  }

  if ("ArrowDown" in teclasPresionadas && jugador2Y + altoPaleta < alto) {
    jugador2Y += velocidadPaleta;
  }

  if ("w" in teclasPresionadas && jugador1Y > 0) {
    jugador1Y -= velocidadPaleta;
  }

  if ("s" in teclasPresionadas && jugador1Y + altoPaleta < alto) {
    jugador1Y += velocidadPaleta;
  }
}

// Llamar a la función para actualizar las posiciones de las paletas en cada fotograma
function animar() {
  actualizarPosicionPaletas();
  // Resto de tu código de animación aquí
  requestAnimationFrame(animar);
}

animar(); // Iniciar la animación

  
  setInterval(actualizarJuego, 1000 / 60);
}



  