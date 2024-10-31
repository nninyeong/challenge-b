import { notFound } from 'next/navigation';
import { supabase } from '@/utils/supabase/createClient';
import { convertToCamelCase } from '@/utils/convert/invitaitonTypeConvert';
import MainPhoto from '@/components/card/MainPhoto';
import Greeting from '@/components/card/Greeting';
import PersonalInfoOnSharedCard from '@/components/card/PersonalInfoOnSharedCard';

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
  const {
    // gallery,
    // type,
    // mood,
    mainView,
    bgColor,
    stickers,
    // imgRatio,
    // mainText,
    greetingMessage,
    // guestbook,
    // attendance,
    personalInfo,
    // weddingInfo,
    // account,
    // navigationDetail,
    // dDay,
    mainPhotoInfo,
    isPrivate,
  } = convertToCamelCase(invitation);

  return isPrivate ? (
    <div>아직 공개되지 않은 청첩장입니다.</div>
  ) : (
    <div>
      <MainPhoto
        mainPhotoInfo={mainPhotoInfo}
        bgColor={bgColor}
        mainView={mainView}
        stickers={stickers}
      />
      <Greeting greetingMessage={greetingMessage} />
      <PersonalInfoOnSharedCard personalInfo={personalInfo} />
    </div>
  );
};

export default CardPage;
