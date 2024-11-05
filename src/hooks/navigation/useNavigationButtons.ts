import useMap from '@/hooks/navigation/useMap';

const useOpenMapHandlers = (coords: { lat: number; lng: number }, name: string) => {
  const openMap = useMap();

  const openKakaoMap = () => {
    openMap({
      endCoords: { epLat: coords.lat, epLng: coords.lng },
      name,
      app: 'kakao',
    });
  };

  const openNaverMap = () => {
    openMap({
      endCoords: { epLat: coords.lat, epLng: coords.lng },
      name,
      app: 'naver',
    });
  };

  const openTMap = () => {
    openMap({
      endCoords: { epLat: coords.lat, epLng: coords.lng },
      name,
      app: 'tmap',
    });
  };

  return { openKakaoMap, openNaverMap, openTMap };
};

export default useOpenMapHandlers;
