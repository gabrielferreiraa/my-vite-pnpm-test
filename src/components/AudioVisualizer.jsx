import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AudioVisualizer({ audioRef, isPlaying }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const analyzerRef = useRef(null);
  
  useEffect(() => {
    if (!audioRef.current) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyzer = audioContext.createAnalyser();
    analyzerRef.current = analyzer;
    analyzer.fftSize = 256;
    
    const audioSource = audioContext.createMediaElementSource(audioRef.current);
    audioSource.connect(analyzer);
    analyzer.connect(audioContext.destination);

    return () => {
      audioContext.close();
    };
  }, [audioRef]);

  useEffect(() => {
    if (!canvasRef.current || !analyzerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const analyzer = analyzerRef.current;
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      analyzer.getByteFrequencyData(dataArray);
      
      ctx.clearRect(0, 0, width, height);
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(147, 51, 234, 0.2)'); // purple-600
      gradient.addColorStop(1, 'rgba(219, 39, 119, 0.2)'); // pink-600
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const barWidth = (width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * height * 0.7;
        
        // Create gradient for bars
        const barGradient = ctx.createLinearGradient(0, height - barHeight, 0, height);
        barGradient.addColorStop(0, 'rgba(147, 51, 234, 0.8)'); // purple-600
        barGradient.addColorStop(1, 'rgba(219, 39, 119, 0.8)'); // pink-600
        
        ctx.fillStyle = barGradient;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);
        
        // Add glow effect
        ctx.shadowColor = 'rgba(147, 51, 234, 0.5)';
        ctx.shadowBlur = 15;
        
        x += barWidth + 1;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    if (isPlaying) {
      draw();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // Clear canvas when paused
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-24 rounded-xl overflow-hidden bg-white/10 dark:bg-slate-800/10 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 shadow-lg"
    >
      <canvas
        ref={canvasRef}
        width={300}
        height={96}
        className="w-full h-full"
      />
    </motion.div>
  );
}