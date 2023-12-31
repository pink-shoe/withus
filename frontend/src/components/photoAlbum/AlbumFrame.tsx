import { getAlbumListApi } from 'apis/albumApi';
import { Save, X } from 'react-feather';
import Modal from '@components/common/Modal';
import { useState, useEffect } from 'react';
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
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  const openModal = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const tempimages: HTMLImageElement[] = [];

    for (let i = 0; i < DisplayedImages.length; i++) {
      const image = new Image();
      image.src = DisplayedImages[i]?.imgUrl + '?timestamp=' + new Date().getTime();
      image.crossOrigin = 'anonymous';
      tempimages.push(image);
      setImages(tempimages);
    }
  }, [DisplayedImages]);

  const handleSaveImage = async () => {
    const modalElement = document.querySelector('.modal') as HTMLElement;

    if (modalElement) {
      try {
        const canvas = await html2canvas(modalElement, {
          allowTaint: true,
        });

        // Generate a data URL from the canvas
        const dataURL = canvas.toDataURL('image/png');

        // Create a link element for downloading
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = 'album_image.png';

        // Simulate a click on the link to trigger the download
        a.click();
      } catch (error) {
        console.error('Error capturing or saving the image:', error);
      }
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
      <div className='modal w-full h-full'>
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
            {images.slice(0, 4).map((image, index) =>
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
                      src={image.src}
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
                    <X
                      className='absolute top-1.5 right-2.5 cursor-pointer font-edisplay w-6 h-6 text-white hover:text-black'
                      onClick={() => onClickX(image.imgId)}
                    />
                    <Save
                      className='absolute top-1.5 left-2.5 cursor-pointer font-edisplay w-6 h-6 text-white hover:text-black'
                      onClick={() => openModal(image.imgUrl)}
                    />
                  </div>
                </div>
              ) : null
            )}
          </div>
        )}
        <Modal openModal={showModal} isSettingModal={false}>
          <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-90 z-50'>
            <div className='flex flex-col items-center w-96 h-96 bg-white p-2 rounded-lg'>
              <div className='relative flex justify-end'>
                <X
                  onClick={closeModal}
                  className='cursor-pointer w-8 h-8 text-black hover:text-red-100'
                />
              </div>
              {/* 중앙 정렬 */}
              <div className='flex flex-col items-center justify-center h-full'>
                {/* QR 코드를 표시하는 부분 */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?data=${selectedImageUrl}`}
                  alt='QR Code'
                />

                {/* 이미지 다운로드 버튼 */}
                <a
                  href={selectedImageUrl}
                  download={`WITHUS_IMG`}
                  className='mt-4 font-kdisplay text-2xl hover:bg-blue-700 text-white font-bold bg-blue-500 py-2 px-4 rounded'
                >
                  내 컴퓨터에 이미지 저장
                </a>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
