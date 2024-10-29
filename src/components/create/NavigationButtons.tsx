import useLatLng from '@/hooks/map/useLatLng';
import useKakaoMap from '@/hooks/navigation/useKakaoMap';

const NavigationButtons = ({ address, name }: { address: string; name: string }) => {
  const coords = useLatLng(address);
  const openKakaoMap = useKakaoMap();

  return (
    <div>
      <button
        onClick={() =>
          openKakaoMap({
            startCoords: { spLat: coords.lat, spLng: coords.lng },
            endCoords: { epLat: coords.lat, epLng: coords.lng },
            name: name,
          })
        }
      >
        카카오맵
      </button>
    </div>
  );
};

export default NavigationButtons;
