import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function TodoInput({ addTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="w-full px-6 py-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 rounded-xl shadow-lg shadow-purple-900/5 dark:shadow-black/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-purple-400/50"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-500 dark:bg-purple-400 text-white rounded-lg shadow-lg shadow-purple-500/20 dark:shadow-purple-400/20"
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>
    </form>
  );
}