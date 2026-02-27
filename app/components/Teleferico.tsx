'use client';

import { motion } from 'framer-motion';

interface TelefericoProps {
  startX: number;
  y: number;
  delay?: number;
  color?: 'purple' | 'red' | 'yellow';
}

export default function Teleferico({ startX, y, delay = 0, color = 'purple' }: TelefericoProps) {
  const colors = {
    purple: {
      main: 'from-purple-600 via-purple-700 to-purple-800',
      accent: 'bg-purple-900',
      shadow: 'rgba(139, 92, 246, 0.6)',
    },
    red: {
      main: 'from-red-600 via-red-700 to-red-800',
      accent: 'bg-red-900',
      shadow: 'rgba(220, 38, 38, 0.6)',
    },
    yellow: {
      main: 'from-yellow-500 via-yellow-600 to-yellow-700',
      accent: 'bg-yellow-800',
      shadow: 'rgba(234, 179, 8, 0.6)',
    },
  };

  const selectedColor = colors[color];

  return (
    <motion.div
      className="absolute z-10"
      initial={{ x: startX, y }}
      animate={{
        x: [startX, startX + 1400],
      }}
      transition={{
        duration: 25,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div className="relative">
        {/* Cable principal más grueso y realista */}
        <div className="absolute -top-32 left-0 w-48 h-1 bg-linear-to-r from-gray-600 via-gray-700 to-gray-600 shadow-lg rounded-full"></div>
        
        {/* Sistema de poleas y enganche */}
        <div className="absolute -top-36 left-20">
          {/* Polea superior */}
          <motion.div
            className="relative w-12 h-12 border-4 border-gray-800 rounded-full bg-linear-to-br from-gray-600 to-gray-700 shadow-xl"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-900 rounded-full"></div>
            {/* Rayos de la polea */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-800 transform -translate-y-1/2"></div>
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-800 transform -translate-x-1/2"></div>
          </motion.div>
        </div>

        {/* Cables de soporte dobles - más realistas */}
        <motion.div
          className="absolute -top-32 left-22 w-1 h-32 bg-linear-to-b from-gray-600 to-gray-700 shadow-lg rounded-full"
          animate={{
            rotate: [0, 1, -1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -top-32 left-23 w-1 h-32 bg-linear-to-b from-gray-600 to-gray-700 shadow-lg rounded-full"
          animate={{
            rotate: [0, -1, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Cabina del teleférico - más grande y realista */}
        <motion.div
          className={`relative w-40 h-32 bg-linear-to-br ${selectedColor.main} rounded-2xl shadow-2xl overflow-hidden border-4 border-gray-800`}
          animate={{
            y: [0, -4, 0],
            rotateX: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            boxShadow: `0 15px 40px ${selectedColor.shadow}`,
          }}
        >
          {/* Techo metálico */}
          <div className={`absolute top-0 left-0 right-0 h-4 ${selectedColor.accent} border-b-2 border-gray-900`}>
            {/* Ventilación */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 flex gap-1">
              <div className="w-1 h-2 bg-gray-700 rounded-full"></div>
              <div className="w-1 h-2 bg-gray-700 rounded-full"></div>
              <div className="w-1 h-2 bg-gray-700 rounded-full"></div>
            </div>
          </div>

          {/* Ventanas grandes panorámicas */}
          <div className="absolute top-6 left-2 w-16 h-20 bg-linear-to-br from-blue-100 via-blue-200 to-blue-300 border-3 border-gray-700 opacity-85 rounded-lg overflow-hidden">
            {/* Marco de ventana */}
            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-700 transform -translate-x-1/2"></div>
            <div className="absolute left-0 right-0 top-1/3 h-1 bg-gray-700"></div>
            <div className="absolute left-0 right-0 top-2/3 h-1 bg-gray-700"></div>
            {/* Reflejo realista */}
            <motion.div
              className="absolute top-2 left-2 w-6 h-8 bg-white opacity-40 rounded blur-sm"
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
            {/* Reflejo del cielo */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-linear-to-b from-sky-200 to-transparent opacity-30"></div>
          </div>

          <div className="absolute top-6 right-2 w-16 h-20 bg-linear-to-br from-blue-100 via-blue-200 to-blue-300 border-3 border-gray-700 opacity-85 rounded-lg overflow-hidden">
            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-700 transform -translate-x-1/2"></div>
            <div className="absolute left-0 right-0 top-1/3 h-1 bg-gray-700"></div>
            <div className="absolute left-0 right-0 top-2/3 h-1 bg-gray-700"></div>
            <motion.div
              className="absolute top-2 right-2 w-6 h-8 bg-white opacity-40 rounded blur-sm"
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 1.5,
              }}
            />
            <div className="absolute top-0 left-0 right-0 h-6 bg-linear-to-b from-sky-200 to-transparent opacity-30"></div>
          </div>

          {/* Puerta central */}
          <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-14 h-24 ${selectedColor.accent} rounded-t-2xl border-4 border-gray-900`}>
            <div className="absolute top-4 left-2 right-2 h-12 bg-linear-to-br from-blue-200 to-blue-300 opacity-70 rounded border-2 border-gray-800">
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-700"></div>
            </div>
            {/* Manija de la puerta */}
            <div className="absolute top-14 right-2 w-1.5 h-4 bg-gray-800 rounded-full"></div>
          </div>

          {/* Número de identificación */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-0.5 rounded shadow-lg">
            <div className="text-gray-900 font-bold text-xs">MI TELEFÉRICO</div>
          </div>

          {/* Luces indicadoras */}
          <motion.div
            className="absolute top-2 left-2 w-2 h-2 bg-green-400 rounded-full shadow-lg"
            animate={{
              opacity: [1, 0.4, 1],
              boxShadow: ['0 0 4px rgba(74, 222, 128, 0.8)', '0 0 8px rgba(74, 222, 128, 1)', '0 0 4px rgba(74, 222, 128, 0.8)'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full shadow-lg"
            animate={{
              opacity: [0.4, 1, 0.4],
              boxShadow: ['0 0 4px rgba(248, 113, 113, 0.8)', '0 0 8px rgba(248, 113, 113, 1)', '0 0 4px rgba(248, 113, 113, 0.8)'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1,
            }}
          />

          {/* Base/piso de la cabina */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-800 border-t-2 border-gray-900"></div>

          {/* Detalles metálicos laterales */}
          <div className="absolute top-4 left-0 w-2 h-24 bg-linear-to-b from-gray-700 to-gray-800 border-r border-gray-900"></div>
          <div className="absolute top-4 right-0 w-2 h-24 bg-linear-to-b from-gray-700 to-gray-800 border-l border-gray-900"></div>
        </motion.div>
      </div>
    </motion.div>
  );
}
