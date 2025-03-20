import { motion } from 'framer-motion';
import { Bookmark, Trash2 } from 'lucide-react';

export default function Bookmarks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/30 p-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8">
          Your Bookmarks
        </h2>

        <div className="space-y-4">
          {bookmarks.map((bookmark, index) => (
            <BookmarkCard key={index} {...bookmark} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function BookmarkCard({ reference, verse, date }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="p-4 rounded-xl bg-white/30 dark:bg-slate-700/30 backdrop-blur-sm border border-white/20 dark:border-slate-600/30"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            {reference}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mt-2">{verse}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{date}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30"
        >
          <Trash2 className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}

const bookmarks = [
  {
    reference: "Philippians 4:13",
    verse: "I can do all things through Christ which strengtheneth me.",
    date: "Added on Sept 15, 2023"
  },
  {
    reference: "Psalm 23:1",
    verse: "The Lord is my shepherd; I shall not want.",
    date: "Added on Sept 14, 2023"
  },
  {
    reference: "John 3:16",
    verse: "For God so loved the world, that he gave his only begotten Son...",
    date: "Added on Sept 13, 2023"
  }
];