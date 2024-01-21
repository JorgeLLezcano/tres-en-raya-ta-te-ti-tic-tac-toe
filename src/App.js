import React from 'react';
import './style.css';
import { useState } from 'react';
import conffeti from 'canvas-confetti';
const TURN = {
  X: '❌',
  O: '⚪',
};
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function PopUp({ winner, onReset }) {
  return (
    <div className="popUp">
      {!winner ? <h1>Empate</h1> : <h1>El ganador es {winner}</h1>}
      <button className="btnReincio" onClick={onReset}>
        reinicio
      </button>
    </div>
  );
}
export default function App() {
  const [bloque, setBloque] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURN.X);
  const [winner, setWinner] = useState(null);

  function checkWinner(newBloque) {
    for (const condition of winningConditions) {
      const [a, b, c] = condition;
      if (
        newBloque[a] &&
        newBloque[a] === newBloque[b] &&
        newBloque[a] === newBloque[c]
      ) {
        return newBloque[a]; // Retorna el ganador ('X' o 'O')
      }
    }
    if (newBloque.every((el) => el)) {
      return null;  // Si todas las casillas están llenas, hay empate
    }
    return null; // Si no hay ganador, retorna null
  }

  function handleReset() {
    setBloque(Array(9).fill(null));
    setWinner(null);
    setTurn(turn === TURN.X ? TURN.O : TURN.X);
  }

  function handlrClick(index) {
    event.preventDefault();
    if (winner || bloque[index]) {
      return;
    }

    const newBloque = [...bloque];
    newBloque[index] = turn;

    setBloque((newBloque) =>
      newBloque.map((item, i) => (i === index ? turn : item))
    );

    const newWinner = checkWinner(newBloque);

    if (newWinner) {
      // Si hay ganador, muestra un mensaje o realiza la acción que desees
      conffeti();
      setWinner(newWinner);
    } else if (newBloque.every((el) => el)) {
      // Si hay empate, muestra un mensaje
      setWinner(null);
     
    } else {
      // Si no hay ganador, cambia la jugada para la próxima ronda
      setTurn(turn === TURN.X ? TURN.O : TURN.X);
    }
  }

  return (
    <>
      {winner && <PopUp winner={winner} onReset={handleReset} />}
      {bloque.every((el) => el) && 
        <PopUp winner={winner} onReset={handleReset} />
      }
      <h1> TA TE TI </h1>
      <div className="bloques">
        {bloque.map((block, index) => (
          <div
            key={index}
            className="block"
            style={{ backgroundColor: block ? 'grey' : '' }}
            onClick={() => handlrClick(index)}
          >
            {block}
          </div>
        ))}
      </div>
      <h1> Turno : {turn} </h1>
      <button className="btnReincio" onClick={handleReset}>
        Reinicio
      </button>
    </>
  );
}
