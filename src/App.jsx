import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';
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
  const [newTodo, setNewTodo] = useState('');

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

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo('');
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
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300`}>
      <ThemeToggle darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text mb-4">
            Premium Todo App
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Organize your tasks in style
          </p>
        </motion.div>

        <form onSubmit={addTodo} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              className="flex-grow p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-blue-900/5 dark:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:text-slate-300 dark:placeholder-slate-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-xl shadow-lg shadow-blue-900/20 dark:shadow-none flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add
            </motion.button>
          </div>
        </form>

        <motion.div
          layout
          className="space-y-4"
        >
          <AnimatePresence>
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}