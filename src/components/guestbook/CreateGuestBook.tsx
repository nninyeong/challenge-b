'use client';

import useCreateGuestBookInput from '@/hooks/guestbook/useCreateGuestBookInput';

const CreateGuestBook: React.FC<{ invitationId: string }> = ({ invitationId }) => {
  const { register, onSubmit, errors } = useCreateGuestBookInput(invitationId);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='w-full px-4 mb-2'>
          <input
            type='text'
            className='border-gray-500 border outline-none col-span-2 p-1 w-full'
            placeholder='이름'
            {...register('name')}
          />
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        </div>
        <div className='w-full px-4 mb-2'>
          <input
            type='password'
            className='border-gray-500 border outline-none col-span-2 p-1 w-full'
            placeholder='비밀번호'
            {...register('password')}
          />
          {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
        </div>
        <div className='w-full px-4 mb-2'>
          <input
            type='text'
            className='border-gray-500 border outline-none col-span-2 p-1 w-full'
            placeholder='축하메세지'
            {...register('content')}
          />
          {errors.content && <p className='text-red-500'>{errors.content.message}</p>}
        </div>
        <button
          className='w-full px-4'
          type='submit'
        >
          작성하기
        </button>
      </form>
    </div>
  );
};

export default CreateGuestBook;
