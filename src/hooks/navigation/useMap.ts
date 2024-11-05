import { MapApp } from '@/types/navigationButtonType.type';
import { getMapSettings } from './useMapSetting';
import { isAndroid, isIOS } from 'react-device-detect';
import { Notify } from 'notiflix';

const TIMEOUT_DURATION = isIOS ? 5000 : 1500;

const useMap = () => {
  const openMap = ({
    endCoords,
    name,
    app = 'kakao',
  }: {
    endCoords: { epLat: number; epLng: number };
    name: string;
    app?: MapApp;
  }) => {
    const { epLat, epLng } = endCoords;
    const { scheme, webLink, fallbackLink } = getMapSettings(app, epLat, epLng, name, isAndroid, isIOS);

    if (!isAndroid && !isIOS) {
      if (webLink) {
        window.location.href = webLink;
      } else if (app === 'tmap') {
        Notify.success('모바일에서 확인할 수 있습니다.');
      }
      return;
    }

    window.location.href = scheme;

    setTimeout(() => {
      if (fallbackLink && document.visibilityState === 'visible') window.location.href = fallbackLink;
    }, TIMEOUT_DURATION);
  };

  return openMap;
};

export default useMap;
