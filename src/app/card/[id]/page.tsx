import { notFound } from 'next/navigation';
import { supabase } from '@/utils/supabase/createClient';
import { convertToCamelCase } from '@/utils/convert/invitaitonTypeConvert';
import MainPhoto from '@/components/card/MainPhoto';
import Greeting from '@/components/card/Greeting';
import PersonalInfoOnSharedCard from '@/components/card/PersonalInfoOnSharedCard';
import Account from '@/components/card/Account';
import WeddingInfo from '@/components/card/WeddingInfo';
import NavigationDetails from '@/components/card/NavigationDetails';
import GuestInfo from '@/components/card/GuestInfo';
import WeddingGallery from '@/components/card/WeddingGallery';

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
    gallery,
    mainView,
    bgColor,
    stickers,
    greetingMessage,
    guestbook,
    attendance,
    personalInfo,
    weddingInfo,
    account,
    navigationDetail,
    dDay,
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
      <WeddingGallery gallery={gallery} />
      <Greeting greetingMessage={greetingMessage} />
      <PersonalInfoOnSharedCard personalInfo={personalInfo} />
      <Account account={account} />
      <WeddingInfo weddingInfo={weddingInfo} />
      <NavigationDetails
        navigationDetail={navigationDetail}
        weddingInfo={weddingInfo}
      />
      <GuestInfo
        attendance={attendance}
        guestbook={guestbook}
        dDay={dDay}
        weddingInfo={weddingInfo}
      />
    </div>
  );
};

export default CardPage;
