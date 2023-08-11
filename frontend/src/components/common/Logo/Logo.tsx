import { Fragment, useState } from 'react';
import './LogoStyle.css';
import { CountdownCircleTimer, useCountdown } from 'react-countdown-circle-timer';
import { textShadow } from 'html2canvas/dist/types/css/property-descriptors/text-shadow';
import { Divide } from 'react-feather';

export type logoType = 'GAMELOGO' | 'LOBBYLOGO' | 'ALBUMLOGO';

interface ILogoProps {
  logoType: logoType;
}

export default function Logo({ logoType }: ILogoProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [count, setCount] = useState(5);
  return (
    <Fragment>
      {logoType === 'GAMELOGO' ? (
        <div className='logo-game'>
          <span className='text'>[</span>
          <span className='text'>
            <div className='bg-[#FF8DA3] w-36 h-28 inline-block align-middle rounded-lg ms-5 me-3'></div>
            ] with us
          </span>
          <div className='ms-6 inline-block'>
            <div className='h-[70px]'>
            <CountdownCircleTimer
              size={85}
              isPlaying={isPlaying}
              duration={count}
              initialRemainingTime={7}
              isSmoothColorTransition={true}
              // updateInterval={1}
              // colors='#aabbcc'
              // colors="url(#test-it)"
              colors={['#FA8D8D', '#FA8D8D', '#F84C4C', '#F84C4C']}
              colorsTime={[7, 4.66, 1.33, 0]}
              onUpdate={(remainingTime) => {
                // console.log('Counter is ', count);
                // console.log('Remaining time is ', remainingTime);
              }}
              onComplete={() => ({ shouldRepeat: false })}
              strokeWidth={20}
            >
              {({ remainingTime }) => (
                <div className='text-black text-4xl font-semibold bg-white w-12 h-12 p-[5px] rounded-full text-center align-middle'>{remainingTime}</div>
              )}
            </CountdownCircleTimer>

            </div>
          </div>
        </div>
      ) : logoType === 'LOBBYLOGO' ? (
        <div className='logo'>[ ] with us</div>
        ) : (
        <div className='logo-album'>[ ] with us</div>
      )}
    </Fragment>
  );
}
