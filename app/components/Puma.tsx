'use client';

import { motion } from 'framer-motion';

interface PumaProps {
  x: number;
  y: number;
  delay?: number;
}

export default function Puma({ x, y, delay = 0 }: PumaProps) {
  return (
    <motion.div
      className="absolute z-15"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="relative w-24 h-20">
        {/* Cuerpo del puma */}
        <motion.div
          className="absolute bottom-2 left-4 w-20 h-10 bg-linear-to-br from-amber-600 to-amber-800 rounded-full"
          animate={{
            scaleY: [1, 0.98, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          }}
        />

        {/* Cabeza */}
        <motion.div
          className="absolute top-0 left-0 w-12 h-12 bg-linear-to-br from-amber-600 to-amber-800 rounded-full"
          animate={{
            rotate: [0, -3, 3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Hocico */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-5 bg-amber-900 rounded-full">
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-2 bg-black rounded-full"></div>
            {/* Boca */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-1 border-b-2 border-black rounded-b-full"></div>
          </div>

          {/* Ojos felinos */}
          <motion.div
            className="absolute top-2 left-1.5 w-2.5 h-3 bg-yellow-300 rounded-full"
            animate={{
              scaleY: [1, 0.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-2 bg-black rounded-full"></div>
          </motion.div>
          <motion.div
            className="absolute top-2 right-1.5 w-2.5 h-3 bg-yellow-300 rounded-full"
            animate={{
              scaleY: [1, 0.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-2 bg-black rounded-full"></div>
          </motion.div>

          {/* Orejas redondeadas */}
          <div className="absolute -top-2 left-1 w-4 h-4 bg-amber-700 rounded-full"></div>
          <div className="absolute -top-2 right-1 w-4 h-4 bg-amber-700 rounded-full"></div>
          
          {/* Interior de orejas */}
          <div className="absolute -top-1.5 left-1.5 w-2 h-2 bg-amber-900 rounded-full"></div>
          <div className="absolute -top-1.5 right-1.5 w-2 h-2 bg-amber-900 rounded-full"></div>

          {/* Bigotes */}
          <div className="absolute top-4 -left-2 w-3 h-0.5 bg-gray-800 opacity-70"></div>
          <div className="absolute top-5 -left-2 w-3 h-0.5 bg-gray-800 opacity-70"></div>
          <div className="absolute top-4 -right-2 w-3 h-0.5 bg-gray-800 opacity-70"></div>
          <div className="absolute top-5 -right-2 w-3 h-0.5 bg-gray-800 opacity-70"></div>
        </motion.div>

        {/* Cola larga y curva */}
        <motion.div
          className="absolute bottom-4 right-0 w-3 h-12 bg-linear-to-b from-amber-700 to-amber-900 rounded-full"
          style={{ 
            transformOrigin: 'top center',
            transform: 'rotate(-30deg)',
          }}
          animate={{
            rotate: [-30, -10, -30],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Punta negra de la cola */}
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-gray-900 rounded-full"></div>
        </motion.div>

        {/* Patas delanteras */}
        <motion.div
          className="absolute bottom-0 left-5 w-3 h-6 bg-amber-700 rounded-lg"
          animate={{
            scaleY: [1, 0.9, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-amber-900 rounded-full"></div>
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-9 w-3 h-6 bg-amber-700 rounded-lg"
          animate={{
            scaleY: [1, 0.9, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-amber-900 rounded-full"></div>
        </motion.div>

        {/* Patas traseras */}
        <motion.div
          className="absolute bottom-0 left-14 w-3 h-6 bg-amber-700 rounded-lg"
          animate={{
            scaleY: [1, 0.9, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-amber-900 rounded-full"></div>
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-18 w-3 h-6 bg-amber-700 rounded-lg"
          animate={{
            scaleY: [1, 0.9, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-amber-900 rounded-full"></div>
        </motion.div>

        {/* Manchas del pelaje */}
        <div className="absolute top-8 left-6 w-2 h-2 bg-amber-900 rounded-full opacity-50"></div>
        <div className="absolute top-10 left-10 w-2 h-2 bg-amber-900 rounded-full opacity-50"></div>
        <div className="absolute top-7 left-14 w-2 h-2 bg-amber-900 rounded-full opacity-50"></div>
      </div>
    </motion.div>
  );
}
