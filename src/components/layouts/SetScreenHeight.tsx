'use client';

import { useEffect } from 'react';

const SetScreenHeight = () => {
  useEffect(() => {
    const setScreenHeight = () => {
      const screenHeight = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${screenHeight}px`);
    };

    setScreenHeight();
    window.addEventListener('resize', setScreenHeight);

    return () => window.removeEventListener('resize', setScreenHeight);
  }, []);

  return null;
};

export default SetScreenHeight;
