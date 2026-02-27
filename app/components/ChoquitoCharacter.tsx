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
      className="absolute z-20"
      style={{
        left: position.x,
        top: position.y,
        transform: `scale(${s})`,
        transformOrigin: 'bottom center',
      }}
      animate={{
        y: isJumping ? -20 * s : 0,
        rotate: isJumping ? [0, -10, 10, 0] : 0,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative w-20 h-24 flex flex-col items-center">
        {/* Casquito */}
        <motion.div
          className="w-16 h-10 bg-linear-to-b from-purple-400 to-purple-600 rounded-t-full relative shadow-lg"
          animate={{ rotateX: isJumping ? 10 : 0 }}
          style={{ boxShadow: '0 4px 6px rgba(139, 92, 246, 0.5)' }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-yellow-300 opacity-70 rounded" />
          <div className="absolute -bottom-1 left-0 right-0 h-2 bg-purple-700 rounded-b-lg" />
        </motion.div>

        {/* Cabeza */}
        <motion.div
          className="w-12 h-14 bg-linear-to-b from-amber-200 to-amber-300 rounded-lg relative"
          animate={{ scaleY: isJumping ? 0.95 : 1 }}
          style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}
        >
          <div className="absolute top-4 left-2 w-2 h-2 bg-black rounded-full" />
          <div className="absolute top-4 right-2 w-2 h-2 bg-black rounded-full" />
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-2 border-b-2 border-black rounded-b-full" />
        </motion.div>

        {/* Cuerpo */}
        <motion.div
          className="w-14 h-16 bg-purple-600 rounded-lg mt-1 relative"
          animate={{ scaleY: isJumping ? 1.05 : 1 }}
          style={{ boxShadow: '0 4px 8px rgba(139, 92, 246, 0.4)' }}
        >
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-800 rounded-full" />
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-800 rounded-full" />
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-800 rounded-full" />
        </motion.div>

        {/* Brazos */}
        <motion.div
          className="absolute top-14 -left-2 w-3 h-12 bg-purple-500 rounded-full"
          animate={{ rotate: isJumping ? -30 : -10 }}
          style={{ transformOrigin: 'top center' }}
        />
        <motion.div
          className="absolute top-14 -right-2 w-3 h-12 bg-purple-500 rounded-full"
          animate={{ rotate: isJumping ? 30 : 10 }}
          style={{ transformOrigin: 'top center' }}
        />

        {/* Piernas */}
        <motion.div className="absolute bottom-0 left-3 w-4 h-8 bg-blue-900 rounded-lg" animate={{ scaleY: isJumping ? 0.9 : 1 }} />
        <motion.div className="absolute bottom-0 right-3 w-4 h-8 bg-blue-900 rounded-lg" animate={{ scaleY: isJumping ? 0.9 : 1 }} />
      </div>

      {/* Sombra */}
      <motion.div
        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-black opacity-20 rounded-full blur-sm"
        animate={{ scale: isJumping ? 0.7 : 1, opacity: isJumping ? 0.1 : 0.3 }}
      />
    </motion.div>
  );
}
