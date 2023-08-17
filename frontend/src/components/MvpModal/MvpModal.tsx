import { useAtomValue } from 'jotai';
import { IPlayerInfo, IRoomAtom, roomAtom } from 'stores/room';
import { electMvpApi } from 'apis/gameApi';
import { getMvpResultApi } from 'apis/gameApi';
import { Heart } from 'react-feather';

import Modal from '@components/common/Modal';
import { Fragment, useEffect, useState } from 'react';
import ResultModal from '@components/common/ResultModal';
import { signalType } from 'hooks/useOpenvidu';

interface IMvpModalProps {
  isOpenMvpModal: boolean;
  sendSignal: (message: string, type: signalType) => void;
}

interface IMVP {
  playerId: number;
  vote: number;
}

export default function MvpModal({ isOpenMvpModal, sendSignal }: IMvpModalProps) {
  const roomInfo = useAtomValue<IRoomAtom>(roomAtom);
  const [mvpModal, setMvpModal] = useState(isOpenMvpModal);
  const [gameResultModal, setGameResultModal] = useState(false);
  const [mvpResult, setMvpResult] = useState<IMVP[]>([]);

  let [contentType, setContentType] = useState('ELECT');

  // 시간을 지연시키는 함수
  function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // MVP를 뽑기 위해 모달창을 엶
  async function openMvpModal(a: boolean): Promise<void> {
    setMvpModal(a);
    console.log('MVP 투표 시작');
  }

  const onClickChoice = async (playerId: number) => {
    try {
      const result: any = await electMvpApi(roomInfo.room.roomId, playerId);
      console.log('API 호출 결과:', result);
    } catch (error) {
      console.error('MVP 선택 실패:', error);
    }
  };

  const getMvpData = async (roomId: number) => {
    try {
      const mvpResult = await getMvpResultApi(roomId);
      console.log('결과 출력 성공:', mvpResult);
      setMvpResult(mvpResult);
    } catch (error) {
      console.error('결과 출력 실패:', error);
    }
  };

  // 투표창에서 로딩창으로 변경
  async function electToLoad(a: string): Promise<void> {
    setContentType(a);
    try {
      getMvpData(roomInfo.room.roomId);
      console.log('로딩중');
    } catch (error) {
      console.error('로딩 실패 :', error);
    }
  }

  // 로딩창에서 MVP 결과창으로 변경
  async function loadToMvpResult(a: string): Promise<void> {
    setContentType(a);
    console.log(mvpResult);
    console.log('MVP 확인');
  }

  async function openAndCloseModal(): Promise<void> {
    try {
      // await delay(17000); // 마지막 라운드가 되면 실행되도록
      await openMvpModal(true);
      await delay(7000); // 투표창 7초 동안 대기
      await electToLoad('LOAD');
      await delay(3000); // 로딩창 3초 동안 대기
      await loadToMvpResult('RESULT');
    } catch (error) {
      console.error('오류 발생:', error);
    }
  }

  useEffect(() => {
    isOpenMvpModal &&
      openAndCloseModal()
        .then(() => {
          console.log('순차적 과정 진행 완료');
        })
        .catch((error) => {
          console.error('오류 발생:', error);
        });
  }, [isOpenMvpModal]);

  // MVP 결과창의 '게임 결과 확인' 버튼을 누르면 게임 결과가 뜸
  const openGameResultModal = () => {
    setGameResultModal(true);
    useEffect(() => {
      setMvpModal(false);
    });
  };

  return (
    <div className='font-kdisplay'>
      <Modal openModal={mvpModal} closeModal={mvpModal} isSettingModal={false}>
        {contentType === 'ELECT' ? (
          <Fragment>
            <div className='flex justify-center text-5xl mt-9 text-[#514148]'>당신의 MVP에게</div>
            <div className='flex justify-center text-5xl mb-12 text-[#FA8D8D]'>
              <span className='text-[#FA8D8D]'>투표</span>하세요
            </div>
            {roomInfo.playerInfos.map((player, i) => (
              <div key={i}>
                <div className='mb-3'>
                  <div className='inline-block'>
                    <Heart
                      onClick={() => onClickChoice(player.playerId)}
                      size='35'
                      className='text-[#FA8DA3] hover:animate-bounce cursor-pointer'
                    />
                  </div>
                  <span
                    onClick={() => onClickChoice(player.playerId)}
                    className='text-[#514148] hover:text-[#FA8DA3] text-3xl font-kdisplay ms-3 cursor-pointer'
                  >
                    {player.nickname}
                  </span>
                </div>
              </div>
            ))}
            <div className='flex justify-center text-[#514148] text-2xl mt-12'>
              🚨중복 투표 가능합니다🚨
            </div>
            <div className='flex justify-center text-[#514148] text-2xl mt-5 animate-pulse'>
              🚨7초 후 투표가 마감됩니다🚨
            </div>
          </Fragment>
        ) : contentType === 'LOAD' ? (
          <div className='text-[#514148] text-5xl animate-pulse flex justify-center mt-10'>
            결과 집계 중...
          </div>
        ) : (
          <Fragment>
            <div className='text-5xl flex justify-center my-10 text-[#FA8D8D]'>오늘의 MVP</div>
            {mvpResult.map((mvp, idx) => {
              const player = roomInfo.playerInfos.find((p) => p.playerId === mvp.playerId);
              return (
                <div key={idx} className='text-4xl flex justify-center pt-5 animate-bounce'>
                  🎊{player?.nickname}🎊 {mvp.vote}표
                </div>
              );
            })}
            <div className='flex justify-end mt-14 text-xl'>
              <Fragment>
                <button onClick={openGameResultModal}>게임 결과 확인 ➤</button>
                <ResultModal openModal={gameResultModal} sendSignal={sendSignal} />
              </Fragment>
            </div>
          </Fragment>
        )}
      </Modal>
    </div>
  );
}
