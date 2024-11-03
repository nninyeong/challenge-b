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

export const INITIAL_ORDER = (methods: UseFormReturn<InvitationFormType>) => {
  return [
    {
      order: 0,
      component: (
        <FormProvider {...methods}>
          <MainPhotoPreView control={methods.control} />
        </FormProvider>
      ),
      name: ['청첩장 대표 사진', '청첩장 무드 프리셋', '청첩장 메인 화면', '청첩장 스티커'],
      input: [
        <MainPhotoInput key={'photoview'} />,
        <MoodPresetInput key={'mood'} />,
        <StickerInput key={'sticker'} />,
        <MainViewInput key={'mainview'} />,
      ],
    },
    {
      order: 1,
      component: <GreetingPreview control={methods.control} />,
      name: ['인사말'],
      input: [<GreetingInput key={'greeting'} />],
    },
    {
      order: 2,
      component: <PersonalInfoPreview control={methods.control} />,
      name: ['개인 정보'],
      input: [<PersonalInfoInput key={'personal'} />],
    },
    {
      order: 3,
      component: <AccountPreView control={methods.control} />,
      name: ['계좌 정보'],
      input: [<AccountInput key={'account'} />],
    },
    {
      order: 4,
      component: <WeddingInfoPreView control={methods.control} />,
      name: ['예식 일시'],
      input: [<WeddingInfoInput key={'wedding'} />],
    },
    {
      order: 5,
      component: <NavigationDetailsPreview control={methods.control} />,
      name: ['교통수단 표시'],
      input: [<NavigationDetailInput key={'navi'} />],
    },
    {
      order: 6,
      component: <GuestInfoPreview control={methods.control} />,
      name: ['방명록'],
      input: [<GuestInfoInput key={'guest'} />],
    },
    {
      order: 7,
      component: <GalleryPreview control={methods.control} />,
      name: ['청첩장 갤러리'],
      input: [<GalleryInput key={'guest'} />],
    },
  ];
};
