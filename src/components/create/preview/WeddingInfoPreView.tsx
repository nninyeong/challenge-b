import { Control, useWatch } from 'react-hook-form';
import { InvitationFormType } from '@/types/invitationFormType.type';

const WeddingInfoPreView = ({ control }: { control: Control<InvitationFormType> }) => {
  const weddingInfoWatch = useWatch({
    control,
    name: 'wedding_info',
  });

  return (
    <div>
      웨딩 정보 입력 미리보기 영역
      {weddingInfoWatch?.date}
      {weddingInfoWatch.time.hour}
      {weddingInfoWatch.time.minute}
      {weddingInfoWatch.weddingHallAddress}
      {weddingInfoWatch.weddingHallName}
      {weddingInfoWatch.weddingHallContact}
    </div>
  );
};

export default WeddingInfoPreView;
