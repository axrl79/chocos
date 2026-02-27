'use client';

import { useState, useEffect, useCallback } from 'react';

export interface ScreenSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLandscape: boolean;
  /** Factor de escala relativo a 375px (iPhone SE ancho) */
  scale: number;
  /** Factor de escala vertical relativo a 667px */
  scaleY: number;
  /** Safe area insets para notch / barra de navegación */
  safeArea: {
    top: number;
    bottom: number;
  };
}

export default function useResponsive(): ScreenSize {
  const getSize = useCallback((): ScreenSize => {
    if (typeof window === 'undefined') {
      return {
        width: 375,
        height: 667,
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        isLandscape: false,
        scale: 1,
        scaleY: 1,
        safeArea: { top: 0, bottom: 0 },
      };
    }

    const w = window.innerWidth;
    const h = window.innerHeight;
    const isMobile = w < 768;
    const isTablet = w >= 768 && w < 1024;
    const isDesktop = w >= 1024;
    const isLandscape = w > h;

    // Escala basada en el ancho mínimo de referencia (375 = iPhone SE)
    const scale = Math.min(w / 375, 2.5);
    const scaleY = Math.min(h / 667, 2.5);

    // Detectar safe areas (notch en iOS, barra en Android)
    const computedStyle = getComputedStyle(document.documentElement);
    const safeTop = parseInt(computedStyle.getPropertyValue('--sat') || '0', 10);
    const safeBottom = parseInt(computedStyle.getPropertyValue('--sab') || '0', 10);

    return {
      width: w,
      height: h,
      isMobile,
      isTablet,
      isDesktop,
      isLandscape,
      scale,
      scaleY,
      safeArea: {
        top: safeTop || (isMobile ? 44 : 0),
        bottom: safeBottom || (isMobile ? 34 : 0),
      },
    };
  }, []);

  const [size, setSize] = useState<ScreenSize>(getSize);

  useEffect(() => {
    const handleResize = () => {
      setSize(getSize());
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Actualizar inmediatamente
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [getSize]);

  return size;
}
