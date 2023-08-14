import { useAtomValue } from 'jotai';
import { IRoomAtom, roomAtom } from 'stores/room';

import Modal from '@components/common/Modal';
import { Fragment, useEffect, useState } from 'react';
import ResultModal from '@components/common/ResultModal';
import { resolve } from 'path';
import { rejects } from 'assert';

export default function MvpModal() {
  const roomInfo = useAtomValue<IRoomAtom>(roomAtom);

  // const openElectModal = () => {
  //   setElectModal(true)
  //   console.log('MVP 선출 시작')
  // }
  // setTimeout(openElectModal, 57000)

  // const closeElectModal = () => {
  //   setElectModal(false)
  // }
  // // 모달창은 무조건 7초가 지나야 닫힘
  // setTimeout(closeElectModal, 64000)

  // 7초가 지난 후에도 MVP를 뽑지 않으면 voteId를 5로 지정
  // voteId의 개수가 4명이 되면 로딩창을 띄움
  // const openLoadModal = () => {
  //   setLoadModal(true);
  //   console.log('로딩중')

  // };
  // // 삭제하기
  // setTimeout(openLoadModal, 64000)

  // const closeLoadModal = () => {
  //   setLoadModal(false);
  // };
  // // 로딩창은 3초 정도
  // setTimeout(closeLoadModal, 67000)

  // const openMvpResulttModal = () => {
  //   setMvpResultModal(true)
  //   console.log('MVP 결과 확인')
  // }
  // setTimeout(openMvpResulttModal, 67000)
  
  const [electModal, setElectModal] = useState(false);
  const [loadModal, setLoadModal] = useState(false);
  const [mvpResulttModal, setMvpResultModal] = useState(false);
  const [gameResultModal, setGameResultModal] = useState(false);
  let [contentType, setContentType] = useState('ELECT')

  
  function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  // MVP를 뽑기 위한 모달창을 엶
  async function openElectModal(a: boolean): Promise<void> {
    setElectModal(a);
    console.log('MVP 투표 시작');
  }

  // MVP를 뽑기 위한 모달창을 닫음 7000
  async function closeElectModal(a: boolean): Promise<void> {
    setElectModal(a);
    console.log('MVP 투표 완료');
  }

  const onClickNominee = () => {
    // playerId와 voteId 보내야 함
    console.log('전달 완료');
  };

  // 7초가 지난 후에도 MVP를 뽑지 않으면 voteId를 5로 지정
  // voteId의 개수가 4명이 되면 로딩창을 띄움  100
  async function openLoadModal(a: boolean): Promise<void> {
    setLoadModal(a);
    console.log('로딩중');
  }

  //모달을 띄우고 끄기보다는 안에 있는 내용을 변경하는 방식으로 개발하면 어떨까?
  // 3000
  async function closeLoadModal(a: boolean): Promise<void> {
    setLoadModal(a);
    console.log('로딩창 닫기');
  }

  // 500
  async function openMvpResulttModal(a: boolean): Promise<void> {
    setMvpResultModal(a);
    console.log('MVP 결과 확인');
  }

  async function openAndCloseModal(): Promise<void> {
    try {
      await delay(57000);  // 마지막 라운드가 되면 실행되도록 
      await openElectModal(true);
      await delay(7000);  // 7초 대기
      await closeElectModal(false);
      await openLoadModal(true);
      await delay(3000);
      await closeLoadModal(false);
      await delay(500);
      await openMvpResulttModal(true);
    } catch (error) {
      console.error('오류 발생:', error);
    }
  }

  useEffect(() => {
    
    openAndCloseModal().then(() => {
      console.log('MVP 결과 확인을 위한 순차적 과정 진행 완료');
    }).catch((error) => {
      console.error('오류 발생:', error)
    });
  },[])

  // MVP 결과창 이후 버튼 게임 결과 확인 버튼을 누르면 게임 결과창이 뜸
  const openGameResultModal = () => {
    setGameResultModal(true);
  };

  // MVP 투표 모달창 1번만 나오도록 하기
  // playerId와 voteId 보내는 API 작성
  return (
    <div className='font-kdisplay'>
      <Modal openModal={electModal} closeModal={closeElectModal} isSettingModal={false}>
        <div className='flex justify-center text-5xl mt-9 text-[#514148]'>당신의 MVP에게</div>
        <div className='flex justify-center text-5xl mb-12 text-[#514148]'>투표하세요</div>
        <div className='flex justify-center mb-7'>
          <button
            onClick={onClickNominee}
            className='inline-block bg-[#FA8DA3] rounded-lg w-1/3 text-2xl py-5 px-4 me-8 hover:bg-red-400 text-white'
          >
            {/* 내 닉네임은 누구 */}
            {roomInfo.playerInfos[0].nickname}
          </button>
          <button
            onClick={onClickNominee}
            className='inline-block bg-[#FA8DA3] rounded-lg text-2xl py-5 px-4 me-3 hover:bg-red-400 text-white'
          >
            {/* 내 닉네임은 누구 */}
            {roomInfo.playerInfos[1].nickname}
          </button>
        </div>
        <div className='flex justify-center mb-7'>
          <button
            onClick={onClickNominee}
            className='inline-block bg-[#FA8DA3] rounded-lg text-2xl py-5 px-4 me-8 hover:bg-red-400 text-white'
          >
            내 닉네임은 누구
            {/* {roomInfo.playerInfos[2].nickname} */}
          </button>
          <button
            onClick={onClickNominee}
            className='inline-block bg-[#FA8DA3] rounded-lg text-2xl py-5 px-4 me-3 hover:bg-red-400 text-white'
          >
            내 닉네임은 누구
            {/* {roomInfo.playerInfos[3].nickname} */}
          </button>
        </div>
        <div className='flex justify-center text-[#514148] text-xl mt-12 animate-pulse'>
          🚨7초 후 투료가 마감됩니다🚨
        </div>
      </Modal>
      <Modal openModal={loadModal} closeModal={closeLoadModal} isSettingModal={false}>
        <div className='text-[#514148] text-5xl animate-pulse flex justify-center mt-10'>
          결과 집계 중...
        </div>
      </Modal>
      <Modal openModal={mvpResulttModal} isSettingModal={false}>
        <div className='text-5xl flex justify-center my-10'>오늘의 MVP</div>
        <div className='text-4xl flex justify-center pt-5'>🎊누구🎊</div>
        <div className='flex justify-end mt-14 text-xl'>
          <Fragment>
            <button onClick={openGameResultModal}>게임 결과 확인 ➤</button>
            <ResultModal openModal={gameResultModal}></ResultModal>
          </Fragment>
        </div>
      </Modal>
    </div>
  );
}
