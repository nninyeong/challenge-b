import { create } from 'zustand';

type MainImagePreviewState = {
  mainPreviewUrl: string;
  setMainPreviewUrl: (url: string) => void;
};

type GalleryImagePreviewState = {
  galleryPreviewUrls: string[];
  setGalleryPreviewUrls: (url: string) => void;
  resetGalleryPreviewUrls: () => void;
};

export const useMainImagePreviewStore = create<MainImagePreviewState>((set) => ({
  mainPreviewUrl: '',
  setMainPreviewUrl: (url: string) => set({ mainPreviewUrl: url }),
}));

export const useGalleryImagePreviewStore = create<GalleryImagePreviewState>((set) => ({
  galleryPreviewUrls: [],
  setGalleryPreviewUrls: (newUrl: string) =>
    set((state) => ({
      galleryPreviewUrls: [...state.galleryPreviewUrls, newUrl],
    })),
  resetGalleryPreviewUrls: () => set({ galleryPreviewUrls: [] }),
}));
