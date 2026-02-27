'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChoquitoCharacter from './ChoquitoCharacter';
import Teleferico from './Teleferico';
import Minibus from './Minibus';
import Puma from './Puma';
import ProposalBox from './ProposalBox';
import PacenoBuilding from './PacenoBuilding';

const PROPOSALS = [
  'Mejorar el transporte público con más teleféricos 🚡',
  'Crear espacios verdes para mascotas 🌳',
  'Modernizar la infraestructura urbana 🏗️',
  'Implementar carriles exclusivos para minibuses 🚌',
  'Desarrollar parques recreativos seguros 🎡',
  'Promover la movilidad sostenible ♻️',
  'Fortalecer la seguridad ciudadana 👮',
  'Mejorar la conectividad digital 📱',
];

export default function GameCanvas() {
  const [gameStarted, setGameStarted] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ x: 250, y: 440 });
  const [velocity, setVelocity] = useState(0);
  const [currentProposal, setCurrentProposal] = useState(0);
  const [hitCount, setHitCount] = useState(0);
  const [boxHit, setBoxHit] = useState(false);
  const gameLoopRef = useRef<number | null>(null);

  // Física del juego
  const GRAVITY = 0.8;
  const JUMP_FORCE = -16;
  const GROUND_LEVEL = 440;
  const BOX_POSITION = { x: 350, y: 300 }; // Posición del cuadro de Mario Bros

  const jump = useCallback(() => {
    if (!isJumping && gameStarted) {
      setVelocity(JUMP_FORCE);
      setIsJumping(true);
    }
  }, [isJumping, gameStarted]);

  // Game loop
  useEffect(() => {
    if (!gameStarted) return;

    const gameLoop = () => {
      setPlayerPosition((prev) => {
        const newY = prev.y + velocity;
        
        // Detectar colisión con el suelo
        if (newY >= GROUND_LEVEL) {
          setIsJumping(false);
          setVelocity(0);
          return { ...prev, y: GROUND_LEVEL };
        }

        return { ...prev, y: newY };
      });

      setVelocity((v) => v + GRAVITY);

      // Detectar colisión con la caja desde ABAJO
      const playerTop = playerPosition.y;
      const playerLeft = playerPosition.x;
      const playerRight = playerPosition.x + 80;
      const playerCenterX = playerPosition.x + 40;

      const boxBottom = BOX_POSITION.y + 96; // 96 es la altura del cuadro
      const boxLeft = BOX_POSITION.x;
      const boxRight = BOX_POSITION.x + 96;

      // Detectar si el Choquito golpea el cuadro desde abajo
      if (
        velocity < 0 && // Está subiendo
        playerTop <= boxBottom &&
        playerTop >= boxBottom - 10 &&
        playerCenterX >= boxLeft &&
        playerCenterX <= boxRight &&
        !boxHit
      ) {
        setBoxHit(true);
        setHitCount((prev) => prev + 1);
        setCurrentProposal((prev) => (prev + 1) % PROPOSALS.length);
        
        setTimeout(() => {
          setBoxHit(false);
        }, 4000);
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameStarted, velocity, playerPosition, boxHit]);

  // Controles
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };

    const handleClick = () => {
      if (!gameStarted) {
        setGameStarted(true);
      } else {
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleClick);
    };
  }, [jump, gameStarted]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-linear-to-b from-sky-400 via-sky-500 to-sky-600">
      {/* Fondo mejorado */}
      <div className="absolute inset-0">
        {/* Sol más realista */}
        <motion.div
          className="absolute top-16 right-32"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative w-28 h-28">
            {/* Resplandor del sol */}
            <div className="absolute inset-0 bg-yellow-300 rounded-full opacity-40 blur-3xl scale-150"></div>
            {/* Sol principal */}
            <div className="absolute inset-0 bg-linear-to-br from-yellow-200 via-yellow-300 to-orange-400 rounded-full shadow-2xl"></div>
            {/* Brillo interno */}
            <div className="absolute top-4 left-4 w-12 h-12 bg-white opacity-60 rounded-full blur-lg"></div>
          </div>
        </motion.div>

        {/* Nubes mejoradas */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: 60 + (i % 3) * 70,
              left: -150 + i * 250,
            }}
            animate={{
              x: [0, 1600],
            }}
            transition={{
              duration: 40 + i * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="relative">
              {/* Nube principal */}
              <div className="w-32 h-16 bg-white opacity-90 rounded-full blur-sm"></div>
              <div className="absolute top-4 left-8 w-24 h-14 bg-white opacity-90 rounded-full blur-sm"></div>
              <div className="absolute top-6 left-16 w-28 h-12 bg-white opacity-90 rounded-full blur-sm"></div>
            </div>
          </motion.div>
        ))}

        {/* Montañas de fondo - típicas de La Paz */}
        <div className="absolute bottom-32 left-0 right-0 h-64">
          {/* Montaña lejana derecha */}
          <div 
            className="absolute bottom-0 right-0 w-96 h-64 bg-linear-to-b from-gray-600 to-gray-700 opacity-60"
            style={{ clipPath: 'polygon(0% 100%, 30% 40%, 60% 60%, 100% 20%, 100% 100%)' }}
          />
          {/* Montaña lejana izquierda */}
          <div 
            className="absolute bottom-0 left-0 w-80 h-52 bg-linear-to-b from-gray-600 to-gray-700 opacity-60"
            style={{ clipPath: 'polygon(0% 50%, 40% 20%, 80% 70%, 100% 100%, 0% 100%)' }}
          />
          {/* Nieve en las cumbres */}
          <div className="absolute top-20 right-32 w-24 h-16 bg-white opacity-80 blur-sm rounded-full"></div>
          <div className="absolute top-32 left-24 w-20 h-12 bg-white opacity-80 blur-sm rounded-full"></div>
        </div>

        {/* Edificio típico paceño */}
        <PacenoBuilding x={80} />

        {/* Teleféricos realistas - solo 2 */}
        <Teleferico startX={-300} y={120} delay={0} color="purple" />
        <Teleferico startX={-900} y={140} delay={10} color="red" />

        {/* Minibuses */}
        <Minibus startX={-200} y={510} delay={0} direction="right" />
        <Minibus startX={900} y={510} delay={5} direction="left" />

        {/* Pumas - solo 2 */}
        <Puma x={550} y={520} delay={0.8} />
        <Puma x={750} y={520} delay={1.5} />
      </div>

      {/* Suelo mejorado */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-b from-green-600 via-green-700 to-green-800 shadow-inner">
        <div className="absolute top-0 left-0 right-0 h-3 bg-green-900 opacity-50"></div>
        {/* Detalles del pasto */}
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 w-1 bg-green-900 rounded-t"
            style={{
              left: `${i * 1.7}%`,
              height: `${8 + Math.random() * 12}px`,
            }}
            animate={{
              scaleY: [1, 0.95, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        {/* Flores en el pasto */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`flower-${i}`}
            className="absolute bottom-2"
            style={{
              left: `${5 + i * 8}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <div className={`w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-pink-400' : i % 3 === 1 ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
          </motion.div>
        ))}
      </div>

      {/* Cuadro de Mario Bros - SOLO UNO */}
      <ProposalBox
        x={BOX_POSITION.x}
        y={BOX_POSITION.y}
        proposals={PROPOSALS}
        isHit={boxHit}
        currentProposal={currentProposal}
      />

      {/* Personaje - debajo del cuadro */}
      {gameStarted && (
        <ChoquitoCharacter position={playerPosition} isJumping={isJumping} />
      )}

      {/* HUD mejorado */}
      <div className="absolute top-6 left-6 z-50">
        <motion.div
          className="bg-linear-to-br from-purple-600 via-purple-700 to-purple-800 text-white px-8 py-4 rounded-2xl shadow-2xl border-4 border-purple-400"
          animate={{
            scale: boxHit ? [1, 1.08, 1] : 1,
            boxShadow: boxHit 
              ? ['0 10px 30px rgba(139, 92, 246, 0.6)', '0 15px 50px rgba(139, 92, 246, 1)', '0 10px 30px rgba(139, 92, 246, 0.6)']
              : '0 10px 30px rgba(139, 92, 246, 0.6)',
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <div className="text-3xl">💡</div>
            <div>
              <div className="text-purple-200 text-xs font-semibold uppercase tracking-wider">
                Propuestas
              </div>
              <div className="text-3xl font-black">
                {hitCount}/{PROPOSALS.length}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Indicador de salto */}
      {gameStarted && (
        <motion.div
          className="absolute bottom-40 left-6 z-50"
          animate={{
            y: [0, -10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <div className="bg-white bg-opacity-90 text-purple-700 px-4 py-2 rounded-full text-sm font-bold shadow-lg border-2 border-purple-400">
            ⬆️ Salta debajo del cuadro!
          </div>
        </motion.div>
      )}

      {/* Pantalla de inicio mejorada */}
      {!gameStarted && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center px-8">
            <motion.div
              className="mb-8"
              animate={{
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <div className="text-8xl mb-4">🎮</div>
            </motion.div>
            
            <motion.h1
              className="text-7xl font-black text-white mb-3"
              style={{
                textShadow: '0 0 30px rgba(139, 92, 246, 1), 0 0 60px rgba(139, 92, 246, 0.8)',
              }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              Choquito Sogliano
            </motion.h1>
            
            <motion.div
              className="text-3xl text-purple-300 mb-8 font-bold"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ¡Descubre las Propuestas! 💡
            </motion.div>

            <motion.button
              className="bg-linear-to-r from-purple-500 via-purple-600 to-purple-700 hover:from-purple-600 hover:via-purple-700 hover:to-purple-800 text-white font-black py-5 px-12 rounded-full text-2xl shadow-2xl border-4 border-white transform transition-all"
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(139, 92, 246, 0.8)',
                  '0 0 40px rgba(139, 92, 246, 1)',
                  '0 0 20px rgba(139, 92, 246, 0.8)',
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                },
              }}
            >
              ¡JUGAR AHORA!
            </motion.button>
            
            <div className="mt-8 space-y-2">
              <p className="text-white text-lg font-semibold">
                🖱️ Click o 👆 Toca para saltar
              </p>
              <p className="text-white text-lg font-semibold">
                ⌨️ Teclas: ESPACIO o ↑
              </p>
              <p className="text-purple-300 text-sm mt-4">
                Salta debajo del cuadro morado para descubrir las propuestas ⭐
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Mensaje de victoria */}
      <AnimatePresence>
        {hitCount >= PROPOSALS.length && gameStarted && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                damping: 10,
                stiffness: 100,
              }}
            >
              <div className="text-9xl mb-6">🎉</div>
              <h2 className="text-6xl font-black text-white mb-4">
                ¡FELICITACIONES!
              </h2>
              <p className="text-3xl text-purple-300 mb-8">
                ¡Has descubierto todas las propuestas!
              </p>
              <motion.button
                onClick={() => {
                  setHitCount(0);
                  setCurrentProposal(0);
                  setBoxHit(false);
                }}
                className="bg-linear-to-r from-purple-500 to-purple-700 text-white font-bold py-4 px-10 rounded-full text-xl shadow-2xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Jugar de nuevo
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
