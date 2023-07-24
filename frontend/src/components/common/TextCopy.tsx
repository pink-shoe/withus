import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

export default function TextCopy() {
  const handleTextCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('복사 성공😍');
      console.log('내용 복사 완료')
    } catch (error) {
      alert('복사 실패😥');
    }
  };

  return (
    <div>
      <FontAwesomeIcon icon={faClipboard} size="2xl" onClick={() => handleTextCopy('복사된 내용')} className='cursor-pointer hover:text-violet-700' />
      <button onClick={() => handleTextCopy('복사된 내용')}>복사</button>
    </div>
  )
};