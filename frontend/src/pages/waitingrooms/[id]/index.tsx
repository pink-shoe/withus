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
// import { useOpenvidu } from '@hooks/useOpenvidu';
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

  return (
    <div className='container'>
      <div>
        <div>
          <div>
            <div>
              <video autoPlay={true} id='video' />
              {publisher && (
                <div>
                  {/* {streamList &&
                    [0, 1].map((it, idx) => ( */}
                  <div className='flex w-screen h-screen'>
                    <div>
                      {streamList?.map((stream: any, idx: number) => {
                        console.log('stream' + stream);
                        const userInfo = streamList.find((it: any) => it.userId === stream.userId);
                        console.log('userInfo' + userInfo);
                        return (
                          <div>
                            <VideoStream
                              streamManager={stream.streamManager}
                              name={userInfo!.userName}
                              me={userInfo!.userId === userId}
                              balance={
                                balanceResult.find((it) => it.user_id === userInfo!.userId)?.result
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* ))} */}
                </div>
              )}
            </div>
            <div />
            <ControllBar
              type={isMaster ? 'master' : 'normal'}
              onChangeMicStatus={onChangeMicStatus}
              onChangeCameraStatus={onChangeCameraStatus}
            />
          </div>
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
    </div>
  );
}
