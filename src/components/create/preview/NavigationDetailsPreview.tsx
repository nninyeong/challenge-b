import MapView from "@/components/map/MapView";
import { InvitationFormType } from "@/types/invitationFormType.type"
import { Control, useWatch } from "react-hook-form"

const NavigationDetailsPreview = ({ control }: { control: Control<InvitationFormType> }) => {
  const navigationDetail = useWatch({
    control,
    name: 'navigation_detail',
  });
  const weddingInfoWatch = useWatch({
    control,
    name: 'wedding_info',
  });
  return (
    <>
      <div>NavigationDetailsPreview</div>
      {navigationDetail.map && <MapView address={weddingInfoWatch.weddingHallAddress} />}
      {navigationDetail.navigation_button && <div>navigation_button</div>}
      {navigationDetail.car && <div><div>자가용</div><div>{navigationDetail.car}</div></div>}
      {navigationDetail.subway && <div><div>지하철</div><div>{navigationDetail.subway}</div></div>}
      {navigationDetail.bus && <div><div>버스</div><div>{navigationDetail.bus}</div></div>}
    </>
  )
}

export default NavigationDetailsPreview