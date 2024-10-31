import { useEffect, useState } from 'react';

const useLatLng = (address: string) => {
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({ lat: 33.450701, lng: 126.570667 });
  
  const fetchCoordinates = (address: string) => {
    if (!address) return;
  
    kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (res, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const result = res[0];
          setCoords({ lat: parseFloat(result.y), lng: parseFloat(result.x) });
        } else {
          alert('유효한 주소가 아닙니다. 다시 확인해주세요.');
          setCoords({ lat: 33.450701, lng: 126.570667 });
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