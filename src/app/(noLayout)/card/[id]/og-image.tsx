import { supabase } from '@/utils/supabase/createClient';
import { ImageResponse } from 'next/og';

async function getUserIdFromInvitation(id: string): Promise<string | null> {
  const { data, error } = await supabase.from('invitation').select('user_id').eq('id', id).single();

  if (error) {
    console.error(error);
    return null;
  }

  return data?.user_id || null;
}

async function getThumbnailUrl(userId: string): Promise<string | null> {
  const { data, error } = await supabase.from('thumbnails').select('url').eq('user_id', userId).single();

  if (error) {
    console.error(error);
    return null;
  }

  return data?.url || null;
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const userId = await getUserIdFromInvitation(id);
  if (!userId) return new Response('청첩장과 일치하는 user_id를 불러올 수 없습니다.', { status: 404 });

  const thumbnailUrl = await getThumbnailUrl(userId);
  if (!thumbnailUrl) return new Response('청첩장의 user_id와 일치하는 썸네일을 불러올 수 없습니다.', { status: 404 });

  return new ImageResponse(
    (
      <div className='flex w-full h-full justify-center items-center'>
        <img
          src={thumbnailUrl}
          className='w-full object-cover'
          alt=''
        />
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
