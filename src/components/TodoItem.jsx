import { motion } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';

export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group flex items-center gap-4 p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg rounded-xl border border-white/20 dark:border-slate-700/30 shadow-lg shadow-blue-900/5 dark:shadow-none transition-all duration-300"
    >
      <button
        onClick={() => toggleTodo(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 ${
          todo.completed
            ? 'bg-emerald-500 border-emerald-500'
            : 'border-slate-300 dark:border-slate-600'
        } transition-colors duration-200`}
      >
        {todo.completed && <Check className="w-full h-full p-0.5 text-white" />}
      </button>
      
      <span
        className={`flex-grow text-slate-700 dark:text-slate-300 ${
          todo.completed ? 'line-through text-slate-400 dark:text-slate-600' : ''
        }`}
      >
        {todo.text}
      </span>
      
      <button
        onClick={() => deleteTodo(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-opacity duration-200"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </motion.div>
  );
}