import img from '../../assets/8.gif';

export default function Spinner() {
  return (
    <div>
      <div className='flex justify-center h-screen'>
       <div>
          <img src={img} alt='Loading...' />
          <div className='w-full text-center'>
            <span className='font-kdisplay w-full text-center text-6xl text-[#514148] delay-700 animate-ping'>
              로딩 중...
            </span>
          </div>
      </div>
      </div>
    </div>
  );
}
