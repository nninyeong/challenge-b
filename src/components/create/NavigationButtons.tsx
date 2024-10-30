import useLatLng from '@/hooks/map/useLatLng';
import useMap from '@/hooks/navigation/useMap';

const NavigationButtons = ({ address, name }: { address: string; name: string }) => {
  const coords = useLatLng(address);
  const openMap = useMap();

  return (
    <div>
      <button
        onClick={() =>
          openMap({
            endCoords: { epLat: coords.lat, epLng: coords.lng },
            name: name,
            app: 'kakao',
          })
        }
      >
        카카오맵
      </button>
      <button
        onClick={() =>
          openMap({
            endCoords: { epLat: coords.lat, epLng: coords.lng },
            name: name,
            app: 'naver',
          })
        }
      >
        네이버 지도
      </button>
      <button
        onClick={() =>
          openMap({
            endCoords: { epLat: coords.lat, epLng: coords.lng },
            name: name,
            app: 'tmap',
          })
        }
      >
        티맵
      </button>
    </div>
  );
};

export default NavigationButtons;
