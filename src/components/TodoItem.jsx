import { motion } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';

export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="group flex items-center gap-4 p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 rounded-xl shadow-lg shadow-purple-900/5 dark:shadow-black/20"
    >
      <button
        onClick={() => toggleTodo(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 ${
          todo.completed
            ? 'bg-purple-500 border-purple-500 dark:bg-purple-400 dark:border-purple-400'
            : 'border-slate-300 dark:border-slate-600'
        } transition-colors duration-200`}
      >
        {todo.completed && <Check className="w-full h-full p-0.5 text-white" />}
      </button>
      
      <span className={`flex-grow ${todo.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
        {todo.text}
      </span>
      
      <button
        onClick={() => deleteTodo(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition-colors duration-200"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
}