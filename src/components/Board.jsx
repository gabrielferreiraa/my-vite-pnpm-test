import { motion } from 'framer-motion';
import { CircleDot, X } from 'lucide-react';

export default function Board({ squares, onSquareClick }) {
  const renderSquare = (index) => {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="aspect-square flex items-center justify-center bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg dark:bg-slate-800/30 dark:border-slate-700/20"
        onClick={() => onSquareClick(index)}
      >
        {squares[index] === 'X' && (
          <CircleDot className="w-12 h-12 text-emerald-500 dark:text-emerald-400" />
        )}
        {squares[index] === 'O' && (
          <X className="w-12 h-12 text-rose-500 dark:text-rose-400" />
        )}
      </motion.button>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-md">
      {[...Array(9)].map((_, i) => renderSquare(i))}
    </div>
  );
}