import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, Music2 } from 'lucide-react';

const songs = [
  {
    title: "Jingle Bells",
    artist: "Christmas Classics",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "Silent Night",
    artist: "Holiday Favorites",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "Deck the Halls",
    artist: "Christmas Carols",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const audioRef = useRef(new Audio(songs[currentSong].url));

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    audioRef.current.pause();
    const next = (currentSong + 1) % songs.length;
    setCurrentSong(next);
    audioRef.current = new Audio(songs[next].url);
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md p-8 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-white/20 dark:border-slate-700/30 shadow-xl"
    >
      <div className="flex items-center justify-center mb-8">
        <motion.div
          animate={{
            scale: isPlaying ? [1, 1.1, 1] : 1,
            transition: {
              repeat: isPlaying ? Infinity : 0,
              duration: 2
            }
          }}
          className="p-4 rounded-full bg-red-100 dark:bg-red-900/30"
        >
          <Music2 className="w-8 h-8 text-red-500 dark:text-red-400" />
        </motion.div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          {songs[currentSong].title}
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          {songs[currentSong].artist}
        </p>
      </div>

      <div className="flex items-center justify-center gap-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="p-4 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSong}
          className="p-4 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white shadow-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
          <SkipForward className="w-8 h-8" />
        </motion.button>
      </div>
    </motion.div>
  );
}