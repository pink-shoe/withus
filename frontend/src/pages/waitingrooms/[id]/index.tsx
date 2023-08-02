import { useEffect, useState } from 'react';
import { VideoStream } from '@components/VideoStream';
import { useLocation } from 'react-router-dom';
import { useOpenvidu } from 'hooks/useOpenvidu';
import { ControlBarContainer } from '@components/Controlbar/ControlBarContainer';
import ParticipantsContainer from '@components/ParticipantsList/ParticipantListContainer';
import ChatContainer from '@components/Chat/ChatContainer';
export default function WaitingRoom() {
  const location = useLocation();

  const currentPath = location.pathname.slice(
    location.pathname.lastIndexOf('/') + 1,
    location.pathname.length
  );

  const [roomId, setRoomId] = useState<string>(currentPath);
  const [userId, setUserId] = useState<number>(Math.floor(Math.random() * 100));
  const [isHost, setIsHost] = useState<boolean>(false);
  const [userName, setUserName] = useState('name' + userId);
  const [chatStatus, setChatStatus] = useState<boolean>(true);
  const [readyStatus, setReadyStatus] = useState<boolean>(false);
  const [updateUserNameStatus, setUpdateUserNameStatus] = useState<boolean>(false);

  const { session, publisher, streamList, onChangeCameraStatus, onChangeMicStatus, sendMessage } =
    useOpenvidu(userId!, roomId);

  const onChangeChatStatus = (chatStatus: boolean) => {
    setChatStatus(!chatStatus);
  };

  const onChangeReadyStatus = (readyStatus: boolean) => {
    setReadyStatus(!readyStatus);
  };

  const onChangeUserName = (userName: string) => {
    setUserName(userName);
  };

  const onChangeUpdateUserNameStatus = (updateUserNameStatus: boolean) => {
    setUpdateUserNameStatus(!updateUserNameStatus);
  };
  useEffect(() => {
    console.log('wait ', readyStatus);
  }, [readyStatus]);
  return (
    <section className={`w-full flex  justify-between h-screen`}>
      {/* 참가자 목록 */}
      <ParticipantsContainer
        userId={userId}
        userName={userName}
        onChangeUserName={onChangeUserName}
        publisher={publisher}
        streamList={streamList}
        readyStatus={readyStatus}
        updateUserNameStatus={updateUserNameStatus}
        onChangeUpdateUserNameStatus={onChangeUpdateUserNameStatus}
        onChangeReadyStatus={onChangeReadyStatus}
        type={'WAIT'}
      />
      {/* openvidu 화면 */}
      <div className=' h-full flex flex-col justify-between'>
        <header className=''>
          <div className=' text-white font-extrabold text-6xl text-center py-3'>[] with us</div>
        </header>
        <div className='aspect-[4/3]'>
          {publisher && (
            <div className='w-full'>
              <VideoStream streamManager={publisher} name={userName} isMe={true} />
            </div>
          )}
        </div>
        <div className=' p-3'>
          <ControlBarContainer
            isHost={isHost}
            readyStatus={readyStatus}
            onChangeMicStatus={onChangeMicStatus}
            onChangeCameraStatus={onChangeCameraStatus}
            onChangeChatStatus={onChangeChatStatus}
            onChangeReadyStatus={onChangeReadyStatus}
          />
        </div>
      </div>
      <ChatContainer
        chatStatus={chatStatus}
        session={session}
        publisher={publisher}
        sendMessage={sendMessage}
      />
    </section>
  );
}
