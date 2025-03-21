import { useEffect } from 'react';
import { motion } from 'framer-motion';
import FileUploader from './components/FileUploader';
import ThemeToggle from './components/ThemeToggle';

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950">
      <ThemeToggle />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-16"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 text-transparent bg-clip-text"
        >
          Modern File Uploader
        </motion.h1>
        
        <FileUploader />
      </motion.div>
    </div>
  );
}