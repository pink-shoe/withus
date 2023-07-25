// import React, { FC, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faVideo,
//   faVideoSlash,
//   faMicrophone,
//   faMicrophoneSlash,
//   faDoorOpen,
//   faGear,
//   faComment,
//   faCommentSlash,
// } from '@fortawesome/free-solid-svg-icons';
// // import { useWebSocket } from "../../hooks/useWebSocket";

// type Type = 'master' | 'normal';
// interface IProps {
//   type: Type;
//   onChangeMicStatus: (status: boolean) => void;
//   onChangeCameraStatus: (status: boolean) => void;
//   onChangeChatStatus: (status: boolean) => void;
// }

// export const ControllBar: FC<IProps> = ({ type, ...callback }) => {
//   const [micStatus, setMicStatus] = useState(true);
//   const [cameraStatus, setCameraStatus] = useState(true);
//   const [chatStatus, setChatStatus] = useState(true);

//   const onChangeMicStatus = () => {
//     setMicStatus((prev) => !prev);
//   };

//   const onChangeCameraStatus = () => {
//     setCameraStatus((prev) => !prev);
//   };

//   const onChangeChatStatus = () => {
//     setChatStatus((prev) => !prev);
//   };

//   useEffect(() => {
//     callback.onChangeMicStatus(micStatus);
//   }, [micStatus, callback]);

//   useEffect(() => {
//     callback.onChangeCameraStatus(cameraStatus);
//   }, [cameraStatus, callback]);

//   useEffect(() => {
//     callback.onChangeChatStatus(chatStatus);
//   }, [chatStatus, callback]);

//   return (
//     <ControllBarPresenter
//       type={type}
//       micStatus={micStatus}
//       onChangeMicStatus={onChangeMicStatus}
//       cameraStatus={cameraStatus}
//       onChangeCameraStatus={onChangeCameraStatus}
//       chatStatus={chatStatus}
//       onChangeChatStatus={onChangeChatStatus}
//     />
//   );
// };

// interface IPresenterProps {
//   type: Type;
//   micStatus: boolean;
//   onChangeMicStatus: () => void;
//   cameraStatus: boolean;
//   onChangeCameraStatus: () => void;
//   chatStatus: boolean;
//   onChangeChatStatus: () => void;
// }

// export const ControllBarPresenter: FC<IPresenterProps> = ({
//   type,
//   micStatus,
//   onChangeMicStatus,
//   cameraStatus,
//   onChangeCameraStatus,
//   chatStatus,
//   onChangeChatStatus,
// }) => {
//   const [gameSetting, setGameSetting] = useState<boolean>();
//   //   const [userId, setUserId] = useState<number>();
//   //   const [meetingRoomId, setMeetingRoomId] = useState<string>('SessionA');
//   //   //   const userInfoList = userListData;
//   //   const [showSnack, setShowSnack] = useState(0);
//   //   const [snackMessage, setSnackMessage] = useState('');

//   const navigate = useNavigate();
//   //   //   const exit = () => {
//   //     AvatimeApi.getInstance().postLeaveMeeting(
//   //       {
//   //         user_id: userId,
//   //         meetingroom_id: meetingRoomId,
//   //       },
//   //       {
//   //         navigate,
//   //       }
//   //     );
//   //     navigate('/main', { replace: true });
//   //   };

//   const onClickGameSetting = () => {
//     setGameSetting(!gameSetting);
//   };

//   const onClickExit = () => {
//     navigate('/lobby');
//   };
//   return (
//     <div className='w-full flex justify-center'>
//       <div className='bottom-3 flex flex-wrap gap-3 justify-center items-center'>
//         <button
//           className={` w-16 h-16 rounded-full p-3 ${micStatus ? ' bg-[#D3D3D3]' : 'bg-[#FF7B7B]'}`}
//           onClick={onChangeMicStatus}
//         >
//           {micStatus ? (
//             <FontAwesomeIcon icon={faMicrophone} color={'black'} fontSize={`2rem`} />
//           ) : (
//             <FontAwesomeIcon icon={faMicrophoneSlash} color={'white'} fontSize={`2rem`} />
//           )}
//         </button>
//         <button
//           className={` w-16 h-16 rounded-full p-3 ${
//             cameraStatus ? ' bg-[#D3D3D3]' : 'bg-[#FF7B7B]'
//           }`}
//           onClick={onChangeCameraStatus}
//         >
//           {cameraStatus ? (
//             <FontAwesomeIcon icon={faVideo} color={'black'} fontSize={`2rem`} />
//           ) : (
//             <FontAwesomeIcon icon={faVideoSlash} color={'white'} fontSize={`2rem`} />
//           )}
//         </button>
//         <button
//           className={` w-16 h-16 rounded-full p-3 ${chatStatus ? ' bg-[#D3D3D3]' : 'bg-[#FF7B7B]'}`}
//           onClick={onChangeChatStatus}
//         >
//           {chatStatus ? (
//             <FontAwesomeIcon icon={faComment} color={'black'} fontSize={`2rem`} />
//           ) : (
//             <FontAwesomeIcon icon={faCommentSlash} color={'white'} fontSize={`2rem`} />
//           )}
//         </button>
//         {type === 'master' && (
//           <button
//             className={` w-16 h-16 rounded-full p-3 ${
//               gameSetting ? ' bg-[#D3D3D3]' : 'bg-[#FF7B7B]'
//             }`}
//             onClick={onClickGameSetting}
//           >
//             {gameSetting ? (
//               <FontAwesomeIcon
//                 icon={faGear}
//                 color={'black'}
//                 fontSize={`2rem`}
//                 className=' transition-transform'
//               />
//             ) : (
//               <FontAwesomeIcon
//                 icon={faGear}
//                 color={'white'}
//                 fontSize={`2rem`}
//                 rotation={90}
//                 className=' transition-transform'
//               />
//             )}
//           </button>
//         )}

//         <button className={` w-16 h-16 rounded-full p-3 bg-red-500`} onClick={onClickExit}>
//           <FontAwesomeIcon icon={faDoorOpen} color={'white'} fontSize={`2rem`} />
//         </button>
//         {type === 'master' ? (
//           <button
//             className={` whitespace-nowrap w-fit h-16 rounded p-3 bg-[#112364] text-white font-bold text-lg`}
//             onClick={() => {}}
//           >
//             시작하기
//           </button>
//         ) : (
//           <button
//             className={` whitespace-nowrap w-fit h-16 rounded p-3 bg-[#112364] text-white font-bold text-lg`}
//             onClick={() => {}}
//           >
//             준비하기
//           </button>
//         )}
//       </div>

//       {/* <AlertSnackbar
//         open={showSnack !== 0}
//         onClose={() => setShowSnack(0)}
//         message={snackMessage}
//         type='confirm'
//         onSuccess={showSnack === 1 ? pick : exit}
//         alertColor='warning'
//       /> */}

//       {/* <AlertSnackbar
//         open={showAlert}
//         onClose={() => setShowAlert(false)}
//         message={alertMessage}
//         alertColor='error'
//         type='alert'
//       /> */}
//     </div>
//   );
// };
