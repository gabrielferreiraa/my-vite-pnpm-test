import { useEffect } from 'react';
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 flex items-center justify-center p-6 transition-colors duration-300">
      <ThemeToggle />
      <MusicPlayer />
    </div>
  );
}