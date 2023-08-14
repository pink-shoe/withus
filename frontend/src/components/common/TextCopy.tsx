import React, { useState } from 'react';
import { Clipboard } from 'react-feather';
import Modal from './Modal';

export default function TextCopy({ text }: any) {
  const [informModal, setInformModal] = useState(false);

  const closeInformModal = () => {
    setInformModal(false);
  };

  // 클립보드에 텍스트를 저장하는 기능
  const handleTextCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setInformModal(true);
      console.log('복사 성공');
    } catch (error) {
      console.log('복사 실패😥')
    }
  };

  return (
    <div>
      <Clipboard
        size='30'
        onClick={() => handleTextCopy(text)}
        className='cursor-pointer hover:text-[#FF8DA3]'
      />
      <Modal openModal={informModal} closeModal={closeInformModal} isSettingModal={true}>
        <div className='mt-12 mb-14 w-full text-[#514148] font-medium text-5xl text-center font-kdisplay'>
          복사 성공😍
        </div>
      </Modal>
    </div>
  );
}
