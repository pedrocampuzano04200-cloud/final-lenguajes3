
import { useState } from "react";

export const TicTacToe = () => {

    const [tablero, setTablero] = useState<any>(Array(9).fill(null));
    const [xSiguiente, setXSiguiente] = useState<boolean>(true);
    const [mensaje, setMensaje] = useState<string>("");

    const evaluarGanador = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    const chequearGanador = (cuadros: string[]) => {

        for (let i = 0; i < evaluarGanador.length; i++) {

            const [a, b, c] = evaluarGanador[i];

            if (cuadros[a] && cuadros[a] === cuadros[b] &&
                cuadros[a] === cuadros[c]) {
                return cuadros[a];
            }
        }

        return null;
    };

    const buscarMovimiento = (cuadros: string[], jugador: string) => {

        for (let i = 0; i < evaluarGanador.length; i++) {

            const [a, b, c] = evaluarGanador[i];

            let linea = [cuadros[a], cuadros[b], cuadros[c]];

            if (linea.filter(valor => valor === jugador).length === 2 &&
                linea.includes(null)) {

                if (cuadros[a] === null) return a;
                if (cuadros[b] === null) return b;
                if (cuadros[c] === null) return c;
            }
        }

        return -1;
    };

    const movimientoMaquina = (cuadros: string[]) => {

        let posicion = buscarMovimiento(cuadros, "O");

        if (posicion !== -1) {
            return posicion;
        }

        posicion = buscarMovimiento(cuadros, "X");

        if (posicion !== -1) {
            return posicion;
        }

        if (cuadros[4] === null) {
            return 4;
        }

        const esquinas = [0, 2, 6, 8];

        for (let i = 0; i < esquinas.length; i++) {
            if (cuadros[esquinas[i]] === null) {
                return esquinas[i];
            }
        }

        for (let i = 0; i < cuadros.length; i++) {
            if (cuadros[i] === null) {
                return i;
            }
        }

        return -1;
    };

    const movimiento = (i: number) => {

        if (tablero[i] || chequearGanador(tablero) || !xSiguiente) return;

        const nuevoTablero = [...tablero];

        nuevoTablero[i] = "X";

        if (chequearGanador(nuevoTablero)) {
            setTablero(nuevoTablero);
            setXSiguiente(false);
            return;
        }

        if (nuevoTablero.every((cuadro: string | null) => cuadro !== null)) {
            setTablero(nuevoTablero);
            return;
        }

        let posicionMaquina = movimientoMaquina(nuevoTablero);

        if (posicionMaquina !== -1) {
            nuevoTablero[posicionMaquina] = "O";
        }

        setTablero(nuevoTablero);
        setXSiguiente(true);
    };

    const ganador = chequearGanador(tablero);

    const empate = !ganador &&
        tablero.every((cuadro: string | null) => cuadro !== null);

    let estados: string;

    if (ganador === "X") {
        estados = "¡Ganaste!";
    } else if (ganador === "O") {
        estados = "¡La máquina ganó!";
    } else if (empate) {
        estados = "Empate";
    } else {
        estados = "Tu turno: X";
    }

    return (
        <>
            <div className="juego">

                <h1>Tic Tac Toe</h1>

                <div className="estado">
                    {estados}
                </div>

                <div className="tablero">

                    {tablero.map((value: string | null, i: number) => (

                        <button
                            key={i}
                            className="cuadro"
                            onClick={() => movimiento(i)}
                            disabled={value !== null || ganador !== null || empate}
                        >
                            {value}
                        </button>

                    ))}

                </div>

                <button
                    className="reiniciar-boton"
                    onClick={() => {
                        setTablero(Array(9).fill(null));
                        setXSiguiente(true);
                        setMensaje("");
                    }}
                >
                    Reiniciar Juego
                </button>

            </div>
        </>
    );
};
