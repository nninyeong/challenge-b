'use server';
import { StickerImage } from '@/types/stickerData.types';
import { supabase } from '@/utils/supabase/createClient';
import getImageDimensionsOnServer from '@/utils/sticker/getImageDimensionsOnServer';
import { validateStorageFiles } from '@/utils/supabase/validateStorageFiles';

const getCategorizedStickersWithMetadata = async (): Promise<Record<string, StickerImage[]>> => {
  try {
    const { data, error } = await supabase.storage.from('stickers').list('', { limit: 1000 });
    if (error) {
      console.error(error);
    }

    const validFiles = validateStorageFiles(data);
    const stickersByCategory: Record<string, StickerImage[]> = {};

    await Promise.all(
      validFiles?.map(async (file) => {
        const [category] = file.name.split('-');
        const { data: publicUrlData } = supabase.storage.from('stickers').getPublicUrl(file.name);

        const { width, height } = await getImageDimensionsOnServer(publicUrlData.publicUrl);

        const stickerImage: StickerImage = {
          id: file.name,
          url: publicUrlData.publicUrl,
          category,
          width: width,
          height: height,
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

export default getCategorizedStickersWithMetadata;
