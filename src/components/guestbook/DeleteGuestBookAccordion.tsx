'use client';

import useDeleteGuestBookInput from '@/hooks/guestbook/useDeleteGuestBookInput';

const DeleteGuestBookAccordion = ({
  invitationId,
  id,
  signedPassword,
  onClose,
}: {
  invitationId: string;
  id: string | null;
  signedPassword: string | null;
  onClose: () => void;
}) => {
  const { password, handlePasswordChange, handleGuestBookDelete } = useDeleteGuestBookInput(
    invitationId,
    id,
    signedPassword,
    onClose,
  );

  return (
    <div className='text-black'>
      <form onSubmit={handleGuestBookDelete}>
        <input
          type='password'
          className='border-gray-500 border outline-none p-1 w-full mb-2 rounded-lg'
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
