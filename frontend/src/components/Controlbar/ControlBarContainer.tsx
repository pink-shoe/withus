import { FC, useEffect, useState } from 'react';

import { ControlBarPresenter } from './ControlBarPresenter';
import { useNavigate } from 'react-router-dom';
import { signalType } from 'hooks/useOpenvidu';

interface IControlBarProps {
  type: 'WAIT' | 'GAME';
  isHost: boolean;
  readyStatus: boolean;
  onChangeMicStatus: (status: boolean) => void;
  onChangeCameraStatus: (status: boolean) => void;
  onChangeChatStatus: (status: boolean) => void;
  onChangeReadyStatus: (status: boolean) => void;
  sendSignal: (message: string, type: signalType) => void;
}

export const ControlBarContainer: FC<IControlBarProps> = ({
  type,
  isHost,
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

  const onChangeReadyStatus = () => {
    setReadyStatus((prev) => !prev);
  };

  const onClickExit = () => {
    navigate('/lobby');
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

  useEffect(() => {
    callback.onChangeReadyStatus(readyStatus);
    readyStatus ? sendSignal('준비완료', 'READY') : sendSignal('준비해제', 'CANCEL_READY');
  }, [readyStatus, callback]);
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
      onChangeReadyStatus={onChangeReadyStatus}
      onClickExit={onClickExit}
    />
  );
};