const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonMascota = document.getElementById('boton-mascota');
const botonReiniciar = document.getElementById('boton-reiniciar');
const sectionSeleccionarMascota = document.getElementById(
  'seleccionar-mascota'
);
const spanMascotaJugador = document.getElementById('mascota-jugador');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');
const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');
const contendorTarjetas = document.getElementById('contendorTarjetas');
const contenedorAtaques = document.getElementById('contenedorAtaques');
const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');

let mokepones = [];
let mokeponesEnemigos = [];
let botones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let opcionDePokemones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
let mascotaJugadorObjeto;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonFuego;
let botonAgua;
let botonTierra;
let intervalo;
let jugadorId = null;
let enemigoId = null;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3;
let vidasEnemigo = 3;
let lienzo = mapa.getContext('2d');
let mapaBackground = new Image();
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 350;

if (anchoDelMapa > anchoMaximoDelMapa) anchoDelMapa = anchoMaximoDelMapa - 20;

mapaBackground.src = './../assets/mokemap.png';
alturaQueBuscamos = (anchoDelMapa * 600) / 800;
mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

class Mokepon {
  ataqueJugador;
  constructor(nombre, foto, vida, fotoMapa, id = null) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 40;
    this.alto = 40;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }
  pintarMokepon() {
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}

let hipodoge = new Mokepon(
  'Hipodoge',
  './assets/mokepons_mokepon_hipodoge_attack.webp',
  5,
  './../assets/hipodoge.webp'
);

let capipepo = new Mokepon(
  'Capipepo',
  './assets/mokepons_mokepon_capipepo_attack.webp',
  5,
  './../assets/capipepo.webp'
);

let ratigueya = new Mokepon(
  'Ratigueya',
  './assets/mokepons_mokepon_ratigueya_attack.webp',
  5,
  './../assets/ratigueya.webp'
);

const HIPODOGE_ATAQUES = [
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '🍀', id: 'boton-tierra' },
];

const CAPIPEGO_ATAQUES = [
  { nombre: '🍀', id: 'boton-tierra' },
  { nombre: '🍀', id: 'boton-tierra' },
  { nombre: '🍀', id: 'boton-tierra' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '🔥', id: 'boton-fuego' },
];

const RATIGUEYA_ATAQUES = [
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '🍀', id: 'boton-tierra' },
];

hipodoge.ataques.push(...HIPODOGE_ATAQUES);
capipepo.ataques.push(...CAPIPEGO_ATAQUES);
ratigueya.ataques.push(...RATIGUEYA_ATAQUES);

// let hipodogeEnemigo = new Mokepon(
//   'Hipodoge',
//   './assets/mokepons_mokepon_hipodoge_attack.webp',
//   5,
//   './../assets/hipodoge.webp'
// );

// let capipepoEnemigo = new Mokepon(
//   'Capipepo',
//   './assets/mokepons_mokepon_capipepo_attack.webp',
//   5,
//   './../assets/capipepo.webp'
// );

// let ratigueyaEnemigo = new Mokepon(
//   'Ratigueya',
//   './assets/mokepons_mokepon_ratigueya_attack.webp',
//   5,
//   './../assets/ratigueya.webp'
// );

// hipodogeEnemigo.ataques.push(
//   { nombre: '💧', id: 'boton-agua' },
//   { nombre: '💧', id: 'boton-agua' },
//   { nombre: '💧', id: 'boton-agua' },
//   { nombre: '🔥', id: 'boton-fuego' },
//   { nombre: '🍀', id: 'boton-tierra' }
// );

// capipepo.ataques.push(
//   { nombre: '🍀', id: 'boton-tierra' },
//   { nombre: '🍀', id: 'boton-tierra' },
//   { nombre: '🍀', id: 'boton-tierra' },
//   { nombre: '💧', id: 'boton-agua' },
//   { nombre: '🔥', id: 'boton-fuego' }
// );

// capipepoEnemigo.ataques.push(
//   { nombre: '🍀', id: 'boton-tierra' },
//   { nombre: '🍀', id: 'boton-tierra' },
//   { nombre: '🍀', id: 'boton-tierra' },
//   { nombre: '💧', id: 'boton-agua' },
//   { nombre: '🔥', id: 'boton-fuego' }
// );

// ratigueya.ataques.push(
//   { nombre: '🔥', id: 'boton-fuego' },
//   { nombre: '🔥', id: 'boton-fuego' },
//   { nombre: '🔥', id: 'boton-fuego' },
//   { nombre: '💧', id: 'boton-agua' },
//   { nombre: '🍀', id: 'boton-tierra' }
// );

