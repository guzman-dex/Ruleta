//variables globales del juego
let nombreUsuario = '';
let mazoCartas = [];
let cartasJugador = [];
let cartasMaquina = [];
let puntuacionJugador = 0;
let puntuacionMaquina = 0;
let ritoPidoUsado = false;
let ritoPidoCambioUsado = false;
let partidaEnCurso = false;
let cartasReveladas = false;
let modoSeleccionCarta = false;

//elementos del dom
const pantallaInicio = document.getElementById('pantalla-inicio');
const pantallaJuego = document.getElementById('pantalla-juego');
const nombreUsuarioInput = document.getElementById('nombre-usuario');
const btnComenzar = document.getElementById('btn-comenzar');
const btnInstrucciones = document.getElementById('btn-instrucciones');
const modalInstrucciones = document.getElementById('modal-instrucciones');
const cerrarModal = document.getElementById('cerrar-modal');
const nombreJugadorDisplay = document.getElementById('nombre-jugador-display');
const nombreJugadorArea = document.getElementById('nombre-jugador-area');
const cartasJugadorDiv = document.getElementById('cartas-jugador');
const cartasMaquinaDiv = document.getElementById('cartas-maquina');
const puntuacionJugadorSpan = document.getElementById('puntuacion-jugador');
const puntuacionMaquinaSpan = document.getElementById('puntuacion-maquina');
const mensajeActual = document.getElementById('mensaje-actual');
const btnPido = document.getElementById('btn-pido');
const btnPidoCambio = document.getElementById('btn-pido-cambio');
const btnDejo = document.getElementById('btn-dejo');
const btnBajo = document.getElementById('btn-bajo');
const areaResultado = document.getElementById('area-resultado');
const resultadoTexto = document.getElementById('resultado-texto');
const cartasReveladasDiv = document.getElementById('cartas-reveladas');
const btnNuevaPartida = document.getElementById('btn-nueva-partida');

//inicializacion del juego
document.addEventListener('DOMContentLoaded', function() {
    inicializarJuego();
    configurarEventos();
});

//funcion de inicializacion
function inicializarJuego() {
    crearMazo();
    console.log('juego inicializado correctamente');
}

//funcion para crear el mazo de cartas
function crearMazo() {
    const palos = ['corazon', 'diamante', 'pikas', 'trebol'];
    const valores = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    
    mazoCartas = [];
    
    //agregar cartas numericas
    for (let palo of palos) {
        for (let valor of valores) {
            mazoCartas.push({
                valor: valor,
                palo: palo,
                nombreArchivo: `${valor}_${palo}.png`,
                valorNumerico: obtenerValorNumerico(valor)
            });
        }
    }
    
    //agregar reyes de corazon
    mazoCartas.push({
        valor: 'j',
        palo: 'corazon',
        nombreArchivo: 'jcorazon.png',
        valorNumerico: 10
    });
    
    mazoCartas.push({
        valor: 'q',
        palo: 'corazon',
        nombreArchivo: 'qcorazon.png',
        valorNumerico: 10
    });
    
    mazoCartas.push({
        valor: 'k',
        palo: 'corazon',
        nombreArchivo: 'kcorazon.png',
        valorNumerico: 10
    });
    
    //agregar reyes de diamante
    mazoCartas.push({
        valor: 'j',
        palo: 'diamante',
        nombreArchivo: 'jdiamante.png',
        valorNumerico: 10
    });
    
    mazoCartas.push({
        valor: 'q',
        palo: 'diamante',
        nombreArchivo: 'qdiamante.png',
        valorNumerico: 10
    });
    
    mazoCartas.push({
        valor: 'k',
        palo: 'diamante',
        nombreArchivo: 'kdiamante.png',
        valorNumerico: 10
    });
    
    //agregar reyes de pikas
    mazoCartas.push({
        valor: 'j',
        palo: 'pikas',
        nombreArchivo: 'jpikas.png',
        valorNumerico: 10
    });
    
    mazoCartas.push({
        valor: 'q',
        palo: 'pikas',
        nombreArchivo: 'qpikas.png',
        valorNumerico: 10
    });
    
    mazoCartas.push({
        valor: 'k',
        palo: 'pikas',
        nombreArchivo: 'kpikas.png',
        valorNumerico: 10
    });
    
    //agregar reyes de trebol
    mazoCartas.push({
        valor: 'j',
        palo: 'trebol',
        nombreArchivo: 'jtrebol.png',
        valorNumerico: 10
    });
    
    mazoCartas.push({
        valor: 'q',
        palo: 'trebol',
        nombreArchivo: 'qtrebol.png',
        valorNumerico: 10
    });
    
    mazoCartas.push({
        valor: 'k',
        palo: 'trebol',
        nombreArchivo: 'ktrebol.png',
        valorNumerico: 10
    });
    
    //mezclar el mazo
    mezclarMazo();
}

