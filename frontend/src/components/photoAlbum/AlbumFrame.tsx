interface IAlbumProps {
  contentNumber: number;
  DisplayedImages: string[];
  BackgroundURL: string;
}

export default function AlbumFrame({ contentNumber, DisplayedImages, BackgroundURL }: IAlbumProps) {
  let lefts: string[];
  let tops: string[];
  let rotations: string[];

  switch (contentNumber) {
    case 1:
      lefts = ['210px', '210px', '620px', '620px'];
      tops = ['50px', '390px', '50px', '390px'];
      rotations = ['0deg', '0deg', '0deg', '0deg'];
      break;
    case 2:
      lefts = ['220px', '60px', '600px', '760px'];
      tops = ['60px', '300px', '60px', '300px'];
      rotations = ['-15deg', '-35deg', '15deg', '35deg'];
      break;
    case 3:
      lefts = ['150px', '150px', '680px', '680px'];
      tops = ['20px', '410px', '20px', '410px'];
      rotations = ['0deg', '0deg', '0deg', '0deg'];
      break;
    case 4:
      lefts = ['40px', '40px', '450px', '450px'];
      tops = ['50px', '390px', '50px', '390px'];
      rotations = ['0deg', '0deg', '0deg', '0deg'];
      break;
    case 5:
      lefts = ['380px', '380px', '790px', '790px'];
      tops = ['50px', '390px', '50px', '390px'];
      rotations = ['0deg', '0deg', '0deg', '0deg'];
      break;
    default:
      lefts = ['210px', '210px', '620px', '620px'];
      tops = ['50px', '390px', '50px', '390px'];
      rotations = ['0deg', '0deg', '0deg', '0deg'];
      break;
  }

  return (
    <div className='flex justify-center items-center'>
      <div
        className='w-4/5 h-screen bg-cover p-4 relative'
        style={{ backgroundImage: `url(${BackgroundURL})` }}
      >
        {DisplayedImages.slice(0, 4).map((image, index) => (
          <div
            key={index}
            style={{
              left: lefts[index],
              top: tops[index],
              transform: `rotate(${rotations[index]})`, // Apply rotation to each image
            }}
            className='absolute'
          >
            <img
              src={image}
              alt={`Image-${index + 1}`}
              className='w-96 h-80 border-2 border-black'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
