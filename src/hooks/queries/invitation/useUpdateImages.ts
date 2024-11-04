import { deleteGalleryImageFromSupabase } from '@/utils/uploadImg';
import { useMutation } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

export const useDeleteGalleryImage = () => {
  const { setValue, getValues } = useFormContext();

  return useMutation({
    mutationFn: async (imageUrl: string) => {
      return await deleteGalleryImageFromSupabase(imageUrl);
    },
    onSuccess: (imageUrl: string) => {
      const existingImages = getValues('gallery.images') || [];

      const updatedImages = existingImages.filter((imgUrl: string) => imgUrl !== imageUrl);

      setValue('gallery.images', updatedImages);
    },
    onError: (error) => console.error('갤러리 이미지 삭제 중 오류 발생', error),
  });
};
