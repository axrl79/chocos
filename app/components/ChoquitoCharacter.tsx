'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ChoquitoCharacterProps {
  position: { x: number; y: number };
  isJumping: boolean;
  scale?: number;
}

export default function ChoquitoCharacter({ position, isJumping, scale = 1 }: ChoquitoCharacterProps) {
  const s = Math.min(scale, 1.4);
  const charWidth = Math.round(88 * s);
  const charHeight = Math.round(106 * s);

  return (
    <motion.div
      className="absolute z-20 flex flex-col items-center"
      style={{
        left: position.x,
        top: position.y,
        transformOrigin: 'bottom center',
      }}
      animate={{
        y: isJumping ? 0 : [0, -4 * s, 0],
      }}
      transition={{
        y: isJumping
          ? { type: 'spring', stiffness: 300, damping: 15 }
          : { duration: 2, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      {/* Contenedor del personaje con crossfade */}
      <div style={{ position: 'relative', width: charWidth, height: charHeight }}>
        {/* Estado idle: choco-2.png */}
        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          animate={{ opacity: isJumping ? 0 : 1 }}
          transition={{ duration: 0.12, ease: 'easeInOut' }}
        >
          <Image
            src="/choco-2.png"
            alt="Choquito"
            fill
            style={{ objectFit: 'contain', objectPosition: 'bottom' }}
            priority
          />
        </motion.div>

        {/* Estado saltando: choco-1.png */}
        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          animate={{ opacity: isJumping ? 1 : 0 }}
          transition={{ duration: 0.12, ease: 'easeInOut' }}
        >
          <Image
            src="/choco-1.png"
            alt="Choquito saltando"
            fill
            style={{ objectFit: 'contain', objectPosition: 'bottom' }}
            priority
          />
        </motion.div>
      </div>

      {/* Sombra */}
      <motion.div
        className="bg-black rounded-full"
        style={{ filter: 'blur(5px)', width: charWidth * 0.6, height: 8 }}
        animate={{
          scaleX: isJumping ? 0.6 : 1,
          opacity: isJumping ? 0.08 : 0.2,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      />
    </motion.div>
  );
}
