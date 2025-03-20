import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/30 p-8">
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search the Bible..."
              className="w-full px-4 py-3 pl-12 rounded-xl bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border border-white/20 dark:border-slate-600/30 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
            />
            <SearchIcon className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 dark:text-slate-500" />
          </div>
        </div>

        <div className="space-y-6">
          {searchResults.map((result, index) => (
            <SearchResult key={index} {...result} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SearchResult({ verse, reference, context }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 rounded-xl bg-white/30 dark:bg-slate-700/30 backdrop-blur-sm border border-white/20 dark:border-slate-600/30 hover:bg-white/50 dark:hover:bg-slate-600/50 transition-colors"
    >
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
        {reference}
      </h3>
      <p className="text-slate-600 dark:text-slate-300">{verse}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{context}</p>
    </motion.div>
  );
}

const searchResults = [
  {
    verse: "For God so loved the world, that he gave his only begotten Son...",
    reference: "John 3:16",
    context: "Jesus's conversation with Nicodemus"
  },
  {
    verse: "In the beginning was the Word, and the Word was with God...",
    reference: "John 1:1",
    context: "The deity of Christ"
  },
  {
    verse: "The Lord is my shepherd; I shall not want...",
    reference: "Psalm 23:1",
    context: "David's psalm of trust"
  }
];