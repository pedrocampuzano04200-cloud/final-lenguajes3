import { useState } from "react";

export const TicTacToe = () => {

    const [tablero, setTablero] = useState<any>(Array(9).fill(null));
    const [xSiguiente, setXSiguiente] = useState<boolean>(true);

    const evaluarGanador = [

        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    const chequearGanador = ( cuadros: string ) => {

        for (let i = 0; i < evaluarGanador.length; i++) {

            const [a, b, c] = evaluarGanador[i];
            if (cuadros[a] && cuadros[a] === cuadros[b] && 
                cuadros[a] === cuadros[c]) {
                    return cuadros[a];
            }
        }
        return null;
    }

    const movimiento = (i: number) => {

        if (tablero[i] || chequearGanador(tablero)) return;

        const nuevoTablero = [...tablero];
        nuevoTablero[i] = xSiguiente ? 'X' : 'O';
        setTablero(nuevoTablero);
        setXSiguiente(!xSiguiente);
    }

    const ganador = chequearGanador(tablero);
    const empate = !ganador && tablero.every((cuadro: string) => cuadro !== null);

    let estados: string;
    if (ganador) {
        estados = `Ganador: ${ ganador }`;
    } else if (empate) {
        estados = 'Empate';
    } else {
        estados = `Turno de ${ xSiguiente ? 'X' : 'O'}`;
    }

    return (

        <>
            <div className="juego">

                <h1>Tic Tac Toe</h1>
                <div className="estado">{ estados }</div>
                <div className="tablero">
                    { tablero.map((value: number, i: number) => (

                        <button key={i} className="cuadro"
                        onClick={() => movimiento(i)}>{ value }</button>
                    ))}
                </div>
                <button className="reiniciar-boton" onClick={() => 
                    { setTablero(Array(9).fill(null));
                        setXSiguiente(true);
                     }
                }>Reiniciar Juego</button>
            </div>
        </>
    )
}