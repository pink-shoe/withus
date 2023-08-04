import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
import { VideoStream } from '@components/VideoStream';
import { useLocation } from 'react-router-dom';
import { signalType, useOpenvidu } from 'hooks/useOpenvidu';
import { ControlBarContainer } from '@components/Controlbar/ControlBarContainer';
import ParticipantsContainer from '@components/ParticipantsList/ParticipantListContainer';
import ChatContainer from '@components/Chat/ChatContainer';
import { CountdownCircleTimer, useCountdown } from 'react-countdown-circle-timer';
import { IUserAtom, userAtom } from 'stores/user';
import { useAtom } from 'jotai';
import { IRoomAtom, roomAtom } from 'stores/room';

export default function GameRoom() {
  const location = useLocation();

  const currentPath = Number(
    location.pathname.slice(location.pathname.lastIndexOf('/') + 1, location.pathname.length)
  );
  const [user, setUser] = useAtom<IUserAtom>(userAtom);
  const [roomInfo, setRoomInfo] = useAtom<IRoomAtom>(roomAtom);
  const [isHost, setIsHost] = useState<boolean>(true);
  const [chatStatus, setChatStatus] = useState<boolean>(true);
  const [readyStatus, setReadyStatus] = useState<boolean>(false);
  const [isUpdateUserName, setIsUpdateUserName] = useState<boolean>(false);

  const {
    session,
    publisher,
    streamList,
    onChangeCameraStatus,
    onChangeMicStatus,
    sendSignal,
    // receiveSignal,
  } = useOpenvidu(user.memberId!, roomInfo.roomId, readyStatus);

  const onChangeChatStatus = (chatStatus: boolean) => {
    setChatStatus(!chatStatus);
  };

  const onChangeReadyStatus = (readyStatus: boolean) => {
    setReadyStatus(!readyStatus);
  };

  // const onChangeUserName = (userName: string) => {
  //   setUser((prevUser: IUserAtom) => ({
  //     ...prevUser,
  //     nickname: userName,
  //   }));
  // };

  const onChangeIsUpdateUserName = (isUpdateUserName: boolean) => {
    setIsUpdateUserName(!isUpdateUserName);
  };
  const divRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!divRef.current) return;

    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, { scale: 1 });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, 'result.png');
        }
      });
    } catch (error) {
      console.error('Error converting div to image:', error);
    }
  };

  useEffect(() => {
    session && publisher && receiveSignal('READY');
    session && publisher && receiveSignal('CANCEL_READY');
  }, [session, publisher]);

  const [isPlaying, setIsPlaying] = useState(true);
  const [count, setCount] = useState(5);

  const receiveSignal = (type: signalType) => {
    if (session && publisher) {
      publisher.stream.session.on('signal:' + type, (e: any) => {
        const data = JSON.parse(e.data);
        console.log(data);
      });
    }
  };
  useEffect(() => {
    session && publisher && receiveSignal('READY');
    session && publisher && receiveSignal('CANCEL_READY');
  }, [session, publisher]);

  return (
    <section className={`w-full flex justify-between  h-screen`}>
      {/* 참가자 목록 */}
      <ParticipantsContainer
        type={'GAME'}
        user={user}
        // onChangeUserName={onChangeUserName}
        publisher={publisher}
        streamList={streamList}
        readyStatus={readyStatus}
        // onChangeIsUpdateUserName={onChangeIsUpdateUserName}
        // type={'GAME'}
      />
      {/* openvidu 화면 */}
      <div className=' w-1/2 h-screen flex flex-col justify-between items-center'>
        <header className=' h-fit flex items-center gap-2 '>
          <div className=' text-white font-extrabold text-6xl text-center py-3'>[] with us</div>
          <CountdownCircleTimer
            size={80}
            isPlaying={isPlaying}
            duration={count}
            initialRemainingTime={30}
            isSmoothColorTransition={true}
            // updateInterval={1}
            // colors='#aabbcc'
            // colors="url(#test-it)"
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
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
        </header>
        <div className='aspect-[4/3] h-auto max-w-full'>
          {publisher && (
            <div ref={divRef} className='aspect-[4/3] grid grid-flow-dense grid-rows-2 grid-cols-2'>
              {streamList?.map((stream: any, idx: number) => {
                // const userInfo = streamList.find((it: any) => it.userId === stream.userId);
                return (
                  <div className='w-full h-full' key={idx}>
                    <VideoStream
                      streamManager={stream.streamManager}
                      name={stream.userName}
                      isMe={stream.userId === user.memberId}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className=' h-fit p-3'>
          <ControlBarContainer
            type={'GAME'}
            isHost={isHost}
            readyStatus={readyStatus}
            onChangeMicStatus={onChangeMicStatus}
            onChangeCameraStatus={onChangeCameraStatus}
            onChangeChatStatus={onChangeChatStatus}
            onChangeReadyStatus={onChangeReadyStatus}
            sendSignal={sendSignal}
          />
        </div>
        {/* <button onClick={handleDownload}>다운로드</button> */}
      </div>
      <ChatContainer
        chatStatus={chatStatus}
        session={session}
        publisher={publisher}
        sendSignal={sendSignal}
        // receiveSignal={receiveSignal}
      />
    </section>
  );
}
