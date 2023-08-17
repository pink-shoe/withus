// 대기실 입장 전까지 Header
// User 아이콘이 있고, 이 아이콘을 클릭하면 Dropdown이 나옴

import { Link, useNavigate } from 'react-router-dom';
import UserDropdown from './UserDropdown';
import { userLogoutApi } from 'apis/userLogout';

interface IUserHeaderProps {
  isLobbyDropdown?: boolean;
}

export default function UserHeader({ isLobbyDropdown }: IUserHeaderProps) {
  const navigate = useNavigate();

  const onClickLogout = (): void => {
    userLogoutApi(navigate);
  };
  const onClickUserUpdate = (): void => {
    navigate('/mypage')
  }
  const onClickAlbum = (): void => {
    navigate('/mypage/photoalbum')
  }
  const onClickLobby = (): void => {
    navigate('/lobby')
  }

  return (
    <div className='w-full absolute'>
      <span className='flex justify-end py-4 px-3'>
        <div className='cursor-pointer z-40'>
          {isLobbyDropdown ? (
            // 로비 페이지에서 드롭다운
            // '로비'라는 항목이 없음
            <UserDropdown>
              <ul className='hover:text-red-300 font-kdisplay text-xl'>
                <li onClick={onClickUserUpdate} className='bg-white text-center rounded-t-lg border-[#FA8D8D] mt-2 border-2 h-9 py-1 px-4 text-[#FA8D8D] hover:text-black'>
                  회원 정보 관리
                </li>
                <li onClick={onClickAlbum} className='bg-white text-center border-[#FA8D8D] border-x-2 h-8 pt-1 text-[#FA8D8D] hover:text-black'>
                  사진첩
                </li>
                <li
                  className='bg-white text-center rounded-b-lg border-[#FA8D8D] border-2 h-9 p-1 text-[#FA8D8D] hover:text-black'
                  onClick={onClickLogout}
                >
                  로그아웃
                </li>
              </ul>
            </UserDropdown>
          ) : (
            // 로비 이외의 페이지에서 드롭다운
            <UserDropdown>
              <ul className='hover:text-red-300 font-kdisplay text-xl'>
                <li onClick={onClickLobby} className='bg-white text-center rounded-t-lg border-[#FA8D8D] mt-2 border-2 h-9 py-1 text-[#FA8D8D] hover:text-black'>
                  로비
                </li>
                <li onClick={onClickUserUpdate} className='bg-white text-center border-[#FA8D8D] border-x-2 border-b-2 h-8 pt-1 px-4 text-[#FA8D8D] hover:text-black'>
                  회원 정보 관리
                </li>
                <li onClick={onClickAlbum} className='bg-white text-center border-[#FA8D8D] border-x-2 h-8 pt-1 text-[#FA8D8D] hover:text-black'>
                  사진첩
                </li>
                <li
                  className='bg-white text-center rounded-b-lg border-[#FA8D8D] border-2 h-9 p-1 text-[#FA8D8D] hover:text-black'
                  onClick={onClickLogout}
                >
                  로그아웃
                </li>
              </ul>
            </UserDropdown>
          )}
        </div>
      </span>
    </div>
  );
}
