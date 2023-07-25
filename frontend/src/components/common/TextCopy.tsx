import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

export default function TextCopy(props: any) {
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
      <FontAwesomeIcon
        icon={faClipboard}
        size='2xl'
        onClick={() => handleTextCopy(props.text)}
        className='cursor-pointer hover:text-violet-700'
      />
    </span>
  );
}
