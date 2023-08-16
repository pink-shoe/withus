import { getAlbumListApi } from 'apis/albumApi';

interface IAlbumProps {
  photoFrameNumber: number;
  DisplayedImages: { imgId: number; imgUrl: string; savedAt: string }[];
  BackgroundURL: string;
  onClickX: any;
}

export default function AlbumFrame({
  photoFrameNumber,
  DisplayedImages,
  BackgroundURL,
  onClickX,
}: IAlbumProps) {
  let lefts: string[];
  let tops: string[];
  let rotations: string[];

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
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
