import React from 'react';
import { Clipboard } from 'react-feather';

export default function TextCopy({ text }: any) {
  // 클립보드에 텍스트를 저장하는 기능
  const handleTextCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('복사 성공😍');
      console.log('내용 복사 완료');
    } catch (error) {
      alert('복사 실패😥');
    }
  };

  return (
    <span className='ms-2'>
      <Clipboard onClick={() => handleTextCopy(text)} className='cursor-pointer hover:text-[#FF8DA3]'/>
    </span>
  );
}
