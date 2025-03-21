import { useState, useRef } from 'react';
import { Play, Pause, SkipForward, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

const tracks = [
  {
    title: "Summer Breeze",
    artist: "Chill Vibes",
    duration: "3:45",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "Ocean Waves",
    artist: "Nature Sounds",
    duration: "4:20",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "Mountain Echo",
    artist: "Ambient Dreams",
    duration: "3:30",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(new Audio(tracks[currentTrack].url));

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    audioRef.current.pause();
    const next = (currentTrack + 1) % tracks.length;
    setCurrentTrack(next);
    audioRef.current = new Audio(tracks[next].url);
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <div className="w-full max-w-md p-6 rounded-2xl bg-white/30 dark:bg-gray-800/20 backdrop-blur-lg border border-white/30 dark:border-gray-700/30 shadow-xl">
      <motion.div 
        className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl"
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          {tracks[currentTrack].title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {tracks[currentTrack].artist}
        </p>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-6">
        <div className="bg-purple-500 h-1.5 rounded-full w-1/3"></div>
      </div>

      <div className="flex items-center justify-center gap-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="p-4 rounded-full bg-purple-500 text-white shadow-lg hover:bg-purple-600 transition-colors"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextTrack}
          className="p-4 rounded-full bg-purple-500 text-white shadow-lg hover:bg-purple-600 transition-colors"
        >
          <SkipForward className="w-6 h-6" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 rounded-full bg-purple-500 text-white shadow-lg hover:bg-purple-600 transition-colors"
        >
          <Volume2 className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
}