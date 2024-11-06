import { Fragment } from 'react';
import { convertOrderToComponent } from '@/utils/convert/convertOrderToComponent';
import { InvitationFetchType } from '@/types/invitationFormType.type';
import { createClient } from '@/utils/supabase/server';

const SharedCard = async ({ invitationFormData }: { invitationFormData: InvitationFetchType }) => {
  const client = createClient();
  const { data } = await client.auth.getUser();
  const userId = data?.user?.id;

  const { isPrivate, renderOrder, ...invitationData } = invitationFormData;
  const fontStyle = invitationFormData.mainPhotoInfo.fontName;
  const bgColor = invitationFormData.bgColor;

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

export default SharedCard;
