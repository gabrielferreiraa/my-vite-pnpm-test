import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Sun, Moon, Camera, Home, Search, Heart, User, PlusSquare } from 'lucide-react';
import { motion } from 'framer-motion';

// Components
import Feed from './components/Feed';
import Profile from './components/Profile';
import Explore from './components/Explore';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Camera className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                InstaPro
              </span>
            </Link>

            <div className="flex items-center space-x-6">
              <Link to="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <Home className="w-6 h-6" />
              </Link>
              <Link to="/explore" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <Search className="w-6 h-6" />
              </Link>
              <button className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <PlusSquare className="w-6 h-6" />
              </button>
              <button className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
              <Link to="/profile" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <User className="w-6 h-6" />
              </Link>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20 pb-16 px-4">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;