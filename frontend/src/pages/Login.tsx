import Input from '../components/common/Input';

function Login(): JSX.Element {
  const message = '안녕 test 중이얌';

  return <Input type='text' placeholder={message} />;
}

export default Login;
