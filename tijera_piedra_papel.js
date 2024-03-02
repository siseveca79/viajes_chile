const readline = require('readline');

// Función para obtener la jugada aleatoria de la máquina
function obtenerJugadaMaquina() {
    const opciones = ['Piedra', 'Papel', 'Tijera'];
    const indice = Math.floor(Math.random() * 3);
    return opciones[indice];
}

// Función para determinar al ganador de la partida
function determinarGanador(jugadaUsuario, jugadaMaquina) {
    // Convertimos ambas jugadas a minúsculas para hacer la comparación no sensible a mayúsculas y minúsculas
    jugadaUsuario = jugadaUsuario.toLowerCase();
    jugadaMaquina = jugadaMaquina.toLowerCase();

    if (
        (jugadaUsuario === 'piedra' && jugadaMaquina === 'tijera') ||
        (jugadaUsuario === 'papel' && jugadaMaquina === 'piedra') ||
        (jugadaUsuario === 'tijera' && jugadaMaquina === 'papel')
    ) {
        return 'usuario';
    } else if (
        (jugadaUsuario === 'tijera' && jugadaMaquina === 'piedra') ||
        (jugadaUsuario === 'piedra' && jugadaMaquina === 'papel') ||
        (jugadaUsuario === 'papel' && jugadaMaquina === 'tijera')
    ) {
        return 'maquina';
    } else {
        return 'empate';
    }
}

// Función principal del juego
function jugarCachipun() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('¿Cuántas veces deseas jugar contra la máquina? ', (vecesJugar) => {
        if (isNaN(vecesJugar) || vecesJugar <= 0) {
            console.log('Por favor, ingresa un número válido mayor que cero.');
            rl.close();
            return;
        }

        vecesJugar = parseInt(vecesJugar);
        let contadorPartidas = 0;

        const jugarPartida = () => {
            rl.question('Elige tu jugada (Piedra, Papel o Tijera): ', (jugadaUsuario) => {
                if (!['piedra', 'papel', 'tijera'].includes(jugadaUsuario.toLowerCase())) {
                    console.log('La opción ingresada no es válida. Por favor, elige entre Piedra, Papel o Tijera.');
                    jugarPartida();
                    return;
                }

                const jugadaMaquina = obtenerJugadaMaquina();
                console.log(`La máquina eligió: ${jugadaMaquina}`);

                const resultado = determinarGanador(jugadaUsuario, jugadaMaquina);

                if (resultado === 'usuario') {
                    console.log('¡Felicidades! Has ganado esta partida.');
                } else if (resultado === 'maquina') {
                    console.log('Lo siento, has perdido contra la máquina.');
                } else {
                    console.log('Es un empate, nadie gana esta partida.');
                }

                contadorPartidas++;

                if (contadorPartidas < vecesJugar) {
                    jugarPartida();
                } else {
                    rl.close();
                }
            });
        };

        jugarPartida();
    });
}

// Llamada a la función principal
jugarCachipun();
