import { InvitationFormType } from '@/types/invitationFormType.type';
import { Control, useWatch } from 'react-hook-form';
import NavigationDetailCard from '../NavigationDetailCard';

const NavigationDetailsPreview = ({ control }: { control: Control<InvitationFormType> }) => {
  const navigationDetail = useWatch({
    control,
    name: 'navigationDetail',
  });
  return (
    <>
      <div>NavigationDetailsPreview</div>
      {navigationDetail.map && <div>Map</div>}
      {navigationDetail.navigation_button && <div>navigation_button</div>}
      {navigationDetail.bus && (
        <NavigationDetailCard
          label={'버스'}
          info={navigationDetail.bus}
        />
      )}
      {navigationDetail.subway && (
        <NavigationDetailCard
          label={'지하철'}
          info={navigationDetail.subway}
        />
      )}
    </>
  );
};

export default NavigationDetailsPreview;
