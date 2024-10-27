"use client"

import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const MapView = ({ address }: { address: string }) => {
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({ lat: 33.450701, lng: 126.570667 });

  useEffect(() => {
    if (address) {
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
    }
  }, [address]);

  return (
    <div className='w-full px-4'>
      {coords ? (
        <Map
          center={coords}
          className='w-full h-[400px]'
        >
          <MapMarker position={coords} />
        </Map>
      ) : (
        <p>지도를 표시할 수 없습니다.</p>
      )}
    </div>
  );
};

export default MapView;