//funcion para obtener el valor numerico de una carta
function obtenerValorNumerico(valor) {
    if (valor === 'a') return 11; //as vale 11
    if (['j', 'q', 'k'].includes(valor)) return 10; //reyes valen 10
    return parseInt(valor);
}

//funcion para mezclar el mazo
function mezclarMazo() {
    for (let i = mazoCartas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mazoCartas[i], mazoCartas[j]] = [mazoCartas[j], mazoCartas[i]];
    }
}

//funcion para configurar eventos
function configurarEventos() {
    btnComenzar.addEventListener('click', comenzarJuego);
    btnInstrucciones.addEventListener('click', mostrarModalInstrucciones);
    cerrarModal.addEventListener('click', ocultarModalInstrucciones);
    btnPido.addEventListener('click', usarRitoPido);
    btnPidoCambio.addEventListener('click', usarRitoPidoCambio);
    btnDejo.addEventListener('click', usarRitoDejo);
    btnBajo.addEventListener('click', usarRitoBajo);
    btnNuevaPartida.addEventListener('click', nuevaPartida);
    
    //permitir presionar enter para comenzar
    nombreUsuarioInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            comenzarJuego();
        }
    });
    
    //cerrar modal al hacer clic fuera de el
    window.addEventListener('click', function(e) {
        if (e.target === modalInstrucciones) {
            ocultarModalInstrucciones();
        }
    });
}

//funcion para mostrar modal de instrucciones
function mostrarModalInstrucciones() {
    modalInstrucciones.classList.remove('oculto');
}

//funcion para ocultar modal de instrucciones
function ocultarModalInstrucciones() {
    modalInstrucciones.classList.add('oculto');
}

//funcion para comenzar el juego
function comenzarJuego() {
    const nombre = nombreUsuarioInput.value.trim();
    
    if (nombre === '') {
        alert('por favor, ingresa tu nombre para continuar.');
        return;
    }
    
    nombreUsuario = nombre;
    nombreJugadorDisplay.textContent = nombre;
    nombreJugadorArea.textContent = nombre;
    
    //ocultar pantalla de inicio y mostrar pantalla de juego
    pantallaInicio.classList.add('oculto');
    pantallaJuego.classList.remove('oculto');
    
    //iniciar nueva partida
    iniciarNuevaPartida();
}

//funcion para iniciar una nueva partida
function iniciarNuevaPartida() {
    //resetear variables
    cartasJugador = [];
    cartasMaquina = [];
    puntuacionJugador = 0;
    puntuacionMaquina = 0;
    ritoPidoUsado = false;
    ritoPidoCambioUsado = false;
    partidaEnCurso = true;
    cartasReveladas = false;
    modoSeleccionCarta = false;
    
    //mezclar mazo
    mezclarMazo();
    
    //repartir cartas iniciales
    repartirCartasIniciales();
    
    //mostrar mensaje inicial de kira
    mostrarMensajeKira(obtenerMensajeInicial());
    
    //actualizar interfaz
    actualizarInterfaz();
}

//funcion para repartir cartas iniciales
function repartirCartasIniciales() {
    //repartir 3 cartas al jugador
    for (let i = 0; i < 3; i++) {
        const carta = mazoCartas.pop();
        cartasJugador.push(carta);
        puntuacionJugador += carta.valorNumerico;
    }
    
    //repartir 3 cartas a la maquina
    for (let i = 0; i < 3; i++) {
        const carta = mazoCartas.pop();
        cartasMaquina.push(carta);
        puntuacionMaquina += carta.valorNumerico;
    }
    
    //ajustar puntuacion si se pasa de 21
    ajustarPuntuacion();
}

