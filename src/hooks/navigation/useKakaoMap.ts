import { isAndroid, isIOS } from 'react-device-detect';

const useKakaoMap = () => {
  const openKakaoMap = ({ endCoords, name }: { endCoords: { epLat: number; epLng: number }; name: string }) => {
    const { epLat, epLng } = endCoords;

    const androidScheme = `kakaomap://route?sp=&ep=${epLat},${epLng}&by=CAR`;
    const iosScheme = `kakaomap://route?sp=&ep=${epLat},${epLng}&by=CAR`;
    const webLink = `https://map.kakao.com/link/to/${name},${epLat},${epLng}`;
    const appStoreLink = 'https://apps.apple.com/kr/app/id304608425';
    const playStoreLink = 'market://details?id=net.daum.android.map';

    let scheme;
    let fallbackLink;
    let timeoutDuration = 1500;

    if (isAndroid) {
      scheme = androidScheme;
      fallbackLink = playStoreLink;
      timeoutDuration = 1500;
    } else if (isIOS) {
      scheme = iosScheme;
      fallbackLink = appStoreLink;
      timeoutDuration = 5000;
    } else {
      window.location.href = webLink;
      return;
    }

    window.location.href = scheme;

    setTimeout(() => {
      if (document.visibilityState === 'visible') window.location.href = fallbackLink;
    }, timeoutDuration);
  };

  return openKakaoMap;
};

export default useKakaoMap;
