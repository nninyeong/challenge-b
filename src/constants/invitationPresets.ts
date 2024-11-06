import { Mood, Preset } from '@/types/invitationFormType.type';

export const PRESETS: Record<Mood, Preset[]> = {
  classic: [
    { name: 'preset1', label: '프리셋1', image: '/assets/images/presets/classicPreset1.svg' },
    { name: 'preset2', label: '프리셋2', image: null },
    { name: 'preset3', label: '프리셋3', image: null },
  ],
  romantic: [
    { name: 'preset1', label: '프리셋1', image: '/assets/images/presets/romanticPreset1.svg' },
    { name: 'preset2', label: '프리셋2', image: null },
    { name: 'preset3', label: '프리셋3', image: null },
  ],
  modern: [
    { name: 'preset1', label: '프리셋1', image: '/assets/images/presets/modernPreset1.svg' },
    { name: 'preset2', label: '프리셋2', image: null },
    { name: 'preset3', label: '프리셋3', image: null },
  ],
  floral: [
    { name: 'preset1', label: '프리셋1', image: '/assets/images/presets/floralPreset1.svg' },
    { name: 'preset2', label: '프리셋2', image: null },
    { name: 'preset3', label: '프리셋3', image: null },
  ],
  rustic: [
    { name: 'preset1', label: '프리셋1', image: '/assets/images/presets/rusticPreset1.svg' },
    { name: 'preset2', label: '프리셋2', image: null },
    { name: 'preset3', label: '프리셋3', image: null },
  ],
  simple: [
    { name: 'preset1', label: '프리셋1', image: '/assets/images/presets/simplePreset1.svg' },
    { name: 'preset2', label: '프리셋2', image: null },
    { name: 'preset3', label: '프리셋3', image: null },
  ],
  none: [
    { name: 'preset1', label: '프리셋1', image: null },
    { name: 'preset2', label: '프리셋2', image: null },
    { name: 'preset3', label: '프리셋3', image: null },
  ],
};