//funcion para ajustar puntuacion (as vale 1 si se pasa de 21)
function ajustarPuntuacion() {
    //ajustar puntuacion del jugador
    let asesJugador = cartasJugador.filter(c => c.valor === 'a').length;
    while (puntuacionJugador > 21 && asesJugador > 0) {
        puntuacionJugador -= 10; //cambiar as de 11 a 1
        asesJugador--;
    }
    
    //ajustar puntuacion de la maquina
    let asesMaquina = cartasMaquina.filter(c => c.valor === 'a').length;
    while (puntuacionMaquina > 21 && asesMaquina > 0) {
        puntuacionMaquina -= 10; //cambiar as de 11 a 1
        asesMaquina--;
    }
}

//funcion para actualizar la interfaz
function actualizarInterfaz() {
    //mostrar cartas del jugador
    mostrarCartasJugador();
    
    //mostrar puntuaciones
    puntuacionJugadorSpan.textContent = puntuacionJugador;
    puntuacionMaquinaSpan.textContent = cartasReveladas ? puntuacionMaquina : '?';
    
    //actualizar estado de los botones
    actualizarEstadoBotones();
}

//funcion para mostrar las cartas del jugador
function mostrarCartasJugador() {
    cartasJugadorDiv.innerHTML = '';
    
    cartasJugador.forEach((carta, index) => {
        const cartaElement = document.createElement('div');
        cartaElement.className = 'carta-jugador';
        
        //agregar clase para seleccion si estamos en modo seleccion
        if (modoSeleccionCarta) {
            cartaElement.classList.add('carta-seleccionable');
            cartaElement.addEventListener('click', () => seleccionarCartaParaCambiar(index));
        }
        
        //crear imagen de la carta
        const img = document.createElement('img');
        img.src = `cartas/${carta.nombreArchivo}`;
        img.alt = `${carta.valor} de ${carta.palo}`;
        img.onerror = function() {
            //si no se encuentra la imagen, mostrar texto
            this.style.display = 'none';
            cartaElement.innerHTML = `<div style="font-size: 1.5rem; color: #333;">${carta.valor}</div>`;
        };
        
        cartaElement.appendChild(img);
        
        //agregar nombre de la carta
        const nombreCarta = document.createElement('div');
        nombreCarta.className = 'nombre-carta';
        nombreCarta.textContent = `${carta.valor} de ${carta.palo}`;
        cartaElement.appendChild(nombreCarta);
        
        cartasJugadorDiv.appendChild(cartaElement);
    });
}

//funcion para seleccionar carta para cambiar
function seleccionarCartaParaCambiar(indexCarta) {
    if (!modoSeleccionCarta) return;
    
    //obtener la carta nueva del mazo
    const cartaNueva = mazoCartas.pop();
    
    //reemplazar la carta seleccionada
    const cartaVieja = cartasJugador[indexCarta];
    puntuacionJugador -= cartaVieja.valorNumerico;
    
    cartasJugador[indexCarta] = cartaNueva;
    puntuacionJugador += cartaNueva.valorNumerico;
    
    //ajustar puntuacion
    ajustarPuntuacion();
    
    //salir del modo seleccion
    modoSeleccionCarta = false;
    
    //actualizar interfaz
    actualizarInterfaz();
    
    //verificar si se paso de 21
    if (puntuacionJugador > 21) {
        setTimeout(() => {
            finalizarPartida('jugador_pasado');
        }, 1500);
    }
}

//funcion para actualizar el estado de los botones
function actualizarEstadoBotones() {
    //deshabilitar pido si ya se uso o si se uso pido y cambio
    btnPido.disabled = ritoPidoUsado || ritoPidoCambioUsado || !partidaEnCurso;
    
    //deshabilitar pido y cambio si ya se uso o si se uso pido
    btnPidoCambio.disabled = ritoPidoCambioUsado || ritoPidoUsado || !partidaEnCurso;
    
    btnDejo.disabled = !partidaEnCurso;
    btnBajo.disabled = !partidaEnCurso;
}

//funcion para usar el rito "pido"
function usarRitoPido() {
    if (ritoPidoUsado || ritoPidoCambioUsado || !partidaEnCurso) return;
    
    //pedir una carta
    const carta = mazoCartas.pop();
    cartasJugador.push(carta);
    puntuacionJugador += carta.valorNumerico;
    
    //ajustar puntuacion
    ajustarPuntuacion();
    
    //marcar como usado
    ritoPidoUsado = true;
    
    //mostrar mensaje
    mostrarMensajeKira(`"pido"`);
    
    //actualizar interfaz
    actualizarInterfaz();
    
    //verificar si se paso de 21
    if (puntuacionJugador > 21) {
        setTimeout(() => {
            finalizarPartida('jugador_pasado');
        }, 1500);
    }
}

