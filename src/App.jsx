import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.theme === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }, [darkMode])

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-900 transition-colors duration-300">
      <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text animate-gradient">
            Rafael
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300">
            Software Developer & Creative Thinker
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-8 md:grid-cols-2"
        >
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-purple-100/20 dark:border-purple-500/20">
            <h2 className="text-2xl font-semibold mb-4 text-purple-700 dark:text-purple-400">About Me</h2>
            <p className="text-slate-700 dark:text-slate-300">
              Passionate about creating beautiful and functional web experiences. I specialize in modern web technologies and love turning ideas into reality.
            </p>
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-purple-100/20 dark:border-purple-500/20">
            <h2 className="text-2xl font-semibold mb-4 text-purple-700 dark:text-purple-400">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS', 'HTML'].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <h2 className="text-2xl font-semibold mb-6 text-purple-700 dark:text-purple-400">Let's Connect</h2>
          <div className="flex justify-center gap-6">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <Github className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <Linkedin className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="mailto:rafael@example.com"
              className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <Mail className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            </motion.a>
          </div>
        </motion.div>
      </main>
    </div>
  )
}