'use client';

import { motion } from 'framer-motion';

interface BuildingProps {
  height: number;
  x: number;
  width?: number;
  color?: string;
}

export default function Building({ height, x, width = 80, color = 'purple' }: BuildingProps) {
  const colors = {
    purple: ['from-purple-700', 'to-purple-900'],
    blue: ['from-blue-700', 'to-blue-900'],
    indigo: ['from-indigo-700', 'to-indigo-900'],
  };

  const selectedColor = colors[color as keyof typeof colors] || colors.purple;
  
  // Generar ventanas aleatorias
  const windows = [];
  const rows = Math.floor(height / 25);
  const cols = Math.floor(width / 20);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const isLit = Math.random() > 0.5;
      windows.push({
        key: `${row}-${col}`,
        x: col * 18 + 8,
        y: row * 22 + 10,
        isLit,
      });
    }
  }

  return (
    <motion.div
      className="absolute bottom-0 z-0"
      style={{
        left: x,
        height,
        width,
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Edificio */}
      <div
        className={`relative h-full w-full bg-linear-to-b ${selectedColor[0]} ${selectedColor[1]} shadow-2xl`}
        style={{
          clipPath: 'polygon(0 100%, 0 5%, 10% 0, 90% 0, 100% 5%, 100% 100%)',
        }}
      >
        {/* Ventanas */}
        {windows.map((window) => (
          <motion.div
            key={window.key}
            className={`absolute w-3 h-4 ${
              window.isLit ? 'bg-yellow-300' : 'bg-blue-900'
            } rounded-sm`}
            style={{
              left: window.x,
              top: window.y,
              boxShadow: window.isLit ? '0 0 8px rgba(253, 224, 71, 0.8)' : 'none',
            }}
            animate={{
              opacity: window.isLit ? [1, 0.7, 1] : 1,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Antena en el techo */}
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2"
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-1 h-8 bg-gray-700"></div>
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"
            animate={{
              opacity: [1, 0.3, 1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Detalles arquitectónicos */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-950 opacity-70"></div>
        <div className="absolute top-0 left-0 right-0 h-2 bg-purple-800 opacity-50"></div>
      </div>
    </motion.div>
  );
}
