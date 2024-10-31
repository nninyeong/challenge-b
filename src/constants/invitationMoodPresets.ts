import { COLOR_DEFAULT_PALETTE, DECORATE_IMAGE_TYPE } from '@/components/create/MainViewInput';
import { DECORATE_STICKERS } from './invitationStickers';

export const MOOD_PRESETS = {
  classic: {
    preset1: {
      bgColor: COLOR_DEFAULT_PALETTE[7],
      mainView: DECORATE_IMAGE_TYPE[3],
      stickers: [DECORATE_STICKERS[0]],
    },
    preset2: {
      bgColor: COLOR_DEFAULT_PALETTE[6],
      mainView: DECORATE_IMAGE_TYPE[1],
      stickers: [DECORATE_STICKERS[1], DECORATE_STICKERS[3]],
    },
    preset3: {
      bgColor: COLOR_DEFAULT_PALETTE[1],
      mainView: DECORATE_IMAGE_TYPE[0],
      stickers: [DECORATE_STICKERS[2]],
    },
  },
  romantic: null,
  modern: null,
  floral: null,
  rustic: null,
  simple: null,
  none: null,
};
