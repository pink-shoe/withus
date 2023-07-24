import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import TextCopy from '../components/common/TextCopy';
import RoomSetting from '../components/common/RoomSetting';

export default function About() {
  const [decideCode, setDecideCode] = useState('')
  const [decideUrl, setDecideUrl] = useState('')

  const handleTextCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('복사 성공😍');
      console.log('내용 복사 완료')
    } catch (error) {
      alert('복사 실패😥');
    }
  };

  const copyCode = (event: any) => {
    setDecideCode(event.target.value);
    console.log(decideCode);
  };

  const copyUrl = (event: any) => {
    setDecideUrl(event.target.value);
    console.log(decideUrl);
  };

  return (
    <Fragment>
      <TextCopy />
      <RoomSetting>
        <div className='flex mb-2'>
          <span className='me-5 font-semibold text-xl flex items-center'>초대하기</span>
          <div className='w-[19.5rem]'>
            <div>
              <input value={decideCode} onChange={copyCode} className='p-2 border-2 w-[17.5rem] border-blue-800 rounded-md text-center focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:text-slate-400' placeholder='코드 입력' type="text" />
              <span className='ms-2'>
                <FontAwesomeIcon icon={faClipboard} size="2xl" onClick={() => handleTextCopy(decideCode)} className='cursor-pointer hover:text-violet-700' />
              </span>
            </div>
            <div className='my-1'>
              <input value={decideUrl} onChange={copyUrl} className='p-2 border-2 w-[17.5rem] border-blue-800 rounded-md text-center focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:text-slate-400' placeholder='URL 입력' type="text" />
              <span className='ms-2'>
                <FontAwesomeIcon icon={faClipboard} size="2xl" onClick={() => handleTextCopy(decideUrl)} className='cursor-pointer hover:text-violet-700' />
              </span>
            </div>
          </div>
        </div>
      </RoomSetting>
    </Fragment>
  );
}
