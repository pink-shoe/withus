import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

export default function Carousel({
  autoSlide = false,
  autoSlideInterval = 3000,
  slides,
  guidelines,
}: {
  autoSlide?: boolean;
  autoSlideInterval?: number;
  slides: string[];
  guidelines: string[];
}) {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className='overflow-hidden relative'>
      <div
        className='flex transition-transform ease-out duration-500'
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((img, index) => (
          <img key={index} src={img} alt='' />
        ))}
      </div>
      <div className='absolute inset-0 flex items-center justify-between p-4'>
        <button
          onClick={prev}
          className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={next}
          className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'
        >
          <ChevronRight size={40} />
        </button>
      </div>

      <div className='absolute bottom-4 right-0 left-0'>
        <div className='flex items-center justify-center gap-2'>
          {slides.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-3 h-3 bg-white rounded-full${
                curr === i ? 'p-2' : 'bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>
      <div className='bg-neutral-800 text-neutral-50 dark:bg-transparent absolute bottom-12 left-0 right-0 text-center'>
        <p>{guidelines[curr]}</p>
      </div>
    </div>
  );
}
