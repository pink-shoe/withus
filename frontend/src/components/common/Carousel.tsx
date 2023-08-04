import { useState, useEffect } from 'react';

export default function Carousel({
  autoSlide = true,
  autoSlideInterval = 5000,
  slides,
}: {
  autoSlide?: boolean;
  autoSlideInterval?: number;
  slides: string[];
}) {
  const [curr, setCurr] = useState(0);
  const guide = [
    // 두줄로 하니 비율이 깨져서 다 한줄로만!
    'AI가 여러분의 팔을 인식해요!',
    '여러사람은 동시 인식이 힘들어요!!',
    '팔을 이용해서 제시된 도형을 맞춰요!!!',
    '친구들과의 추억을 저장할 수 있어요!!!!',
  ];

  const goToNextSlide = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(goToNextSlide, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [curr]);

  const onChangeCurr = (index: number) => {
    setCurr(index);
  };

  return (
    <div>
      <p className='flex justify-center font-kdisplay text-2xl p-2 text-black hover:text-[#FF8D8D]'>
        튜토리얼
      </p>
      {/* 이미지 와 설명글 */}
      <div className='border-4 border-[#FF8D8D] rounded-lg w-80 h-68 mx-auto'>
        <div className='flex justify-center'>
          <img src={slides[curr]} className='w-60 h-60 p-2' />
        </div>
        <p className='flex justify-center p-2 font-kdisplay text-xl text-black hover:text-[#FF8D8D]'>
          {guide[curr]}
        </p>
      </div>
      {/* 밑에 버튼 */}
      <div className='flex items-center justify-center gap-2 p-2'>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`transition-all w-5 h-5 rounded-full ${
              curr === i
                ? 'p-2 bg-opacity-100 bg-[#FF8D8D] border-2 border-[#FF8D8D]'
                : 'p-2 bg-opacity-100 bg-white border-spacing-2 border-2 border-[#FF8D8D] hover:bg-[#FF8D8D]'
            }`}
            onClick={() => onChangeCurr(i)}
          />
        ))}
      </div>
    </div>
  );
}
