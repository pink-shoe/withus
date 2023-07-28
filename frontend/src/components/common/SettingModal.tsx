// 방 설정과 초대하기를 포함한 모달창
// true일 때는 초대하기가 나타나고
// false일 때는 초대하기가 제외된 방 설정만 나타남
// 기본은
import React, { Fragment, useState } from 'react';
import Modal from './Modal';
import SelectBox from './SelectBox';
import GameStartButton from './GameStartButton';
import TextCopy from './TextCopy';

interface ISettingModalProps {
  isInviteAreaOpen: boolean;
  openModal: boolean;
  closeModal: React.MouseEventHandler<SVGSVGElement>;
  children?: React.ReactNode;
};

export default function SettingModal({
  isInviteAreaOpen,
  openModal,
  closeModal,
  children,
}: ISettingModalProps) {
  const [mode, setMode] = useState('');
  const [round, setRound] = useState(0);

  const [code, setCode] = useState('');
  const [url, setUrl] = useState('');

  // 옵션 창을 누르면 선택한 옵션이 mode와 round에 각각 넣어짐
  const chooseMode = (mode: string) => {
    setMode(mode);
  };
  const chooseRound = (round: number) => {
    setRound(round);
  };

  // 나중에 삭제하겠지만 현재는 코드와 url을 작성하면 저장되는 기능
  const codeWriting = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode((event.target as HTMLInputElement).value);
    console.log(code);
  };
  const urlWriting = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
    console.log(url);
  };

  // 시작 버튼을 누르면 모드와 라운드가 저장됨
  // 하지만 현재는 콘솔창에 모드와 라운드가 나타나도록 했음
  const handleSaveSetting = () => {
    console.log(mode, round);
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
      <Fragment>
        {/* node 버전으로 인해 발생하는 에러(mode의 붉은 줄) */}
        <Modal mode={mode} round={round} openModal={openModal} closeModal={closeModal}>
          <p className='text-indigo-900 font-bold text-3xl mb-10 text-center'>방 설정</p>
          <div className='flex my-7'>
            <span className='me-5 font-semibold text-xl flex items-center'>게임모드</span>
            <SelectBox chooseSetting={chooseMode} options={MOPTIONS}></SelectBox>
          </div>
          <div className='flex mb-7'>
            <span className='me-5 font-semibold text-xl flex items-center'>게임진행</span>
            <SelectBox chooseSetting={chooseRound} options={ROPTIONS}></SelectBox>
            <span className='me-5 font-semibold text-xl flex items-center ms-2'>판</span>
          </div>
          <div>{children}</div>

          {/* true일 때는 초대하기 부분이 나타나고 */}
          {/* false일 때는 초대하기 부분이 나타나지 않음 */}
          {isInviteAreaOpen ? (
            <div className='flex mb-8'>
              <span className='me-5 font-semibold text-xl flex items-center'>초대하기</span>
              <div className='w-[19.5rem]'>
                <div>
                  <input
                    value={code}
                    onChange={codeWriting}
                    className='p-2 border-2 w-[17.5rem] border-blue-800 rounded-md text-center focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:text-slate-400'
                    placeholder='코드 입력'
                    type='text'
                  />
                  <TextCopy text={code} />
                </div>
                <div className='my-1'>
                  <input
                    value={url}
                    onChange={urlWriting}
                    className='p-2 border-2 w-[17.5rem] border-blue-800 rounded-md text-center focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:text-slate-400'
                    placeholder='URL 입력'
                    type='text'
                  />
                  <TextCopy text={url} />
                </div>
              </div>
            </div>
          ) : null}
          <GameStartButton clickResult={handleSaveSetting} />
        </Modal>
      </Fragment>
    </Fragment>
  );
}
