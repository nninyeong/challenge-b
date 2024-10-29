'use client';

import { useFormContext } from 'react-hook-form';
import TextEditor from './TextEditor';

const GreetingInput = () => {
  const { register, setValue } = useFormContext();
  return (
    <div>
      <input
        type='text'
        {...register('greetingMessage.title')}
      />
      <TextEditor
        value='content'
        placeholder='저희 두 사람의 작은 만남이 사랑의 결실을 이루어 소중한 결혼식을 올리게 되었습니다. 평생 서로 귀하게 여기며 첫 마음 그대로 존중하며 살겠습니다. 오로지 믿음과 사랑을 약속하는 날 오셔서 축복해 주시면 더 없는 기쁨으로 간직하겠습니다.'
      />
    </div>
  );
};

export default GreetingInput;
