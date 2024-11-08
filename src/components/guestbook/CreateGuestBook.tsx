'use client';

import useCreateGuestBookInput from '@/hooks/guestbook/useCreateGuestBookInput';

const CreateGuestBook: React.FC<{ invitationId: string; isCreatePage: boolean }> = ({ invitationId, isCreatePage }) => {
  const { register, onSubmit, errors } = useCreateGuestBookInput(invitationId, isCreatePage);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='w-full px-4 mb-2'>
          <input
            type='text'
            className='text-black border-gray-500 border outline-none col-span-2 p-4 w-full h-12 rounded-xl font-main'
            placeholder='이름'
            {...register('name')}
          />
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        </div>
        <div className='w-full px-4 mb-2'>
          <input
            type='password'
            className='text-black border-gray-500 border outline-none col-span-2 p-4 w-full h-12 rounded-xl font-main'
            placeholder='비밀번호'
            {...register('password')}
          />
          {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
        </div>
        <div className='w-full px-4 mb-6'>
          <input
            type='text'
            className='text-black border-gray-500 border outline-none col-span-2 p-4 w-full h-12 rounded-xl font-main'
            placeholder='축하메세지'
            {...register('content')}
          />
          {errors.content && <p className='text-red-500'>{errors.content.message}</p>}
        </div>
        <button
          className='w-[calc(100%-32px)] ml-4 mb-14 h-12 bg-gray-900 rounded-xl text-white'
          type='submit'
        >
          축하메세지 남기기
        </button>
      </form>
    </div>
  );
};

export default CreateGuestBook;
