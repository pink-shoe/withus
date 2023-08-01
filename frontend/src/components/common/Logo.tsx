import imgsrc from '../../assets/logo.png';

export default function Logo(): JSX.Element {
  let windcss: string = 'w-1/3';

  // size값에 따라 재사용 가능하게 설정할 예정
  // if (size === undefined) windcss = 'w-1/2';
  // else if (size === 1) windcss = 'w-32';
  // else if (size === 2) windcss = 'w-48';
  // else if (size === 3) windcss = 'w-64';

  return (
    <div className='flex justify-center items-center h-full'>
      <img
        src={imgsrc}
        alt='Logo'
        className={`${windcss} h-auto`} // Set the desired width of the logo (e.g., w-48 for 48px)
      />
    </div>
  );
}
