import { useState, useEffect, useRef } from 'react';

export function useExitIntent() {
  const [shouldShow, setShouldShow] = useState(false);
  const hasShown = useRef(false);

  useEffect(() => {
    // Desktop only — touch devices have no mouse cursor to leave the viewport
    if ('ontouchstart' in window) return;
    if (sessionStorage.getItem('exitPopupShown')) return;

    const handleMouseLeave = (e) => {
      // Mouse left through the top of the viewport
      if (e.clientY < 10 && !hasShown.current) {
        hasShown.current = true;
        sessionStorage.setItem('exitPopupShown', 'true');
        setShouldShow(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  return [shouldShow, () => setShouldShow(false)];
}
