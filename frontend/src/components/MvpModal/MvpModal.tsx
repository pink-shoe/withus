import { useAtomValue } from 'jotai';
import { IRoomAtom, roomAtom } from 'stores/room';

import Modal from '@components/common/Modal';
import { Fragment, useEffect, useState } from 'react';
import ResultModal from '@components/common/ResultModal';



export default function MvpModal() {
  const roomInfo = useAtomValue<IRoomAtom>(roomAtom);
  const [electModal, setElectModal] = useState(false);
  const [loadModal, setLoadModal] = useState(false);
  const [mvpResulttModal, setMvpResultModal] = useState(false);
  const [gameResultModal, setGameResultModal] = useState(false);

  // MVP를 뽑기 위한 모달창을 엶
  const openElectModal = () => {
    setElectModal(true)
    console.log('MVP 선출 시작')
  }
  setTimeout(openElectModal, 57000)

  // MVP를 뽑기 위한 모달창을 닫음
  const closeElectModal = () => {
    setElectModal(false)
  }
  // 모달창은 무조건 7초가 지나야 닫힘
  setTimeout(closeElectModal, 64000)

  const onClickNominee = () => {
    // playerId와 voteId 보내야 함
    console.log('전달 완료');
  };

  // 7초가 지난 후에도 MVP를 뽑지 않으면 voteId를 5로 지정
  // voteId의 개수가 4명이 되면 로딩창을 띄움
  const openLoadModal = () => {
    setLoadModal(true);
    console.log('로딩중')

  };
  // 삭제하기
  setTimeout(openLoadModal, 64000)

  const closeLoadModal = () => {
    setLoadModal(false);
  };
  // 로딩창은 3초 정도
  setTimeout(closeLoadModal, 67000)

  const openMvpResulttModal = () => {
    setMvpResultModal(true)
    console.log('MVP 결과 확인')
  }
  setTimeout(openMvpResulttModal, 67000)

  // MVP 결과창 이후 버튼 게임 결과 확인 버튼을 누르면 게임 결과창이 뜸
  const openGameResultModal = () => {
    setGameResultModal(true)
  }

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
            className='inline-block bg-[#FA8DA3] rounded-lg text-2xl py-5 px-4 me-8 hover:bg-red-400 text-white'
          >
            내 닉네임은 누구
            {/* {roomInfo.playerInfos[0].nickname} */}
          </button>
          <button
            onClick={onClickNominee}
            className='inline-block bg-[#FA8DA3] rounded-lg text-2xl py-5 px-4 me-3 hover:bg-red-400 text-white'
          >
            내 닉네임은 누구
            {/* {roomInfo.playerInfos[1].nickname} */}
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
