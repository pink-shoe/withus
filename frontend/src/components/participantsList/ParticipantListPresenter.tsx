import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IUser, useOpenvidu } from 'hooks/useOpenvidu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons'; // import { AvatimeApi } from "../apis/avatimeApi";
export let localUser: IUser;

interface IParticiPantsPresenterProps {
  streamManager: any;
  userId: string;
  userName: string;
}
export default function WaitingRoom() {
  const location = useLocation();

  const currentPath = location.pathname.slice(
    location.pathname.lastIndexOf('/') + 1,
    location.pathname.length
  );

  const [roomId, setRoomId] = useState<string>(currentPath);
  const [userId, setUserId] = useState<number>(Math.floor(Math.random() * 100));

  const { publisher, streamList, onChangeCameraStatus, onChangeMicStatus } = useOpenvidu(
    userId!,
    roomId
  );
  return (
    <div id='participantsList' className='w-fit max-w-[1/6] bg-white'>
      <div className='bg-[#112364] p-3 text-white whitespace-nowrap font-bold text-xl'>
        현재 플레이어({streamList.length})
      </div>
      <div className='bg-white h-full w-full text-justify'>
        {streamList.map((stream, idx) => {
          console.log(streamList);
          return (
            <div
              key={idx}
              className='flex justify-between items-center w-full text-justify border-bottom border-b-2 p-3'
            >
              <div>{stream.userName}</div>
              {stream.userId === userId && (
                <button>
                  <FontAwesomeIcon icon={faPen} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
