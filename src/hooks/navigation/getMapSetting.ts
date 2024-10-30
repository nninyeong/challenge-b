import { MapApp } from '@/types/navigationButtonType.type';

export const getMapSettings = (
  app: MapApp,
  epLat: number,
  epLng: number,
  name: string,
  isAndroid: boolean,
  isIOS: boolean,
) => {
  const baseSettings = {
    scheme: '',
    webLink: '',
    fallbackLink: null as string | null,
  };

  switch (app) {
    case 'kakao':
      return {
        ...baseSettings,
        scheme: isAndroid
          ? `kakaomap://route?sp=&ep=${epLat},${epLng}&by=CAR`
          : `kakaomap://route?sp=&ep=${epLat},${epLng}&by=CAR`,
        webLink: `https://map.kakao.com/link/to/${name},${epLat},${epLng}`,
        fallbackLink: isAndroid
          ? 'market://details?id=net.daum.android.map'
          : isIOS
            ? 'https://apps.apple.com/kr/app/id304608425'
            : null,
      };
    case 'naver':
      return {
        ...baseSettings,
        scheme: isAndroid
          ? `nmap://route/public?dlat=${epLat}&dlng=${epLng}&by=CAR`
          : `nmap://route/public?dlat=${epLat}&dlng=${epLng}&by=CAR`,
        webLink: `https://map.naver.com/v5/directions/-/${name},${epLat},${epLng}`,
        fallbackLink: isAndroid
          ? 'market://details?id=com.nhn.android.nmap'
          : isIOS
            ? 'https://apps.apple.com/kr/app/id311867728'
            : null,
      };
    case 'tmap':
      return {
        ...baseSettings,
        scheme: isAndroid
          ? `tmap://route?goalx=${epLng}&goaly=${epLat}&by=CAR`
          : `tmap://route?goalx=${epLng}&goaly=${epLat}&by=CAR`,
        webLink: `https://www.tmap.co.kr/tmap2/mobile/route?name=${name}&lat=${epLat}&lng=${epLng}`,
        fallbackLink: isAndroid
          ? 'market://details?id=com.skt.tmap.ku'
          : isIOS
            ? 'https://apps.apple.com/kr/app/id431589174'
            : null,
      };
    default:
      throw new Error(`Unsupported map app: ${app}`);
  }
};
