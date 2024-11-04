import { COLOR_DEFAULT_PALETTE, DECORATE_IMAGE_TYPE } from '@/components/create/MainViewInput';
import { DECORATE_STICKERS } from './invitationStickers';

export const MOOD_PRESETS = {
  classic: {
    preset1: {
      bgColor: COLOR_DEFAULT_PALETTE[7],
      mainView: DECORATE_IMAGE_TYPE[3],
      stickers: [DECORATE_STICKERS[0]],
    },
    preset2: null,
    preset3: null,
  },
  romantic: null,
  modern: null,
  floral: null,
  rustic: null,
  simple: null,
  none: null,
};
