'use client';

import { motion } from 'framer-motion';

interface DogProps {
  x: number;
  y: number;
  color?: 'brown' | 'black' | 'white' | 'golden';
  delay?: number;
}

export default function Dog({ x, y, color = 'brown', delay = 0 }: DogProps) {
  const colors = {
    brown: 'from-amber-700 to-amber-800',
    black: 'from-gray-800 to-gray-900',
    white: 'from-gray-100 to-gray-300',
    golden: 'from-yellow-600 to-yellow-700',
  };

  const selectedColor = colors[color];

  return (
    <motion.div
      className="absolute z-15"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="relative w-12 h-10">
        {/* Cuerpo */}
        <motion.div
          className={`absolute bottom-0 left-2 w-10 h-6 bg-linear-to-br ${selectedColor} rounded-full`}
          animate={{
            scaleY: [1, 0.98, 1],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />

        {/* Cabeza */}
        <motion.div
          className={`absolute top-0 left-0 w-6 h-6 bg-linear-to-br ${selectedColor} rounded-full`}
          animate={{
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Hocico */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-amber-900 rounded-full">
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full"></div>
          </div>

          {/* Ojos */}
          <motion.div
            className="absolute top-1 left-1 w-1.5 h-1.5 bg-black rounded-full"
            animate={{
              scaleY: [1, 0.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
          <motion.div
            className="absolute top-1 right-1 w-1.5 h-1.5 bg-black rounded-full"
            animate={{
              scaleY: [1, 0.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />

          {/* Orejas */}
          <motion.div
            className={`absolute -top-1 -left-1 w-3 h-4 bg-linear-to-br ${selectedColor} rounded-full`}
            style={{ transform: 'rotate(-20deg)' }}
            animate={{
              rotate: [-20, -25, -20],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className={`absolute -top-1 -right-1 w-3 h-4 bg-linear-to-br ${selectedColor} rounded-full`}
            style={{ transform: 'rotate(20deg)' }}
            animate={{
              rotate: [20, 25, 20],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Cola */}
        <motion.div
          className={`absolute bottom-1 right-0 w-2 h-5 bg-linear-to-br ${selectedColor} rounded-full`}
          style={{ transformOrigin: 'top center' }}
          animate={{
            rotate: [10, 40, 10],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Patas */}
        <div className={`absolute bottom-0 left-3 w-1.5 h-3 bg-linear-to-br ${selectedColor} rounded-full`}></div>
        <div className={`absolute bottom-0 left-5 w-1.5 h-3 bg-linear-to-br ${selectedColor} rounded-full`}></div>
        <div className={`absolute bottom-0 left-7 w-1.5 h-3 bg-linear-to-br ${selectedColor} rounded-full`}></div>
        <div className={`absolute bottom-0 left-9 w-1.5 h-3 bg-linear-to-br ${selectedColor} rounded-full`}></div>

        {/* Collar (opcional) */}
        <div className="absolute top-5 left-1 w-5 h-1 bg-purple-600 rounded">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
        </div>
      </div>
    </motion.div>
  );
}
