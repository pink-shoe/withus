import { FC } from 'react';
import React from 'react';
import { Video, VideoOff, Mic, MicOff, LogOut, Settings, MessageCircle } from 'react-feather';

import SettingModalContainer from '@components/common/SettingModal/SettingModalContainer';
import { color } from 'html2canvas/dist/types/css/types/color';

interface IControlBarPresenterProps {
  type: 'WAIT' | 'GAME';
  isHost: boolean;
  micStatus: boolean;
  onChangeMicStatus: () => void;
  cameraStatus: boolean;
  onChangeCameraStatus: () => void;
  chatStatus: boolean;
  onChangeChatStatus: () => void;
  gameSettingModal: boolean;
  onChangeGameSettingModal: () => void;
  readyStatus: boolean;
  onChangeReadyStatus: () => void;
  onClickExit: () => void;
}

export const ControlBarPresenter: FC<IControlBarPresenterProps> = ({
  type,
  isHost,
  micStatus,
  onChangeMicStatus,
  cameraStatus,
  onChangeCameraStatus,
  chatStatus,
  onChangeChatStatus,
  gameSettingModal,
  onChangeGameSettingModal,
  readyStatus,
  onChangeReadyStatus,
  onClickExit,
}) => {
  return (
    <div className='w-full flex justify-center font-kdisplay'>
      <div className='bottom-3 flex flex-wrap gap-3 justify-center items-center'>
        <button className={` w-15 h-15 rounded-full p-3 bg-red-500`} onClick={onClickExit}>
          <LogOut className='text-white' size='35' />
          {/* <FontAwesomeIcon icon={LogOut} color={'white'} fontSize={`2rem`} /> */}
        </button>
        <button
          className={` w-15 h-15 rounded-full p-3 ${micStatus ? ' bg-[#D3D3D3]' : 'bg-[#FF7B7B]'}`}
          onClick={onChangeMicStatus}
        >
          {micStatus ? (
            // <FontAwesomeIcon icon={Mic} color={'black'} fontSize={`2rem`} />
            <Mic className='text-black' size='35' />
          ) : (
            // <FontAwesomeIcon icon={MicOff} color={'white'} fontSize={`2rem`} />
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
              // <FontAwesomeIcon icon={Video} color={'black'} fontSize={`2rem`} />
              <Video className='text-black' size='35' />
            ) : (
              // <FontAwesomeIcon icon={VideoOff} color={'white'} fontSize={`2rem`} />
              <VideoOff className='text-white' size='35' />
            )}
          </button>
        )}
        <button
          className={` w-15 h-15 rounded-full p-3 ${chatStatus ? ' bg-[#FF7B7B]' : 'bg-[#D3D3D3]'}`}
          onClick={onChangeChatStatus}
        >
          {chatStatus ? (
            // <FontAwesomeIcon icon={faCommentSlash} color={'white'} fontSize={`2rem`} />
            <MessageCircle className='text-white' size='35' />
          ) : (
            // <FontAwesomeIcon icon={MessageCircle} color={'black'} fontSize={`2rem`} />
            <MessageCircle className='text-black' size='35' />
          )}
        </button>
        {isHost && (
          <>
            <button
              className={` w-15 h-15 rounded-full p-3 ${
                gameSettingModal ? ' bg-[#FF7B7B]' : 'bg-[#D3D3D3]'
              }`}
              onClick={onChangeGameSettingModal}
            >
              {gameSettingModal ? (
                // <FontAwesomeIcon
                //   icon={Settings}
                //   color={'white'}
                //   fontSize={`2rem`}
                //   rotation={90}
                //   className=' transition-transform'
                // />
                <Settings className='transition-transform' color='white' size='35' />
              ) : (
                // <FontAwesomeIcon
                //   icon={Settings}
                //   color={'black'}
                //   fontSize={`2rem`}
                //   className=' transition-transform'
                // />
                <Settings className='transition-transform' color='white' size='35' rotate={90} />
              )}
            </button>
            <SettingModalContainer
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
              onClick={() => {}}
            >
              시작하기
            </button>
          ) : readyStatus ? (
            <button
              className={` whitespace-nowrap w-fit h-16 rounded-lg p-3 bg-[#8E8E8E] text-white font-medium text-lg`}
              onClick={onChangeReadyStatus}
            >
              준비취소
            </button>
          ) : (
            <button
              className={` whitespace-nowrap w-fit h-16 rounded-lg p-3 bg-[#FF8DA3] text-white font-medium text-lg`}
              onClick={onChangeReadyStatus}
            >
              준비하기
            </button>
          ))}
      </div>
    </div>
  );
};
