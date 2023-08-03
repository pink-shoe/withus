import { ChangeEvent, useEffect, useState } from 'react';
import { ParticipantsPresenter } from './ParticipantListPresenter';

interface IParticipantsContainerProps {
  type: 'WAIT' | 'GAME';
  userId: number;
  userName: string;
  publisher: any;
  streamList: any;
  readyStatus: boolean;
  updateUserNameStatus: boolean;
  onChangeUserName: (username: string) => void;
  onChangeReadyStatus: (status: boolean) => void;
  onChangeUpdateUserNameStatus: (status: boolean) => void;
}
export default function ParticipantsContainer({
  type,
  userId,
  userName: uname,
  publisher,
  streamList,
  readyStatus: isReady,
  updateUserNameStatus: updateUnameStatus,
  ...callback
}: IParticipantsContainerProps) {
  const [readyStatus, setReadyStatus] = useState(isReady);
  const [userName, setUserName] = useState(uname);
  const [updateUserNameStatus, setUpdateUsernameStatus] = useState(updateUnameStatus);
  const onChangeReadyStatus = () => {
    setReadyStatus((prev) => !prev);
  };
  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    console.log(e.target.value);
  };

  const onChangeUpdateUserNameStatus = () => {
    setUpdateUsernameStatus((prev) => !prev);
  };

  const saveUserName = () => {
    setUpdateUsernameStatus((prev) => !prev);
    console.log(userName);
    // stream에 userName update 처리 필요
  };
  useEffect(() => {
    callback.onChangeUserName(userName);
  }, [userName, callback]);

  useEffect(() => {
    callback.onChangeUpdateUserNameStatus(updateUserNameStatus);
  }, [updateUserNameStatus, callback]);

  useEffect(() => {
    onChangeReadyStatus();
  }, [isReady]);
  return (
    <ParticipantsPresenter
      type={type}
      streamList={streamList}
      userId={userId}
      userName={uname}
      onChangeUserName={onChangeUserName}
      isUpdateUserName={updateUserNameStatus}
      onChangeUpdateUserNameStatus={onChangeUpdateUserNameStatus}
      saveUserName={saveUserName}
    />
  );
}
