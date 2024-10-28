"use client"

import useLatLng from '@/hooks/map/useLatLng';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const MapView = ({ address }: { address: string }) => {
  const coords = useLatLng(address);

  return (
    <div className='w-full px-4'>
      {coords ? (
        <Map
          center={coords}
          zoomable={false}
          draggable={false}
          className='w-full h-[328px] rounded-3xl'
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