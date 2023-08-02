// 대기실 입장 전까지 Header
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faCircleUser } from '@fortawesome/free-solid-svg-icons';

export default function UserHeader() {
  return (
    <div className='w-full absolute'>
      <span className='flex justify-end py-4 px-3'>
        {/* 흰색 아이콘 */}
        {/* style 삭제하면 남색 아이콘이 됨 */}
        {/* <FontAwesomeIcon
          icon={faDoorOpen}
          size='2xl'
          style={{ color: '#fcfcfc' }}
          className='me-1.5 cursor-pointer'
        /> */}
        <FontAwesomeIcon
          icon={faCircleUser}
          size='2xl'
          style={{ color: '#fcfcfc' }}
          className='me-3 text-4xl'
        />
      </span>
    </div>
  );
}
