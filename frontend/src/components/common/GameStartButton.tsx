// 시작 버튼
export default function GameStartButton({ onClickStartBtn }: any) {
  return (
    <div className='flex justify-center'>
      <button
        onClick={onClickStartBtn}
        className='bg-[#FF8DA3] hover:bg-red-500 w-[415px] me-2 mt-1 h-12 rounded-md font-medium text-2xl text-white'
      >
        시작
      </button>
    </div>
  );
}
