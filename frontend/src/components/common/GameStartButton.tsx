// 시작 버튼
export default function GameStartButton({ onClickStartBtn }: any) {
  return (
    <div className='flex justify-center'>
      <button
        onClick={onClickStartBtn}
        className='bg-violet-800 hover:bg-indigo-950 w-72 h-12 rounded-md font-semibold text-lg text-white'
      >
        시작
      </button>
    </div>
  );
}
