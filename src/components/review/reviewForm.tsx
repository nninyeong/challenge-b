'use client';

import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

type ReviewType = {
  content: string;
  image: File[] | null;
};

const reviewInputSchema = z.object({
  content: z.string().min(1, {
    message: '리뷰를 입력해주세요.',
  }),
  image: z.array(z.instanceof(File).nullable()).optional(),
});

const ReviewForm = ({ userId }: { userId: string | undefined }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ReviewType>({
    mode: 'onChange',
    defaultValues: { content: '', image: null },
    resolver: zodResolver(reviewInputSchema),
  });
  const router = useRouter();
  const browserClient = createClient();

  const uploadFile = async (file: File) => {
    const { data, error } = await browserClient.storage.from('review').upload(`/images/${userId}/${file.name}`, file);

    if (error) {
      console.error('File upload error:', error);
      return null;
    }
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
    return url;
  };

  const handleReviewFormSubmit = async (formData: ReviewType) => {
    const imageUrls: string[] = [];

    if (formData.image) {
      for (const file of formData.image) {
        const url = await uploadFile(file);
        if (url) {
          imageUrls.push(url);
        }
      }
    }

    const { error } = await browserClient
      .from('reviews')
      .insert([{ user_id: userId, content: formData.content, image_url: imageUrls }])
      .select();

    if (error) {
      console.error(error);
    }
    router.push('/review');
  };

  return (
    <form onSubmit={handleSubmit(handleReviewFormSubmit)}>
      <input
        type='text'
        {...register('content')}
        placeholder='리뷰를 입력해주세요.'
      />
      {errors.content && <p className='text-red-500 text-sm'>{errors.content.message as string}</p>}

      <Controller
        name='image'
        control={control}
        render={({ field: { onChange } }) => (
          <input
            type='file'
            multiple
            accept='image/*'
            onChange={(e) => {
              const files = Array.from(e.target.files!).map((file) => file || null);
              onChange(files);
            }}
          />
        )}
      />
      {errors.image && <p className='text-red-500 text-sm'>{errors.image.message as string}</p>}

      <button type='submit'>제출</button>
    </form>
  );
};

export default ReviewForm;
