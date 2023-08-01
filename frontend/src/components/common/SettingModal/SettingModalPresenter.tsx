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
      <Fragment>
        {/* node 버전으로 인해 발생하는 에러(mode의 붉은 줄) */}
        <Modal mode={mode} round={round} openModal={openModal} closeModal={closeModal}>
          <p className='text-indigo-900 font-bold text-3xl mb-10 text-center'>방 설정</p>
          <div className='flex my-7'>
            <span className='me-5 font-semibold text-xl flex items-center'>게임모드</span>
            <SelectBox selectSetting={selectMode} options={MOPTIONS}></SelectBox>
          </div>
          <div className='flex mb-7'>
            <span className='me-5 font-semibold text-xl flex items-center'>게임진행</span>
            <SelectBox selectSetting={selectRound} options={ROPTIONS}></SelectBox>
            <span className='me-5 font-semibold text-xl flex items-center ms-2'>판</span>
          </div>
          <div>{children}</div>

          {/* true일 때는 초대하기 부분이 나타나고 */}
          {/* false일 때는 초대하기 부분이 나타나지 않음 */}
          {isUpdateModal ? (
            <div className='flex mb-8'>
              <span className='me-5 font-semibold text-xl flex items-center'>초대하기</span>
              <div className='w-[19.5rem]'>
                <div>
                  <input
                    value={code}
                    onChange={codeEnter}
                    className='p-2 border-2 w-[17.5rem] border-blue-800 rounded-md text-center focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:text-slate-400'
                    placeholder='코드 입력'
                    type='text'
                  />
                  <TextCopy text={code} />
                </div>
                <div className='my-1'>
                  <input
                    value={url}
                    onChange={urlEnter}
                    className='p-2 border-2 w-[17.5rem] border-blue-800 rounded-md text-center focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:text-slate-400'
                    placeholder='URL 입력'
                    type='text'
                  />
                  <TextCopy text={url} />
                </div>
              </div>
            </div>
          ) : null}
          <GameStartButton onClickStartBtn={handleSaveSetting} />
        </Modal>
      </Fragment>
    </Fragment>
  );
}
