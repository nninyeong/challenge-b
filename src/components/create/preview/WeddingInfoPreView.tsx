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
      <p>날짜: {weddingInfoWatch?.date}</p>
      <p>{weddingInfoWatch.time.hour}시</p>
      <p>{weddingInfoWatch.time.minute}분</p>
      <p>예식장 주소: {weddingInfoWatch.weddingHallAddress}</p>
      <p>예식장 이름: {weddingInfoWatch.weddingHallName}</p>
      <p>연락처: {weddingInfoWatch.weddingHallContact}</p>
    </div>
  );
};

export default WeddingInfoPreView;
