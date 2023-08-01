import React, { FC, useEffect, useMemo, useState } from 'react';
// import { ChatRoom } from "../components/chat/ChatRoom";
// import { Box, Grid } from "@mui/material";
// import { ControllBar } from "../components/session/ControllBar";
// import { grey } from "@mui/material/colors";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setBalanceA,
//   setBalanceB,
//   setBalanceId,
//   setUserInfoList,
// } from "../stores/slices/meetingSlice";
// import { MeetingRoomInfoRes } from "../apis/response/sessionRes";
// import { VideoStream } from '../../components/VideoStream';
// import { useWebSocket } from "../hooks/useWebSocket";
import { useNavigate } from 'react-router-dom';
// import { useOpenvidu } from '@hooks/useOpenvidu';
// import { useOpenvidu } from '@hooks/useOpenvidu';
import { Test } from '@components/common';

// import { AvatimeApi } from "../apis/avatimeApi";
// import { VolumeController } from "../components/VolumeController";
// import { useBGM } from "../hooks/useBGM";
// import { AlertSnackbar } from "../components/AlertSnackbar";
// import { FinalPickModal } from "../components/session/modal/FinalPickModal";
// import { BalanceGameModal } from "../components/session/modal/BalanceGameModal";
// import { PickStuffModal } from "../components/session/modal/PickStuffModal";

interface IProps {}

export default function SessionPage() {
  // const headCount = useState();
  // // const gender = useState();
  // const [roomId, setRoomId] = useState<number>();
  // const [userId, setUserId] = useState<number>();
  // const isMaster = useState();
  // // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const [meetingRoomInfo, setMeetingRoomInfo] = useState<any>();
  // // useEffect(() => {
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

  // const { publisher, streamList, onChangeCameraStatus, onChangeMicStatus } = useOpenvidu(
  //   userId!,
  //   roomId!
  // );

  return (
    <div>
      <h1>test</h1>
      <Test />
    </div>
  );
}
