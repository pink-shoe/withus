import { FC } from 'react';
import { IUser } from 'hooks/useOpenvidu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { IUserAtom } from 'stores/user';
export let localUser: IUser;

interface IParticipantsPresenterProps {
  type: 'WAIT' | 'GAME';
  streamList: IStreamList[];
  user: IUserAtom;
  onChangeUserName: any;
  isUpdateUserName: boolean;
  onChangeUpdateUserNameStatus: () => void;
  saveUserName: () => void;
}
interface IStreamList {
  streamManager: any;
  userId: number;
  userName: string;
  isReady: boolean;
}
export const ParticipantsPresenter: FC<IParticipantsPresenterProps> = ({
  type,
  streamList,
  user,
  onChangeUserName,
  isUpdateUserName,
  onChangeUpdateUserNameStatus,
  saveUserName,
}) => {
  return (
    <div id='participantsList' className=' w-52 bg-white '>
      <div className='bg-[#C4C6EC] p-3 text-white whitespace-nowrap font-bold text-xl '>
        협동전 &nbsp; 1/5(판)
      </div>
      <div className='bg-[#FF8DA3] p-3 text-white whitespace-nowrap font-bold text-xl'>
        현재 플레이어({streamList.length})
      </div>
      <div className='bg-white w-full text-justify'>
        {streamList.map((stream, idx) => {
          return (
            <div
              key={idx}
              className={
                'flex relative justify-between items-center w-full text-justify border-bottom border-b-2 p-3 text-[#514148]' +
                ` ${
                  user.memberId === stream.userId && stream.isReady ? 'bg-[#FFF5C0]' : 'bg-white'
                } `
              }
            >
              {user.memberId === stream.userId ? (
                isUpdateUserName ? (
                  <>
                    <input
                      className='w-full bg-transparent'
                      type='text'
                      value={user.nickname}
                      onChange={onChangeUserName}
                    />
                    {type === 'WAIT' && !stream.isReady ? (
                      <button onClick={saveUserName}>
                        <FontAwesomeIcon icon={faFloppyDisk} />
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </>
                ) : (
                  <>
                    <input
                      className='w-full truncate bg-transparent'
                      type='text'
                      value={stream.userName + ' (나)'}
                      onChange={onChangeUserName}
                      disabled
                    />
                    {type === 'WAIT' && !stream.isReady ? (
                      <button onClick={onChangeUpdateUserNameStatus}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </>
                )
              ) : (
                <input
                  className='w-full bg-transparent'
                  type='text'
                  value={stream.userName}
                  onChange={onChangeUserName}
                  disabled
                />
              )}
              {stream.isReady && (
                <div className=' text-[#FF8DA3] whitespace-nowrap absolute right-2 top-2'>
                  준비완료
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
