import { DECORATE_IMAGE_TYPE } from '@/components/create/MainViewInput';
import { CLASSIC_PRESET1 } from './invitationStickers/classicStickers';
import { ROMANTIC_PRESET1 } from './invitationStickers/romanticStickers';
import { MODERN_PRESET1 } from './invitationStickers/modernStickers';
import { FLORAL_PRESET1 } from './invitationStickers/floralStickers';
import { RUSTIC_PRESET1 } from './invitationStickers/rusticStickers';
import { SIMPLE_PRESET1 } from './invitationStickers/simpleStickers';

export const MOOD_PRESETS = {
  classic: {
    preset1: {
      bgColor: { r: 255, g: 255, b: 255, a: 1, name: '흰색' },
      mainView: DECORATE_IMAGE_TYPE[1],
      stickers: CLASSIC_PRESET1,
    },
    preset2: null,
    preset3: null,
  },
  romantic: {
    preset1: {
      bgColor: { r: 255, g: 255, b: 255, a: 1, name: '흰색' },
      mainView: DECORATE_IMAGE_TYPE[3],
      stickers: ROMANTIC_PRESET1,
    },
    preset2: null,
    preset3: null,
  },
  modern: {
    preset1: {
      bgColor: { r: 255, g: 255, b: 255, a: 1, name: '흰색' },
      mainView: DECORATE_IMAGE_TYPE[2],
      stickers: MODERN_PRESET1,
    },
    preset2: null,
    preset3: null,
  },
  floral: {
    preset1: {
      bgColor: { r: 255, g: 255, b: 255, a: 1, name: '흰색' },
      mainView: DECORATE_IMAGE_TYPE[2],
      stickers: FLORAL_PRESET1,
    },
    preset2: null,
    preset3: null,
  },
  rustic: {
    preset1: {
      bgColor: { r: 255, g: 255, b: 255, a: 1, name: '흰색' },
      mainView: DECORATE_IMAGE_TYPE[1],
      stickers: RUSTIC_PRESET1,
    },
    preset2: null,
    preset3: null,
  },
  simple: {
    preset1: {
      bgColor: { r: 255, g: 255, b: 255, a: 1, name: '흰색' },
      mainView: DECORATE_IMAGE_TYPE[0],
      stickers: SIMPLE_PRESET1,
    },
    preset2: null,
    preset3: null,
  },
  none: null,
};