//funcion para usar el rito "pido y cambio"
function usarRitoPidoCambio() {
    if (ritoPidoCambioUsado || ritoPidoUsado || !partidaEnCurso) return;
    
    //mostrar mensaje
    mostrarMensajeKira(`"pido y cambio"`);
    
    //activar modo seleccion de carta
    modoSeleccionCarta = true;
    
    //marcar como usado
    ritoPidoCambioUsado = true;
    
    //actualizar interfaz para mostrar cartas seleccionables
    actualizarInterfaz();
    
    //mostrar instruccion al usuario
    mostrarMensajeKira('selecciona la carta que quieres cambiar...');
}

//funcion para usar el rito "dejo"
function usarRitoDejo() {
    if (!partidaEnCurso) return;
    
    mostrarMensajeKira('¡te rindes!');
    setTimeout(() => {
        finalizarPartida('jugador_abandono');
    }, 1500);
}

//funcion para usar el rito "bajo"
function usarRitoBajo() {
    if (!partidaEnCurso) return;
    
    mostrarMensajeKira('¡bajaste! ahora me toca...');
    
    //la maquina juega su turno
    setTimeout(() => {
        turnoMaquina();
    }, 2000);
}

//funcion para el turno de la maquina
function turnoMaquina() {
    //logica simple de la maquina
    let decision = '';
    
    if (puntuacionMaquina < 16) {
        decision = 'pido';
        const carta = mazoCartas.pop();
        cartasMaquina.push(carta);
        puntuacionMaquina += carta.valorNumerico;
        ajustarPuntuacion();
    } else if (puntuacionMaquina < 19 && Math.random() < 0.5) {
        decision = 'pido';
        const carta = mazoCartas.pop();
        cartasMaquina.push(carta);
        puntuacionMaquina += carta.valorNumerico;
        ajustarPuntuacion();
    } else {
        decision = 'bajo';
    }
    
    mostrarMensajeKira(`"${decision}"`);
    
    setTimeout(() => {
        finalizarPartida('comparacion');
    }, 2000);
}

//funcion para finalizar la partida
function finalizarPartida(tipo) {
    partidaEnCurso = false;
    cartasReveladas = true;
    
    let resultado = '';
    let mensajeKira = '';
    
    switch (tipo) {
        case 'jugador_pasado':
            resultado = `¡te pasaste de 21! puntuacion: ${puntuacionJugador}`;
            mensajeKira = obtenerMensajeVictoriaKira();
            break;
            
        case 'jugador_abandono':
            resultado = 'te rendiste. kira gana por abandono.';
            mensajeKira = obtenerMensajeVictoriaKira();
            break;
            
        case 'comparacion':
            if (puntuacionJugador > 21 && puntuacionMaquina > 21) {
                //ambos se pasaron
                if (puntuacionJugador < puntuacionMaquina) {
                    resultado = `¡ganaste! ambos se pasaron, pero tu te quedaste mas cerca.`;
                    mensajeKira = obtenerMensajeDerrotaKira();
                } else {
                    resultado = `kira gana. ambos se pasaron, pero ella se quedo mas cerca.`;
                    mensajeKira = obtenerMensajeVictoriaKira();
                }
            } else if (puntuacionJugador > 21) {
                resultado = `¡te pasaste de 21! kira gana.`;
                mensajeKira = obtenerMensajeVictoriaKira();
            } else if (puntuacionMaquina > 21) {
                resultado = `¡kira se paso de 21! ¡ganaste!`;
                mensajeKira = obtenerMensajeDerrotaKira();
            } else if (puntuacionJugador === 21 && puntuacionMaquina === 21) {
                //empate en 21 - prorroga
                resultado = '¡empate en 21! vamos a prorroga...';
                setTimeout(() => {
                    prorroga();
                }, 2000);
                return;
            } else if (puntuacionJugador === puntuacionMaquina) {
                //empate - prorroga
                resultado = `¡empate en ${puntuacionJugador}! vamos a prorroga...`;
                setTimeout(() => {
                    prorroga();
                }, 2000);
                return;
            } else if (puntuacionJugador > puntuacionMaquina) {
                resultado = `¡ganaste! tu puntuacion: ${puntuacionJugador}, kira: ${puntuacionMaquina}`;
                mensajeKira = obtenerMensajeDerrotaKira();
            } else {
                resultado = `kira gana. tu puntuacion: ${puntuacionJugador}, kira: ${puntuacionMaquina}`;
                mensajeKira = obtenerMensajeVictoriaKira();
            }
            break;
    }
    
    //mostrar resultado
    mostrarResultado(resultado, mensajeKira);
}

