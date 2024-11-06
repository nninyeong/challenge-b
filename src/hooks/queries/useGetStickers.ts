'use client';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { StickerImage } from '@/types/stickerData.types';
import { supabase } from '@/utils/supabase/createClient';

const fetchAllStickerImages = async (): Promise<Record<string, StickerImage[]>> => {
  try {
    const { data, error } = await supabase.storage.from('stickers').list('', { limit: 1000 });
    if (error) {
      console.error(error);
    }

    const validFiles = data?.filter((file) => file.name !== '.emptyFolderPlaceholder') || [];
    const stickersByCategory: Record<string, StickerImage[]> = {};

    const getImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = reject;
      });
    };

    await Promise.all(
      validFiles?.map(async (file) => {
        const [category] = file.name.split('-');
        const { data: publicUrlData } = supabase.storage.from('stickers').getPublicUrl(file.name);

        const dimensions = await getImageDimensions(publicUrlData.publicUrl);

        const stickerImage: StickerImage = {
          id: file.name,
          url: publicUrlData.publicUrl,
          category,
          width: dimensions.width,
          height: dimensions.height,
        };

        if (!stickersByCategory[category]) {
          stickersByCategory[category] = [];
        }

        stickersByCategory[category].push(stickerImage);
      }) || [],
    );

    return stickersByCategory;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useGetAllStickers = () => {
  return useQuery({
    queryKey: QUERY_KEYS.stickerImages(),
    queryFn: fetchAllStickerImages,
  });
};
