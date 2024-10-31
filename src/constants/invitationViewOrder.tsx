import AccountInput from '@/components/create/AccountInput';
import GreetingInput from '@/components/create/GreetingInput';
import GuestInfoInput from '@/components/create/GuestInfoInput';
import MainPhotoInput from '@/components/create/MainPhotoInput';
import MainViewInput from '@/components/create/MainViewInput';
import NavigationDetailInput from '@/components/create/NavigationDetailInput';
import PersonalInfoInput from '@/components/create/PersonalInfoInput';
import AccountPreView from '@/components/create/preview/AccountPreView';
import GreetingPreview from '@/components/create/preview/GreetingPreview';
import GuestInfoPreview from '@/components/create/preview/GuestInfoPreview';
import MainPhotoPreView from '@/components/create/preview/MainPhotoPreView';
import NavigationDetailsPreview from '@/components/create/preview/NavigationDetailsPreview';
import PersonalInfoPreview from '@/components/create/preview/PersonalInfoPreView';
import WeddingInfoPreView from '@/components/create/preview/WeddingInfoPreView';
import WeddingInfoInput from '@/components/create/WeddingInfoInput';
import { InvitationFormType } from '@/types/invitationFormType.type';
import { Control } from 'react-hook-form';

export const INITIAL_ORDER = (control: Control<InvitationFormType>) => {
  return [
    {
      order: 0,
      component: <MainPhotoPreView control={control} />,
      input: [<MainPhotoInput key={'photoview'} />, <MainViewInput key={'mainview'} />],
    },
    {
      order: 1,
      component: <GreetingPreview control={control} />,
      input: [<GreetingInput key={'greeting'} />],
    },
    {
      order: 2,
      component: <PersonalInfoPreview control={control} />,
      input: [<PersonalInfoInput key={'personal'} />],
    },
    {
      order: 3,
      component: <AccountPreView control={control} />,
      input: [<AccountInput key={'account'} />],
    },
    {
      order: 4,
      component: <WeddingInfoPreView control={control} />,
      input: [<WeddingInfoInput key={'wedding'} />],
    },
    {
      order: 5,
      component: <NavigationDetailsPreview control={control} />,
      input: [<NavigationDetailInput key={'navi'} />],
    },
    {
      order: 6,
      component: <GuestInfoPreview control={control} />,
      input: [<GuestInfoInput key={'guest'} />],
    },
  ];
};
