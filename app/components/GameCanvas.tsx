'use client';

import { useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChoquitoCharacter from './ChoquitoCharacter';
import ProposalBox from './ProposalBox';
import useResponsive from '../hooks/useResponsive';
import useTouchControls from '../hooks/useTouchControls';
import useGameLoop from '../hooks/useGameLoop';

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
  const screen = useResponsive();
  const { width, height, isMobile, isTablet, scale } = screen;

  // Ratios responsivos para posiciones
  const groundRatio = isMobile ? 0.72 : 0.66;
  const boxYRatio = isMobile ? 0.40 : 0.45;
  const boxXRatio = isMobile ? 0.35 : 0.42;

  const game = useGameLoop({
    groundRatio,
    boxYRatio,
    boxXRatio,
    screenWidth: width,
    screenHeight: height,
    totalProposals: PROPOSALS.length,
    scale,
  });

  const handleJump = useCallback(() => {
    if (!game.gameStarted) {
      game.startGame();
    } else {
      game.jump();
    }
  }, [game]);

  useTouchControls({
    onJump: handleJump,
    enabled: true,
  });

  // Escalas responsivas para elementos del escenario
  const elementScale = useMemo(() => {
    if (isMobile) return Math.max(0.45, scale * 0.5);
    if (isTablet) return Math.max(0.65, scale * 0.65);
    return Math.min(scale, 1.2);
  }, [isMobile, isTablet, scale]);

  // Posiciones dinámicas del suelo
  const groundHeight = height * (1 - groundRatio) + 20;
  const groundBottom = 0;
  const groundLevel = height * groundRatio;

  // Nubes - cantidad reducida en móvil
  const cloudCount = isMobile ? 3 : 6;

  // Tamaños de fuente / UI responsivos
  const hudFontSize = isMobile ? 'text-xl' : 'text-3xl';
  const hudPadding = isMobile ? 'px-4 py-2' : 'px-8 py-4';
  const titleSize = isMobile ? 'text-3xl' : isTablet ? 'text-5xl' : 'text-7xl';
  const subtitleSize = isMobile ? 'text-lg' : 'text-3xl';
  const btnSize = isMobile ? 'py-3 px-8 text-lg' : 'py-5 px-12 text-2xl';
  const instructionSize = isMobile ? 'text-sm' : 'text-lg';

  const sunSize= isMobile ? 'w-16 h-16' : 'w-28 h-28';
  const sunPosition = isMobile ? 'top-8 right-8' : 'top-16 right-32';

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-linear-to-b from-sky-400 via-sky-500 to-sky-600 select-none"
      style={{ touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      {/* === FONDO === */}
      <div className="absolute inset-0">
        {/* Sol */}
        <motion.div
          className={`absolute ${sunPosition}`}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className={`relative ${sunSize}`}>
            <div className="absolute inset-0 bg-yellow-300 rounded-full opacity-40 blur-3xl scale-150" />
            <div className="absolute inset-0 bg-linear-to-br from-yellow-200 via-yellow-300 to-orange-400 rounded-full shadow-2xl" />
            <div className="absolute top-4 left-4 w-1/3 h-1/3 bg-white opacity-60 rounded-full blur-lg" />
          </div>
        </motion.div>

        {/* Nubes */}
        {[...Array(cloudCount)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: 40 + (i % 3) * (isMobile ? 40 : 70), left: -150 + i * (width / cloudCount) }}
            animate={{ x: [0, width + 200] }}
            transition={{ duration: 40 + i * 10, repeat: Infinity, ease: 'linear' }}
          >
            <div className="relative" style={{ transform: `scale(${isMobile ? 0.6 : 1})` }}>
              <div className="w-32 h-16 bg-white opacity-90 rounded-full blur-sm" />
              <div className="absolute top-4 left-8 w-24 h-14 bg-white opacity-90 rounded-full blur-sm" />
              <div className="absolute top-6 left-16 w-28 h-12 bg-white opacity-90 rounded-full blur-sm" />
            </div>
          </motion.div>
        ))}

        {/* Montañas */}
        <div className="absolute left-0 right-0" style={{ bottom: groundHeight - 10, height: height * 0.3 }}>
          <div
            className="absolute bottom-0 right-0 w-full h-full bg-linear-to-b from-gray-600 to-gray-700 opacity-60"
            style={{ clipPath: 'polygon(0% 100%, 30% 40%, 60% 60%, 100% 20%, 100% 100%)' }}
          />
          <div
            className="absolute bottom-0 left-0 h-4/5 bg-linear-to-b from-gray-600 to-gray-700 opacity-60"
            style={{ width: '60%', clipPath: 'polygon(0% 50%, 40% 20%, 80% 70%, 100% 100%, 0% 100%)' }}
          />
          {/* Nieve */}
          <div className="absolute top-1/4 right-1/6 w-24 h-16 bg-white opacity-80 blur-sm rounded-full" style={{ transform: `scale(${isMobile ? 0.5 : 1})` }} />
          <div className="absolute top-1/3 left-1/10 w-20 h-12 bg-white opacity-80 blur-sm rounded-full" style={{ transform: `scale(${isMobile ? 0.5 : 1})` }} />
        </div>
      </div>

      {/* === SUELO (pasto) === */}
      {/* pasto-png.png ya está recortado — el pasto ocupa toda la imagen. */}
      <div
  className="absolute left-0 right-0"
  style={{
    bottom: groundBottom,
    height: groundHeight,
    backgroundColor: '#7c4c1e',
    backgroundImage: 'url(/pasto-png.png)',
    backgroundRepeat: 'repeat-x',
    backgroundSize: `auto 20%`,
    backgroundPosition: 'left top',
  }}
