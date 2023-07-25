import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
// import { ChatRoom } from "../components/chat/ChatRoom";
// import { ControllBar } from '@components/session/ControllBar';
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setBalanceA,
//   setBalanceB,
//   setBalanceId,
//   setUserInfoList,
// } from "../stores/slices/meetingSlice";
// import { MeetingRoomInfoRes } from "../apis/response/sessionRes";
import { VideoStream } from '@components/VideoStream';
// import { useWebSocket } from "../hooks/useWebSocket";
import { useLocation, useNavigate } from 'react-router-dom';
import { IUser, getStreamManager, setStreamManager, useOpenvidu } from 'hooks/useOpenvidu';
import { ControllBarContainer } from '@components/controllBar/ControllBarContainer';
// import { AvatimeApi } from "../apis/avatimeApi";
// import { VolumeController } from "../components/VolumeController";
// import { useBGM } from "../hooks/useBGM";
// import { AlertSnackbar } from "../components/AlertSnackbar";
// import { FinalPickModal } from "../components/session/modal/FinalPickModal";
// import { BalanceGameModal } from "../components/session/modal/BalanceGameModal";
// import { PickStuffModal } from "../components/session/modal/PickStuffModal";

interface IProps {}

interface IUserInfo {
  userId: number;
  userName: string;
  token: string;
}

