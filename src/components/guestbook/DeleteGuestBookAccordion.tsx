'use client';

import useDeleteGuestBookInput from '@/hooks/guestbook/useDeleteGuestBookInput';

const DeleteGuestBookAccordion = ({
  invitationId,
  id,
  signedPassword,
  onClose,
  isCreatePage,
  thisPage
}: {
  invitationId: string;
  id: string | null;
  signedPassword: string | null;
  onClose: () => void;
  isCreatePage: boolean;
  thisPage: number;
}) => {
  const { password, handlePasswordChange, handleGuestBookDelete } = useDeleteGuestBookInput(
    invitationId,
    id,
    signedPassword,
    onClose,
    isCreatePage,
    thisPage
  );

  return (
    <div className='text-black'>
      <form onSubmit={handleGuestBookDelete}>
        <input
          type='password'
          className='border-gray-500 border outline-none p-2 w-full mb-2 rounded-lg text-[14px] font-Main'
          value={password}
          placeholder='비밀번호를 입력하세요.'
          onChange={handlePasswordChange}
        />
        <button
          className='w-full mb-3 text-[14px] text-white bg-primary300 py-2 rounded-lg'
          type='submit'
        >
          확인
        </button>
      </form>
    </div>
  );
};

export default DeleteGuestBookAccordion;
