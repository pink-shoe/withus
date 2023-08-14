import { FC, useEffect, useState } from 'react';

import { ControlBarPresenter } from './ControlBarPresenter';
import { useNavigate } from 'react-router-dom';
import { signalType } from 'hooks/useOpenvidu';
import { cancelApi, checkStartApi, exitRoomApi, readyApi } from 'apis/roomApi';

interface IControlBarProps {
  type: 'WAIT' | 'GAME';
  isHost: boolean;
  roomId: number;
  roomCode: number;
  readyStatus?: boolean;
  onChangeMicStatus: (status: boolean) => void;
  onChangeCameraStatus: (status: boolean) => void;
  onChangeChatStatus: (status: boolean) => void;
  sendSignal: (message: string, type: signalType) => void;
}

export const ControlBarContainer: FC<IControlBarProps> = ({
  type,
  isHost,
  roomId,
  roomCode,
  readyStatus: isReady,
  sendSignal,
  ...callback
}) => {
  const [micStatus, setMicStatus] = useState(true);
  const [cameraStatus, setCameraStatus] = useState(true);
  const [chatStatus, setChatStatus] = useState(true);
  const [gameSettingModal, setGameSettingModal] = useState(false);
  const [readyStatus, setReadyStatus] = useState(isReady);
  const navigate = useNavigate();
  const onChangeMicStatus = () => {
    setMicStatus((prev) => !prev);
  };

  const onChangeCameraStatus = () => {
    setCameraStatus((prev) => !prev);
  };

  const onChangeChatStatus = () => {
    setChatStatus((prev) => !prev);
    if (chatStatus) {
    }
  };

  const onChangeGameSettingModal = () => {
    setGameSettingModal((prev) => !prev);
  };

  const onClickExit = async () => {
    const result: any = await exitRoomApi(roomId);
    if (result.status === 204) {
      sendSignal(`${roomCode}`, 'EXIT');
      navigate('/lobby');
    }
  };

  useEffect(() => {
    callback.onChangeMicStatus(micStatus);
  }, [micStatus, callback]);

  useEffect(() => {
    callback.onChangeCameraStatus(cameraStatus);
  }, [cameraStatus, callback]);

  useEffect(() => {
    callback.onChangeChatStatus(chatStatus);
  }, [chatStatus, callback]);

  const onClickReadyBtn = async () => {
    sendSignal('준비완료', 'READY');
    const result = (await readyApi(roomId)) as any;
    console.log('change ready', result);
    if (result.status === 200) setReadyStatus(true);
  };

  const onClickCancelBtn = async () => {
    sendSignal('준비해제', 'CANCEL_READY');
    const result = (await cancelApi(roomId)) as any;
    console.log('change ready', result);
    if (result.status === 200) setReadyStatus(false);
  };

  const onClickStartBtn = async () => {
    const result = (await checkStartApi(roomId)) as any;
    console.log('game start', result);
    if (result.status === 200) {
      sendSignal(`${roomId}`, 'START');
      navigate(`/gamerooms/${roomCode}`);
    }
  };

  return (
    <ControlBarPresenter
      type={type}
      isHost={isHost}
      micStatus={micStatus}
      onChangeMicStatus={onChangeMicStatus}
      cameraStatus={cameraStatus}
      onChangeCameraStatus={onChangeCameraStatus}
      chatStatus={chatStatus}
      onChangeChatStatus={onChangeChatStatus}
      gameSettingModal={gameSettingModal}
      onChangeGameSettingModal={onChangeGameSettingModal}
      readyStatus={readyStatus}
      onClickExit={onClickExit}
      onClickReadyBtn={onClickReadyBtn}
      onClickCancelBtn={onClickCancelBtn}
      onClickStartBtn={onClickStartBtn}
      sendSignal={sendSignal}
    />
  );
};
