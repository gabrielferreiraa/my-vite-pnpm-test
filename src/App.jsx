import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './components/ThemeToggle';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-900 transition-colors duration-300">
      <ThemeToggle />
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12 text-slate-800 dark:text-white"
        >
          Modern Music Player
        </motion.h1>
        <MusicPlayer />
      </div>
    </div>
  );
}