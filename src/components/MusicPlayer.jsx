import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio(playlist[0].url));

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Playback failed:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const nextTrack = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextTrack);
    audioRef.current.src = playlist[nextTrack].url;
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Playback failed:", error);
      });
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      const value = (audio.currentTime / audio.duration) * 100;
      setProgress(isNaN(value) ? 0 : value);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleNext);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleNext);
    };
  }, [currentTrack]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-slate-200 dark:border-slate-700 shadow-xl"
    >
      <div className="relative">
        <motion.div 
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg"
        >
          <Volume2 className="w-16 h-16 text-white" />
        </motion.div>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
          {playlist[currentTrack].title}
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          {playlist[currentTrack].artist}
        </p>
      </div>

      <div className="mb-6">
        <div className="h-1 w-full bg-slate-200 dark:bg-slate-700 rounded-full">
          <div 
            className="h-full bg-purple-500 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handlePlayPause}
          className="p-4 rounded-full bg-purple-500 hover:bg-purple-600 text-white shadow-lg transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="p-4 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-white shadow-lg transition-colors"
        >
          <SkipForward className="w-6 h-6" />
        </motion.button>
      </div>
    </motion.div>
  );
}