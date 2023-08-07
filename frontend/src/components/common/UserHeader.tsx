// 대기실 입장 전까지 Header
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import UserDropdown from './UserDropdown';

export default function UserHeader() {
  return (
    <div className='w-full absolute'>
      <span className='flex justify-end py-4 px-3'>
        <div className='cursor-pointer z-40'>
          <UserDropdown>
            <ul className='hover:text-red-300 font-kdisplay text-xl'>
              <li className='bg-white text-center border-[#FA8D8D] border-2 mt-2 h-9 p-1 text-red-300 hover:text-black'><a href="/lobby">로비</a></li>  
              <li className='bg-white text-center rounded-t-lg border-[#FA8D8D] mt-2 border-2 h-9 py-1 px-2 text-red-300 hover:text-black'><a href="/mypage">회원 정보 관리</a></li>  
              <li className='bg-white text-center border-[#FA8D8D] border-2 h-9 p-1 text-red-300 hover:text-black'><a href="/mypage/photoalbum">사진첩</a></li>  
              <li className='bg-white text-center rounded-b-lg border-[#FA8D8D] border-2 h-9 p-1 text-red-300 hover:text-black'>로그아웃</li>  
            </ul>
          </UserDropdown>

        </div>
        {/* 흰색 아이콘 */}
        {/* style 삭제하면 남색 아이콘이 됨 */}
        {/* <FontAwesomeIcon
          icon={faDoorOpen}
          size='2xl'
          style={{ color: '#fcfcfc' }}
          className='me-1.5 cursor-pointer'
        /> */}
        {/* <FontAwesomeIcon
          icon={faCircleUser}
          size='2xl'
          style={{ color: '#fcfcfc' }}
          className='me-3 text-4xl'
        /> */}
      </span>
    </div>
  );
}
