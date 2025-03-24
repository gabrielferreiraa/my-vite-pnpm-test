import { useState, useRef } from 'react';
import { Play, Pause, SkipForward, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import AudioVisualizer from './AudioVisualizer';

const tracks = [
  {
    title: "Summer Breeze",
    artist: "Chill Waves",
    duration: "3:45",
    url: "https://example.com/track1.mp3"
  },
  {
    title: "Mountain Echo",
    artist: "Nature Sounds",
    duration: "4:20",
    url: "https://example.com/track2.mp3"
  },
  {
    title: "Urban Dreams",
    artist: "City Lights",
    duration: "3:30",
    url: "https://example.com/track3.mp3"
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
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    audioRef.current.src = tracks[currentTrack].url;
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md p-6 rounded-2xl bg-white/30 dark:bg-slate-800/30 backdrop-blur-lg border border-white/20 dark:border-slate-700/30 shadow-xl"
    >
      {/* Album Art */}
      <div className="relative w-48 h-48 mx-auto mb-6">
        <motion.div 
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl"
        />
      </div>

      {/* Audio Visualizer */}
      <div className="mb-6">
        <AudioVisualizer audioRef={audioRef} isPlaying={isPlaying} />
      </div>

      {/* Track Info */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          {tracks[currentTrack].title}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {tracks[currentTrack].artist}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full mb-6">
        <div className="w-1/3 h-full bg-purple-500 rounded-full" />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="p-4 rounded-full bg-purple-500 text-white shadow-lg hover:bg-purple-600 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextTrack}
          className="p-4 rounded-full bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm shadow-lg hover:bg-white/60 dark:hover:bg-slate-700/60 transition-colors"
        >
          <SkipForward className="w-6 h-6 text-slate-700 dark:text-white" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 rounded-full bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm shadow-lg hover:bg-white/60 dark:hover:bg-slate-700/60 transition-colors"
        >
          <Volume2 className="w-6 h-6 text-slate-700 dark:text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
}