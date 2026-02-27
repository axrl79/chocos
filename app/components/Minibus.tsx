'use client';

import { motion } from 'framer-motion';

interface MinibusProps {
  startX: number;
  y: number;
  delay?: number;
  direction?: 'left' | 'right';
}

export default function Minibus({ startX, y, delay = 0, direction = 'right' }: MinibusProps) {
  const isGoingRight = direction === 'right';
  
  return (
    <motion.div
      className="absolute z-10"
      initial={{ x: startX, y }}
      animate={{
        x: isGoingRight ? [startX, startX + 1500] : [startX, startX - 1500],
      }}
      transition={{
        duration: 15,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        transform: isGoingRight ? 'none' : 'scaleX(-1)',
      }}
    >
      <div className="relative w-32 h-20">
        {/* Cuerpo del minibus */}
        <div className="absolute bottom-0 w-full h-16 bg-linear-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg shadow-lg">
          {/* Franja decorativa */}
          <div className="absolute top-6 left-0 right-0 h-2 bg-purple-600"></div>
          
          {/* Ventanas */}
          <div className="absolute top-2 left-2 w-6 h-8 bg-blue-200 border border-gray-700 rounded opacity-80">
            <div className="absolute top-1 left-1 w-2 h-2 bg-white opacity-60 rounded"></div>
          </div>
          <div className="absolute top-2 left-10 w-6 h-8 bg-blue-200 border border-gray-700 rounded opacity-80"></div>
          <div className="absolute top-2 left-18 w-6 h-8 bg-blue-200 border border-gray-700 rounded opacity-80"></div>
          <div className="absolute top-2 right-2 w-6 h-8 bg-blue-200 border border-gray-700 rounded opacity-80"></div>

          {/* Parabrisas delantero */}
          <div className="absolute top-2 left-2 w-10 h-6 bg-linear-to-br from-blue-100 to-blue-200 rounded border-2 border-gray-600 opacity-70">
            {/* Limpiaparabrisas */}
            <div className="absolute -bottom-1 left-1 w-8 h-0.5 bg-gray-700"></div>
          </div>

          {/* Puerta */}
          <div className="absolute top-10 left-16 w-8 h-6 bg-yellow-700 border-l-2 border-r-2 border-gray-800">
            <div className="absolute top-2 left-1 w-1 h-3 bg-gray-600"></div>
          </div>

          {/* Luces delanteras */}
          <motion.div
            className="absolute top-11 left-1 w-3 h-2 bg-yellow-100 rounded-full"
            animate={{
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            style={{
              boxShadow: '0 0 6px rgba(255, 255, 200, 0.8)',
            }}
          />

          {/* Luces traseras */}
          <div className="absolute top-11 right-1 w-2 h-2 bg-red-500 rounded-full"></div>

          {/* Espejo retrovisor */}
          <div className="absolute top-3 -left-2 w-2 h-1 bg-gray-700 rounded"></div>
        </div>

        {/* Ruedas */}
        <motion.div
          className="absolute bottom-0 left-4 w-6 h-6 bg-gray-900 rounded-full border-2 border-gray-700"
          animate={{
            rotate: isGoingRight ? 360 : -360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-600 rounded-full"></div>
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-600"></div>
        </motion.div>
        
        <motion.div
          className="absolute bottom-0 right-4 w-6 h-6 bg-gray-900 rounded-full border-2 border-gray-700"
          animate={{
            rotate: isGoingRight ? 360 : -360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-600 rounded-full"></div>
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-600"></div>
        </motion.div>

        {/* Escape */}
        <motion.div
          className="absolute bottom-2 right-0 w-1 h-2 bg-gray-800"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
        >
          {/* Humo del escape */}
          <motion.div
            className="absolute -top-2 left-1/2 w-4 h-4 bg-gray-400 rounded-full opacity-30 blur-sm"
            animate={{
              y: [-5, -15],
              opacity: [0.3, 0],
              scale: [0.5, 1.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
