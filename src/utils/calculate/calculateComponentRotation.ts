import { MutableRefObject } from 'react';

export const calculateComponentRotation = (componentRef: MutableRefObject<HTMLDivElement | null>) => {
  if (!componentRef.current) return 0;

  const transform = componentRef.current.style.transform;
  const match = transform.match(/rotate\(([-\d.]+)deg\)/);
  return match ? parseFloat(match[1]) : 0;
};
