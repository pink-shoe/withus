import { FC } from 'react';
import { Video, VideoOff, Mic, MicOff, LogOut, Settings, MessageCircle } from 'react-feather';

import SettingModalContainer from '@components/common/SettingModal/SettingModalContainer';
import { signalType } from 'hooks/useOpenvidu';

interface IControlBarPresenterProps {
  type: 'WAIT' | 'GAME';
  isHost: boolean;
  sendSignal: (message: string, type: signalType) => void;
  micStatus: boolean;
  onChangeMicStatus: () => void;
  cameraStatus: boolean;
  onChangeCameraStatus: () => void;
  chatStatus: boolean;
  onChangeChatStatus: () => void;
  gameSettingModal: boolean;
  onChangeGameSettingModal: () => void;
  readyStatus?: boolean;
  onClickExit: () => void;
  onClickReadyBtn: () => void;
  onClickCancelBtn: () => void;
  onClickStartBtn: () => void;
}

export const ControlBarPresenter: FC<IControlBarPresenterProps> = ({
  type,
  isHost,
  sendSignal,
  micStatus,
  onChangeMicStatus,
  cameraStatus,
  onChangeCameraStatus,
  chatStatus,
  onChangeChatStatus,
  gameSettingModal,
  onChangeGameSettingModal,
  readyStatus,
  onClickCancelBtn,
  onClickReadyBtn,
  onClickExit,
  onClickStartBtn,
}) => {
  return (
    <div className='w-full flex justify-center font-kdisplay'>
      <div className='bottom-3 flex flex-wrap gap-3 justify-center items-center'>
        <button className={` w-15 h-15 rounded-full p-3 bg-red-500`} onClick={onClickExit}>
          <LogOut className='text-white' size='35' />
        </button>
        <button
          className={` w-15 h-15 rounded-full p-3 ${micStatus ? ' bg-[#D3D3D3]' : 'bg-[#FF7B7B]'}`}
          onClick={onChangeMicStatus}
        >
          {micStatus ? (
            <Mic className='text-black' size='35' />
          ) : (
            <MicOff className='text-white' size='35' />
          )}
        </button>
        {type === 'WAIT' && (
          <button
            className={` w-15 h-15 rounded-full p-3 ${
              cameraStatus ? ' bg-[#D3D3D3]' : 'bg-[#FF7B7B]'
            }`}
            onClick={onChangeCameraStatus}
          >
            {cameraStatus ? (
              <Video className='text-black' size='35' />
            ) : (
              <VideoOff className='text-white' size='35' />
            )}
          </button>
        )}
        <button
          className={` w-15 h-15 rounded-full p-3 ${chatStatus ? ' bg-[#FF7B7B]' : 'bg-[#D3D3D3]'}`}
          onClick={onChangeChatStatus}
        >
          {chatStatus ? (
            <MessageCircle className='text-white' size='35' />
          ) : (
            <MessageCircle className='text-black' size='35' />
          )}
        </button>
        {type === 'WAIT' && isHost && (
          <>
            <button
              className={` w-15 h-15 rounded-full p-3 ${
                gameSettingModal ? ' bg-[#FF7B7B]' : 'bg-[#D3D3D3]'
              }`}
              onClick={onChangeGameSettingModal}
            >
              {gameSettingModal ? (
                <Settings className='transition-transform' color='white' size='35' />
              ) : (
                <Settings className='transition-transform' color='white' size='35' rotate={90} />
                // 게임 페이지에서는 게임 세팅 버튼 보이지 않음
              )}
            </button>
            <SettingModalContainer
              boardType='WAIT'
              sendSignal={sendSignal}
              isUpdateModal={true}
              openModal={gameSettingModal}
              closeModal={onChangeGameSettingModal}
            />
          </>
        )}

        {type === 'WAIT' &&
          (isHost ? (
            <button
              className={` whitespace-nowrap w-fit h-15 rounded-lg p-3 bg-[#FF8DA3] text-white font-medium text-lg`}
              onClick={onClickStartBtn}
            >
              시작하기
            </button>
          ) : readyStatus ? (
            <button
              className={` whitespace-nowrap w-fit h-16 rounded-lg p-3 bg-[#8E8E8E] text-white font-medium text-lg`}
              onClick={onClickCancelBtn}
            >
              준비취소
            </button>
          ) : (
            <button
              className={` whitespace-nowrap w-fit h-16 rounded-lg p-3 bg-[#FF8DA3] text-white font-medium text-lg`}
              onClick={onClickReadyBtn}
            >
              준비하기
            </button>
          ))}
      </div>
    </div>
  );
};
