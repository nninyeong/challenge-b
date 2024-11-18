import useLatLng from '@/hooks/map/useLatLng';
import useOpenMapHandlers from '@/service/navigation/useNavigationButtons';

const NavigationButtons = ({ address, name, fontColor }: { address: string; name: string; fontColor: string }) => {
  const coords = useLatLng(address);
  const { openKakaoMap, openNaverMap, openTMap } = useOpenMapHandlers({ lat: coords.lat, lng: coords.lng }, name);

  return (
    <div
      style={{ color: `${fontColor}` }}
      className='flex justify-between w-full px-8  mt-6 mb-14'
    >
      <button
        onClick={openTMap}
        className='flex gap-[6px] items-center'
      >
        <img
          src='/assets/images/icons/tmap.png'
          loading='lazy'
          alt='티맵'
          className='w-[24px] h-[24px]'
        />
        티맵
      </button>
      <button
        onClick={openKakaoMap}
        className='flex gap-[6px] items-center'
      >
        <img
          src='/assets/images/icons/kakaomap.png'
          alt='카카오맵'
          loading='lazy'
          className='w-[24px] h-[24px]'
        />
        카카오맵
      </button>
      <button
        onClick={openNaverMap}
        className='flex gap-[6px] items-center'
      >
        <img
          src='/assets/images/icons/naver-map.png'
          loading='lazy'
          alt='네이버지도'
          className='w-[24px] h-[24px]'
        />
        네이버 지도
      </button>
    </div>
  );
};

export default NavigationButtons;
