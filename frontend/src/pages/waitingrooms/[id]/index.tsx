import { useEffect, useState } from 'react';
import { VideoStream } from '@components/VideoStream';
import { useLocation } from 'react-router-dom';
import { IUser, useOpenvidu } from 'hooks/useOpenvidu';
import { ControllBarContainer } from '@components/controllBar/ControllBarContainer';
import ParticipantsContainer from '@components/participantsList/ParticipantListContainer';
export default function WaitingRoom() {
  const location = useLocation();

  const currentPath = location.pathname.slice(
    location.pathname.lastIndexOf('/') + 1,
    location.pathname.length
  );

  const [roomId, setRoomId] = useState<string>(currentPath);
  const [userId, setUserId] = useState<number>(Math.floor(Math.random() * 100));
  const [isMaster, setIsMaster] = useState<boolean>(false);
  const [userName, setUserName] = useState('name' + userId);
  const [chatStatus, setChatStatus] = useState<boolean>(true);
  const [readyStatus, setReadyStatus] = useState<boolean>(false);
  const [isEditUserName, setIsEditUserName] = useState<boolean>(false);

  // useWebSocket({
  //   onConnect(frame, client) {
  //     let flag = true;
  //     client.subscribe(`/topic/meeting/status/${roomId}`, function (response) {
  //       console.log(response.body);
  //       if (JSON.parse(response.body).last_pick_status) {
  //         setSnackMessage('3초 후 최종 선택이 시작돼요!!');
  //         setShowSnack(true);
  //         setTimeout(() => {
  //           setLastPickModalOpen(true);
  //         }, 3000);
  //       }
  //     });

  //     client.subscribe(`/topic/meeting/balance/${roomId}`, function (response) {
  //       console.log('asdasd', response.body);
  //       const res = JSON.parse(response.body);
  //       if (res.id) {
  //         setSnackMessage('3초 후 밸런스 게임이 시작돼요!!');
  //         setShowSnack(true);
  //         dispatch(setBalanceId(res.id));
  //         dispatch(setBalanceA(res.a));
  //         dispatch(setBalanceB(res.b));
  //         setTimeout(() => {
  //           setBalanceGameModalOpen(true);
  //         }, 3000);
  //       }
  //     });

  //     client.subscribe(`/topic/meeting/stuff/${roomId}`, function (response) {
  //       console.log(response.body);
  //       if (flag) {
  //         flag = false;
  //         setSnackMessage('3초 후 물건 고르기 게임이 시작돼요!!');
  //         setShowSnack(true);
  //         setTimeout(() => {
  //           setPickStuffModalOpen(true);
  //         }, 3000);
  //       }
  //     });

  //     client.subscribe(`/topic/meeting/balance/result/${roomId}`, function (response) {
  //       console.log(response.body);
  //       const res = JSON.parse(response.body).balance_result;
  //       setBalanceResult(res);
  //     });
  //   },
  //   beforeDisconnected(frame, client) {
  //     client.publish({
  //       destination: '/app/meeting/leave',
  //       body: JSON.stringify({
  //         meetingroom_id: roomId,
  //         user_id: userId,
  //       }),
  //     });
  //   },
  // });

  const { publisher, streamList, onChangeCameraStatus, onChangeMicStatus } = useOpenvidu(
    userId!,
    roomId
  );
  const [messageList, setMessageList] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  const onChangeMessage = (e: any) => {
    setMessage(e.target.value);
    console.log(e.target.value);
  };

  const onChangeChatStatus = (chatStatus: boolean) => {
    setChatStatus(!chatStatus);
  };
  const onChangeReadyStatus = (readyStatus: boolean) => {
    setReadyStatus(!readyStatus);
  };
  const onChangeUserName = (userName: string) => {
    setUserName(userName);
  };
  const onChangeIsEditUserName = (isEditUserName: boolean) => {
    setIsEditUserName(!isEditUserName);
  };
  const sendMessage = () => {
    if (message) {
      let msg = message.replace(/ +(?= )/g, '');
      if (msg !== '' && msg !== ' ') {
        {
          publisher.signal({
            data: JSON.stringify({
              message: message,
              nickname: userName,
              streamId: publisher.stream.streamId,
            }),
          });
          // streamList?.map((stream: any, idx: number) => {
          //   stream.userId === userId &&
          //     stream.streamManager.stream.session.signal({

          //     });
          // });
        }
      }
    }
    setMessage('');
  };

  const receiveMessage = () => {
    let msgList = messageList;

    publisher.stream.session.on('signal:chat', (e: any) => {
      console.log('test', e);
      const data = JSON.parse(e.data);
      msgList.push({
        connectionId: e.from.connectionId,
        nickname: data.nickname,
        message: data.message,
      });
      console.log('test', msgList);
    });
  };

  useEffect(() => {
    receiveMessage();
  });

  return (
    <section className={`w-full flex overflow-y-hidden  justify-between h-screen`}>
      {/* 참가자 목록 */}
      <ParticipantsContainer
        userId={userId}
        userName={userName}
        onChangeUserName={onChangeUserName}
        publisher={publisher}
        streamList={streamList}
        readyStatus={readyStatus}
        onChangeIsEditUserName={onChangeIsEditUserName}
      />
      {/* openvidu 화면 */}
      <div className=' h-full flex flex-col justify-between pb-5'>
        <header className=''>
          <div className=' text-white font-extrabold text-6xl text-center py-10'>[] with us</div>
        </header>
        {publisher && (
          <div className='w-full'>
            <VideoStream
              streamManager={publisher.streamManager}
              name={publisher.userName}
              me={publisher.userId === userId}
            />
          </div>
        )}

        <div className=' p-3'>
          <ControllBarContainer
            isHost={isMaster}
            onChangeMicStatus={onChangeMicStatus}
            onChangeCameraStatus={onChangeCameraStatus}
            onChangeChatStatus={onChangeChatStatus}
            onChangeReadyStatus={onChangeReadyStatus}
          />
        </div>
      </div>

      {chatStatus ? (
        <div id='participantsList' className=' w-80'>
          <div className='text-center bg-[#112364] p-3 text-white whitespace-nowrap font-bold text-xl'>
            채팅창
          </div>
          <div className='bg-white h-full'>
            <div className='w-full h-5/6'></div>
            <div className='flex w-full justify-center items-center'>
              <input
                className='w-full p-2 border-2 border-blue-800 rounded-md text-center focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:text-slate-400'
                placeholder='메세지를 입력해주세요.'
                type='text'
                value={message}
                onChange={onChangeMessage}
              />
              <button className='whitespace-nowrap' onClick={sendMessage}>
                전송
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </section>
  );
}
