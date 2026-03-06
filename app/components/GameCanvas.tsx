'use client';

import { useCallback } from 'react';
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
  const boxYRatio = isMobile ? 0.35 : 0.40;
  const gameBoxSize = 96 * Math.min(scale, 1.3);
  const boxXRatio = 0.5 - (gameBoxSize / 2) / width;

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

  // Posiciones dinámicas del suelo
  const groundHeight = height * (1 - groundRatio) + 20;

  // Tamaño del Choco para alinear videos
  const chocoScale = Math.min((isMobile ? Math.max(0.7, scale * 0.8) : Math.min(scale, 1.2)) * 1.75, 2.1);
  const chocoHeight = Math.round(106 * chocoScale);
  const chocoWidth = Math.round(88 * chocoScale);

const titleSize = isMobile ? 'text-[15px]' : isTablet ? 'text-5xl' : 'text-7xl';
const subtitleSize = isMobile ? 'text-[15px]' : 'text-3xl';
const btnSize = isMobile ? 'py-3 px-8 text-[15px]' : 'py-5 px-12 text-2xl';
const instructionSize = isMobile ? 'text-[15px]' : 'text-lg';

  return (
    <div
      className="relative w-full h-screen overflow-hidden select-none"
      style={{
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        backgroundImage: 'url(/gemini-3-pro-image-preview-2k_b_necesito_esta_imagen.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
      }}
    >

      {/* === LOGO CHOCO SOGLIANO ARRIBA CENTRADO === */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <img
          src="/choco_sogliano_logo_sin_fondo_hd.png"
          alt="Choco Sogliano Logo"
          style={{ width: isMobile ? 120 : 200, height: 'auto' }}
        />
      </div>

      {/* === VIDEOS VERDE (WebM para Chrome/Firefox, MOV HEVC para Safari/iOS) === */}
      <>
        {/* === VIDEO VERDE3 ENCIMA DE VERDE1 === */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-50 rounded-lg shadow-lg pointer-events-none"
          style={{
            bottom: 16 + 76 + 200 + 76 - 113,
            right: -30,
            width: isMobile ? 150 : 250,
            height: 'auto',
          }}
        >
          <source src="/verde3_transparente.mov" type='video/mp4; codecs="hvc1"' />
          <source src="/verde3.webm" type="video/webm" />
        </video>

        {/* === VIDEO VERDE2 ESQUINA IZQUIERDA === */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-50 rounded-lg shadow-lg pointer-events-none"
          style={{
            bottom: groundHeight - 246,
            left: 0,
            width: chocoWidth,
            height: 'auto',
          }}
        >
          <source src="/verde2_transparente.mov" type='video/mp4; codecs="hvc1"' />
          <source src="/verde2.webm" type="video/webm" />
        </video>

        {/* === VIDEO GATOS ESQUINA IZQUIERDA ARRIBA DE VERDE2 === */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-50 rounded-lg shadow-lg pointer-events-none"
          style={{
            bottom: groundHeight - 300 + chocoWidth + 253,
            left: 0,
            width: chocoWidth,
            height: 'auto',
          }}
        >
          <source src="/gift%20gatos_transparente.mov" type='video/mp4; codecs="hvc1"' />
          <source src="/gift%20gatos_transparente.webm" type="video/webm" />
        </video>
      </>

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

      {/* === VERDE1 ESQUINA INFERIOR IZQUIERDA === */}
      {game.gameStarted && isMobile && (
        <div
          className="absolute z-50"
          style={{ bottom: -120, right: -66 }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="rounded-lg shadow-lg pointer-events-none"
            style={{
              width: Math.round(chocoWidth * 1.8),
              height: 'auto',
            }}
          >
            <source src="/verde1_transparente.mov" type='video/mp4; codecs="hvc1"' />
            <source src="/verde1.webm" type="video/webm" />
          </video>
        </div>
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
