'use client';
import { InvitationFormType } from '@/types/invitationFormType.type';
import MapView from '@/components/map/MapView';
import NavigationButtons from '@/components/create/NavigationButtons';
import NavigationDetailCard from '@/components/create/NavigationDetailCard';

type NavigationDetailsPropType = Pick<InvitationFormType, 'navigationDetail' | 'weddingInfo'>;
const NavigationDetails = ({ navigationDetail, weddingInfo }: NavigationDetailsPropType) => {
  return (
    <>
      {navigationDetail.map && <MapView address={weddingInfo.weddingHallAddress} />}
      {navigationDetail.navigationButton && (
        <NavigationButtons
          address={weddingInfo.weddingHallAddress}
          name={weddingInfo.weddingHallName}
        />
      )}
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

export default NavigationDetails;