//funcion para prorroga
function prorroga() {
    mostrarMensajeKira('"bueno, a ver que toca"');
    
    //mostrar joker en pantalla
    mostrarJokerProrroga();
    
    //repartir una carta adicional a cada uno
    const cartaJugador = mazoCartas.pop();
    const cartaMaquina = mazoCartas.pop();
    
    cartasJugador.push(cartaJugador);
    cartasMaquina.push(cartaMaquina);
    
    puntuacionJugador += cartaJugador.valorNumerico;
    puntuacionMaquina += cartaMaquina.valorNumerico;
    
    ajustarPuntuacion();
    
    //actualizar interfaz
    actualizarInterfaz();
    
    setTimeout(() => {
        //determinar ganador de la prorroga
        let resultadoProrroga = '';
        let mensajeKiraProrroga = '';
        
        if (puntuacionJugador > 21 && puntuacionMaquina > 21) {
            if (puntuacionJugador < puntuacionMaquina) {
                resultadoProrroga = `¡ganaste en prorroga! ambos se pasaron, pero tu te quedaste mas cerca.`;
                mensajeKiraProrroga = obtenerMensajeProrrogaKira(false);
            } else {
                resultadoProrroga = `kira gana en prorroga. ambos se pasaron, pero ella se quedo mas cerca.`;
                mensajeKiraProrroga = obtenerMensajeProrrogaKira(true);
            }
        } else if (puntuacionJugador > 21) {
            resultadoProrroga = `¡te pasaste en prorroga! kira gana.`;
            mensajeKiraProrroga = obtenerMensajeProrrogaKira(true);
        } else if (puntuacionMaquina > 21) {
            resultadoProrroga = `¡kira se paso en prorroga! ¡ganaste!`;
            mensajeKiraProrroga = obtenerMensajeProrrogaKira(false);
        } else if (puntuacionJugador > puntuacionMaquina) {
            resultadoProrroga = `¡ganaste en prorroga! tu puntuacion: ${puntuacionJugador}, kira: ${puntuacionMaquina}`;
            mensajeKiraProrroga = obtenerMensajeProrrogaKira(false);
        } else {
            resultadoProrroga = `kira gana en prorroga. tu puntuacion: ${puntuacionJugador}, kira: ${puntuacionMaquina}`;
            mensajeKiraProrroga = obtenerMensajeProrrogaKira(true);
        }
        
        mostrarResultado(resultadoProrroga, mensajeKiraProrroga);
    }, 2000);
}

//funcion para mostrar joker en prorroga
function mostrarJokerProrroga() {
    //crear elemento joker
    const jokerElement = document.createElement('div');
    jokerElement.className = 'joker-prorroga';
    jokerElement.innerHTML = `
        <div class="joker-contenido">
            <img src="cartas/joker.png" alt="Joker" class="joker-imagen">
            <div class="joker-texto">¡PRORROGA!</div>
        </div>
    `;
    
    //agregar al body
    document.body.appendChild(jokerElement);
    
    //remover despues de 3 segundos
    setTimeout(() => {
        if (jokerElement.parentNode) {
            jokerElement.parentNode.removeChild(jokerElement);
        }
    }, 3000);
}

//funcion para mostrar el resultado
function mostrarResultado(resultado, mensajeKira) {
    resultadoTexto.textContent = resultado;
    
    //mostrar cartas reveladas
    mostrarCartasReveladas();
    
    //mostrar area de resultado
    areaResultado.classList.remove('oculto');
    
    //mostrar mensaje final de kira
    setTimeout(() => {
        mostrarMensajeKira(mensajeKira);
    }, 1000);
}

