import { FieldPath, UseFormRegister } from 'react-hook-form';
import { SignInFormValues, SignUpFormValues } from '@/types/auth.types';

const InputForValidate = ({
  type = 'text',
  placeholder,
  validateFor,
  register,
  errorMessage,
}: {
  type: string;
  placeholder: string;
  validateFor: FieldPath<SignInFormValues | SignUpFormValues>;
  register: UseFormRegister<SignInFormValues | SignUpFormValues>;
  errorMessage?: string;
}) => {
  return (
    <div className='grid grid-rows-[48px_16px] gap-0 w-full'>
      <input
        type={type}
        placeholder={placeholder}
        {...register(validateFor)}
        className='border rounded-[12px] w-full h-[48px] p-[16px]'
      />
      {errorMessage && <p className='text-red-500 text-[10px]'>{errorMessage}</p>}
    </div>
  );
};

export default InputForValidate;
