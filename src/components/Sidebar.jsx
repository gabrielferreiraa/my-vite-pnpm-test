import { motion } from 'framer-motion';
import { Book, BookOpen, Bookmark, PenTool } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-64 h-screen sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-r border-slate-200/50 dark:border-slate-700/50 p-4"
    >
      <div className="space-y-4">
        <SidebarLink 
          to="/"
          icon={<BookOpen />}
          text="Bible Reader"
          isActive={location.pathname === '/'}
        />
        <SidebarLink 
          to="/bookmarks"
          icon={<Bookmark />}
          text="Bookmarks"
          isActive={location.pathname === '/bookmarks'}
        />
        <SidebarLink 
          to="/notes"
          icon={<PenTool />}
          text="Notes"
          isActive={location.pathname === '/notes'}
        />
      </div>
      
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
          Bible Books
        </h3>
        <div className="space-y-1">
          {['Genesis', 'Exodus', 'Leviticus'].map((book) => (
            <motion.button
              key={book}
              whileHover={{ x: 4 }}
              className="w-full text-left px-4 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50"
            >
              {book}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SidebarLink({ to, icon, text, isActive }) {
  return (
    <Link to={to}>
      <motion.div
        whileHover={{ x: 4 }}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
          isActive 
            ? 'bg-blue-500 text-white' 
            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
        }`}
      >
        {icon}
        <span className="font-medium">{text}</span>
      </motion.div>
    </Link>
  );
}