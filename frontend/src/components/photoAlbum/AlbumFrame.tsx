import { getAlbumListApi } from 'apis/albumApi';
import { Save, X } from 'react-feather';
import Modal from '@components/common/Modal';
import { useState } from 'react';
import html2canvas from 'html2canvas';

interface IAlbumProps {
  photoFrameNumber: number;
  DisplayedImages: { imgId: number; imgUrl: string; savedAt: string }[];
  BackgroundURL: string;
  onClickX: any;
  fourCut: boolean;
  setFourCut: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AlbumFrame({
  photoFrameNumber,
  DisplayedImages,
  BackgroundURL,
  onClickX,
  fourCut,
  setFourCut,
}: IAlbumProps) {
  let lefts: string[];
  let tops: string[];
  let rotations: string[];

  const [showModal, setShowModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  const openModal = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSaveImage = () => {
    const modalElement = document.querySelector('.modal') as HTMLElement;

    if (modalElement) {
      html2canvas(modalElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        // 이미지 다운로드 링크 생성
        const a = document.createElement('a');
        a.href = imgData;
        a.download = 'album_image.png'; // 다운로드될 파일 이름 설정
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    }
  };

  switch (photoFrameNumber) {
    case 1:
      lefts = ['180px', '180px', '620px', '620px'];
      tops = ['10px', '310px', '10px', '310px'];
      rotations = ['0deg', '0deg', '0deg', '0deg'];
      break;
    case 2:
      lefts = ['220px', '60px', '560px', '720px'];
      tops = ['40px', '250px', '40px', '250px'];
      rotations = ['-15deg', '-35deg', '15deg', '35deg'];
      break;
    case 3:
      lefts = ['40px', '40px', '420px', '420px'];
      tops = ['10px', '310px', '10px', '310px'];
      rotations = ['0deg', '0deg', '0deg', '0deg'];
      break;
    case 4:
      lefts = ['400px', '400px', '750px', '750px'];
      tops = ['10px', '310px', '10px', '310px'];
      rotations = ['0deg', '0deg', '0deg', '0deg'];
      break;
    case 5:
      lefts = ['40px', '40px', '750px', '750px'];
      tops = ['10px', '310px', '10px', '310px'];
      rotations = ['0deg', '0deg', '0deg', '0deg'];
      break;
    default:
      lefts = ['180px', '180px', '620px', '620px'];
      tops = ['10px', '310px', '10px', '310px'];
      rotations = ['0deg', '0deg', '0deg', '0deg'];
      break;
  }

  return (
    <div className='flex justify-center items-center w-full h-full'>
      <div className='modal w-full h-full '>
        {fourCut ? (
          <div
            className='w-full h-full bg-cover relative'
            style={{ backgroundImage: `url(${BackgroundURL})` }}
          >
            <X
              className='absolute top-0 right-0 cursor-pointer font-edisplay w-9 h-9 text-black hover:text-white transform translate-x-full'
              onClick={() => onClickX(setFourCut(false))}
            />
            <Save
              className='absolute top-0 left-0 cursor-pointer font-edisplay w-9 h-9  text-black hover:text-white transform -translate-x-full'
              onClick={() => handleSaveImage()}
            />
            {DisplayedImages.slice(0, 4).map((image, index) =>
              image ? (
                <div
                  key={index}
                  style={{
                    left: lefts[index],
                    top: tops[index],
                    transform: `rotate(${rotations[index]})`,
                  }}
                  className='absolute'
                >
                  <div className='relative w-80 h-72'>
                    <img
                      src={image.imgUrl}
                      alt={`Image-${index + 1}`}
                      className='w-full h-full object-cover border-8 border-red-300 rounded-xl'
                    />
                  </div>
                </div>
              ) : null
            )}
          </div>
        ) : (
          <div
            className='w-full h-full bg-cover relative'
            style={{ backgroundImage: `url(${BackgroundURL})` }}
          >
            {DisplayedImages.slice(0, 4).map((image, index) =>
              image ? (
                <div
                  key={index}
                  style={{
                    left: lefts[index],
                    top: tops[index],
                    transform: `rotate(${rotations[index]})`,
                  }}
                  className='absolute'
                >
                  <div className='relative w-80 h-72'>
                    <img
                      src={image.imgUrl}
                      alt={`Image-${index + 1}`}
                      className='w-full h-full object-cover border-8 border-red-300 rounded-xl'
                    />
                    <div
                      className='absolute top-1.5 right-2.5 cursor-pointer font-edisplay text-2xl'
                      onClick={() => onClickX(image.imgId)}
                    >
                      X
                    </div>
                    <Save
                      className='absolute top-1.5 left-2.5 cursor-pointer font-edisplay text-2xl'
                      onClick={() => openModal(image.imgUrl)}
                    />
                  </div>
                  <Modal openModal={showModal} closeModal={closeModal} isSettingModal={true}>
                    <div className='flex flex-col items-center'>
                      {/* QR 코드를 표시하는 부분 */}
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?data=${selectedImageUrl}`}
                        alt='QR Code'
                      />

                      {/* 이미지 다운로드 버튼 */}
                      <a
                        href={selectedImageUrl}
                        download={`WITHUS_IMG`}
                        className='mt-4 font-kdisplay text-3xl hover:bg-blue-700 text-white font-bold bg-blue-500 py-2 px-4 rounded'
                      >
                        내 컴퓨터에 이미지 저장
                      </a>
                    </div>
                  </Modal>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}
