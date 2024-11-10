import { notFound } from 'next/navigation';
import { supabase } from '@/utils/supabase/createClient';
import { convertToCamelCase } from '@/utils/convert/invitaitonTypeConvert';
import { createClient } from '@/utils/supabase/server';
import { Fragment } from 'react';
import { convertOrderToComponent } from '@/utils/convert/convertOrderToComponent';

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

const CardPage = async ({ params }: { params: { id: string } }) => {
  const invitation = await fetchInvitationData(params.id);
  const invitationFetchData = convertToCamelCase(invitation);

  const client = createClient();
  const { data } = await client.auth.getUser();
  const userId = data?.user?.id;

  const { isPrivate, renderOrder, ...invitationData } = invitationFetchData;

  const fontStyle = invitationFetchData.fontInfo!.fontName;
  const bgColor = invitationFetchData.bgColor;

  const canView = userId === invitationData.userId || !isPrivate;
  const fontColor = invitationFetchData.fontInfo!.color;
  const rgbaColor = `rgba(${fontColor.r}, ${fontColor.g}, ${fontColor.b}, ${fontColor.a})`;

  return canView ? (
    <div
      className={`flex flex-col gap-[56px] font-${fontStyle}`}
      style={{ backgroundColor: `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, ${bgColor.a})`, color: `${rgbaColor}` }}
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
