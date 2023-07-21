import Input from '../../components/common/Input';
// import Test from '../../components/common/test';
// import Test2 from '../../components/common/test2';
import MyCarousel from '../../components/common/MyCarousel';
import Button from '../../components/common/Button';
import Logo from '../../components/common/Logo';

export default function Layout() {
  return (
    <div className="bg-[url('/src/assets/background2.jpg')] bg-cover">
      <Logo />
      {/* <Test></Test>
      <Test2></Test2> */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
        <div className='lg:flex lg:flex-col mx-4 gap-4 rounded-lg  border-2 border-black w-full h-full bg-white'>
          <Input label='닉네임 설정' type='text' placeholder='placeholder test'></Input>
          <Input label='입장 코드' type='text' placeholder='placeholder test'></Input>
          <div className='flex justify-center'>
            <p className='text-black hover:text-purple-600'>
              로그인한 유저만 방을 생성할 수 있습니다.
            </p>
          </div>
          <Button />
        </div>
        <div className='flex justify-center items-center rounded-lg border-2 mx-4 border-black bg-white'>
          <div className='flex justify-center items-center rounded-lg  border-2 border-black mx-4 my-8'>
            <MyCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}
