import { useAtomValue } from 'jotai';
import { IRoomAtom, roomAtom } from 'stores/room';

import Modal from '@components/common/Modal';
import { useState } from 'react';

export type modalType = 'ELECT' | 'LOAD' | 'RESULT';

interface IMvpModalProps {
  modalType: modalType;
  openModal: boolean;
}

export default function MvpModal({openModal, modalType}: IMvpModalProps) {
  const roomInfo = useAtomValue<IRoomAtom>(roomAtom);
  const [mvpModal, setMvpModal] = useState(true)

  const closeMvpModal = () => {
    setMvpModal(false)
    modalType = 'LOAD'
  }
  setTimeout(closeMvpModal, 7000)

  const closeLoading = () => {
    modalType = 'RESULT'
  }

  return (
    <div className='font-kdisplay'>
      {modalType === 'ELECT' ? (
      <Modal openModal={openModal} closeModal={closeMvpModal} isSettingModal={false}>
        <div>
        <button className='inline-block'>{roomInfo.playerInfos[0].nickname}</button>
        <button className='inline-block'>{roomInfo.playerInfos[1].nickname}</button>
        </div>
        <div>
        <button className='inline-block'>{roomInfo.playerInfos[2].nickname}</button>
        <button className='inline-block'>{roomInfo.playerInfos[3].nickname}</button>
        </div>
        <div>🚨7초 후 투료가 마감됩니다🚨</div>
      </Modal>
      ) : modalType === 'LOAD' ? (
          <div className='h-screen w-screen bg-black opacity-90'>
            <div className='text-white text-4xl animate-pulse'>결과 집계 중...</div>
        </div>
        ) : (
        <Modal></Modal>
      )}
    </div>
  )
}