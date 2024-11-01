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

export const INITIAL_ORDER = (methods: UseFormReturn<InvitationFormType>) => {
  return [
    {
      order: 0,
      component: (
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
    },
    {
      order: 1,
      component: <GreetingPreview control={methods.control} />,
      input: [<GreetingInput key={'greeting'} />],
      typeOnSharedCard: COMPONENT_TYPES.GREETING,
    },
    {
      order: 2,
      component: <PersonalInfoPreview control={methods.control} />,
      input: [<PersonalInfoInput key={'personal'} />],
      typeOnSharedCard: COMPONENT_TYPES.PERSONAL_INFO,
    },
    {
      order: 3,
      component: <AccountPreView control={methods.control} />,
      input: [<AccountInput key={'account'} />],
      typeOnSharedCard: COMPONENT_TYPES.ACCOUNT,
    },
    {
      order: 4,
      component: <WeddingInfoPreView control={methods.control} />,
      input: [<WeddingInfoInput key={'wedding'} />],
      typeOnSharedCard: COMPONENT_TYPES.WEDDING_INFO,
    },
    {
      order: 5,
      component: <NavigationDetailsPreview control={methods.control} />,
      input: [<NavigationDetailInput key={'navi'} />],
      typeOnSharedCard: COMPONENT_TYPES.NAVIGATION_DETAILS,
    },
    {
      order: 6,
      component: <GuestInfoPreview control={methods.control} />,
      input: [<GuestInfoInput key={'guest'} />],
      typeOnSharedCard: COMPONENT_TYPES.GUEST_INFO,
    },
    {
      order: 7,
      component: <GalleryPreview control={methods.control} />,
      input: [<GalleryInput key={'guest'} />],
      typeOnSharedCard: COMPONENT_TYPES.GALLERY,
    },
  ];
};
