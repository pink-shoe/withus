import InputComponent from '../../components/common/InputComponent';

function login(): JSX.Element {
  const message = '안녕 test 중이얌';

  return <InputComponent type='text' placeholder={message} />;
}

export default login;