//funcion para mostrar cartas reveladas
function mostrarCartasReveladas() {
    cartasReveladasDiv.innerHTML = '';
    
    //cartas del jugador
    const cartasJugadorReveladas = document.createElement('div');
    cartasJugadorReveladas.className = 'cartas-jugador-reveladas';
    cartasJugadorReveladas.innerHTML = `<h3>${nombreUsuario}</h3>`;
    
    cartasJugador.forEach(carta => {
        const cartaElement = document.createElement('div');
        cartaElement.className = 'carta-jugador';
        
        const img = document.createElement('img');
        img.src = `cartas/${carta.nombreArchivo}`;
        img.alt = `${carta.valor} de ${carta.palo}`;
        img.onerror = function() {
            this.style.display = 'none';
            cartaElement.innerHTML = `<div style="font-size: 1.5rem; color: #333;">${carta.valor}</div>`;
        };
        
        cartaElement.appendChild(img);
        
        const nombreCarta = document.createElement('div');
        nombreCarta.className = 'nombre-carta';
        nombreCarta.textContent = `${carta.valor} de ${carta.palo}`;
        cartaElement.appendChild(nombreCarta);
        
        cartasJugadorReveladas.appendChild(cartaElement);
    });
    
    //cartas de la maquina
    const cartasMaquinaReveladas = document.createElement('div');
    cartasMaquinaReveladas.className = 'cartas-maquina-reveladas';
    cartasMaquinaReveladas.innerHTML = `<h3>kira</h3>`;
    
    cartasMaquina.forEach(carta => {
        const cartaElement = document.createElement('div');
        cartaElement.className = 'carta-jugador';
        
        const img = document.createElement('img');
        img.src = `cartas/${carta.nombreArchivo}`;
        img.alt = `${carta.valor} de ${carta.palo}`;
        img.onerror = function() {
            this.style.display = 'none';
            cartaElement.innerHTML = `<div style="font-size: 1.5rem; color: #333;">${carta.valor}</div>`;
        };
        
        cartaElement.appendChild(img);
        
        const nombreCarta = document.createElement('div');
        nombreCarta.className = 'nombre-carta';
        nombreCarta.textContent = `${carta.valor} de ${carta.palo}`;
        cartaElement.appendChild(nombreCarta);
        
        cartasMaquinaReveladas.appendChild(cartaElement);
    });
    
    cartasReveladasDiv.appendChild(cartasJugadorReveladas);
    cartasReveladasDiv.appendChild(cartasMaquinaReveladas);
}

//funcion para nueva partida
function nuevaPartida() {
    areaResultado.classList.add('oculto');
    iniciarNuevaPartida();
}

//funciones de los mensajes de kira
function obtenerMensajeInicial() {
    const mensajes = [
        'bueno, a ver que onda',
        'ta, a ver si sabes',
        'lujo, al fin jugamos'
    ];
    return mensajes[Math.floor(Math.random() * mensajes.length)];
}

function obtenerMensajeVictoriaKira() {
    const mensajes = [
        'tomaaa, bien jugado',
        'dios perdona, yo no',
        'a dormir, amigo'
    ];
    return mensajes[Math.floor(Math.random() * mensajes.length)];
}

function obtenerMensajeDerrotaKira() {
    const mensajes = [
        'la gran... que buena jugada',
        'boee, mucha suerte',
        'tata, bien jugada',
        'no me dejaste ni calentar',
        'peee... muy bien'
    ];
    return mensajes[Math.floor(Math.random() * mensajes.length)];
}

function obtenerMensajeProrrogaKira(gano) {
    if (gano) {
        const mensajes = [
            'jaja, safe',
            'casi... me ganas',
            'mejor suerte... la mia'
        ];
        return mensajes[Math.floor(Math.random() * mensajes.length)];
    } else {
        const mensajes = [
            'lpm, ando en la cagada',
            'bueno, ya fue, no juego mas',
            'tatatatata, ni para eso me servis'
        ];
        return mensajes[Math.floor(Math.random() * mensajes.length)];
    }
}

//funcion para mostrar mensaje de kira
function mostrarMensajeKira(mensaje) {
    mensajeActual.textContent = mensaje;
}

//funcion para manejar errores
window.addEventListener('error', function(e) {
    console.error('error en el juego:', e.error);
    alert('ha ocurrido un error en el juego. por favor, recarga la pagina.');
});

//funcion para verificar que las imagenes de cartas existan
function verificarImagenesCartas() {
    console.log('verificando imagenes de cartas...');
    //esta funcion se puede usar para verificar que las imagenes existan
    //por ahora solo es informativa
} 