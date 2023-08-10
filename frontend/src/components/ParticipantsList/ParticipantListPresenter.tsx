import React, { FC, useState } from 'react';
import { IStreamList, IUser } from 'hooks/useOpenvidu';
import { Edit, Save } from 'react-feather';
import { IUserAtom } from 'stores/user';
import { IPlayerInfo } from 'stores/room';
export let localUser: IUser;

interface IParticipantsPresenterProps {
  type: 'WAIT' | 'GAME';
  playerList: IPlayerInfo[];
  user: IUserAtom;
  isHost: boolean;
  onChangeUserName: any;
  isUpdateUserName: boolean;
  onChangeUpdateUserNameStatus: () => void;
  saveUserName: () => void;
}

export const ParticipantsPresenter: FC<IParticipantsPresenterProps> = ({
  type,
  playerList,
  user,
  isHost,
  onChangeUserName,
  isUpdateUserName,
  onChangeUpdateUserNameStatus,
  saveUserName,
}) => {
  return (
    <div id='participantsList' className=' w-52 bg-white font-kdisplay'>
      <div className='bg-[#C4C6EC] p-3 text-white whitespace-nowrap font-medium text-xl '>
        협동전 {type === 'GAME' && ` 1/5(판)`}
      </div>
      <div className='bg-[#FF8DA3] p-3 text-white whitespace-nowrap font-medium text-xl'>
        현재 플레이어({playerList && playerList.length ? playerList.length : 0})
      </div>
      <div className='bg-white w-full text-justify'>
        {playerList?.map((player, idx) => {
          return (
            <div
              key={idx}
              className={
                'flex relative justify-between items-center w-full text-justify border-bottom border-b-2 p-3 text-[#514148] text-xl' +
                ` ${type === 'WAIT' && player.ready ? 'bg-[#FFF5C0]' : 'bg-white'} `
              }
            >
              {user.memberId === player.playerId ? (
                isUpdateUserName ? (
                  <>
                    <input
                      className='w-full bg-transparent'
                      type='text'
                      value={user.nickname}
                      onChange={onChangeUserName}
                    />
                    {type === 'WAIT' && !player.ready ? (
                      <button onClick={saveUserName}>
                        {/* <FontAwesomeIcon icon={faFloppyDiskIconDefinition} /> */}
                        <Save />
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
                      value={'(나) ' + player.nickname}
                      onChange={onChangeUserName}
                      disabled
                    />
                    {type === 'WAIT' && !player.ready ? (
                      <button onClick={onChangeUpdateUserNameStatus}>
                        {/* <FontAwesomeIcon icon={faPenToSquareIconDefinition} /> */}
                        <Edit />
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
                  value={player.nickname}
                  onChange={onChangeUserName}
                  disabled
                />
              )}
              {type === 'WAIT' && player.ready && (
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
