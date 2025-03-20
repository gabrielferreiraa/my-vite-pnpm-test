import { motion } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';

export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group flex items-center gap-4 p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-blue-900/5 dark:shadow-none"
    >
      <button
        onClick={() => toggleTodo(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 ${
          todo.completed
            ? 'bg-emerald-500 border-emerald-500 dark:bg-emerald-400 dark:border-emerald-400'
            : 'border-slate-300 dark:border-slate-600'
        } flex items-center justify-center transition-colors`}
      >
        {todo.completed && <Check className="w-4 h-4 text-white" />}
      </button>
      
      <span className={`flex-grow text-slate-700 dark:text-slate-300 ${
        todo.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''
      }`}>
        {todo.text}
      </span>
      
      <button
        onClick={() => deleteTodo(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition-opacity"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
}