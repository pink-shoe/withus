import { ChangeEvent, useEffect, useState } from 'react';
import { ParticipantsPresenter } from './ParticipantListPresenter';

// export let localUser: IUser;
interface IParticipantsContainerProps {
  type: 'WAIT' | 'GAME';
  userId: number;
  userName: string;
  onChangeUserName: (username: string) => void;
  publisher: any;
  streamList: any;
  readyStatus: boolean;
  updateUsernameStatus: boolean;
  onChangeUpdateUsernameStatus: (status: boolean) => void;
}
export default function ParticipantsContainer({
  type,
  userId,
  userName: uname,
  publisher,
  streamList,
  readyStatus,
  updateUsernameStatus: updateUnameStatus,
  ...callback
}: IParticipantsContainerProps) {
  const [userName, setUserName] = useState(uname);
  const [updateUserNameStatus, setUpdateUsernameStatus] = useState(updateUnameStatus);
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
    callback.onChangeUpdateUsernameStatus(updateUserNameStatus);
  }, [updateUserNameStatus, callback]);

  return (
    <ParticipantsPresenter
      type={type}
      readyStatus={readyStatus}
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
