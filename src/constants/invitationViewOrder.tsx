import AccountInput from '@/components/create/AccountInput';
import GalleryInput from '@/components/create/GalleryInput';
import GreetingInput from '@/components/create/GreetingInput';
import GuestInfoInput from '@/components/create/GuestInfoInput';
import MainPhotoInput from '@/components/create/MainPhotoInput';
import MainViewInput from '@/components/create/MainViewInput';
import MoodPresetInput from '@/components/create/MoodPresetInput';
import NavigationDetailInput from '@/components/create/NavigationDetailInput';
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
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { COMPONENT_TYPES } from '@/constants/componentTypes';
import RenderOrderInput from '@/components/create/RenderOrderInput';

export const INITIAL_ORDER = (methods?: UseFormReturn<InvitationFormType>) => {
  return [
    {
      order: 0,
      component: methods && (
        <FormProvider {...methods}>
          <MainPhotoPreView control={methods.control} />
        </FormProvider>
      ),
      input: [
        <MainPhotoInput key={'photoview'} />,
        <MoodPresetInput key={'mood'} />,
        <StickerInput key={'sticker'} />,
        <MainViewInput key={'mainview'} />,
      ],
      typeOnSharedCard: COMPONENT_TYPES.MAIN_PHOTO,
      labelForInput: '청첩장 대표이미지',
    },
    {
      order: 1,
      component: methods && <GreetingPreview control={methods.control} />,
      input: [<GreetingInput key={'greeting'} />],
      typeOnSharedCard: COMPONENT_TYPES.GREETING,
      labelForInput: '인사말',
    },
    {
      order: 2,
      component: methods && <PersonalInfoPreview control={methods.control} />,
      input: [<PersonalInfoInput key={'personal'} />],
      typeOnSharedCard: COMPONENT_TYPES.PERSONAL_INFO,
      labelForInput: '기본 정보',
    },
    {
      order: 3,
      component: methods && <AccountPreView control={methods.control} />,
      input: [<AccountInput key={'account'} />],
      typeOnSharedCard: COMPONENT_TYPES.ACCOUNT,
      labelForInput: '계좌 정보',
    },
    {
      order: 4,
      component: methods && <WeddingInfoPreView control={methods.control} />,
      input: [<WeddingInfoInput key={'wedding'} />],
      typeOnSharedCard: COMPONENT_TYPES.WEDDING_INFO,
      labelForInput: '예식 일시/장소',
    },
    {
      order: 5,
      component: methods && <NavigationDetailsPreview control={methods.control} />,
      input: [<NavigationDetailInput key={'navi'} />],
      typeOnSharedCard: COMPONENT_TYPES.NAVIGATION_DETAILS,
      labelForInput: '오시는 길',
    },
    {
      order: 6,
      component: methods && <GuestInfoPreview control={methods.control} />,
      input: [<GuestInfoInput key={'guest'} />],
      typeOnSharedCard: COMPONENT_TYPES.GUEST_INFO,
      labelForInput: '방명록/참석여부',
    },
    {
      order: 7,
      component: methods && <GalleryPreview control={methods.control} />,
      input: [<GalleryInput key={'guest'} />],
      typeOnSharedCard: COMPONENT_TYPES.GALLERY,
      labelForInput: '갤러리',
    },
    {
      order: 8,
      component: null,
      input: [<RenderOrderInput key='renderOrder' />],
      typeOnSharedCard: COMPONENT_TYPES.ONLY_FOR_CREATE,
      labelForInput: COMPONENT_TYPES.ONLY_FOR_CREATE,
    },
  ];
};
