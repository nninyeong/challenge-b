import useLatLng from '@/hooks/map/useLatLng';
import useOpenMapHandlers from '@/hooks/navigation/useNavigationButtons';

const NavigationButtons = ({ address, name }: { address: string; name: string }) => {
  const coords = useLatLng(address);
  const { openKakaoMap, openNaverMap, openTMap } = useOpenMapHandlers(
    { lat: coords.lat, lng: coords.lng },
    name
  );

  return (
    <div>
      <button onClick={openKakaoMap}>카카오맵</button>
      <button onClick={openNaverMap}>네이버 지도</button>
      <button onClick={openTMap}>티맵</button>
    </div>
  );
};

export default NavigationButtons;
