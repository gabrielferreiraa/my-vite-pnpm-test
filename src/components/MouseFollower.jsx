import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const MouseFollower = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Create particle
      if (Math.random() > 0.8) {
        const particle = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 4 + 2,
          lifetime: 600
        };
        setParticles(prev => [...prev, particle]);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Cleanup particles after their lifetime
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.filter(particle => 
        Date.now() - particle.id < particle.lifetime
      ));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Main cursor orb */}
      <motion.div
        className="cursor-dot fixed top-0 left-0 w-8 h-8 pointer-events-none z-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <div className="relative w-full h-full">
          {/* Inner orb */}
          <div className="absolute inset-0 bg-white rounded-full opacity-80 animate-pulse-slow" />
          
          {/* Outer ring */}
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full opacity-60 blur-sm" />
          
          {/* Core */}
          <div className="absolute inset-2 bg-gradient-to-br from-white to-indigo-200 rounded-full shadow-lg" />
        </div>
      </motion.div>

      {/* Particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="particle"
          initial={{
            x: particle.x,
            y: particle.y,
            scale: 1,
            opacity: 0.8,
          }}
          animate={{
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: particle.lifetime / 1000,
            ease: "easeOut"
          }}
          style={{
            width: particle.size,
            height: particle.size,
            x: particle.x,
            y: particle.y,
          }}
        />
      ))}
    </>
  );
};

export default MouseFollower;