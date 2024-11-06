import { toPng } from 'html-to-image';
import { createClient } from '@/utils/supabase/client';
import { MutableRefObject } from 'react';

const client = createClient();
const captureMainPhotoToPng = async (mainPhotoRef: MutableRefObject<HTMLDivElement | null>) => {
  const { data } = await client.auth.getUser();

  if (!mainPhotoRef.current) {
    console.error('메인 사진이 존재하지 않습니다.');
    return;
  }

  const dataUrl = await toPng(mainPhotoRef.current, {
    cacheBust: true,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: mainPhotoRef.current.offsetWidth,
    height: mainPhotoRef.current.offsetHeight,
    pixelRatio: 1,
  });

  const { error } = await client
    .from('thumbnails')
    .upsert({ url: dataUrl, user_id: data.user?.id })
    .eq('user_id', data.user?.id);

  if (error) {
    console.error(error);
  }
};

export default captureMainPhotoToPng;
