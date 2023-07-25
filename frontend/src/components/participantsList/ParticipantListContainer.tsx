import { useEffect, useState } from 'react';
import { VideoStream } from '@components/VideoStream';
import { useLocation } from 'react-router-dom';
import { IUser, useOpenvidu } from 'hooks/useOpenvidu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons'; // import { AvatimeApi } from "../apis/avatimeApi";
import { ControllBarContainer } from '@components/controllBar/ControllBarContainer';

export let localUser: IUser;
export default function WaitingRoom() {
  const location = useLocation();

  const currentPath = location.pathname.slice(
    location.pathname.lastIndexOf('/') + 1,
    location.pathname.length
  );

  const [roomId, setRoomId] = useState<string>(currentPath);
  const [userId, setUserId] = useState<number>(Math.floor(Math.random() * 100));
  const [isMaster, setIsMaster] = useState<boolean>(false);

  const [chatStatus, setChatStatus] = useState<boolean>(true);
  const [readyStatus, setReadyStatus] = useState<boolean>(false);

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
  const sendMessage = () => {
    if (message) {
      let msg = message.replace(/ +(?= )/g, '');
      if (msg !== '' && msg !== ' ') {
        {
          streamList?.map((stream: any, idx: number) => {
            stream.userId === userId &&
              stream.streamManager.stream.session.signal({
                data: JSON.stringify({
                  message: message,
                  nickname: 'name' + userId,
                  streamId: stream.streamManager.stream.streamId,
                }),
              });
          });
        }
      }
    }
    setMessage('');
  };

  const receiveMessage = () => {
    // streamList &&
    // console.log('test', streamList);
    streamList?.map((stream: any, idx: number) => {
      // console.log('test', stream.streamManager);
      let msgList = messageList;
      stream.userId === userId &&
        stream.streamManager &&
        stream.streamManager.stream.session.on('signal:chat', (e: any) => {
          console.log('test', e);
          const data = JSON.parse(e.data);
          msgList.push({
            connectionId: e.from.connectionId,
            nickname: data.nickname,
            message: data.message,
          });
          console.log('test', msgList);
        });
      setMessageList(msgList);
    });
  };
  useEffect(() => {
    receiveMessage();
  }, [streamList]);

  return (
    <section className={`w-full flex overflow-y-hidden justify-between h-screen`}>
      {/* 참가자 목록 */}
      <div id='participantsList' className='w-fit max-w-[1/6] bg-white'>
        <div className='bg-[#112364] p-3 text-white whitespace-nowrap font-bold text-xl'>
          현재 플레이어({streamList.length})
        </div>
        <div className='bg-white h-full w-full text-justify'>
          {streamList.map((stream, idx) => {
            console.log(streamList);
            return (
              <div
                key={idx}
                className='flex justify-between items-center w-full text-justify border-bottom border-b-2 p-3'
              >
                <div>{stream.userName}</div>
                {stream.userId === userId && (
                  <button>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* openvidu 화면 */}
      <div className=' h-full flex flex-col justify-between pb-5'>
        <header className=''>
          <div className=' text-white font-extrabold text-6xl text-center py-10'>[] with us</div>
        </header>
        {publisher && (
          <div className=''>
            {streamList?.map((stream: any, idx: number) => {
              // const userInfo = streamList.find((it: any) => it.userId === stream.userId);
              return (
                stream.userId === userId && (
                  <div className='w-full'>
                    <VideoStream
                      streamManager={stream.streamManager}
                      name={stream.userName}
                      me={stream.userId === userId}
                    />
                  </div>
                )
              );
            })}
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
