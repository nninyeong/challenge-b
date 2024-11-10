'use client';
import { useEffect } from 'react';
import { Notify } from 'notiflix';
import { NOTIFLIX_INIT_VALUES } from '@/constants/notiflixInitValues';

const setScreenHeight = () => {
  const screenHeight = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${screenHeight}px`);
};

const InitClientSettings = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useEffect(() => {
    Notify.init(NOTIFLIX_INIT_VALUES);

    setScreenHeight();
    window.addEventListener('resize', setScreenHeight);

    return () => window.removeEventListener('resize', setScreenHeight);
  }, []);

  return <>{children}</>;
};

export default InitClientSettings;
