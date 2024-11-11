'use client';
import { InvitationFormType } from '@/types/invitationFormType.type';
import MapView from '@/components/map/MapView';
import NavigationButtons from '@/components/create/NavigationButtons';
import NavigationDetailCard from '@/components/create/NavigationDetailCard';

type NavigationDetailsPropType = Pick<InvitationFormType, 'navigationDetail' | 'weddingInfo' | 'fontInfo'>;
const NavigationDetails = ({ navigationDetail, weddingInfo, fontInfo }: NavigationDetailsPropType) => {
  const { color } = fontInfo;
  const rgbaColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

  return (
    <div className='mb-[75px/]'>
      {navigationDetail.map && <MapView address={weddingInfo.weddingHallAddress} />}
      {navigationDetail.navigationButton && (
        <NavigationButtons
          address={weddingInfo.weddingHallAddress}
          name={weddingInfo.weddingHallName}
          fontColor={rgbaColor}
        />
      )}
      {navigationDetail.bus && (
        <NavigationDetailCard
          label={'버스'}
          info={navigationDetail.bus}
          fontColor={rgbaColor}
        />
      )}
      {navigationDetail.subway && (
        <NavigationDetailCard
          label={'지하철'}
          info={navigationDetail.subway}
          fontColor={rgbaColor}
        />
      )}
    </div>
  );
};

export default NavigationDetails;
