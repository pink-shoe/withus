import React, { FC, useEffect, useMemo, useState } from 'react';
// import { ChatRoom } from "../components/chat/ChatRoom";
// import { Box, Grid } from "@mui/material";
// import { ControllBar } from '@components/session/ControllBar';
// import { grey } from "@mui/material/colors";
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
import { useNavigate } from 'react-router-dom';
import { useOpenvidu } from 'hooks/useOpenvidu';
import { ControllBar } from '@components/ControllBox';
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
export let localUser: IGameRoomInfo;
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
  const headCount = useState();
  const [roomId, setRoomId] = useState<string>('SessionA');
  const [userId, setUserId] = useState<number>(Math.floor(Math.random() * 100));
  const isMaster = useState();
  const navigate = useNavigate();

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
    'SessionA'
  );
  const [message, setMessage] = useState('');

  const onChangeMessage = (e: any) => {
    setMessage(e.target.value);
    console.log(e.target.value);
  };

  const onChangeChatStatus = (chatStatus: boolean) => {
    setChatStatus(!chatStatus);
  };
  const sendMessage = () => {
    console.log(message);
    if (message) {
      let msg = message.replace(/ +(?= )/g, '');
      if (msg !== '' && msg !== ' ') {
        const data = {
          message: msg,
          nickname: userId,
          streamId: streamList.map((stream, i) => stream.userId === userId && stream.streamId),
        };
        streamList.map(
          (stream, i) =>
            stream.userId === userId &&
            stream.session.signal({
              data: JSON.stringify(data),
              type: 'chat',
            })
        );
      }
    }
    setMessage('');
  };
  useEffect(() => {
    console.log(publisher, streamList);
  }, [streamList, userId, publisher]);
  return (
    <section className={`w-full flex overflow-y-hidden  justify-between h-screen`}>
      {/* 참가자 목록 */}
      <div id='participantsList' className='w-fit max-w-[1/6]'>
        <div className='bg-[#112364] p-3 text-white whitespace-nowrap font-bold text-xl'>
          현재 플레이어({streamList.length})
        </div>
        <div className='bg-white h-full'>
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
      <div className=' h-full flex flex-col justify-between pb-5'>
        {publisher && (
          <div className='relative top-36'>
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
        <ControllBar
          type={isMaster ? 'master' : 'normal'}
          onChangeMicStatus={onChangeMicStatus}
          onChangeCameraStatus={onChangeCameraStatus}
          onChangeChatStatus={onChangeChatStatus}
        />
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
