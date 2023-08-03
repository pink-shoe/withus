import { useEffect, useState } from 'react';
import { VideoStream } from '@components/VideoStream';
import { useLocation } from 'react-router-dom';
import { signalType, useOpenvidu } from 'hooks/useOpenvidu';
import { ControlBarContainer } from '@components/Controlbar/ControlBarContainer';
import ParticipantsContainer from '@components/ParticipantsList/ParticipantListContainer';
import ChatContainer from '@components/Chat/ChatContainer';
import Board from '@components/common/Board';
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

  const {
    session,
    publisher,
    streamList,
    // subscribers,
    // setSubscribers,
    updateUserStatus,
    onChangeCameraStatus,
    onChangeMicStatus,
    sendSignal,
  } = useOpenvidu(userId!, roomId, readyStatus);

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

  const receiveSignal = (type: signalType) => {
    if (session && publisher) {
      publisher.stream.session.on('signal:' + type, (e: any) => {
        const data = JSON.parse(e.data);
        type === 'READY'
          ? updateUserStatus(data.userId, true)
          : type === 'CANCEL_READY'
          ? updateUserStatus(data.userId, false)
          : null;
        // const newStreamList = streamList.map((stream) => {
        //   if (stream.userId === data.userId) {
        //     if (type === 'READY') return { ...stream, isReady: true };
        //     else if (type === 'CANCEL_READY') return { ...stream, isReady: false };
        //     console.log('test', userId, stream);
        //   }
        //   console.log('testtest', data.userId, stream.userId);
        //   return { ...stream };
        // });

        // // setSubscribers((prev) => {

        // // })
        // console.log('tt', newStreamList);
        // setSubscribers(newStreamList);
        // type === 'READY' ?

        // : type === 'CANCEL_READY' ? :

        console.log(data);
      });
    }
  };

  useEffect(() => {
    console.log('wait ', readyStatus);
  }, [readyStatus]);

  useEffect(() => {
    session && publisher && receiveSignal('READY');
    session && publisher && receiveSignal('CANCEL_READY');
  }, [session, publisher]);

  useEffect(() => {
    console.log(streamList);
  }, [streamList]);
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
      <div className=' h-full '>
        <Board boardType={'WAIT'}>
          {/* <header className=''>
          <div className=' text-white font-extrabold text-6xl text-center py-3'>[] with us</div>
        </header> */}
          <div className='aspect-[4/3]'>
            {publisher && (
              <div className='w-full'>
                <VideoStream streamManager={publisher} name={userName} isMe={true} />
              </div>
            )}
          </div>
        </Board>
        <div className=' p-3'>
          <ControlBarContainer
            type={'WAIT'}
            isHost={isHost}
            readyStatus={readyStatus}
            onChangeMicStatus={onChangeMicStatus}
            onChangeCameraStatus={onChangeCameraStatus}
            onChangeChatStatus={onChangeChatStatus}
            onChangeReadyStatus={onChangeReadyStatus}
            sendSignal={sendSignal}
          />
        </div>
      </div>
      <ChatContainer
        chatStatus={chatStatus}
        session={session}
        publisher={publisher}
        sendSignal={sendSignal}
      />
    </section>
  );
}
