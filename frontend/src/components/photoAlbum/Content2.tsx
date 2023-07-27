interface AlbumProps {
  DisplayedImages: string[];

  BackgroundURL: string;
}

export default function Content2({ DisplayedImages, BackgroundURL }: AlbumProps) {
  const lefts = ['220px', '60px', '600px', '760px'];

  const tops = ['60px', '300px', '60px', '300px'];
  const rotations = ['-15deg', '-35deg', '15deg', '35deg']; // Custom rotation angles for each image

  return (
    <div className='flex justify-center items-center'>
      <div
        className='w-4/5 h-screen bg-cover m-4 relative'
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