// ratigueyaEnemigo.ataques.push(
//   { nombre: '🔥', id: 'boton-fuego' },
//   { nombre: '🔥', id: 'boton-fuego' },
//   { nombre: '🔥', id: 'boton-fuego' },
//   { nombre: '💧', id: 'boton-agua' },
//   { nombre: '🍀', id: 'boton-tierra' }
// );

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = 'none';
  sectionVerMapa.style.display = 'none';
  sectionReiniciar.style.display = 'none';

  mokepones.forEach((mokepon) => {
    opcionDePokemones = `
      <input type="radio" id=${mokepon.nombre} name="mascota" />
      <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
        <img
          src=${mokepon.foto}
          alt=${mokepon.nombre}
        />
      </label>`;
    contendorTarjetas.innerHTML += opcionDePokemones;

    inputHipodoge = document.getElementById('Hipodoge');
    inputCapipepo = document.getElementById('Capipepo');
    inputRatigueya = document.getElementById('Ratigueya');
  });

  botonMascota.addEventListener('click', seleccionarMascotaJugador);
  botonReiniciar.addEventListener('click', reiniciarJuego);
  unirseAlJuego();
}

function unirseAlJuego() {
  fetch('http://mauricio-desktop.local:8080/unirse').then((res) => {
    if (res.ok) {
      res.text().then((respuesta) => {
        // console.log(respuesta);
        jugadorId = respuesta;
      });
    }
  });
}

function seleccionarMokepon(mascotaJugador) {
  fetch(`http://mauricio-desktop.local:8080/mokepon/${jugadorId}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mokepon: mascotaJugador }),
  }).then((res) => {
    if (res.ok) {
      res.text().then((respuesta) => {
        //console.log(respuesta);
      });
    }
  });
}

function seleccionarMascotaJugador() {
  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = inputHipodoge.id;
    mascotaJugador = inputHipodoge.id;
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id;
    mascotaJugador = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id;
    mascotaJugador = inputRatigueya.id;
  } else {
    alert('Selecciona una mascota');
    return;
  }

  sectionSeleccionarMascota.style.display = 'none';

  seleccionarMokepon(mascotaJugador);

  extraerAtaques(mascotaJugador);
  sectionVerMapa.style.display = 'flex';
  iniciarMapa();
}

function extraerAtaques(mascotaJugador) {
  let ataques;
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = `<button class="boton-de-ataque BAtaque" id=${ataque.id}>${ataque.nombre}</button>`;
    contenedorAtaques.innerHTML += ataquesMokepon;
  });
  botonFuego = document.getElementById('boton-fuego');
  botonAgua = document.getElementById('boton-agua');
  botonTierra = document.getElementById('boton-tierra');
  botones = document.querySelectorAll('.BAtaque');
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener('click', (e) => {
      if (e.target.textContent === '🔥') {
        ataqueJugador.push('FUEGO');
        // console.log(ataqueJugador);
        boton.style.background = '#112f58';
        boton.disabled = true;
      } else if (e.target.textContent === '💧') {
        ataqueJugador.push('AGUA');
        console.log(ataqueJugador);
        boton.style.background = '#112f58';
        boton.disabled = true;
      } else {
        ataqueJugador.push('TIERRA');
        // console.log(ataqueJugador);
        boton.style.background = '#112f58';
        boton.disabled = true;
      }
      // ataqueAleatorioEnemigo();
      if (ataqueJugador.length === 5) enviarAtaques();
    });
  });
}

function enviarAtaques() {
  fetch(`http://mauricio-desktop.local:8080/mokepon/${jugadorId}/ataques`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ataques: ataqueJugador,
    }),
  });
  intervalo = setInterval(obtenerAtaques, 50);
}

function obtenerAtaques() {
  fetch(`http://mauricio-desktop.local:8080/mokepon/${enemigoId}/ataques`).then(
    (res) => {
      if (res.ok) {
        res.json().then(({ ataques }) => {
          if (ataques.length === 5) {
            ataqueEnemigo = ataques;
            combate();
          }
        });
      }
    }
  );
}

function seleccionarMascotaEnemigo(enemigo) {
  spanMascotaEnemigo.innerHTML = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;
  secuenciaAtaque();
}

function ataqueAleatorioEnemigo() {
  ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);
  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push('FUEGO');
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push('AGUA');
  } else {
    ataqueEnemigo.push('TIERRA');
  }
  // console.log(ataqueEnemigo);
  iniciarPelea();
}

function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    combate();
  }
}

function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador];
  indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
  clearInterval(intervalo);
  console.log('COMBATE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      indexAmbosOponentes(index, index);
      crearMensaje('EMPATE');
    } else if (
      ataqueJugador[index] == 'FUEGO' &&
      ataqueEnemigo[index] == 'TIERRA'
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje('GANASTE');
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (
      ataqueJugador[index] == 'AGUA' &&
      ataqueEnemigo[index] == 'FUEGO'
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje('GANASTE');
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (
      ataqueJugador[index] == 'TIERRA' &&
      ataqueEnemigo[index] == 'AGUA'
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje('GANASTE');
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else {
      indexAmbosOponentes(index, index);
      crearMensaje('PERDISTE');
      victoriasEnemigo++;
      spanVidasEnemigo.innerHTML = victoriasEnemigo;
    }
  }
  revisarVidas();
}

function revisarVidas() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal('Esto fue un empate!!!');
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal('Felicitaciones, GANASTE!!! :)');
  } else {
    crearMensajeFinal('Lo siento, PERDISTE!!! :(');
  }
}

