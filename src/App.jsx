import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, History } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.theme === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Error capture useEffect
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

  // Theme management
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [darkMode]);

  const handleNumber = (num) => {
    if (display === '0' || display === 'Error') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
    setEquation(equation + num);
  };

  const handleOperator = (op) => {
    if (display !== 'Error') {
      setDisplay('0');
      setEquation(equation + ' ' + op + ' ');
    }
  };

  const handleEqual = () => {
    try {
      const result = eval(equation);
      if (!isFinite(result)) {
        throw new Error('Division by zero');
      }
      const formattedResult = Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, '');
      setDisplay(formattedResult);
      setHistory([{ equation: equation + ' = ' + formattedResult, result: formattedResult }, ...history.slice(0, 9)]);
      setEquation(formattedResult);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleDecimal = () => {
    if (!display.includes('.') && display !== 'Error') {
      setDisplay(display + '.');
      setEquation(equation + '.');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300
      ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50'}`}>
      <div className="container mx-auto px-4 py-8 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg rounded-3xl shadow-xl 
                     dark:shadow-gray-900/30 border border-white/20 dark:border-gray-700/30 p-6">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <History className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              {darkMode ? 
                <Sun className="w-6 h-6 text-gray-300" /> : 
                <Moon className="w-6 h-6 text-gray-600" />
              }
            </button>
          </div>

          {/* Display */}
          <div className="bg-gray-100 dark:bg-gray-900/50 rounded-2xl p-4 mb-6">
            <div className="text-gray-500 dark:text-gray-400 text-sm h-6 mb-1">{equation}</div>
            <div className="text-4xl font-bold text-gray-800 dark:text-gray-100 text-right">{display}</div>
          </div>

          {/* History Panel */}
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 bg-gray-100 dark:bg-gray-900/50 rounded-2xl p-4 max-h-60 overflow-y-auto history-scroll">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">History</h3>
              {history.map((item, index) => (
                <div key={index} className="text-gray-600 dark:text-gray-300 mb-2 text-sm">
                  {item.equation}
                </div>
              ))}
              {history.length === 0 && (
                <div className="text-gray-500 dark:text-gray-400 text-sm">No history yet</div>
              )}
            </motion.div>
          )}

          {/* Keypad */}
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <button onClick={handleClear} 
              className="calculator-button col-span-2 bg-red-500 dark:bg-red-600 text-white h-16">
              AC
            </button>
            <button onClick={() => handleOperator('/')} 
              className="calculator-button bg-indigo-500 dark:bg-indigo-600 text-white h-16">
              ÷
            </button>
            <button onClick={() => handleOperator('*')} 
              className="calculator-button bg-indigo-500 dark:bg-indigo-600 text-white h-16">
              ×
            </button>

            {/* Row 2 */}
            {['7', '8', '9'].map((num) => (
              <button key={num} onClick={() => handleNumber(num)} 
                className="calculator-button bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 h-16">
                {num}
              </button>
            ))}
            <button onClick={() => handleOperator('-')} 
              className="calculator-button bg-indigo-500 dark:bg-indigo-600 text-white h-16">
              −
            </button>

            {/* Row 3 */}
            {['4', '5', '6'].map((num) => (
              <button key={num} onClick={() => handleNumber(num)} 
                className="calculator-button bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 h-16">
                {num}
              </button>
            ))}
            <button onClick={() => handleOperator('+')} 
              className="calculator-button bg-indigo-500 dark:bg-indigo-600 text-white h-16">
              +
            </button>

            {/* Row 4 */}
            {['1', '2', '3'].map((num) => (
              <button key={num} onClick={() => handleNumber(num)} 
                className="calculator-button bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 h-16">
                {num}
              </button>
            ))}
            <button onClick={handleEqual} 
              className="calculator-button bg-indigo-500 dark:bg-indigo-600 text-white row-span-2 h-[8.5rem]">
              =
            </button>

            {/* Row 5 */}
            <button onClick={() => handleNumber('0')} 
              className="calculator-button col-span-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 h-16">
              0
            </button>
            <button onClick={handleDecimal} 
              className="calculator-button bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 h-16">
              .
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}