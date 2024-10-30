let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

// Clase base para personajes
class Personaje {
    constructor(nombre, clasePersonaje, imagen) {
        this.nombre = nombre;
        this.clasePersonaje = clasePersonaje;
        this.imagen = imagen;
    }

    atacar() {
        return `${this.nombre} ataca con su habilidad especial de ${this.clasePersonaje}.`;
    }
}

// Clases específicas de personajes
class Guerrero extends Personaje {
    constructor(nombre, imagen) {
        super(nombre, "Guerrero", imagen);
    }

    atacar() {
        return `${this.nombre} lanza un poderoso golpe con su espada.`;
    }
}

class Mago extends Personaje {
    constructor(nombre, imagen) {
        super(nombre, "Mago", imagen);
    }

    atacar() {
        return `${this.nombre} lanza un hechizo de fuego.`;
    }
}

class Arquero extends Personaje {
    constructor(nombre, imagen) {
        super(nombre, "Arquero", imagen);
    }

    atacar() {
        return `${this.nombre} dispara una flecha certera desde la distancia.`;
    }
}

// Arreglo para almacenar personajes
let avatares = [];

// Crear instancias de personajes
let zuko = new Guerrero("Zuko", './assets/Zuko.png');
let katara = new Mago("Katara", './assets/Katara.png');
let aang = new Arquero("Aang", './assets/Aang.png');
let toph = new Guerrero("Toph", './assets/Toph.png');

// Agregar personajes al arreglo
avatares.push(zuko, katara, aang, toph);

// Variables para el juego
let personajeJugador;
let personajeEnemigo;

function iniciarJuego() {
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'none';
    let botonPersonajeJugador = document.getElementById('boton-personaje');
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador);
    let sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = "none";

    document.getElementById("reglas-del-juego").style.display = "none";
    document.getElementById('boton-reglas').addEventListener('click', mostrarReglas);
    document.getElementById('boton-jugar').style.display = 'none';
    document.getElementById('seleccionar-personaje').style.display = 'block';

    let botonPunio = document.getElementById('boton-punio');
    botonPunio.addEventListener('click', ataquePunio);
    let botonPatada = document.getElementById('boton-patada');
    botonPatada.addEventListener('click', ataquePatada);
    let botonBarrida = document.getElementById('boton-barrida');
    botonBarrida.addEventListener('click', ataqueBarrida);

    let botonReiniciar = document.getElementById('boton-reiniciar');
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function mostrarReglas() {
    document.getElementById("reglas-del-juego").style.display = "block";
    document.getElementById('boton-jugar').style.display = 'block';
    document.getElementById('boton-reglas').style.display = 'none';
    document.getElementById('seleccionar-personaje').style.display = 'none';
    document.getElementById('boton-jugar').addEventListener('click', seleccionarPersonajeJugador);
}

function seleccionarPersonajeJugador() {
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'block';
    document.getElementById('boton-reglas').style.display = 'none';
    let sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje');
    sectionSeleccionarPersonaje.style.display = 'none';

    let spanPersonajeJugador = document.getElementById('personaje-jugador');

    // Aquí podrías agregar un selector para elegir el personaje
    // Supongamos que seleccionamos a Zuko como ejemplo
    personajeJugador = zuko; // Esta selección podría ser dinámica
    spanPersonajeJugador.innerHTML = personajeJugador.nombre;

    seleccionarPersonajeEnemigo();
}

function seleccionarPersonajeEnemigo() {
    let personajeAleatorio = aleatorio(0, avatares.length - 1);
    let spanPersonajeEnemigo = document.getElementById('personaje-enemigo');

    personajeEnemigo = avatares[personajeAleatorio];
    spanPersonajeEnemigo.innerHTML = personajeEnemigo.nombre;
}

function ataquePunio() {
    ataqueJugador = 'Punio';
    ataqueAleatorioEnemigo();
}

function ataquePatada() {
    ataqueJugador = 'Patada';
    ataqueAleatorioEnemigo();
}

function ataqueBarrida() {
    ataqueJugador = 'Barrida';
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3);
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'Punio';
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'Patada';
    } else {
        ataqueEnemigo = 'Barrida';
    }
    combate();
}

function combate() {
    let spanVidasJugador = document.getElementById('vidas-jugador');
    let spanVidasEnemigo = document.getElementById('vidas-enemigo');

    if (ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE");
    } else if (ataqueJugador == 'Punio' && ataqueEnemigo == 'Barrida') {
        crearMensaje("GANASTE");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == 'Patada' && ataqueEnemigo == 'Punio') {
        crearMensaje("GANASTE");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == 'Barrida' && ataqueEnemigo == 'Patada') {
        crearMensaje("GANASTE");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        crearMensaje("PERDISTE");
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    }
    revisarVidas();
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("FELICITACIONES!!! HAS GANADO 🤩🥳🎉");
    } else if (vidasJugador == 0) {
        crearMensajeFinal("QUE PENA, HAS PERDIDO 😢😭😭😭");
    }
}

function crearMensajeFinal(resultado) {
    let sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = "block";

    let sectionMensaje = document.getElementById('mensajes');
    let parrafo = document.createElement('p');

    parrafo.innerHTML = resultado;

    sectionMensaje.appendChild(parrafo);
    document.getElementById('boton-punio').disabled = true;
    document.getElementById('boton-patada').disabled = true;
    document.getElementById('boton-barrida').disabled = true;
}

function crearMensaje(resultado) {
    let sectionMensaje = document.getElementById('mensajes');
    let parrafo = document.createElement('p');

    parrafo.innerHTML = `${personajeJugador.nombre} atacó con ${ataqueJugador}, el personaje del enemigo (${personajeEnemigo.nombre}) atacó con ${ataqueEnemigo} ${resultado}`;

    sectionMensaje.appendChild(parrafo);
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego);
