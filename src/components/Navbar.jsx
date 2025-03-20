import { motion } from 'framer-motion';
import { Search, BookMarked, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ children }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-700/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text"
            >
              Bible App
            </motion.h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <NavLink to="/search" icon={<Search />} />
            <NavLink to="/bookmarks" icon={<BookMarked />} />
            <NavLink to="/settings" icon={<Settings />} />
            {children}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon }) {
  return (
    <Link to={to}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 rounded-lg bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 shadow-lg text-slate-700 dark:text-slate-200"
      >
        {icon}
      </motion.div>
    </Link>
  );
}