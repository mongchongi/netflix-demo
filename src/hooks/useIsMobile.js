import { useEffect, useState } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResizeWidth = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResizeWidth);

    return () => window.removeEventListener('resize', handleResizeWidth);
  }, []);

  return isMobile;
};
