import Input from '../../components/common/Input';
import Test from '../../components/common/test';
import Test2 from '../../components/common/test2';
import MyCarousel from '../../components/common/MyCarousel';

export default function Layout() {
  return (
    <div>
      <Test></Test>
      {/* <Input label='아이디' type='text' placeholder={message} /> */}
      <Test2></Test2>
      <div>
        <Input label='아이디' type='text' placeholder='placeholder test'></Input>
        <Input label='비밀번호' type='text' placeholder='placeholder test'></Input>
        <button />
      </div>
      <MyCarousel />
    </div>
  );
}
