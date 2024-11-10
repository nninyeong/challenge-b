import { create } from 'zustand';
import { ColorType } from '@/types/invitationFormType.type';
type FontStoreState = {
  fontSize: number;
  increaseFontSize: (type: number) => void;
  decreaseFontSize: (type: number) => void;
  resetFontSize: () => void;
};

export const useFontStore = create<FontStoreState>((set) => ({
  fontSize: 0,
  increaseFontSize: (type) =>
    set((state) => ({
      fontSize: state.fontSize + (type === 2 ? 4 : 2),
    })),
  decreaseFontSize: (type) =>
    set((state) => ({
      fontSize: state.fontSize - (type === 2 ? 4 : 2),
    })),
  resetFontSize: () => set(() => ({ fontSize: 0 })),
}));

type FontColorStore = {
  fontColor: ColorType;
  setFontColor: (color: ColorType) => void;
};
export const useFontColorStore = create<FontColorStore>((set) => ({
  fontColor: { r: 255, g: 255, b: 255, a: 1, name: '커스텀' },
  setFontColor: (color: ColorType) => set(() => ({ fontColor: color })),
}));
