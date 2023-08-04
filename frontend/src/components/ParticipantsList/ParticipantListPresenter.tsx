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
  updateUserName: () => void;
  saveUserName: () => void;
}
interface IStreamList {
  streamManager: any;
  userId: number;
  userName: string;
}
export const ParticipantsPresenter: FC<IParticipantsPresenterProps> = ({
  type,
  streamList,
  user,
  onChangeUserName,
  isUpdateUserName,
  updateUserName,
  saveUserName,
}) => {
  return (
    <div id='participantsList' className=' w-52 bg-white'>
      <div className='bg-[#112364] p-3 text-white whitespace-nowrap font-bold text-xl'>
        현재 플레이어({streamList.length})
      </div>
      <div className='bg-white w-full text-justify'>
        {streamList.map((stream, idx) => {
          return (
            <div
              key={idx}
              className='flex justify-between items-center w-full text-justify border-bottom border-b-2 p-3'
            >
              {user.memberId === stream.userId ? (
                isUpdateUserName ? (
                  <>
                    <input
                      className='w-full'
                      type='text'
                      value={user.nickname}
                      onChange={onChangeUserName}
                    />
                    {type === 'WAIT' ? (
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
                      className='w-full truncate'
                      type='text'
                      value={stream.userName + ' (나)'}
                      onChange={onChangeUserName}
                      disabled
                    />
                    {type === 'WAIT' ? (
                      <button onClick={updateUserName}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </>
                )
              ) : (
                <input
                  className='w-full'
                  type='text'
                  value={stream.userName}
                  onChange={onChangeUserName}
                  disabled
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
