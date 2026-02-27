'use client';

import { motion } from 'framer-motion';

interface ChoquitoCharacterProps {
  position: { x: number; y: number };
  isJumping: boolean;
  scale?: number;
}

export default function ChoquitoCharacter({ position, isJumping, scale = 1 }: ChoquitoCharacterProps) {
  const s = Math.min(scale, 1.4);

  return (
    <motion.div
      className="absolute z-20 flex flex-col items-center"
      style={{
        left: position.x,
        top: position.y,
        transform: `scale(${s})`,
        transformOrigin: 'bottom center',
      }}
      animate={{
        y: isJumping ? -20 * s : [0, -4 * s, 0],
      }}
      transition={{
        y: isJumping
          ? { type: 'spring', stiffness: 300, damping: 15 }
          : { duration: 2, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <motion.div
        className="relative w-20 h-24 flex flex-col items-center"
        animate={{
          rotate: isJumping ? [-5, 10, 0] : 0,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Casquito */}
        <motion.div
          className="w-16 h-10 bg-gradient-to-b from-purple-400 to-purple-600 rounded-t-full relative shadow-lg"
          style={{ boxShadow: '0 4px 15px rgba(139, 92, 246, 0.6)' }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-yellow-300 opacity-70 rounded-full blur-sm" />
          <div className="absolute -bottom-1 left-0 right-0 h-2 bg-purple-700 rounded-b-lg" />
        </motion.div>

        {/* Cabeza */}
        <motion.div
          className="w-12 h-14 bg-gradient-to-b from-amber-200 to-amber-300 rounded-lg relative"
          animate={{ scaleY: isJumping ? 0.95 : 1, y: isJumping ? 2 : 0 }}
          style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}
        >
          <div className="absolute top-4 left-2 w-2 h-2 bg-black rounded-full" />
          <div className="absolute top-4 right-2 w-2 h-2 bg-black rounded-full" />
          <motion.div
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-4"
            animate={{
              scaleY: isJumping ? 1.5 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-full h-full border-b-2 border-black rounded-b-full"></div>
          </motion.div>
        </motion.div>

        {/* Cuerpo */}
        <div className="absolute bottom-0 w-16 h-6 bg-gradient-to-t from-purple-600 to-purple-500 rounded-b-lg" />
      </motion.div>
      
      {/* Sombra */}
      <motion.div
        className="w-12 h-3 bg-black rounded-full opacity-20"
        style={{ filter: 'blur(4px)' }}
        animate={{
          scale: isJumping ? 0.7 : 1,
          opacity: isJumping ? 0.1 : 0.25,
          y: isJumping ? 30 * s : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      />
    </motion.div>
  );
}