function crearMensaje(resultado) {
  let nuevoAtaqueDelJugador = document.createElement('p');
  let nuevoAtaqueDelEnemigo = document.createElement('p');

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;

  // botonFuego.disabled = true;
  // botonAgua.disabled = true;
  // botonTierra.disabled = true;

  sectionReiniciar.style.display = 'block';
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function pintarCanvas() {
  mascotaJugadorObjeto.x =
    mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
  mascotaJugadorObjeto.y =
    mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;

  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);

  mascotaJugadorObjeto.pintarMokepon();

  enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);
  mokeponesEnemigos.forEach((mokepon) => {
    if (mokepon != undefined) {
      mokepon.pintarMokepon();
      revisarColision(mokepon);
    }
  });

  // if (
  //   mascotaJugadorObjeto.velocidadX !== 0 ||
  //   mascotaJugadorObjeto.velocidadY !== 0
  // ) {
  //   revisarColision(hipodogeEnemigo);
  //   revisarColision(capipepoEnemigo);
  //   revisarColision(ratigueyaEnemigo);
  // }
}

function enviarPosicion(x, y) {
  fetch(`http://mauricio-desktop.local:8080/mokepon/${jugadorId}/posicion`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ x, y }),
  }).then((res) => {
    if (res.ok) {
      res.json().then(({ enemigos }) => {
        // console.log(enemigos);
        // Recibimos enemigos desde el sever
        /////////////////////////////////////
        mokeponesEnemigos = enemigos.map((enemigo) => {
          let mokeponEnemigo = null;
          if (enemigo.mokepon != undefined) {
            const mokeponNombre = enemigo.mokepon.nombre || '';
            if (mokeponNombre === 'Hipodoge') {
              mokeponEnemigo = new Mokepon(
                'Hipodoge',
                './assets/mokepons_mokepon_hipodoge_attack.webp',
                5,
                './../assets/hipodoge.webp',
                enemigo.id
              );
            } else if (mokeponNombre === 'Capipepo') {
              mokeponEnemigo = new Mokepon(
                'Capipepo',
                './assets/mokepons_mokepon_capipepo_attack.webp',
                5,
                './../assets/capipepo.webp',
                enemigo.id
              );
            } else if (mokeponNombre === 'Ratigueya') {
              mokeponEnemigo = new Mokepon(
                'Ratigueya',
                './assets/mokepons_mokepon_ratigueya_attack.webp',
                5,
                './../assets/ratigueya.webp',
                enemigo.id
              );
            }
            mokeponEnemigo.x = enemigo.x;
            mokeponEnemigo.y = enemigo.y;
            return mokeponEnemigo;
          }
        });
      });
    }
  });
}

function moverDerecha() {
  mascotaJugadorObjeto.velocidadX = 5;
  pintarCanvas();
}

function moverIzquierda() {
  mascotaJugadorObjeto.velocidadX = -5;
  pintarCanvas();
}

function moverAbajo() {
  mascotaJugadorObjeto.velocidadY = +5;
  pintarCanvas();
}

function moverArriba() {
  mascotaJugadorObjeto.velocidadY = -5;
  pintarCanvas();
}

function detenerMovimiento() {
  mascotaJugadorObjeto.velocidadX = 0;
  mascotaJugadorObjeto.velocidadY = 0;
}

function sePresionoUnaTecla(event) {
  switch (event.key) {
    case 'ArrowUp':
      moverArriba();
      break;
    case 'ArrowDown':
      moverAbajo();
      break;
    case 'ArrowLeft':
      moverIzquierda();
      break;
    case 'ArrowRight':
      moverDerecha();
      break;
    default:
      break;
  }
}

function iniciarMapa() {
  mascotaJugadorObjeto = obtenerObjetoMascota();
  intervalo = setInterval(pintarCanvas, 50);
  window.addEventListener('keydown', sePresionoUnaTecla);
  window.addEventListener('keyup', detenerMovimiento);
}

function obtenerObjetoMascota() {
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      return mokepones[i];
    }
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const derechaEnemigo = enemigo.x + enemigo.ancho;
  const izquierdaEnemigo = enemigo.x;

  const arribaMascota = mascotaJugadorObjeto.y;
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
  const izquierdaMascota = mascotaJugadorObjeto.x;

  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    // no hay colision
    return;
  } else {
    detenerMovimiento();
    clearInterval(intervalo);
    // console.log('seleccionarMascotaEnemigo');
    enemigoId = enemigo.id;
    sectionSeleccionarAtaque.style.display = 'flex';
    sectionVerMapa.style.display = 'none';
    seleccionarMascotaEnemigo(enemigo);
  }
}

window.addEventListener('load', iniciarJuego);
