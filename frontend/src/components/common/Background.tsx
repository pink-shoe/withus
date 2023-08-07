import UserHeader from './UserHeader';

interface IBackgroundProps {
  // isLobbyDropdown true는 로비 항목이 없고, false는 로비 항목이 있음
  isLobbyDropdown? : any;
  isLobbyPage: boolean;
  children: React.ReactNode;
}

export default function Background({isLobbyDropdown, isLobbyPage, children}: IBackgroundProps) {
  return (
    <Fragment>
      <UserHeader />
      <div className='flex justify-center place-items-center h-screen bg-[#F9C7C8]'>{children}</div>
    </Fragment>
  );
}