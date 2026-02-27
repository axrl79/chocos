'use client';

import { motion } from 'framer-motion';

interface PacenoBuildingProps {
  x: number;
  scale?: number;
}

export default function PacenoBuilding({ x, scale = 1 }: PacenoBuildingProps) {
  const s = Math.min(scale, 1.3);

  return (
    <motion.div
      className="absolute bottom-32 z-5"
      style={{ left: x, transform: `scale(${s})`, transformOrigin: 'bottom left' }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <div className="relative w-64 h-96">
        {/* Techo con tejas */}
        <div className="absolute -top-8 left-0 right-0">
          <div
            className="w-full h-12 bg-linear-to-b from-red-700 to-red-900"
            style={{
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))',
            }}
          >
            {[...Array(8)].map((_, i) => (
              <div key={i} className="absolute bottom-0 h-3 w-8 bg-red-800 border-b-2 border-red-950" style={{ left: `${i * 12}%` }} />
            ))}
          </div>
        </div>

        {/* Cuerpo principal */}
        <div className="relative w-full h-full bg-linear-to-br from-orange-300 via-orange-400 to-orange-500 shadow-2xl border-4 border-orange-600">
          {/* Textura */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h20v20H0z\' fill=\'none\'/%3E%3Cpath d=\'M1 1h1v1H1zm2 2h1v1H3zm2 2h1v1H5zm2 2h1v1H7zm2 2h1v1H9zm2 2h1v1h-1zm2 2h1v1h-1z\' fill=\'%23000\'/%3E%3C/svg%3E")',
            }}
          />

          {/* Balcón - PISO 3 */}
          <div className="absolute top-16 left-8 right-8">
            <div className="relative">
              <div className="w-full h-20 bg-linear-to-b from-amber-700 to-amber-900 rounded-t-lg border-4 border-amber-800">
                <div className="absolute top-2 left-2 right-2 h-12 border-2 border-gray-800 rounded">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute top-0 bottom-0 w-0.5 bg-gray-900" style={{ left: `${i * 12.5}%` }} />
                  ))}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-900" />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-24 bg-linear-to-b from-amber-800 to-amber-950 rounded-t-lg border-2 border-amber-900">
                  <div className="absolute top-2 left-2 right-2 h-8 bg-blue-200 opacity-60 border border-amber-900">
                    <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-amber-900" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ventanas PISO 2 */}
          <div className="absolute top-44 left-0 right-0 flex justify-around px-4">
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={i}
                className="relative w-16 h-20 bg-linear-to-br from-amber-700 to-amber-900 rounded-lg border-4 border-amber-800"
                animate={{
                  boxShadow: [
                    '0 4px 6px rgba(0, 0, 0, 0.3)',
                    '0 4px 12px rgba(253, 224, 71, 0.4)',
                    '0 4px 6px rgba(0, 0, 0, 0.3)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 1.5 }}
              >
                <div className="absolute inset-2 bg-linear-to-br from-blue-200 to-blue-300 opacity-70 rounded border-2 border-amber-900">
                  <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-amber-900 transform -translate-x-1/2" />
                  <div className="absolute left-0 right-0 top-1/2 h-1 bg-amber-900 transform -translate-y-1/2" />
                  <div className="absolute top-1 left-1 w-4 h-4 bg-white opacity-40 rounded" />
                </div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-red-700 rounded-b-lg">
                  <motion.div className="absolute -top-2 left-2 w-2 h-2 bg-pink-500 rounded-full" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                  <motion.div className="absolute -top-2 left-5 w-2 h-2 bg-red-500 rounded-full" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
                  <motion.div className="absolute -top-2 right-2 w-2 h-2 bg-yellow-500 rounded-full" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Ventanas PISO 1 */}
          <div className="absolute bottom-16 left-0 right-0 flex justify-around px-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="relative w-12 h-16 bg-linear-to-br from-amber-700 to-amber-900 rounded-lg border-3 border-amber-800">
                <div className="absolute inset-2 bg-linear-to-br from-blue-200 to-blue-300 opacity-70 rounded border border-amber-900">
                  <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-amber-900" />
                  <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-amber-900" />
                </div>
              </div>
            ))}
          </div>

          {/* Puerta principal */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-28 bg-linear-to-b from-amber-800 to-amber-950 rounded-t-2xl border-4 border-amber-900">
            <div className="absolute -top-4 left-0 right-0 h-8 bg-amber-800 border-4 border-amber-900" style={{ borderRadius: '50% 50% 0 0' }} />
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-10 bg-blue-300 opacity-60 rounded border-2 border-amber-900">
              <div className="absolute inset-1 border border-amber-900 rounded" />
            </div>
            <div className="absolute top-16 right-2 w-2 h-3 bg-yellow-600 rounded-full" />
            <div className="absolute bottom-4 left-2 right-2 h-0.5 bg-amber-700" />
            <div className="absolute bottom-2 left-2 right-2 h-0.5 bg-amber-700" />
          </div>

          {/* Letrero */}
          <motion.div
            className="absolute top-8 left-4 bg-amber-900 px-3 py-1 rounded shadow-lg border-2 border-amber-700"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="text-orange-200 font-bold text-xs">TIENDA</div>
          </motion.div>

          {/* Sombras */}
          <div className="absolute top-0 left-0 w-2 h-full bg-orange-700 opacity-50" />
          <div className="absolute top-0 right-0 w-2 h-full bg-orange-600 opacity-30" />
        </div>

        {/* Zócalo */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-b from-stone-600 to-stone-800 border-t-4 border-stone-700">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute top-0 h-full w-px bg-stone-900 opacity-50" style={{ left: `${i * 16}%` }} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
