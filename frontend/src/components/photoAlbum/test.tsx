import { useForm, SubmitHandler } from 'react-hook-form';

interface LoginFormProps {
  onSubmit: SubmitHandler<any>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='email'>이메일</label>
      <input
        id='email'
        type='text'
        placeholder='test@email.com'
        aria-invalid={isSubmitted ? (errors.email ? 'true' : 'false') : undefined}
        {...register('email', {
          required: '이메일은 필수 입력입니다.',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: '이메일 형식에 맞지 않습니다.',
          },
        })}
      />
      {errors.email && <small role='alert'>{errors.email.message}</small>}
      <label htmlFor='password'>비밀번호</label>
      <input
        id='password'
        type='password'
        placeholder='****************'
        aria-invalid={isSubmitted ? (errors.password ? 'true' : 'false') : undefined}
        {...register('password', {
          required: '비밀번호는 필수 입력입니다.',
          minLength: {
            value: 8,
            message: '8자리 이상 비밀번호를 사용하세요.',
          },
        })}
      />
      {errors.password && <small role='alert'>{errors.password.message}</small>}
      <button type='submit' disabled={isSubmitting}>
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
