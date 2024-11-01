import { Notify } from 'notiflix';

export const revalidateInvitation = async (invitationId: string) => {
  const response = await fetch(`/api/revalidate?id=${invitationId}`);
  const data = await response.json();

  if (response.ok) {
    Notify.success('청첩장 공개가 전환되었습니다.');
  }

  if (!response.ok) {
    console.error(data.message || '업데이트 실패');
    throw new Error(data.message);
  }
};
