'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import TextEditor from './TextEditor';

const GreetingInput = () => {
  const { register, setValue } = useFormContext();
  const greetingContext = useWatch({ name: 'greetingMessage.content' });
  const handleSetContent = (value: string) => {
    setValue('greetingMessage.content', value);
  };

  return (
    <div className='flex flex-col'>
      <div className='flex'>
        <label className='text-gray-700 text-[14px] font-medium mr-5 desktop:mr-[31px]'>제목</label>
        <input
          type='text'
          className='w-[266px] desktop:w-[460px] h-[32px] rounded-lg mb-2 p-2 border border-solid border-gray-300 text-[12px] placeholder:text-gray-300 text-gray-300'
          {...register('greetingMessage.title')}
          maxLength={20}
        />
      </div>
      <div className='flex'>
        <label className='text-gray-700 text-[14px] font-medium mr-5 desktop:mr-[31px]'>내용</label>
        <div className='w-[266px] desktop:w-[460px] h-[180px] desktop:h-[210px]'>
          <TextEditor
            placeholder='저희 두 사람의 작은 만남이 사랑의 결실을 이루어 소중한 결혼식을 올리게 되었습니다.평생 서로 귀하게 여기며 첫 마음 그대로 존중하며 살겠습니다.오로지 믿음과 사랑을 약속하는 날 오셔서 축복해 주시면 더 없는 기쁨으로 간직하겠습니다.'
            value={greetingContext || ''}
            onChange={handleSetContent}
            style={{ width: '100%', height: '80%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default GreetingInput;
