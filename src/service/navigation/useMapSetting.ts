import { MapApp } from '@/types/navigationButtonType.type';

const BASE_SETTINGS = {
  scheme: '',
  webLink: '',
  fallbackLink: null as string | null,
};

export const getMapSettings = (
  app: MapApp,
  epLat: number,
  epLng: number,
  name: string,
  isAndroid: boolean,
  isIOS: boolean,
) => {
  switch (app) {
    case 'kakao':
      return {
        ...BASE_SETTINGS,
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
        ...BASE_SETTINGS,
        scheme: isAndroid
          ? `nmap://route/car?dlat=${epLat}&dlng=${epLng}&dname=${encodeURIComponent(name)}`
          : `nmap://route/car?dlat=${epLat}&dlng=${epLng}&dname=${encodeURIComponent(name)}`,
        webLink: `http://map.naver.com/index.nhn?slng=&slat=&stext=&elng=${epLng}&elat=${epLat}&etext=${name}&menu=route&pathType=1`,
        fallbackLink: isAndroid
          ? 'market://details?id=com.nhn.android.nmap'
          : isIOS
            ? 'https://apps.apple.com/kr/app/id311867728'
            : null,
      };
    case 'tmap':
      return {
        ...BASE_SETTINGS,
        scheme: isAndroid
          ? `tmap://route?goalx=${epLng}&goaly=${epLat}&by=CAR`
          : `tmap://route?goalx=${epLng}&goaly=${epLat}&by=CAR`,
        webLink: null,
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
