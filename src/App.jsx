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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <ThemeToggle />
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Modern File Uploader
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Upload your files with ease using our beautiful drag & drop interface
          </p>
        </motion.div>
        <FileUploader />
      </div>
    </div>
  );
}