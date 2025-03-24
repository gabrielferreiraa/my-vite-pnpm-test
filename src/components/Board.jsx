import { motion } from 'framer-motion';

export default function Board({ squares, onSquareClick }) {
  const renderSquare = (index) => {
    const isX = squares[index] === 'X';
    const isO = squares[index] === 'O';

    return (
      <motion.button
        className="w-24 h-24 border border-slate-200/20 rounded-xl flex items-center justify-center text-4xl font-bold bg-white/10 backdrop-blur-sm hover:bg-white/20 dark:border-slate-700/20 dark:bg-slate-800/10 dark:hover:bg-slate-800/20"
        onClick={() => onSquareClick(index)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isX && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-rose-500 dark:text-rose-400"
          >
            X
          </motion.span>
        )}
        {isO && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-blue-500 dark:text-blue-400"
          >
            O
          </motion.span>
        )}
      </motion.button>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {Array(9).fill(null).map((_, i) => renderSquare(i))}
    </div>
  );
}