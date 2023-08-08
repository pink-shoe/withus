import { Fragment } from 'react';
import './LogoStyle.css';

interface ILogoProps {
  isGameRoomLogo: boolean;
}

export default function Logo({ isGameRoomLogo }: ILogoProps) {
  return (
    <Fragment>
      {isGameRoomLogo ? (
        <div className='logo'>
          <span>[</span>
          <span>
            <div className='bg-[#FF8DA3] w-36 h-28 inline-block align-middle rounded-lg ms-5 me-3'></div>
            ] with us
          </span>
        </div>
      ) : (
        <div className='logo'>[ ] with us</div>
      )}
    </Fragment>
  );
}
