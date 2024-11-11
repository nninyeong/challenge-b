import { notFound } from 'next/navigation';
import { supabase } from '@/utils/supabase/createClient';
import { convertToCamelCase } from '@/utils/convert/invitaitonTypeConvert';
import { createClient } from '@/utils/supabase/server';
import { Fragment } from 'react';
import { convertOrderToComponent } from '@/utils/convert/convertOrderToComponent';
import { Metadata } from 'next';
import { PersonalInfoType } from '@/types/invitationFormType.type';

export const generateStaticParams = async () => {
  const { data } = await supabase.from('invitation').select('id');
  return (
    data?.map((invitation) => ({
      id: invitation.id,
    })) || []
  );
};

const fetchInvitationData = async (id: string) => {
  const { data, error } = await supabase.from('invitation').select('*').eq('id', id).single();

  if (error || !data) notFound();

  return data;
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params;
  const { data } = await supabase.from('invitation').select('personal_info').eq('id', id).single();
  const { bride, groom } = data?.personal_info as unknown as PersonalInfoType;
  const title = (bride.name && groom.name) ?? `${bride.name}❤️${groom.name}`;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN || 'https://www.dream-card.co.kr'),
    openGraph: {
      title: title || '청첩장이 도착했습니다.',
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
  const fontStyle = invitationFetchData.mainPhotoInfo.fontName;
  const bgColor = invitationFetchData.bgColor;

  const canView = userId === invitationData.userId || !isPrivate;
  return canView ? (
    <div
      className={`flex flex-col gap-[56px] font-${fontStyle}`}
      style={{ backgroundColor: `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, ${bgColor.a})` }}
    >
      {renderOrder
        .sort((a, b) => a.order - b.order)
        .map(({ typeOnSharedCard }, index) => (
          <Fragment key={index}>{convertOrderToComponent(typeOnSharedCard, invitationData)}</Fragment>
        ))}
    </div>
  ) : (
    <div className='flex justify-center items-center text-[16px]'>아직 공개되지 않은 청첩장입니다.</div>
  );
};

export default CardPage;
