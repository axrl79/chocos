'use client';

import { useCallback, useEffect, useRef } from 'react';

interface UseTouchControlsOptions {
  onJump: () => void;
  enabled: boolean;
}

/**
 * Hook especializado para controles táctiles en móvil.
 * - Maneja touch events con prevención de scroll/zoom
 * - Soporta tanto tap como swipe up
 * - Previene el doble-tap zoom en iOS
 * - Maneja teclado para PC
 */
export default function useTouchControls({ onJump, enabled }: UseTouchControlsOptions) {
  const lastTapRef = useRef(0);
  const touchStartYRef = useRef(0);

  const handleJump = useCallback(() => {
    if (!enabled) return;
    onJump();
  }, [enabled, onJump]);

  useEffect(() => {
    if (!enabled) return;

    // === TECLADO (PC) ===
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        handleJump();
      }
    };

    // === TOUCH (Móvil) ===
    const handleTouchStart = (e: TouchEvent) => {
      // Prevenir doble-tap zoom en iOS
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        e.preventDefault();
      }
      lastTapRef.current = now;

      // Guardar posición inicial del touch
      if (e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
      }

      // Prevenir scroll mientras juega
      e.preventDefault();
      handleJump();
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Prevenir scroll durante el juego
      e.preventDefault();
    };

    // === MOUSE (PC fallback) ===
    const handleMouseDown = (e: MouseEvent) => {
      // Ignorar clicks en botones
      if ((e.target as HTMLElement).tagName === 'BUTTON') return;
      handleJump();
    };

    // Registrar eventos
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [enabled, handleJump]);
}
