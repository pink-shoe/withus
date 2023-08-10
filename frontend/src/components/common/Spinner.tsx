import img from '../../assets/8.gif';

export default function Spinner() {
  return (
    <div>
      <div className='flex justify-center align-middle'>
      `<div>
        <img src={img} alt='Loading...' />
      </div>
      <div className='font-kdisplay text-5xl text-[#514148]'>
        잠시만 기다려주세요
      </div>
      </div>
    </div>
  );
}
