'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

interface GameLoopConfig {
  /** Nivel del suelo relativo al alto de pantalla (0-1) */
  groundRatio: number;
  /** Posición Y del box relativo al alto de pantalla (0-1) */
  boxYRatio: number;
  /** Posición X del box relativo al ancho de pantalla (0-1) */
  boxXRatio: number;
  /** Ancho de pantalla */
  screenWidth: number;
  /** Alto de pantalla */
  screenHeight: number;
  /** Total de propuestas */
  totalProposals: number;
  /** Factor de escala horizontal */
  scale: number;
  /** Factor de escala vertical */
  scaleY: number;
}

interface GameLoopState {
  gameStarted: boolean;
  isJumping: boolean;
  playerPosition: { x: number; y: number };
  velocity: number;
  currentProposal: number;
  hitCount: number;
  boxHit: boolean;
  groundLevel: number;
  boxPosition: { x: number; y: number };
}

interface GameLoopActions {
  jump: () => void;
  startGame: () => void;
  resetGame: () => void;
}

export default function useGameLoop(config: GameLoopConfig): GameLoopState & GameLoopActions {
  const { groundRatio, boxYRatio, boxXRatio, screenWidth, screenHeight, totalProposals, scale, scaleY } = config;

  // Valores calculados dinámicamente
  const groundLevel = screenHeight * groundRatio;
  const boxPosition = useMemo(() => ({
    x: screenWidth * boxXRatio,
    y: screenHeight * boxYRatio,
  }), [screenWidth, screenHeight, boxXRatio, boxYRatio]);

  // Física escalada: usar scaleY para que el salto cubra la distancia vertical correcta
  const physicsScale = Math.min(Math.max(scale, scaleY), 1.5);
  const GRAVITY = 0.8 * physicsScale;
  const JUMP_FORCE = -16 * physicsScale;
  const BOX_SIZE = 96 * Math.min(scale, 1.3);
  const PLAYER_WIDTH = 80 * Math.min(scale, 1.3);

  const [gameStarted, setGameStarted] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState(0);
  const [currentProposal, setCurrentProposal] = useState(0);
  const [hitCount, setHitCount] = useState(0);
  const [boxHit, setBoxHit] = useState(false);

  const gameLoopRef = useRef<number | null>(null);
  const velocityRef = useRef(0);
  const playerPosRef = useRef({ x: 0, y: 0 });
  const boxHitRef = useRef(false);

  // Sincronizar refs
  useEffect(() => {
    velocityRef.current = velocity;
  }, [velocity]);

  useEffect(() => {
    playerPosRef.current = playerPosition;
  }, [playerPosition]);

  useEffect(() => {
    boxHitRef.current = boxHit;
  }, [boxHit]);

  // Inicializar posición del jugador al centro-izquierda
  useEffect(() => {
    const startX = screenWidth * 0.35;
    setPlayerPosition({ x: startX, y: groundLevel });
    playerPosRef.current = { x: startX, y: groundLevel };
  }, [screenWidth, groundLevel]);

  const jump = useCallback(() => {
    if (!isJumping && gameStarted) {
      setVelocity(JUMP_FORCE);
      velocityRef.current = JUMP_FORCE;
      setIsJumping(true);
    }
  }, [isJumping, gameStarted, JUMP_FORCE]);

  const startGame = useCallback(() => {
    setGameStarted(true);
  }, []);

  const resetGame = useCallback(() => {
    setHitCount(0);
    setCurrentProposal(0);
    setBoxHit(false);
    boxHitRef.current = false;
  }, []);

  // Game loop con requestAnimationFrame
  useEffect(() => {
    if (!gameStarted) return;

    let lastTime = performance.now();

    const gameLoop = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTime) / 16.67, 3); // Normalizar a ~60fps, cap at 3x
      lastTime = currentTime;

      const currentVelocity = velocityRef.current;
      const currentPos = playerPosRef.current;

      // Actualizar velocidad con gravedad
      const newVelocity = currentVelocity + GRAVITY * deltaTime;
      
      // Actualizar posición
      const newY = currentPos.y + newVelocity * deltaTime;

      if (newY >= groundLevel) {
        // Tocó el suelo
        setPlayerPosition(prev => ({ ...prev, y: groundLevel }));
        playerPosRef.current = { ...currentPos, y: groundLevel };
        setVelocity(0);
        velocityRef.current = 0;
        setIsJumping(false);
      } else {
        setPlayerPosition(prev => ({ ...prev, y: newY }));
        playerPosRef.current = { ...currentPos, y: newY };
        setVelocity(newVelocity);
        velocityRef.current = newVelocity;
      }

      // Detección de colisión con la caja desde abajo
      const playerTop = newY;
      const playerCenterX = currentPos.x + PLAYER_WIDTH / 2;
      const boxBottom = boxPosition.y + BOX_SIZE;
      const boxLeft = boxPosition.x;
      const boxRight = boxPosition.x + BOX_SIZE;

      if (
        currentVelocity < 0 && // Subiendo
        playerTop <= boxBottom &&
        playerTop >= boxBottom - 15 * Math.min(physicsScale, 1.5) &&
        playerCenterX >= boxLeft - 10 &&
        playerCenterX <= boxRight + 10 &&
        !boxHitRef.current
      ) {
        setBoxHit(true);
        boxHitRef.current = true;
        setHitCount(prev => prev + 1);
        setCurrentProposal(prev => (prev + 1) % totalProposals);

        setTimeout(() => {
          setBoxHit(false);
          boxHitRef.current = false;
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
  }, [gameStarted, groundLevel, boxPosition, GRAVITY, JUMP_FORCE, BOX_SIZE, PLAYER_WIDTH, totalProposals, physicsScale]);

  return {
    gameStarted,
    isJumping,
    playerPosition,
    velocity,
    currentProposal,
    hitCount,
    boxHit,
    groundLevel,
    boxPosition,
    jump,
    startGame,
    resetGame,
  };
}
