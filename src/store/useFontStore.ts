import { create } from 'zustand';

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
