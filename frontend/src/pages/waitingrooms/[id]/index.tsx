import { useEffect, useState } from 'react';
import { VideoStream } from '@components/VideoStream';
import { useLocation } from 'react-router-dom';
import { IUser, useOpenvidu } from 'hooks/useOpenvidu';
import { ControllBarContainer } from '@components/Controllbar/ControllBarContainer';
import ParticipantsContainer from '@components/ParticipantsList/ParticipantListContainer';
import ChatContainer from '@components/Chat/ChatContainer';
import { useAtom } from 'jotai';
import { IUserAtom, userAtom } from 'stores/user';
import { IRoomAtom, roomAtom } from 'stores/room';
export default function WaitingRoom() {
  const location = useLocation();

  const currentPath = location.pathname.slice(
    location.pathname.lastIndexOf('/') + 1,
    location.pathname.length
  );
  const [user, setUser] = useAtom<IUserAtom>(userAtom);
  const [roomInfo, setRoomInfo] = useAtom<IRoomAtom>(roomAtom);
  const [isHost, setIsHost] = useState<boolean>(true);
  const [chatStatus, setChatStatus] = useState<boolean>(true);
  const [readyStatus, setReadyStatus] = useState<boolean>(false);
  // const [isUpdateUserName, setIsUpdateUserName] = useState<boolean>(false);

  const { session, publisher, streamList, onChangeCameraStatus, onChangeMicStatus, sendMessage } =
    useOpenvidu(user.memberId!, roomInfo.roomId);

  const onChangeChatStatus = (chatStatus: boolean) => {
    setChatStatus(!chatStatus);
  };

  const onChangeReadyStatus = (readyStatus: boolean) => {
    setReadyStatus(!readyStatus);
  };

  // const onChangeUserName = (userName: string) => {
  //   setUserName(userName);
  // };

  // const onChangeIsUpdateUserName = (isUpdateteteUserName: boolean) => {
  //   setIsUpdateUserName(!isUpdateUserName);
  // };

  return (
    <section className={`w-full flex  justify-between h-screen`}>
      {/* 참가자 목록 */}
      <ParticipantsContainer
        type={'WAIT'}
        user={user}
        // userId={userId}
        // userName={userName}
        // onChangeUserName={onChangeUserName}
        publisher={publisher}
        streamList={streamList}
        readyStatus={readyStatus}
        // onChangeIsUpdateUserName={onChangeIsUpdateUserName}
      />
      {/* openvidu 화면 */}
      <div className=' h-full flex flex-col justify-between'>
        <header className=''>
          <div className=' text-white font-extrabold text-6xl text-center py-3'>[] with us</div>
        </header>
        <div className='aspect-[4/3]'>
          {publisher && (
            <div className='w-full'>
              <VideoStream streamManager={publisher} name={user.nickname} isMe={true} />
            </div>
          )}
        </div>
        <div className=' p-3'>
          <ControllBarContainer
            isHost={isHost}
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
