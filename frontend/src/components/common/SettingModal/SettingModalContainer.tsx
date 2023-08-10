// 방 설정과 초대하기를 포함한 모달창
// true일 때는 초대하기가 나타나고
// false일 때는 초대하기가 제외된 방 설정만 나타남
import React, { Fragment, useState } from 'react';
import SettingModalPresenter from './SettingModalPresenter';
import { createRoomApi } from 'apis/roomApi';
import { IUserAtom, userAtom } from 'stores/user';
import { useAtom, useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { roomAtom } from 'stores/room';

interface ISettingModalContainerProps {
  // user: IUserAtom;
  isUpdateModal: boolean;
  openModal: boolean;
  closeModal: React.MouseEventHandler<SVGSVGElement>;
  children?: React.ReactNode;
}

export default function SettingModalContainer({
  // user,
  isUpdateModal,
  openModal,
  closeModal,
  children,
}: ISettingModalContainerProps) {
  const user = useAtomValue(userAtom);
  const [roomInfo, setRoomInfo] = useAtom(roomAtom);
  const [mode, setMode] = useState('');
  const [round, setRound] = useState(0);

  const [code, setCode] = useState('');
  const [url, setUrl] = useState('');

  const navigate = useNavigate();
  // 옵션 창을 누르면 선택한 옵션이 mode와 round에 각각 넣어짐
  const selectMode = (mode: string) => {
    setMode(mode);
  };
  const selectRound = (round: number) => {
    setRound(round);
  };

  // 나중에 삭제하겠지만 현재는 코드와 url을 작성하면 저장되는 기능
  const codeEnter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode((event.target as HTMLInputElement).value);
    console.log(code);
  };
  const urlEnter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
    console.log(url);
  };

  // 시작 버튼을 누르면 모드와 라운드가 저장됨
  // 하지만 현재는 콘솔창에 모드와 라운드가 나타나도록 했음
  const handleSaveSetting = async () => {
    const result: any = await createRoomApi(user.memberId, round, mode);

    console.log(result);
    if (result.status === 201) {
      setRoomInfo(result.data);
      navigate(`/waitingrooms/${result.data}`);
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
    { value: 'round_choice', name: '라운드 선택' },
    // { value: 3, name: '3' },
    { value: 5, name: '5' },
  ];

  return (
    <Fragment>
      <SettingModalPresenter
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
        code={code}
        codeEnter={codeEnter}
        url={url}
        urlEnter={urlEnter}
        handleSaveSetting={handleSaveSetting}
      ></SettingModalPresenter>
    </Fragment>
  );
}
