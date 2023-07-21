import Carousel from './Carousel';
import img1 from '../../assets/background1.jpg';
import img2 from '../../assets/background2.jpg';
import img3 from '../../assets/background3.jpg';
import img4 from '../../assets/1.gif';
import img5 from '../../assets/2.gif';

export default function MyCarousel() {
  const slides = [img1, img2, img3, img4, img5];
  const guidelines = ['1번째 화면', '2번째 화면', '3번째 화면', '4번째 화면', '5번째 화면'];

  return (
    <div className='relative'>
      <div className='max-w-lg'>
        <Carousel slides={slides} guidelines={guidelines} />
      </div>
    </div>
  );
}
