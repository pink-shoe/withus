// 방 설정과 초대하기를 포함한 모달창
// true일 때는 초대하기가 나타나고
// false일 때는 초대하기가 제외된 방 설정만 나타남
import React, { Fragment, useEffect, useState } from 'react';
import SettingModalPresenter from './SettingModalPresenter';
import { createRoomApi, updateRoomApi } from 'apis/roomApi';
import { IUserAtom, userAtom } from 'stores/user';
import { useAtom, useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { roomAtom } from 'stores/room';
import { signalType } from 'hooks/useOpenvidu';

export type boardType = 'WAIT' | 'LOBBY';

interface ISettingModalContainerProps {
  // user: IUserAtom;
  boardType: boardType;
  isUpdateModal: boolean;
  openModal: boolean;
  closeModal: () => void;
  sendSignal?: (message: string, type: signalType) => void;
  children?: React.ReactNode;
}

export default function SettingModalContainer({
  // user,
  boardType,
  isUpdateModal,
  openModal,
  closeModal,
  sendSignal,
  children,
}: ISettingModalContainerProps) {
  const user = useAtomValue(userAtom);

  const [roomInfo, setRoomInfo] = useAtom(roomAtom);

  const [mode, setMode] = useState(roomInfo.room.roomType!);
  const [round, setRound] = useState(roomInfo.room.roomRound!);

  const navigate = useNavigate();
  // 옵션 창을 누르면 선택한 옵션이 mode와 round에 각각 넣어짐
  const selectMode = (mode: string) => {
    setMode(mode);
  };
  const selectRound = (round: number) => {
    setRound(round);
  };

  // 시작 버튼을 누르면 모드와 라운드가 저장됨
  // 하지만 현재는 콘솔창에 모드와 라운드가 나타나도록 했음
  const handleSaveSetting = async () => {
    if (boardType === 'LOBBY') {
      const result: any = await createRoomApi(user.memberId, round, mode);

      console.log(result);
      if (result.status === 201) {
        setRoomInfo(result.data);
        navigate(`/waitingrooms/${result.data}`);
      }
    } else if (boardType === 'WAIT') {
      console.log(round, mode, roomInfo.room);
      const result: any = await updateRoomApi(roomInfo.room.roomId, round, mode);
      if (result.status === 200) {
        sendSignal && sendSignal('Room Setting', 'UPDATE');
        closeModal();
      }
      console.log(result);
    }
  };

  // 모드의 옵션들
  const MOPTIONS = [
    { value: 'mode_choice', name: '모드 선택' },
    { value: 'coop', name: '협동전' },
    // { value: 'team', name: '팀전' },
  ];
  // 라운드의 옵션들
  const ROPTIONS = [
    { value: 0, name: '라운드 선택' },
    // { value: 3, name: '3' },
    { value: 5, name: '5' },
  ];

  useEffect(() => {
    console.log(roomInfo, boardType);
    if (boardType === 'WAIT') {
      if (roomInfo.room) {
        setMode(roomInfo.room.roomType);
        setRound(roomInfo.room.roomRound);
      }
    }
  }, [roomInfo]);

  useEffect(() => {
    console.log(roomInfo, boardType);
    console.log(mode, round);
  }, [roomInfo, mode, round]);
  return (
    <Fragment>
      {boardType === 'LOBBY' ? (
        <SettingModalPresenter
          boardType={boardType}
          mode={mode}
          round={round}
          openModal={openModal}
          closeModal={closeModal}
          selectMode={selectMode}
          MOPTIONS={MOPTIONS}
          selectRound={selectRound}
          ROPTIONS={ROPTIONS}
          children={children}
          isUpdateModal={isUpdateModal}
          handleSaveSetting={handleSaveSetting}
        />
      ) : (
        <SettingModalPresenter
          boardType={boardType}
          mode={mode}
          round={round}
          openModal={openModal}
          closeModal={closeModal}
          selectMode={selectMode}
          MOPTIONS={MOPTIONS}
          selectRound={selectRound}
          ROPTIONS={ROPTIONS}
          children={children}
          isUpdateModal={isUpdateModal}
          handleSaveSetting={handleSaveSetting}
          roomCode={roomInfo.room.roomCode!}
          roomType={roomInfo.room.roomType!}
          roomRound={roomInfo.room.roomRound!}
        />
      )}
    </Fragment>
  );
}
