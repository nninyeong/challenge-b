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
import { COMPONENT_TYPES } from '@/constants/componentTypes';

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

  const testOrderData = [
    { order: 0, typeOnSharedCard: COMPONENT_TYPES.MAIN_PHOTO },
    { order: 1, typeOnSharedCard: COMPONENT_TYPES.GREETING },
    { order: 2, typeOnSharedCard: COMPONENT_TYPES.PERSONAL_INFO },
    { order: 5, typeOnSharedCard: COMPONENT_TYPES.ACCOUNT },
    { order: 4, typeOnSharedCard: COMPONENT_TYPES.WEDDING_INFO },
    { order: 3, typeOnSharedCard: COMPONENT_TYPES.NAVIGATION_DETAILS },
    { order: 6, typeOnSharedCard: COMPONENT_TYPES.GUEST_INFO },
    { order: 7, typeOnSharedCard: COMPONENT_TYPES.GALLERY },
  ];

  const testComponentList = {
    [COMPONENT_TYPES.MAIN_PHOTO]: (
      <MainPhoto
        mainPhotoInfo={mainPhotoInfo}
        bgColor={bgColor}
        mainView={mainView}
        stickers={stickers}
      />
    ),
    [COMPONENT_TYPES.GREETING]: <Greeting greetingMessage={greetingMessage} />,
    [COMPONENT_TYPES.PERSONAL_INFO]: <PersonalInfoOnSharedCard personalInfo={personalInfo} />,
    [COMPONENT_TYPES.ACCOUNT]: <Account account={account} />,
    [COMPONENT_TYPES.WEDDING_INFO]: <WeddingInfo weddingInfo={weddingInfo} />,
    [COMPONENT_TYPES.NAVIGATION_DETAILS]: (
      <NavigationDetails
        navigationDetail={navigationDetail}
        weddingInfo={weddingInfo}
      />
    ),
    [COMPONENT_TYPES.GUEST_INFO]: (
      <GuestInfo
        attendance={attendance}
        guestbook={guestbook}
        dDay={dDay}
        weddingInfo={weddingInfo}
      />
    ),
    [COMPONENT_TYPES.GALLERY]: <WeddingGallery gallery={gallery} />,
  };

  return isPrivate ? (
    <div>아직 공개되지 않은 청첩장입니다.</div>
  ) : (
    <div>
      {testOrderData
        .sort((a, b) => a.order - b.order)
        .map(({ typeOnSharedCard }, index) => {
          const Component = testComponentList[typeOnSharedCard]; // typeOnSharedCard에 해당하는 컴포넌트 찾기
          return Component ?? null;
        })}
    </div>
  );
};

export default CardPage;
