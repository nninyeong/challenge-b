'use client';
import { InvitationFormType } from '@/types/invitationFormType.type';
import MapView from '@/components/map/MapView';
import NavigationButtons from '@/components/create/NavigationButtons';
import NavigationDetailCard from '@/components/create/NavigationDetailCard';
import { useFontColorStore } from '@/store/useFontStore';

type NavigationDetailsPropType = Pick<InvitationFormType, 'navigationDetail' | 'weddingInfo'>;
const NavigationDetails = ({ navigationDetail, weddingInfo }: NavigationDetailsPropType) => {
  const fontColor = useFontColorStore((state) => state.fontColor);

  const rgbaColor = `rgba(${fontColor.r}, ${fontColor.g}, ${fontColor.b}, ${fontColor.a})`;
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
