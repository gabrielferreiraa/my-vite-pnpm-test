import { useState, useEffect } from 'react';
import MouseFollower from './components/MouseFollower';

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.theme === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [darkMode]);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-4 right-4 p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-110"
        >
          {darkMode ? '🌞' : '🌙'}
        </button>
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Interactive Mouse Effect
          </h1>
          
          <div className="space-y-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  Interactive Section {i + 1}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Move your mouse around to see the interactive orb effect with particle trails.
                  This section demonstrates the smooth animations and particle effects.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <MouseFollower />
    </div>
  );
}

export default App;