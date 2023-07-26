import { FC } from 'react';
import { IUser } from 'hooks/useOpenvidu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
export let localUser: IUser;

interface IParticiPantsPresenterProps {
  streamList: IStreamList[];
  userId: number;
  userName: string;
  readyStatus: boolean;
  onChangeUserName: any;
  isEditUserName: boolean;
  editUserName: () => void;
  saveUserName: () => void;
}
interface IStreamList {
  streamManager: any;
  userId: number;
  userName: string;
}
export const ParticipantsPresenter: FC<IParticiPantsPresenterProps> = ({
  streamList,
  userId,
  userName,
  readyStatus,
  onChangeUserName,
  isEditUserName,
  editUserName,
  saveUserName,
}) => {
  return (
    <div id='participantsList' className='w-fit max-w-[1/6] bg-white'>
      <div className='bg-[#112364] p-3 text-white whitespace-nowrap font-bold text-xl'>
        현재 플레이어({streamList.length})
      </div>
      <div className='bg-white h-full w-full text-justify'>
        {streamList.map((stream, idx) => {
          return (
            <div
              key={idx}
              className='flex justify-between items-center w-full text-justify border-bottom border-b-2 p-3'
            >
              {userId === stream.userId ? (
                isEditUserName ? (
                  <>
                    <input
                      className='w-full'
                      type='text'
                      value={userName}
                      onChange={onChangeUserName}
                    />
                    <button onClick={saveUserName}>
                      <FontAwesomeIcon icon={faFloppyDisk} />
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      className='w-full'
                      type='text'
                      value={stream.userName + ' (나)'}
                      onChange={onChangeUserName}
                      disabled
                    />

                    <button onClick={editUserName}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
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
