import { Fragment } from 'react';
import Modal from '../Modal';
import SelectBox from '../SelectBox';
import TextCopy from '../TextCopy';
import GameStartButton from '../GameStartButton';

interface ISettingModalPresenterProps {
  mode: string;
  round: number;
  openModal: boolean;
  closeModal: React.MouseEventHandler<SVGSVGElement>;
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
  code: string;
  codeEnter: any;
  url: string;
  urlEnter: any;
  handleSaveSetting: any;
}

export default function SettingModalPresenter({
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
  code,
  codeEnter,
  url,
  urlEnter,
  handleSaveSetting,
}: ISettingModalPresenterProps) {
  return (
    <Fragment>
      <div className='font-kdisplay'>
        <Modal mode={mode} round={round} openModal={openModal} closeModal={closeModal} isSettingModal={true}>
          <p className='text-[#514148] font-medium text-4xl mb-10 text-center'>방 설정</p>
          <div className='ms-2.5'>
            <div className='flex my-7'>
              <span className='ms-2 me-5 font-medium text-2xl flex items-center'>게임모드</span>
              <SelectBox selectSetting={selectMode} options={MOPTIONS}></SelectBox>
            </div>
            <div className='flex mb-7'>
              <span className='ms-2 me-5 font-medium text-2xl flex items-center'>게임진행</span>
              <SelectBox selectSetting={selectRound} options={ROPTIONS}></SelectBox>
              <span className='me-5 font-medium text-2xl flex items-center ms-2'>판</span>
            </div>
            <div>{children}</div>

            {/* true일 때는 초대하기 부분이 나타나고 */}
            {/* false일 때는 초대하기 부분이 나타나지 않음 */}
            {isUpdateModal ? (
              <Fragment>
                <div className='flex mb-1'>
                  <span className='ms-2 me-5 font-medium text-2xl flex items-center'>초대하기</span>
                  <div className='w-[19.5rem] inline-block'>
                    <div>
                      <div className='inline-block p-1 border-2 border-[#FF8DA3] font-medium text-2xl text-center text-[#514148] font-kdisplay rounded-l-lg'>
                        Code
                      </div>
                      <input
                        value={code}
                        onChange={codeEnter}
                        className='p-1 w-[13.4rem] border-y-2 border-e-2 border-[#FF8DA3] rounded-r-lg font-medium text-2xl text-center text-[#514148] font-kdisplay'
                        placeholder='코드 입력'
                        type='text'
                      />
                      <TextCopy text={code} />
                    </div>
                  </div>
                </div>
                <div className='mb-10'>
                  <div>
                    <div className='inline-block px-2 py-1 border-2 border-[#FF8DA3] font-medium text-2xl text-center text-[#514148] font-kdisplay rounded-l-lg'>
                      URL
                    </div>
                    <input
                      value={url}
                      onChange={urlEnter}
                      className='inline-block p-1 border-y-2 border-e-2 w-[20.1rem] border-[#FF8DA3] rounded-r-lg font-medium text-2xl text-center text-[#514148] font-kdisplay'
                      placeholder='URL 입력'
                      type='text'
                    />
                    <TextCopy text={url} />
                  </div>
                </div>
              </Fragment>
            ) : null}
          </div>
          <GameStartButton onClickStartBtn={handleSaveSetting} />
        </Modal>
      </div>
    </Fragment>
  );
}
