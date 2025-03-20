import { motion } from 'framer-motion';
import { PenTool, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Notes() {
  const [notes, setNotes] = useState(initialNotes);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/30 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
            Your Notes
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white flex items-center space-x-2"
          >
            <PenTool className="w-4 h-4" />
            <span>New Note</span>
          </motion.button>
        </div>

        <div className="space-y-6">
          {notes.map((note, index) => (
            <NoteCard key={index} {...note} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function NoteCard({ title, verse, content, date }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="p-6 rounded-xl bg-white/30 dark:bg-slate-700/30 backdrop-blur-sm border border-white/20 dark:border-slate-600/30"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
            {title}
          </h3>
          <p className="text-sm text-blue-600 dark:text-blue-400">{verse}</p>
          <p className="text-slate-600 dark:text-slate-300 mt-2">{content}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{date}</p>
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

const initialNotes = [
  {
    title: "God's Love",
    verse: "John 3:16",
    content: "This verse perfectly captures the essence of God's love for humanity...",
    date: "September 15, 2023"
  },
  {
    title: "Faith and Trust",
    verse: "Hebrews 11:1",
    content: "Faith is the substance of things hoped for, the evidence of things not seen...",
    date: "September 14, 2023"
  },
  {
    title: "Daily Strength",
    verse: "Philippians 4:13",
    content: "Reminder that through Christ, all things are possible...",
    date: "September 13, 2023"
  }
];