'use client';

import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getUserInfo } from '@/utils/server-action';
import { reviewInputSchema } from '@/lib/zod/reviewInputSchema';

import { getMyReview } from '@/utils/getReview';

import { useReviewMutation } from '@/hooks/queries/review/useReviewMutation';

type ReviewType = {
  content: string;
  images: (string | null)[];
};

type ReviewUserType = { userId: string; userName: string; avatar_url: string };

export type MutationReviewFormDataType = {
  user_id: string;
  content: string;
  image_url: (string | null)[];
  user_name: string;
  avatar_url: string;
};
const MAX_CHAR = 200;
const MAX_PHOTO = 5;
const ReviewForm = () => {
  const { register, handleSubmit, control, setValue, getValues, reset } = useForm<ReviewType>({
    mode: 'onChange',
    defaultValues: { content: '', images: [null, null, null, null, null] },
    resolver: zodResolver(reviewInputSchema),
  });
  const browserClient = createClient();
  const [user, setUser] = useState<ReviewUserType>({ userId: '', userName: '', avatar_url: '' });
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [type, setType] = useState<'insert' | 'update'>('insert');
  const [myReviewId, setMyReviewId] = useState<string | null>(null);
  const contentWatch = useWatch({
    control,
    name: 'content',
  });
  const { mutate: mutateMyReview } = useReviewMutation();

  const getUserData = async () => {
    const userInfo = await getUserInfo();
    const myReview = await getMyReview(userInfo.user.id);
    setUser({
      userId: userInfo.user.id,
      userName: userInfo.user.user_metadata.name,
      avatar_url: userInfo.user.user_metadata.avatar_url,
    });
    if (myReview) {
      setMyReviewId(myReview.id);
      setType('update');
      reset({ content: myReview.content, images: [...myReview.image_url] });

      if (myReview.image_url.some((url: string) => url !== null)) {
        setPreviewUrls(myReview.image_url.filter((url: string) => url !== null));
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, [reset]);

  const uploadFile = async (file: File) => {
    const newFileName = `${crypto.randomUUID()}-${user.userId}`;
    const { data, error } = await browserClient.storage
      .from('review')
      .upload(`/images/${user.userId}/${newFileName}/${Date.now()}`, file);

    if (error) {
      console.error('File upload error:', error);
      return null;
    }
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
    return url;
  };

  const handleReviewFormSubmit = async (formData: ReviewType) => {
    const images = formData.images.includes(null) ? [] : formData.images;
    const data: MutationReviewFormDataType = {
      user_id: user.userId!,
      content: formData.content,
      image_url: images,
      user_name: user.userName!,
      avatar_url: user.avatar_url,
    };
    mutateMyReview({ mutationData: data, type: type, myReviewId: myReviewId });
  };

  const handleFileChange = async (file: File | null) => {
    if (file && previewUrls.length < MAX_PHOTO) {
      const uploadedUrl = await uploadFile(file);
      if (uploadedUrl) {
        setPreviewUrls((prev) => [...prev, uploadedUrl]);

        const currentImages = getValues('images') || [];
        const updatedImages = [...currentImages.filter(Boolean), uploadedUrl].slice(0, MAX_PHOTO);
        setValue('images', updatedImages);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleReviewFormSubmit)}
      className='flex flex-col justify-center w-full'
    >
      <div className='flex gap-[8px] h-[22px]'>
        <p className='text-gray-900 text-[18px] font-bold'>내용을 작성해주세요</p>
        <p className='text-gray-500 text-[16px] font-semibold'>200자 이내</p>
      </div>
      <div className='relative w-full mt-[14px] h-[184px]'>
        <textarea
          className='w-full h-full rounded-[12px] border-[1px] border-gray-200 p-[16px] resize-none text-[12px] text-gray-700'
          maxLength={200}
          placeholder='리뷰를 입력해주세요.'
          {...register('content')}
        />
        <p className='absolute bottom-[16px] right-[16px] text-gray-500 text-[12px] font-medium'>
          {contentWatch.length} / {MAX_CHAR}
        </p>
      </div>
      <div className='flex gap-[8px] mt-[16px] h-[22px] items-center'>
        <p className='text-gray-900 text-[18px] font-bold'>사진을 등록해주세요</p>
        <p className='text-gray-500 text-[16px] font-semibold'>최대 5장</p>
      </div>
      <div className='flex justify-center h-[80px] mt-[14px] gap-[16px]'>
        <Controller
          name='images'
          control={control}
          render={() => (
            <div className='flex flex-col items-center'>
              <label
                htmlFor='file-input'
                className='bg-white text-center cursor-pointer px-2 py-1 rounded-md text-black h-[80px] w-[80px] flex flex-col justify-center items-center border border-dashed border-gray-300 gap-[4px]'
              >
                <img
                  src='/assets/images/icons/image-add.png'
                  loading='lazy'
                  className='w-[24px] h-[]'
                  alt='이미지 추가 아이콘'
                />
                <p className='text-gray-600 text-[10px]'>
                  {previewUrls.length} / {MAX_PHOTO}
                </p>
              </label>
              <input
                type='file'
                id='file-input'
                accept='image/*'
                className='hidden'
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  handleFileChange(file);
                }}
              />
            </div>
          )}
        />

        <div className='flex h-[80px] max-w-[375px] overflow-x-auto w-full gap-[16px]'>
          {previewUrls.map((url, index) => (
            <div
              key={index}
              className=' w-[80px] h-[80px] rounded-md relative flex-none'
            >
              <Image
                src={url}
                alt={`Preview ${index + 1}`}
                fill
                objectFit='cover'
              />
            </div>
          ))}
        </div>
      </div>
      <button
        type='submit'
        className='text-white bg-primary-300 w-full h-[48px] rounded-[12px] mt-[32px]'
      >
        작성완료
      </button>
    </form>
  );
};

export default ReviewForm;
