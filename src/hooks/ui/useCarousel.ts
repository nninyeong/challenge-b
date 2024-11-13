import { useEffect, useState } from 'react';

const useCarousel = (itemNumber: number, interval: number, duration: number) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const moveCarousel = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      moveCarousel();
    }, interval);

    let timeoutId: NodeJS.Timeout;

    if (currentIndex === 0) {
      timeoutId = setTimeout(() => {
        setCurrentIndex(itemNumber);
        setIsTransitioning(false);
      }, duration);
    } else if (currentIndex === itemNumber + 1) {
      timeoutId = setTimeout(() => {
        setCurrentIndex(1);
        setIsTransitioning(false);
      }, duration);
    }

    return () => {
      clearInterval(timerId);
      clearTimeout(timeoutId);
    };
  }, [currentIndex]);

  return { currentIndex, setCurrentIndex, isTransitioning, setIsTransitioning };
};

export default useCarousel;
