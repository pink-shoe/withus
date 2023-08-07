// 대기실 입장 전까지 Header
import { Link, useNavigate } from 'react-router-dom';
import UserDropdown from './UserDropdown';

interface IUserHeaderProps {
  isLobbyDropdown: boolean;
}

export default function UserHeader({isLobbyDropdown}: IUserHeaderProps) {
  const navigate = useNavigate();

  const onClickLogout = (): void => {
    // Remove token from localStorage
    localStorage.removeItem('token');

    // Navigate to '/login' page
    navigate('/login');
  };
  
  return (
    <div className='w-full absolute'>
      <span className='flex justify-end py-4 px-3'>
        <div className='cursor-pointer z-40'>
          {isLobbyDropdown ? (
            // 로비 페이지에서 드롭다운
            <UserDropdown>
            <ul className='hover:text-red-300 font-kdisplay text-xl'>
              <li className='bg-white text-center rounded-t-lg border-[#FA8D8D] mt-2 border-2 h-9 py-1 px-4 text-[#FA8D8D] hover:text-black'>
                <Link to='/mypage'>회원 정보 관리</Link>
              </li>
              <li className='bg-white text-center border-[#FA8D8D] border-x-2 h-8 pt-1 text-[#FA8D8D] hover:text-black'>
                <Link to='/mypage/photoalbum'>사진첩</Link>
              </li>
              <li className='bg-white text-center rounded-b-lg border-[#FA8D8D] border-2 h-9 p-1 text-[#FA8D8D] hover:text-black' onClick={onClickLogout}>
                로그아웃
              </li>
            </ul>
          </UserDropdown>
          ) : (
          // 로비 이외의 페이지에서 드롭다운
          <UserDropdown>
            <ul className='hover:text-red-300 font-kdisplay text-xl'>
              <li className='bg-white text-center rounded-t-lg border-[#FA8D8D] mt-2 border-2 h-9 py-1 text-[#FA8D8D] hover:text-black'>
                <Link to='/lobby'>로비</Link>
              </li>
              <li className='bg-white text-center border-[#FA8D8D] border-x-2 border-b-2 h-8 pt-1 px-4 text-[#FA8D8D] hover:text-black'>
                <Link to='/mypage'>회원 정보 관리</Link>
              </li>
              <li className='bg-white text-center border-[#FA8D8D] border-x-2 h-8 pt-1 text-[#FA8D8D] hover:text-black'>
                <Link to='/mypage/photoalbum'>사진첩</Link>
              </li>
              <li className='bg-white text-center rounded-b-lg border-[#FA8D8D] border-2 h-9 p-1 text-[#FA8D8D] hover:text-black' onClick={onClickLogout}>
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
