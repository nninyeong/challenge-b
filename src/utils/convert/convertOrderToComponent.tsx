import { InvitationFormType } from '@/types/invitationFormType.type';
import { COMPONENT_TYPES } from '@/constants/componentTypes';
import MainPhoto from '@/components/card/MainPhoto';
import Greeting from '@/components/card/Greeting';
import PersonalInfoOnSharedCard from '@/components/card/PersonalInfoOnSharedCard';
import Account from '@/components/card/Account';
import WeddingInfo from '@/components/card/WeddingInfo';
import NavigationDetails from '@/components/card/NavigationDetails';
import GuestInfo from '@/components/card/GuestInfo';

import GalleryView from '@/components/gallery/GalleryView';

export const convertOrderToComponent = (
  typeOnSharedCard: (typeof COMPONENT_TYPES)[keyof typeof COMPONENT_TYPES],
  invitationData: Omit<InvitationFormType, 'isPrivate' | 'renderOrder'>,
) => {
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
  } = invitationData;

  const componentMap = {
    [COMPONENT_TYPES.MAIN_PHOTO]: (
      <MainPhoto
        mainPhotoInfo={mainPhotoInfo}
        bgColor={bgColor}
        mainView={mainView}
        stickers={stickers}
        weddingInfo={weddingInfo}
        key='mainPhoto-sharedCard'
      />
    ),

    [COMPONENT_TYPES.GREETING]: <Greeting greetingMessage={greetingMessage} />,
    [COMPONENT_TYPES.PERSONAL_INFO]: [
      <PersonalInfoOnSharedCard
        personalInfo={personalInfo}
        key='personalInfo-sharedCard'
      />,
      <Account
        account={account}
        key='account-sharedCard'
      />,
    ],
    [COMPONENT_TYPES.WEDDING_INFO]: [
      <WeddingInfo
        weddingInfo={weddingInfo}
        key='weddingInfo-sharedCard'
      />,
      <NavigationDetails
        navigationDetail={navigationDetail}
        weddingInfo={weddingInfo}
        key='navigationDetail-sharedCard'
      />,
    ],
    [COMPONENT_TYPES.GUEST_INFO]: (
      <GuestInfo
        attendance={attendance}
        guestbook={guestbook}
        dDay={dDay}
        weddingInfo={weddingInfo}
        mainPhotoInfo={mainPhotoInfo}
        key='guestInfo-sharedCard'
      />
    ),
    [COMPONENT_TYPES.GALLERY]: (
      <GalleryView
        gallery={gallery}
        key='gallery-sharedCard'
      />
    ),
  };

  if (typeOnSharedCard === 'ONLY_FOR_CREATE') return;
  return componentMap[typeOnSharedCard] || null;
};
