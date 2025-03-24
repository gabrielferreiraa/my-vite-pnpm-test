import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Board from './components/Board';
import ThemeToggle from './components/ThemeToggle';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [darkMode, setDarkMode] = useState(
    localStorage.theme === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [darkMode]);

  // Internal use, used to capture errors. Do not delete.
  useEffect(() => {
    window.addEventListener('error', function ({ message, filename, lineno, colno, error }) {
      window.parent.postMessage({
        type: 'error',
        message: message,
        line: lineno,
        column: colno,
        stack: error ? error.stack : null
      }, '*');
    });

    return () => {
      window.removeEventListener('error', () => {});
    };
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) return;
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square);
  
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-sky-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/20 shadow-xl dark:bg-slate-800/40 dark:border-slate-700/20"
      >
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-rose-500 to-blue-500 bg-clip-text text-transparent animate-gradient dark:from-rose-400 dark:to-blue-400">
          Tic Tac Toe
        </h1>

        <Board squares={squares} onSquareClick={handleClick} />

        <div className="mt-8 text-center">
          {(winner || isDraw) && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mb-4"
            >
              <p className="text-xl font-semibold text-slate-700 dark:text-slate-200">
                {winner ? `Winner: ${winner}` : 'Draw!'}
              </p>
            </motion.div>
          )}

          <motion.button
            onClick={resetGame}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-rose-500 to-blue-500 text-white font-semibold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            New Game
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}