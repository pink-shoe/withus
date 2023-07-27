interface AlbumProps {
  DisplayedImages: string[];
  BackgroundURL: string;
}

export default function content1({ DisplayedImages, BackgroundURL }: AlbumProps) {
  // 한 줄에 4개씩 이미지 배치하기 위해 grid 레이아웃 사용
  return (
    <div className='flex justify-center items-center'>
      <div
        className='grid grid-rows-4 m-4 grid-cols-1 lg:grid-rows-2 lg:grid-cols-2 w-4/5 h-screen bg-cover'
        style={{ backgroundImage: `url(${BackgroundURL})` }}
      >
        {DisplayedImages.map((image, index) => (
          <div key={index} className='flex justify-center items-center w-full h-full m-2'>
            <img
              src={image}
              alt={`${index + 1}번째 사진`}
              className='w-96 h-80 border-2 border-black'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
