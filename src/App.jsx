import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './components/ThemeToggle';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';

export default function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

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

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="relative">
          <div className="absolute right-0 top-0">
            <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-8 text-center"
          >
            Premium Todo App
          </motion.h1>

          <div className="space-y-6">
            <TodoInput addTodo={addTodo} />
            
            <AnimatePresence mode="popLayout">
              {todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                />
              ))}
            </AnimatePresence>

            {todos.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-slate-500 dark:text-slate-400 mt-8"
              >
                No todos yet. Add one above!
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}