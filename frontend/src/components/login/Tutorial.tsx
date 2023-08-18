import Carousel from '@components/common/Carousel';
import img1 from '../../assets/Timg1.gif';
import img2 from '../../assets/Timg2.gif';
import img3 from '../../assets/Timg3.gif';
import img4 from '../../assets/Timg4.gif';
import Container from '../common/Container';

export default function Tutorial() {
  const slides = [img1, img2, img3, img4];

  return (
    <Container>
      <div className='flex justify-center relative'>
        <div className='w-96 h-auto m-2'>
          <Carousel slides={slides} />
        </div>
      </div>
    </Container>
  );
}
