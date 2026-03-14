import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaJsSquare, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaGithub, FaPython } from 'react-icons/fa';
import { SiTailwindcss, SiVite, SiFramer, SiFigma, SiDocker, SiPostman, SiMongodb, SiTypescript, SiFirebase, SiFlutter, SiMysql, SiGraphql } from 'react-icons/si';

const baseIcons = [
  { Icon: FaReact, color: '#61DAFB', size: 45 },
  { Icon: FaJsSquare, color: '#F7DF1E', size: 40 },
  { Icon: SiTypescript, color: '#3178C6', size: 40 },
  { Icon: FaHtml5, color: '#E34F26', size: 35 },
  { Icon: FaCss3Alt, color: '#1572B6', size: 35 },
  { Icon: SiTailwindcss, color: '#06B6D4', size: 40 },
  { Icon: FaNodeJs, color: '#339933', size: 45 },
  { Icon: FaPython, color: '#3776AB', size: 45 },
  { Icon: FaGitAlt, color: '#F05032', size: 35 },
  { Icon: SiVite, color: '#646CFF', size: 40 },
  { Icon: SiFramer, color: '#0055FF', size: 35 },
  { Icon: FaGithub, color: '#ffffff', size: 40 },
  { Icon: SiFigma, color: '#F24E1E', size: 35 },
  { Icon: SiDocker, color: '#2496ED', size: 45 },
  { Icon: SiPostman, color: '#FF6C37', size: 40 },
  { Icon: SiMongodb, color: '#47A248', size: 45 },
  { Icon: SiFirebase, color: '#FFCA28', size: 40 },
  { Icon: SiFlutter, color: '#02569B', size: 45 },
  { Icon: SiMysql, color: '#4479A1', size: 40 },
  { Icon: SiGraphql, color: '#E10098', size: 35 },
];

// Duplicate the icons to have more floating around
const icons = [...baseIcons, ...baseIcons];

export default function FloatingBackground() {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ perspective: '1000px' }}>
      {/* Dynamic Background Gradients - Made bolder */}
      <div className="absolute top-0 w-[600px] h-[600px] bg-purple-500/20 dark:bg-purple-500/30 rounded-full blur-[120px] -left-32 -mt-32" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/20 dark:bg-blue-600/30 rounded-full blur-[120px] -mr-32 -mb-32" />

      {/* Floating Icons */}
      {icons.map((item, index) => {
        // Distribute starting positions evenly across the screen
        const startX = Math.random() * dimensions.width;
        const startY = Math.random() * dimensions.height;
        
        return (
          <motion.div
            key={index}
            className="absolute"
            initial={{
              x: startX,
              y: startY,
              opacity: 0,
              scale: 0,
              rotateX: 0,
              rotateY: 0,
              rotateZ: 0,
            }}
            animate={{
              x: [
                startX,
                Math.random() * dimensions.width,
                Math.random() * dimensions.width,
                startX // Return near start to loop
              ],
              y: [
                startY,
                Math.random() * dimensions.height,
                Math.random() * dimensions.height,
                startY
              ],
              opacity: [0.15, 0.4, 0.4, 0.15],
              scale: [0.8, 1.2, 1.1, 0.8],
              rotateX: [0, 180, 360, 540],
              rotateY: [0, 180, 360, 540],
              rotateZ: [0, 90, 180, 360],
            }}
            transition={{
              duration: 40 + Math.random() * 40,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div style={{ filter: `drop-shadow(0px 10px 15px ${item.color}60) drop-shadow(0px 5px 8px rgba(0,0,0,0.3))` }}>
              <item.Icon size={item.size} color={item.color} />
            </div>
          </motion.div>
        );
      })}

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />
    </div>
  );
}
