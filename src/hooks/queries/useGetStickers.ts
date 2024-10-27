'use client';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { StickerImage } from '@/types/stickerData.types';

const client = createClient();

const fetchAllStickerImages = async (): Promise<Record<string, StickerImage[]>> => {
  const { data, error } = await client.storage.from('stickers').list('', { limit: 1000 });
  if (error) {
    throw new Error('스티커 fetch 에러: ', error);
  }
  const stickersByCategory: Record<string, StickerImage[]> = {};

  data?.forEach((file) => {
    const [category] = file.name.split('-');
    const { data: publicUrlData } = client.storage.from('stickers').getPublicUrl(file.name);

    const stickerImage: StickerImage = {
      id: file.name,
      url: publicUrlData.publicUrl,
      category,
    };

    if (!stickersByCategory[category]) {
      stickersByCategory[category] = [];
    }

    stickersByCategory[category].push(stickerImage);
  });

  return stickersByCategory;
};

export const useAllStickers = () => {
  return useQuery({
    queryKey: QUERY_KEYS.stickerImages(),
    queryFn: fetchAllStickerImages,
    staleTime: 60 * 60 * 1000,
  });
};
