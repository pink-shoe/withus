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
import { IPlayerAtom, IUserAtom, userAtom } from 'stores/user';
import { useAtom } from 'jotai';
import { IRoomAtom, roomAtom } from 'stores/room';
import Background from '@components/common/Background';
import Board from '@components/common/Board';
import { getRoomInfoApi } from 'apis/roomApi';

export default function GameRoom() {
  const location = useLocation();

  const currentPath = Number(
    location.pathname.slice(location.pathname.lastIndexOf('/') + 1, location.pathname.length)
  );

  // const getRoomData = async () => {
  //   const result = (await getRoomInfoApi(currentPath)) as IRoomAtom;
  //   result && setRoomInfo(result);
  // };

  // useEffect(() => {
  //   getRoomData();
  //   console.log(roomInfo);
  // }, []);

  const [user, setUser] = useAtom<IUserAtom>(userAtom);
  const [roomInfo, setRoomInfo] = useAtom(roomAtom);
  const [isHost, setIsHost] = useState<boolean>(true);
  const [chatStatus, setChatStatus] = useState<boolean>(true);
  const [readyStatus, setReadyStatus] = useState<boolean>(false);
  const [isUpdateUserName, setIsUpdateUserName] = useState<boolean>(false);
  // const player: IPlayerAtom = {
  //   memberId: user.memberId,
  //   nickname: user.nickname,
  //   ready: readyStatus,
  // };
  const {
    session,
    publisher,
    streamList,
    onChangeCameraStatus,
    onChangeMicStatus,
    sendSignal,
    // receiveSignal,
  } = useOpenvidu(user.memberId, user.nickname, roomInfo.room.roomId!);

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

  // const [isPlaying, setIsPlaying] = useState(true);
  // const [count, setCount] = useState(5);

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

  useEffect(() => {
    console.log('streamList', streamList);
  }, [streamList]);

  return (
    <Background isLobbyPage={false}>
      <div className='flex w-full h-full'>
        {/* 참가자 목록 */}
        <div className='justify-start bg-white z-40'>
          <ParticipantsContainer
            type={'GAME'}
            user={user}
            // onChangeUserName={onChangeUserName}
            playerList={roomInfo.playerInfos} // onChangeIsUpdateUserName={onChangeIsUpdateUserName}
            isHost={isHost} // type={'GAME'}
          />
        </div>
        {/* openvidu 화면 */}
        <div className='w-full'>
          <Board boardType='GAME'>
            <header className=' h-fit flex items-center gap-2 '>
              {/* <CountdownCircleTimer
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
              </CountdownCircleTimer> */}
            </header>
            <div className='aspect-[4/3]'>
              {publisher && (
                <div
                  ref={divRef}
                  className='aspect-[4/3] grid grid-flow-dense grid-rows-2 grid-cols-2'
                >
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
          </Board>
          <div className='p-2 mt-2 align-bottom'>
            <ControlBarContainer
              type={'GAME'}
              isHost={isHost}
              readyStatus={readyStatus}
              onChangeMicStatus={onChangeMicStatus}
              onChangeCameraStatus={onChangeCameraStatus}
              onChangeChatStatus={onChangeChatStatus}
              sendSignal={sendSignal}
              roomId={roomInfo.room.roomId}
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
      </div>
    </Background>
  );
}
