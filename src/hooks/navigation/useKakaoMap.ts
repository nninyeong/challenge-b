import { isAndroid, isIOS } from 'react-device-detect';

const useKakaoMap = () => {
  const openKakaoMap = ({
    endCoords,
    name
  }: {
    endCoords: { epLat: number; epLng: number };
    name: string
  }) => {
    const { epLat, epLng } = endCoords;

    const androidScheme = `kakaomap://route?sp=&ep=${epLat},${epLng}&by=CAR`;
    const iosScheme = `kakaomap://route?sp=&ep=${epLat},${epLng}&by=CAR`;
    const webLink = `https://map.kakao.com/link/to/${name},${epLat},${epLng}`;
    const appStoreLink = 'https://apps.apple.com/kr/app/id304608425';
    const playStoreLink = 'market://details?id=net.daum.android.map';

    let scheme;
    let fallbackLink;

    if (isAndroid) { 
      scheme = androidScheme;
      fallbackLink = playStoreLink;
    } else if (isIOS) {
      scheme = iosScheme;
      fallbackLink = appStoreLink;
    } else {
      window.location.href = webLink;
      return;
    }

    window.location.href = scheme;

    setTimeout(() => {
      window.location.href = fallbackLink;
    }, 1500);
    // setTimeout(() => {
    //   window.location.href = webLink;
    // }, 1500);
  };

  return openKakaoMap;
}

export default useKakaoMap;
