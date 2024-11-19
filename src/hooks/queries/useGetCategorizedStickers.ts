'use client';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { StickerImage } from '@/types/stickerData.types';
import { supabase } from '@/utils/supabase/createClient';
import { validateStorageFiles } from '@/utils/supabase/validateStorageFiles';
import getImageDimensionsOnClient from '@/utils/sticker/getImageDimensionsOnClient';

const fetchAllStickerImages = async (): Promise<Record<string, StickerImage[]>> => {
  try {
    const { data, error } = await supabase.storage.from('stickers').list('', { limit: 1000 });
    if (error) {
      console.error(error);
    }

    const validFiles = validateStorageFiles(data);
    const categorizedStickers: Record<string, StickerImage[]> = {};

    await Promise.all(
      validFiles?.map(async (file) => {
        const [category] = file.name.split('-');
        const { data: publicUrlData } = supabase.storage.from('stickers').getPublicUrl(file.name);

        const { width, height } = await getImageDimensionsOnClient(publicUrlData.publicUrl);

        const stickerImage: StickerImage = {
          id: file.name,
          url: publicUrlData.publicUrl,
          category,
          width: width,
          height: height,
        };

        if (!categorizedStickers[category]) {
          categorizedStickers[category] = [];
        }

        categorizedStickers[category].push(stickerImage);
      }) || [],
    );

    return categorizedStickers;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useGetCategorizedStickers = () => {
  return useQuery({
    queryKey: QUERY_KEYS.stickerImages(),
    queryFn: fetchAllStickerImages,
    staleTime: 60 * 60 * 24 * 1000,
  });
};
