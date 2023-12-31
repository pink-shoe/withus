import { Fragment } from 'react';
import Modal from '../Modal';
import SelectBox from '../SelectBox';
import TextCopy from '../TextCopy';
import GameStartButton from '../GameStartButton';

interface ISettingModalPresenterProps {
  roomCode?: number;
  roomType?: string;
  roomRound?: number;
  boardType?: string;
  mode: string;
  round: number;
  openModal: boolean;
  closeModal: () => void;
  selectMode: any;
  MOPTIONS: {
    value: string | number;
    name: string;
  }[];
  selectRound: any;
  ROPTIONS: {
    value: string | number;
    name: string;
  }[];
  children: React.ReactNode;
  isUpdateModal: boolean;
  handleSaveSetting: any;
}

export default function SettingModalPresenter({
  roomType,
  roomRound,
  roomCode,
  boardType,
  mode,
  round,
  openModal,
  closeModal,
  selectMode,
  MOPTIONS,
  selectRound,
  ROPTIONS,
  children,
  isUpdateModal,
  handleSaveSetting,
}: ISettingModalPresenterProps) {
  return (
    <Fragment>
      <div className='font-kdisplay'>
        <Modal
          mode={mode}
          round={round}
          openModal={openModal}
          closeModal={closeModal}
          isSettingModal={true}
        >
          <p className='text-[#514148] font-medium text-4xl mb-10 text-center'>방 설정</p>
          <div className='ms-2.5'>
            <div className='flex my-7'>
              <span className='ms-2 me-5 font-medium text-2xl flex items-center whitespace-nowrap'>
                게임모드
              </span>
              {boardType === 'LOBBY' ? (
                <SelectBox selectSetting={selectMode} options={MOPTIONS}></SelectBox>
              ) : (
                <SelectBox
                  selectSetting={selectMode}
                  options={MOPTIONS}
                  defaultValue={roomType}
                ></SelectBox>
              )}
            </div>
            <div className='flex mb-7'>
              <span className='ms-2 me-5 font-medium text-2xl flex items-center whitespace-nowrap'>
                게임진행
              </span>
              {boardType === 'LOBBY' ? (
                <SelectBox selectSetting={selectRound} options={ROPTIONS}></SelectBox>
              ) : (
                <SelectBox
                  selectSetting={selectRound}
                  options={ROPTIONS}
                  defaultValue={roomRound}
                ></SelectBox>
              )}
              <span className='me-5 font-medium text-2xl flex items-center ms-2'>판</span>
            </div>
            <div>{children}</div>

            {/* true일 때는 초대하기 부분이 나타나고 */}
            {/* false일 때는 초대하기 부분이 나타나지 않음 */}
            {isUpdateModal ? (
              <Fragment>
                <div className='flex mb-11'>
                  <span className='ms-2 me-5 font-medium text-2xl flex items-center whitespace-nowrap'>
                    초대하기
                  </span>
                  <div className='w-[19.5rem] inline-block'>
                    <div>
                      <div className='inline-block p-1 bg-[#FF8DA3] border-2 border-[#FF8DA3] font-medium text-2xl text-center text-white font-kdisplay rounded-l-lg'>
                        Code
                      </div>
                      <div className='inline-block p-1 w-[12.7rem] border-y-2 border-e-2 border-[#FF8DA3] rounded-r-lg font-medium text-2xl text-[#514148] text-center font-kdisplay'>
                        {roomCode}
                      </div>

                      <div className='inline-block align-middle pb-2 ms-[6px]'>
                        <TextCopy text={roomCode} />
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : null}
          </div>
          {boardType === 'LOBBY' ? (
            <GameStartButton buttonType='START' onClickStartBtn={handleSaveSetting} />
          ) : (
            <GameStartButton buttonType='SAVE' onClickStartBtn={handleSaveSetting} />
          )}
        </Modal>
      </div>
    </Fragment>
  );
}
