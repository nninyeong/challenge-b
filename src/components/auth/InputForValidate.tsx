import { FieldPath, UseFormRegister } from 'react-hook-form';
import { SignInFormValues, SignUpFormValues } from '@/types/auth.types';

const InputForValidate = ({
  type = 'text',
  placeholder,
  validateFor,
  register,
  errorMessage,
  guideMessage,
  className,
}: {
  type: string;
  placeholder: string;
  validateFor: FieldPath<SignInFormValues | SignUpFormValues>;
  register: UseFormRegister<SignInFormValues | SignUpFormValues>;
  errorMessage?: string;
  guideMessage?: string;
  className?: string;
}) => {
  return (
    <div className='grid grid-rows-[48px_24px] gap-0 w-full content-center items-center'>
      <input
        type={type}
        placeholder={placeholder}
        {...register(validateFor)}
        className={`border rounded-[12px] w-full h-[48px] p-[16px] ${className}`}
      />
      {!errorMessage && (
        <p className='text-gray-600 text-[12px] ml-[16px] leading-[12px]'>
          {validateFor === 'password' && guideMessage}
        </p>
      )}
      {errorMessage && <p className='text-primary-300 text-[12px] ml-[16px] leading-[12px]'>{errorMessage}</p>}
    </div>
  );
};

export default InputForValidate;
