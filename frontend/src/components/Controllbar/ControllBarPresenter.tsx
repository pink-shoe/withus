import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVideo,
  faVideoSlash,
  faMicrophone,
  faMicrophoneSlash,
  faDoorOpen,
  faGear,
  faComment,
  faCommentSlash,
} from '@fortawesome/free-solid-svg-icons';
import SettingModalContainer from '@components/common/SettingModal/SettingModalContainer';

interface IControllBarPresenterProps {
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

export const ControllBarPresenter: FC<IControllBarPresenterProps> = ({
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
    <div className='w-full flex justify-center'>
      <div className='bottom-3 flex flex-wrap gap-3 justify-center items-center'>
        <button className={` w-16 h-16 rounded-full p-3 bg-red-500`} onClick={onClickExit}>
          <FontAwesomeIcon icon={faDoorOpen} color={'white'} fontSize={`2rem`} />
        </button>
        <button
          className={` w-16 h-16 rounded-full p-3 ${micStatus ? ' bg-[#D3D3D3]' : 'bg-[#FF7B7B]'}`}
          onClick={onChangeMicStatus}
        >
          {micStatus ? (
            <FontAwesomeIcon icon={faMicrophone} color={'black'} fontSize={`2rem`} />
          ) : (
            <FontAwesomeIcon icon={faMicrophoneSlash} color={'white'} fontSize={`2rem`} />
          )}
        </button>
        <button
          className={` w-16 h-16 rounded-full p-3 ${
            cameraStatus ? ' bg-[#D3D3D3]' : 'bg-[#FF7B7B]'
          }`}
          onClick={onChangeCameraStatus}
        >
          {cameraStatus ? (
            <FontAwesomeIcon icon={faVideo} color={'black'} fontSize={`2rem`} />
          ) : (
            <FontAwesomeIcon icon={faVideoSlash} color={'white'} fontSize={`2rem`} />
          )}
        </button>
        <button
          className={` w-16 h-16 rounded-full p-3 ${chatStatus ? ' bg-[#FF7B7B]' : 'bg-[#D3D3D3]'}`}
          onClick={onChangeChatStatus}
        >
          {chatStatus ? (
            <FontAwesomeIcon icon={faCommentSlash} color={'white'} fontSize={`2rem`} />
          ) : (
            <FontAwesomeIcon icon={faComment} color={'black'} fontSize={`2rem`} />
          )}
        </button>
        {isHost && (
          <>
            <button
              className={` w-16 h-16 rounded-full p-3 ${
                gameSettingModal ? ' bg-[#FF7B7B]' : 'bg-[#D3D3D3]'
              }`}
              onClick={onChangeGameSettingModal}
            >
              {gameSettingModal ? (
                <FontAwesomeIcon
                  icon={faGear}
                  color={'white'}
                  fontSize={`2rem`}
                  rotation={90}
                  className=' transition-transform'
                />
              ) : (
                <FontAwesomeIcon
                  icon={faGear}
                  color={'black'}
                  fontSize={`2rem`}
                  className=' transition-transform'
                />
              )}
            </button>
            <SettingModalContainer
              isUpdateModal={true}
              openModal={gameSettingModal}
              closeModal={onChangeGameSettingModal}
            />
          </>
        )}

        {isHost ? (
          <button
            className={` whitespace-nowrap w-fit h-16 rounded-lg p-3 bg-[#FF8DA3] text-white font-bold text-lg`}
            onClick={() => {}}
          >
            시작하기
          </button>
        ) : readyStatus ? (
          <button
            className={` whitespace-nowrap w-fit h-16 rounded-lg p-3 bg-[#8E8E8E] text-white font-bold text-lg`}
            onClick={onChangeReadyStatus}
          >
            준비취소
          </button>
        ) : (
          <button
            className={` whitespace-nowrap w-fit h-16 rounded-lg p-3 bg-[#FF8DA3] text-white font-bold text-lg`}
            onClick={onChangeReadyStatus}
          >
            준비하기
          </button>
        )}
      </div>
    </div>
  );
};
