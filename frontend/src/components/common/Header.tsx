// 게임 전까지 Header
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faCircleUser } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className='w-full absolute'>
      <span className='flex justify-end py-4 px-3'>
        {/* 흰색 아이콘 */}
        {/* <FontAwesomeIcon icon={faDoorOpen} size="2xl" style={{color: "#fcfcfc",}} /> */}
        <FontAwesomeIcon icon={faDoorOpen} size="2xl" style={{color: "#fcfcfc",}} className='me-1.5' />
        <FontAwesomeIcon icon={faCircleUser} size="2xl" style={{color: "#fcfcfc",}} className='ms-1.5' />
      </span>
    </div>
  );
}