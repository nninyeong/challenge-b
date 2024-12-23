import { notFound } from 'next/navigation';
import { supabase } from '@/utils/supabase/createClient';
import { convertToCamelCase } from '@/utils/convert/invitaitonTypeConvert';
import { createClient } from '@/utils/supabase/server';
import { Fragment } from 'react';
import { convertOrderToComponent } from '@/utils/convert/convertOrderToComponent';
import { Metadata } from 'next';
import { MainPhotoType } from '@/types/invitationFormType.type';
import PrivateCard from '@/components/card/PrivateCard';

export const generateStaticParams = async () => {
  const { data, error } = await supabase.from('invitation').select('id');
  if (error) console.error(error);

  return (
    data?.map((invitation) => ({
      id: invitation.id,
    })) || []
  );
};

const fetchInvitationData = async (id: string) => {
  const { data, error } = await supabase.from('invitation').select('*').eq('id', id).single();
  if (!data || error) notFound();

  return data;
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params;
  const { data, error } = await supabase.from('invitation').select('main_photo_info').eq('id', id).single();
  if (!data || error) notFound();

  const { leftName, rightName, icon } = data?.main_photo_info as unknown as MainPhotoType;
  const title = leftName && rightName && icon ? `${leftName} ${icon} ${rightName}` : '청첩장이 도착했습니다.';

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN || 'https://www.dream-card.co.kr'),
    openGraph: {
      title: title,
      description: '링크를 눌러 확인해보세요.',
      images: [
        {
          url: '/opengraph-image',
        },
      ],
    },
  };
}

const CardPage = async ({ params }: { params: { id: string } }) => {
  const invitation = await fetchInvitationData(params.id);
  const invitationFetchData = convertToCamelCase(invitation);

  const client = createClient();
  const { data } = await client.auth.getUser();
  const userId = data?.user?.id;

  const { isPrivate, renderOrder, ...invitationData } = invitationFetchData;

  const bgColor = invitationFetchData.bgColor;
  const fontStyle = invitationFetchData.fontInfo?.fontName;
  const canView = userId === invitationData.userId || !isPrivate;
  return canView ? (
    <div
      className='flex flex-col gap-[56px] max-w-[375px] mx-auto'
      style={{
        backgroundColor: `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, ${bgColor.a})`,
        fontFamily: `${fontStyle || 'main'}`,
      }}
    >
      {renderOrder
        .sort((a, b) => a.order - b.order)
        .map(({ typeOnSharedCard }, index) => (
          <Fragment key={index}>{convertOrderToComponent(typeOnSharedCard, invitationData)}</Fragment>
        ))}
    </div>
  ) : (
    <div className='max-w-[375px] h-screen mx-auto flex justify-center items-center'>
      <PrivateCard />
    </div>
  );
};

export default CardPage;
