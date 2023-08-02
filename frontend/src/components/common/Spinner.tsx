import img from '../../assets/8.gif';

export default function Spinner() {
  return (
    <div>
      <img src={img} alt='Loading...' />
      <h1> 로딩 중입니다. </h1>
    </div>
  );
}
