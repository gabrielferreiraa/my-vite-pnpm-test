import { motion } from 'framer-motion';
import { useState } from 'react';
import { Bookmark, Share2, Volume2 } from 'lucide-react';

export default function BibleReader() {
  const [selectedVerse, setSelectedVerse] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/30 p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
            Genesis 1
          </h2>
          <div className="flex space-x-4">
            <ActionButton icon={<Volume2 />} label="Listen" />
            <ActionButton icon={<Bookmark />} label="Bookmark" />
            <ActionButton icon={<Share2 />} label="Share" />
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed">
            {verses.map((verse, index) => (
              <Verse
                key={index}
                number={index + 1}
                text={verse}
                isSelected={selectedVerse === index}
                onSelect={() => setSelectedVerse(index)}
              />
            ))}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function Verse({ number, text, isSelected, onSelect }) {
  return (
    <motion.span
      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
      onClick={onSelect}
      className={`cursor-pointer rounded px-1 -mx-1 ${
        isSelected ? 'bg-blue-100 dark:bg-blue-900/30' : ''
      }`}
    >
      <sup className="text-blue-600 dark:text-blue-400 font-medium mr-1">
        {number}
      </sup>
      {text}{' '}
    </motion.span>
  );
}

function ActionButton({ icon, label }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 rounded-lg bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border border-white/20 dark:border-slate-600/30 shadow-lg text-slate-700 dark:text-slate-200"
      aria-label={label}
    >
      {icon}
    </motion.button>
  );
}

const verses = [
  "In the beginning God created the heaven and the earth.",
  "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.",
  "And God said, Let there be light: and there was light."
];