import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, Volume2 } from 'lucide-react';

const playlist = [
  {
    id: 1,
    title: "Summer Breeze",
    artist: "Chill Waves",
    url: "https://example.com/summer-breeze.mp3"
  },
  {
    id: 2,
    title: "Mountain Echo",
    artist: "Nature Sounds",
    url: "https://example.com/mountain-echo.mp3"
  },
  {
    id: 3,
    title: "Urban Dreams",
    artist: "City Lights",
    url: "https://example.com/urban-dreams.mp3"
  }
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const track = playlist[currentTrack];

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6"
      >
        <div className="relative w-64 h-64 mx-auto mb-6">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg"
          />
          <div className="absolute inset-4 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur" />
          <Volume2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-purple-500 dark:text-purple-400" />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            {track.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300">{track.artist}</p>
        </div>

        <div className="flex justify-center items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="p-4 rounded-full bg-purple-500 text-white shadow-lg hover:bg-purple-600 transition-colors"
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
            onClick={nextTrack}
            className="p-4 rounded-full bg-pink-500 text-white shadow-lg hover:bg-pink-600 transition-colors"
          >
            <SkipForward className="w-8 h-8" />
          </motion.button>
        </div>

        <audio
          ref={audioRef}
          src={track.url}
          onEnded={nextTrack}
          onError={(e) => console.error("Audio playback error:", e)}
        />
      </motion.div>
    </div>
  );
}