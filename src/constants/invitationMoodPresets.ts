import { COLOR_DEFAULT_PALETTE, DECORATE_IMAGE_TYPE } from '@/components/create/MainViewInput';
import { CLASSIC_PRESET1, ROMANTIC_PRESET1 } from './invitationStickers';

export const MOOD_PRESETS = {
  classic: {
    preset1: {
      bgColor: COLOR_DEFAULT_PALETTE[7],
      mainView: DECORATE_IMAGE_TYPE[1],
      stickers: CLASSIC_PRESET1,
    },
    preset2: null,
    preset3: null,
  },
  romantic: {
    preset1: {
      bgColor: COLOR_DEFAULT_PALETTE[4],
      mainView: DECORATE_IMAGE_TYPE[3],
      stickers: ROMANTIC_PRESET1,
    },
    preset2: null,
    preset3: null,
  },
  //@TODO: 각 무드에 맞게 수정해야 됨
  modern: {
    preset1: {
      bgColor: COLOR_DEFAULT_PALETTE[7],
      mainView: DECORATE_IMAGE_TYPE[1],
      stickers: CLASSIC_PRESET1,
    },
    preset2: null,
    preset3: null,
  },
  floral: {
    preset1: {
      bgColor: COLOR_DEFAULT_PALETTE[7],
      mainView: DECORATE_IMAGE_TYPE[1],
      stickers: CLASSIC_PRESET1,
    },
    preset2: null,
    preset3: null,
  },
  rustic: {
    preset1: {
      bgColor: COLOR_DEFAULT_PALETTE[7],
      mainView: DECORATE_IMAGE_TYPE[1],
      stickers: CLASSIC_PRESET1,
    },
    preset2: null,
    preset3: null,
  },
  simple: {
    preset1: {
      bgColor: COLOR_DEFAULT_PALETTE[7],
      mainView: DECORATE_IMAGE_TYPE[1],
      stickers: CLASSIC_PRESET1,
    },
    preset2: null,
    preset3: null,
  },
  none: null,
};
