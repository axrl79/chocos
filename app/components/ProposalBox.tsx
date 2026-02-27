'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ProposalBoxProps {
  x: number;
  y: number;
  proposals: string[];
  onHit?: () => void;
  isHit?: boolean;
  currentProposal: number;
}

export default function ProposalBox({ 
  x, 
  y, 
  proposals, 
  onHit, 
  isHit = false,
  currentProposal 
}: ProposalBoxProps) {
  const [showProposal, setShowProposal] = useState(false);

  useEffect(() => {
    if (isHit) {
      setShowProposal(true);
      setTimeout(() => {
        setShowProposal(false);
      }, 4000);
    }
  }, [isHit]);

  const proposalText = proposals[currentProposal] || 'Propuesta descubierta!';

  return (
    <div className="absolute" style={{ left: x, top: y }}>
      {/* Caja estilo Mario Bros mejorada */}
      <motion.div
        className="relative w-24 h-24 cursor-pointer"
        animate={{
          y: isHit ? [-15, 0] : 0,
          scale: isHit ? [1, 1.15, 1] : 1,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        onClick={onHit}
      >
        {/* Caja principal con efecto 3D */}
        <motion.div
          className={`w-full h-full rounded-xl shadow-2xl relative overflow-hidden ${
            isHit ? 'bg-linear-to-br from-gray-600 via-gray-700 to-gray-800' : 'bg-linear-to-br from-purple-400 via-purple-500 to-purple-600'
          }`}
          animate={{
            boxShadow: isHit
              ? '0 8px 16px rgba(0, 0, 0, 0.5)'
              : [
                  '0 8px 20px rgba(139, 92, 246, 0.6)',
                  '0 12px 30px rgba(139, 92, 246, 1)',
                  '0 8px 20px rgba(139, 92, 246, 0.6)',
                ],
          }}
          transition={{
            duration: 1.5,
            repeat: isHit ? 0 : Infinity,
          }}
          style={{
            border: '4px solid',
            borderColor: isHit ? '#4a5568' : '#a855f7',
          }}
        >
          {/* Símbolo de interrogación más grande y llamativo */}
          {!isHit && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-white font-black text-5xl"
              style={{
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.5)',
                fontFamily: 'Arial Black, sans-serif',
              }}
              animate={{
                scale: [1, 1.25, 1],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ?
            </motion.div>
          )}

          {/* Efecto de brillo animado */}
          {!isHit && (
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-40"
              animate={{
                x: ['-150%', '150%'],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "easeInOut",
              }}
            />
          )}

          {/* Bordes estilo pixel art 3D */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-purple-300 opacity-80 rounded-t-xl"></div>
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-purple-900 opacity-80 rounded-b-xl"></div>
          <div className="absolute top-0 bottom-0 left-0 w-2 bg-purple-300 opacity-80 rounded-l-xl"></div>
          <div className="absolute top-0 bottom-0 right-0 w-2 bg-purple-900 opacity-80 rounded-r-xl"></div>

          {/* Detalles tipo bloque de Mario */}
          <div className="absolute top-3 left-3 w-3 h-3 bg-purple-200 opacity-60 rounded"></div>
          <div className="absolute top-3 right-3 w-3 h-3 bg-purple-200 opacity-60 rounded"></div>
          <div className="absolute bottom-3 left-3 w-3 h-3 bg-purple-800 opacity-60 rounded"></div>
          <div className="absolute bottom-3 right-3 w-3 h-3 bg-purple-800 opacity-60 rounded"></div>

          {/* Patrón de puntos decorativo */}
          {!isHit && (
            <div className="absolute inset-4 grid grid-cols-3 gap-1 opacity-30">
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 bg-white rounded-full"
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Efecto de partículas más abundantes al golpear */}
        <AnimatePresence>
          {isHit && (
            <>
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-purple-400 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  animate={{
                    x: Math.cos((i * Math.PI * 2) / 16) * 60,
                    y: Math.sin((i * Math.PI * 2) / 16) * 60 - 20,
                    opacity: 0,
                    scale: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                />
              ))}
              {/* Estrellas adicionales */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  className="absolute text-yellow-400 text-2xl"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    rotate: 0,
                  }}
                  animate={{
                    x: Math.cos((i * Math.PI * 2) / 8) * 50,
                    y: Math.sin((i * Math.PI * 2) / 8) * 50 - 30,
                    opacity: 0,
                    rotate: 360,
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Sombra del bloque */}
        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-3 bg-black opacity-30 rounded-full blur-md"
          animate={{
            scale: isHit ? 0.8 : 1,
            opacity: isHit ? 0.2 : 0.3,
          }}
        />
      </motion.div>

      {/* Propuesta emergente mejorada */}
      <AnimatePresence>
        {showProposal && (
          <motion.div
            className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-80 z-50"
            initial={{ opacity: 0, y: 30, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.7 }}
            transition={{
              type: 'spring',
              damping: 12,
              stiffness: 200,
            }}
          >
            <div className="relative bg-linear-to-br from-purple-600 via-purple-700 to-purple-800 rounded-2xl p-5 shadow-2xl border-4 border-purple-400">
              {/* Flecha apuntando hacia abajo */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-12 border-r-12 border-t-12 border-transparent border-t-purple-800"></div>
              
              {/* Icono decorativo */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl shadow-lg border-4 border-white">
                💡
              </div>

              <div className="mt-4">
                <h3 className="text-purple-200 text-xs font-bold text-center mb-2 uppercase tracking-wide">
                  Propuesta #{currentProposal + 1}
                </h3>
                <p className="text-white text-base font-bold text-center leading-snug">
                  {proposalText}
                </p>
              </div>

              {/* Efecto de brillo */}
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-20 rounded-2xl pointer-events-none"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              {/* Decoración de esquinas */}
              <div className="absolute top-2 left-2 w-2 h-2 bg-purple-300 opacity-70 rounded-full"></div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-purple-300 opacity-70 rounded-full"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-purple-300 opacity-70 rounded-full"></div>
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-purple-300 opacity-70 rounded-full"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