interface IGameRoomInfo {
  gameUserInfoList: IUserInfo[];
}
export let localUser: IUser;
// export const USER_INFO_DATA: IGameRoomInfo = {
//   gameUserInfoList: [
//     {
//       userId: 123,
//       userName: 'test',
//       token: '',
//     },
//     {
//       userId: 456,
//       userName: 'test2',
//       token: '',
//     },
//   ],
// };
export default function WaitingRoom() {
  const location = useLocation();

  const currentPath = location.pathname.slice(
    location.pathname.lastIndexOf('/') + 1,
    location.pathname.length
  );

  const headCount = useState();
  const [roomId, setRoomId] = useState<string>(currentPath);
  const [userId, setUserId] = useState<number>(Math.floor(Math.random() * 100));
  const [isMaster, setIsMaster] = useState<boolean>(true);
  // const navigate = useNavigate();

  // const [gameRoomInfo, setgameRoomInfo] = useState<IGameRoomInfo>({
  //   gameUserInfoList: {
  //     userId: 0,
  //     nickname: 'test',
  //   },
  // });
  // const gameRoomInfo = USER_INFO_DATA;
  // useEffect(() => {
  //   setgameRoomInfo(USER_INFO_DATA);
  //   console.log(gameRoomInfo);
  // }, []);
  // useEffect(() => {
  //   if (meetingRoomInfo) {
  //     return;
  //   }

  //   // AvatimeApi.getInstance().getMeetingRoomInfo(
  //   //   { meetingroom_id: roomId },
  //   //   {
  //   //     onSuccess: (data) => {
  //   //       setMeetingRoomInfo(data);
  //   //       dispatch(setUserInfoList(data.meeting_user_info_list));
  //   //     },
  //   //     navigate,
  //   //   }
  //   // );
  // }, [dispatch, meetingRoomInfo, navigate, roomId]);

  const [opened, setOpened] = useState<boolean[]>([true, true]);
  const cntOpened = opened.filter((it) => it).length;

  const [lastPickModalOpen, setLastPickModalOpen] = useState(false);
  const [balanceGameModalOpen, setBalanceGameModalOpen] = useState(false);
  const [balanceResult, setBalanceResult] = useState<any[]>([]);
  const [pickStuffModalOpen, setPickStuffModalOpen] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [chatStatus, setChatStatus] = useState<boolean>();
  const [readyStatus, setReadyStatus] = useState<boolean>(false);

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
  useEffect(() => {
    console.log('test', messageList);
  }, [messageList]);

  const divRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!divRef.current) return;

    try {
      const div = divRef.current;
      const canvas = await html2canvas(div);
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, 'result.png');
        }
      });
    } catch (error) {
      console.error('Error converting div to image:', error);
    }
  };
  return (
    <section className={`w-full flex  justify-between min-h-screen max-h-fit`}>
      {/* 참가자 목록 */}
      <div id='participantsList' className='w-fit max-w-[1/6] bg-white'>
        <div className='bg-[#112364] p-3 text-white whitespace-nowrap font-bold text-xl'>
          현재 플레이어({streamList.length})
        </div>
        <div className='bg-white'>
          {streamList.map((stream, idx) => {
            console.log(streamList);
            return (
              <div key={idx} className=' border-bottom border-b-2 p-3'>
                {stream.userName}
              </div>
            );
          })}
        </div>
      </div>
      {/* openvidu 화면 */}
      <div className=' w-1/2 h-full flex flex-col justify-between items-center pb-5'>
        <header className=''>
          <div className=' text-white font-extrabold text-6xl text-center py-10'>[] with us</div>
        </header>
        <div className='aspect-[4/3]'>
          {publisher && (
            <div ref={divRef} className='aspect-[4/3] grid grid-flow-dense grid-rows-2 grid-cols-2'>
              {streamList?.map((stream: any, idx: number) => {
                // const userInfo = streamList.find((it: any) => it.userId === stream.userId);
                return (
                  <div className='w-full h-full'>
                    <VideoStream
                      streamManager={stream.streamManager}
                      name={stream.userName}
                      me={stream.userId === userId}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* <div>
          <div>
            <VolumeController />
            <div />
            {meetingRoomInfo && (
              <ChatRoom
                chatType='all'
                isOpened={opened[0]}
                onClickHeader={() => {
                  setOpened((prev) => [!prev[0], prev[1]]);
                }}
                maxHeight={opened[0] && cntOpened === 1 ? '100%' : '50%'}
                chattingRoomId={meetingRoomInfo.chattingroom_id}
              />
            )}
            {meetingRoomInfo && (
              <ChatRoom
                chatType='gender'
                isOpened={opened[1]}
                onClickHeader={() => {
                  setOpened((prev) => [prev[0], !prev[1]]);
                }}
                maxHeight={opened[1] && cntOpened === 1 ? '100%' : '50%'}
                chattingRoomId={
                  gender === 'M'
                    ? meetingRoomInfo.men_chattingroom_id
                    : meetingRoomInfo.women_chattingroom_id
                }
              />
            )}
          </div>
        </div> */}
        <div className=' p-3'>
          <ControllBarContainer
            isHost={isMaster}
            onChangeMicStatus={onChangeMicStatus}
            onChangeCameraStatus={onChangeCameraStatus}
            onChangeChatStatus={onChangeChatStatus}
            onChangeReadyStatus={onChangeReadyStatus}
          />
        </div>
        <button onClick={handleDownload}>다운로드</button>
      </div>
      {/* <AlertSnackbar
        open={showSnack}
        onClose={() => setShowSnack(false)}
        message={snackMessage}
        alertColor='info'
        type='alert'
      />
      {lastPickModalOpen && <FinalPickModal isOpened={lastPickModalOpen} />}
      {balanceGameModalOpen && (
        <BalanceGameModal
          isOpened={balanceGameModalOpen}
          onClose={() => setBalanceGameModalOpen(false)}
        />
      )}
      {pickStuffModalOpen && <PickStuffModal isOpened={pickStuffModalOpen} />} */}
      {chatStatus ? (
        <div id='participantsList' className=' w-80 h-full flex flex-col bg-white justify-between'>
          <div className=' text-center bg-[#112364] p-3 text-white whitespace-nowrap font-bold text-xl'>
            채팅창
          </div>
          <div className='w-full h-[90%] p-3'></div>
          <div className='  bg-white'>
            <div className='  flex w-full justify-center items-center'>
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
