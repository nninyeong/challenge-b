'use client';
import { InvitationFormType } from '@/types/invitationFormType.type';
import MapView from '@/components/map/MapView';
import NavigationButtons from '@/components/create/NavigationButtons';
import NavigationDetailCard from '@/components/create/NavigationDetailCard';
import { useFontStore } from '@/store/useFontStore';

type NavigationDetailsPropType = Pick<InvitationFormType, 'navigationDetail' | 'weddingInfo'>;
const NavigationDetails = ({ navigationDetail, weddingInfo }: NavigationDetailsPropType) => {
  const fontSize = useFontStore((state) => state.fontSize);
  return (
    <div
      style={{ fontSize: `${16 + fontSize}px` }}
      className='mb-[75px]'
    >
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
    </div>
  );
};

export default NavigationDetails;
