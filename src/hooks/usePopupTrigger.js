import { useState, useEffect, useRef } from 'react';

export function usePopupTrigger(sectionRef) {
  const [shouldShow, setShouldShow] = useState(false);
  const hasShown = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem('popupShown')) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasShown.current) {
          hasShown.current = true;
          sessionStorage.setItem('popupShown', 'true');
          setShouldShow(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [sectionRef]);

  return [shouldShow, () => setShouldShow(false)];
}