/>



      {/* === BOSQUE (arbustos sobre el suelo) === */}
      {/* bosque-png.png ya está recortado — se superpone sobre el pasto. */}
      <div
        className="absolute left-0 right-0 z-10"
        style={{
          bottom: groundHeight - 4,
          height: isMobile ? 60 : isTablet ? 90 : 110,
          backgroundImage: 'url(/bosque-png.png)',
          backgroundRepeat: 'repeat-x',
          backgroundSize: `auto 100%`,
          backgroundPosition: 'left bottom',
        }}
      />

      {/* === CUADRO MARIO BROS === */}
      <ProposalBox
        x={game.boxPosition.x}
        y={game.boxPosition.y}
        proposals={PROPOSALS}
        isHit={game.boxHit}
        currentProposal={game.currentProposal}
        scale={isMobile ? Math.max(0.7, scale * 0.8) : Math.min(scale, 1.2)}
        isMobile={isMobile}
      />

      {/* === PERSONAJE === */}
      {game.gameStarted && (
        <ChoquitoCharacter
          position={game.playerPosition}
          isJumping={game.isJumping}
          scale={isMobile ? Math.max(0.7, scale * 0.8) : Math.min(scale, 1.2)}
        />
      )}


      {/* === HUD === */}
      <div className="absolute top-3 left-3 z-50" style={{ paddingTop: screen.safeArea.top }}>
        <motion.div
          className={`bg-linear-to-br from-purple-600 via-purple-700 to-purple-800 text-white ${hudPadding} rounded-2xl shadow-2xl border-2 md:border-4 border-purple-400`}
          animate={{
            scale: game.boxHit ? [1, 1.08, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <div className={isMobile ? 'text-xl' : 'text-3xl'}>💡</div>
            <div>
              <div className="text-purple-200 text-[10px] md:text-xs font-semibold uppercase tracking-wider">
                Propuestas
              </div>
              <div className={`${hudFontSize} font-black`}>
                {game.hitCount}/{PROPOSALS.length}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* === INDICADOR DE SALTO === */}
      {game.gameStarted && (
        <motion.div
          className="absolute z-50"
          style={{
            bottom: groundHeight + 10,
            left: isMobile ? 8 : 24,
            paddingBottom: screen.safeArea.bottom,
          }}
          animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className={`bg-white bg-opacity-90 text-purple-700 px-3 py-1.5 rounded-full ${isMobile ? 'text-xs' : 'text-sm'} font-bold shadow-lg border-2 border-purple-400`}>
            {isMobile ? '👆 Toca para saltar!' : '⬆️ Salta debajo del cuadro!'}
          </div>
        </motion.div>
      )}

      {/* === BOTÓN DE SALTO MÓVIL === */}
      {game.gameStarted && isMobile && (
        <motion.div
          className="absolute z-50"
          style={{ bottom: 20 + screen.safeArea.bottom, right: 20 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.8, scale: 1 }}
        >
          <motion.button
            className="w-16 h-16 rounded-full bg-purple-600 border-4 border-white shadow-2xl flex items-center justify-center text-white text-2xl font-black active:scale-90"
            whileTap={{ scale: 0.85, backgroundColor: '#7c3aed' }}
            onTouchStart={(e) => {
              e.stopPropagation();
              game.jump();
            }}
            style={{ touchAction: 'manipulation' }}
          >
            ⬆
          </motion.button>
        </motion.div>
      )}

      {/* === PANTALLA DE INICIO === */}
      {!game.gameStarted && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center px-6 max-w-lg mx-auto">
            <motion.div
              className="mb-4 md:mb-8"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className={`${isMobile ? 'text-5xl' : 'text-8xl'} mb-2`}>🎮</div>
            </motion.div>

            <motion.h1
              className={`${titleSize} font-black text-white mb-2`}
              style={{ textShadow: '0 0 30px rgba(139, 92, 246, 1), 0 0 60px rgba(139, 92, 246, 0.8)' }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Choquito Sogliano
            </motion.h1>

            <motion.div
              className={`${subtitleSize} text-purple-300 mb-4 md:mb-8 font-bold`}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ¡Descubre las Propuestas! 💡
            </motion.div>

            <motion.button
              className={`bg-linear-to-r from-purple-500 via-purple-600 to-purple-700 hover:from-purple-600 hover:via-purple-700 hover:to-purple-800 text-white font-black ${btnSize} rounded-full shadow-2xl border-4 border-white transform transition-all`}
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(139, 92, 246, 0.8)',
                  '0 0 40px rgba(139, 92, 246, 1)',
                  '0 0 20px rgba(139, 92, 246, 0.8)',
                ],
              }}
              transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
              onClick={(e) => {
                e.stopPropagation();
                game.startGame();
              }}
            >
              ¡JUGAR AHORA!
            </motion.button>

            <div className="mt-4 md:mt-8 space-y-1">
              {isMobile ? (
                <p className={`text-white ${instructionSize} font-semibold`}>
                  👆 Toca la pantalla para saltar
                </p>
              ) : (
                <>
                  <p className={`text-white ${instructionSize} font-semibold`}>
                    🖱️ Click o 👆 Toca para saltar
                  </p>
                  <p className={`text-white ${instructionSize} font-semibold`}>
                    ⌨️ Teclas: ESPACIO o ↑
                  </p>
                </>
              )}
              <p className={`text-purple-300 ${isMobile ? 'text-xs' : 'text-sm'} mt-2`}>
                Salta debajo del cuadro morado para descubrir las propuestas ⭐
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* === PANTALLA DE VICTORIA === */}
      <AnimatePresence>
        {game.hitCount >= PROPOSALS.length && game.gameStarted && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center px-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 10, stiffness: 100 }}
            >
              <div className={`${isMobile ? 'text-6xl' : 'text-9xl'} mb-4`}>🎉</div>
              <h2 className={`${isMobile ? 'text-3xl' : 'text-6xl'} font-black text-white mb-3`}>
                ¡FELICITACIONES!
              </h2>
              <p className={`${isMobile ? 'text-lg' : 'text-3xl'} text-purple-300 mb-6`}>
                ¡Has descubierto todas las propuestas!
              </p>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  game.resetGame();
                }}
                className={`bg-linear-to-r from-purple-500 to-purple-700 text-white font-bold ${isMobile ? 'py-3 px-8 text-base' : 'py-4 px-10 text-xl'} rounded-full shadow-2xl`}
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
