import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function TodoInput({ addTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="w-full px-6 py-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg rounded-xl border border-white/20 dark:border-slate-700/30 shadow-lg shadow-blue-900/5 dark:shadow-none text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-blue-400/40 transition-all duration-300"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="absolute right-2 p-2 bg-blue-500 dark:bg-blue-400 rounded-lg text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-400/30"
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>
    </form>
  );
}