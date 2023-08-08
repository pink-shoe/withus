import { Fragment, useState } from 'react';
import './LogoStyle.css';
import { CountdownCircleTimer, useCountdown } from 'react-countdown-circle-timer';

interface ILogoProps {
  isGameRoomLogo: boolean;
}

export default function Logo({ isGameRoomLogo }: ILogoProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [count, setCount] = useState(5);
  return (
    <Fragment>
      {isGameRoomLogo ? (
        <div className='logoGame'>
          <span>[</span>
          <span>
            <div className='bg-[#FF8DA3] w-36 h-28 inline-block align-middle rounded-lg ms-5 me-3'></div>
            ] with us
          </span>
          <div className='ms-2  inline-block'>
            <CountdownCircleTimer
              size={80}
              isPlaying={isPlaying}
              duration={count}
              initialRemainingTime={5}
              isSmoothColorTransition={true}
              // updateInterval={1}
              // colors='#aabbcc'
              // colors="url(#test-it)"
              colors={['#FA8D8D', '#FA8D8D', '#F84C4C', '#F84C4C']}
              colorsTime={[4, 2.66, 1.33, 0]}
              onUpdate={(remainingTime) => {
                console.log('Counter is ', count);
                console.log('Remaining time is ', remainingTime);
              }}
              onComplete={() => ({ shouldRepeat: true })}
              strokeWidth={20}
            >
              {({ remainingTime }) => (
                <div className=' text-white text-3xl font-bold'>{remainingTime}</div>
              )}
            </CountdownCircleTimer>
          </div>
        </div>
      ) : (
        <div className='logo'>[ ] with us</div>
      )}
    </Fragment>
  );
}
