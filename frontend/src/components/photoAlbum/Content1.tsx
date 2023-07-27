interface AlbumProps {
  DisplayedImages: string[];
}

export default function content1({ DisplayedImages }: AlbumProps) {
  // 한 줄에 4개씩 이미지 배치하기 위해 grid 레이아웃 사용
  return (
    <div className='grid grid-rows-4 grid-cols-1 lg:grid-rows-2 lg:grid-cols-2 bg-white m-4 border-2'>
      {DisplayedImages.map((image, index) => (
        <img key={index} src={image} alt={`Image-${index + 1}`} className='w-96 h-96 m-4' />
      ))}
    </div>
  );
}
