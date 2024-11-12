import AccountInput from '@/components/create/AccountInput';
import GalleryInput from '@/components/create/GalleryInput';
import GreetingInput from '@/components/create/GreetingInput';
import GuestInfoInput from '@/components/create/GuestInfoInput';
import MainPhotoInput from '@/components/create/MainPhotoInput';
import MainViewInput from '@/components/create/MainViewInput';
import MoodPresetInput from '@/components/create/MoodPresetInput';
import PersonalInfoInput from '@/components/create/PersonalInfoInput';
import AccountPreView from '@/components/create/preview/AccountPreView';
import GalleryPreview from '@/components/create/preview/GalleryPreview';
import GreetingPreview from '@/components/create/preview/GreetingPreview';
import GuestInfoPreview from '@/components/create/preview/GuestInfoPreview';
import MainPhotoPreView from '@/components/create/preview/MainPhotoPreView';
import NavigationDetailsPreview from '@/components/create/preview/NavigationDetailsPreview';
import PersonalInfoPreview from '@/components/create/preview/PersonalInfoPreView';
import WeddingInfoPreView from '@/components/create/preview/WeddingInfoPreView';
import StickerInput from '@/components/create/StickerInput';
import WeddingInfoInput from '@/components/create/WeddingInfoInput';
import { InvitationFormType } from '@/types/invitationFormType.type';
import { UseFormReturn } from 'react-hook-form';
import { COMPONENT_TYPES } from '@/constants/componentTypes';
import RenderOrderInput from '@/components/create/RenderOrderInput';
import BackgroundColorInput from '@/components/create/BackgroundColorInput';
import NavigationDetailInput from '@/components/create/NavigationDetailInput';
import FontInput from '@/components/create/FontInput';

export const INITIAL_ORDER = (methods?: UseFormReturn<InvitationFormType>) => {
  return [
    {
      order: 0,
      component: methods && [
        <MainPhotoPreView
          control={methods.control}
          key={'photoPreview'}
        />,
      ],
      name: ['청첩장 대표 사진', '청첩장 무드 프리셋', '청첩장 스티커', '청첩장 메인 화면', '청첩장 배경 컬러'],
      input: [
        <MainPhotoInput key={'photoview'} />,
        <MoodPresetInput key={'mood'} />,
        <StickerInput key={'sticker'} />,
        <MainViewInput key={'mainview'} />,
        <BackgroundColorInput key={'backgroundColor'} />,
        <FontInput key={'fontInfo'} />,
      ],
      typeOnSharedCard: COMPONENT_TYPES.MAIN_PHOTO,
      labelForInput: '청첩장 대표이미지',
    },

    {
      order: 1,
      name: ['청첩장 갤러리'],
      component: methods && [
        <GalleryPreview
          control={methods.control}
          key={'galleryPreview'}
        />,
      ],
      input: [<GalleryInput key={'guest'} />],
      typeOnSharedCard: COMPONENT_TYPES.GALLERY,
      labelForInput: '갤러리',
    },
    {
      order: 2,
      name: ['인사말'],
      component: methods && [
        <GreetingPreview
          control={methods.control}
          key={'greetingPreview'}
        />,
      ],
      input: [<GreetingInput key={'greeting'} />],
      typeOnSharedCard: COMPONENT_TYPES.GREETING,
      labelForInput: '인사말',
    },
    {
      order: 3,
      name: ['개인 정보', '계좌 정보'],
      component: methods && [
        <PersonalInfoPreview
          control={methods.control}
          key='personalPreview'
        />,
        <AccountPreView
          control={methods.control}
          key='accountPreview'
        />,
      ],
      input: [<PersonalInfoInput key={'personal'} />, <AccountInput key={'account'} />],
      typeOnSharedCard: COMPONENT_TYPES.PERSONAL_INFO,
      labelForInput: '기본 정보',
    },
    {
      order: 4,
      name: ['예식 일시', '교통수단 표시'],
      component: methods && [
        <WeddingInfoPreView
          control={methods.control}
          key='weddingInfoPreview'
        />,
        <NavigationDetailsPreview
          control={methods.control}
          key='navigationDetailPreview'
        />,
      ],
      input: [<WeddingInfoInput key={'wedding'} />, <NavigationDetailInput key='navi' />],
      typeOnSharedCard: COMPONENT_TYPES.WEDDING_INFO,
      labelForInput: '오시는 길',
    },
    {
      order: 5,
      name: ['방명록'],
      component: methods && [
        <GuestInfoPreview
          control={methods.control}
          key={'guestPreview'}
        />,
      ],
      input: [<GuestInfoInput key={'guest'} />],
      typeOnSharedCard: COMPONENT_TYPES.GUEST_INFO,
      labelForInput: '방명록',
    },
    {
      order: 6,
      name: ['순서변경'],
      component: null,
      input: [<RenderOrderInput key='renderOrder' />],
      typeOnSharedCard: COMPONENT_TYPES.ONLY_FOR_CREATE,
      labelForInput: COMPONENT_TYPES.ONLY_FOR_CREATE,
    },
  ];
};
