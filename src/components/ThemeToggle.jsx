import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle({ darkMode, toggleDarkMode }) {
  return (
    <motion.button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 shadow-lg dark:bg-slate-800/20 dark:border-slate-700/20"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {darkMode ? (
        <Sun className="w-6 h-6 text-yellow-400" />
      ) : (
        <Moon className="w-6 h-6 text-slate-700" />
      )}
    </motion.button>
  );
}