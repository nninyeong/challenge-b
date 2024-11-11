import { Notify } from 'notiflix';
import { useEffect, useState } from 'react';

const FIRST_LAT_LNG = { lat: 33.450701, lng: 126.570667 };

const useLatLng = (address: string) => {
  const [coords, setCoords] = useState<{ lat: number; lng: number }>(FIRST_LAT_LNG);
  
  const fetchCoordinates = (address: string) => {
    if (!address) return;
  
    kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (res, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const result = res[0];
          setCoords({ lat: parseFloat(result.y), lng: parseFloat(result.x) });
        } else {
          Notify.failure('유효한 주소가 아닙니다. 다시 확인해주세요.');
          setCoords(FIRST_LAT_LNG);
        }
      });
    });
  };

  useEffect(() => {
    if (window.kakao) fetchCoordinates(address);
  }, [address]);

  return coords;
};

export default useLatLng;