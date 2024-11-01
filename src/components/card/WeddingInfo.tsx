'use client';
import { InvitationFormType } from '@/types/invitationFormType.type';

type WeddingInfoPropType = Pick<InvitationFormType, 'weddingInfo'>;
const WeddingInfo = ({ weddingInfo }: WeddingInfoPropType) => {
  return (
    <div>
      웨딩 정보 입력 미리보기 영역
      <p>날짜: {weddingInfo?.date}</p>
      <p>{weddingInfo.time.hour}시</p>
      <p>{weddingInfo.time.minute}분</p>
      <p>예식장 주소: {weddingInfo.weddingHallAddress}</p>
      <p>예식장 이름: {weddingInfo.weddingHallName}</p>
      <p>연락처: {weddingInfo.weddingHallContact}</p>
    </div>
  );
};

export default WeddingInfo;
