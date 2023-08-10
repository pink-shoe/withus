// 시작 버튼
export type buttonType = 'START' | 'SAVE';

interface IGameStartButtonProps {
  onClickStartBtn: any;
  buttonType: buttonType;
}

export default function GameStartButton({ onClickStartBtn, buttonType }: IGameStartButtonProps) {
  return (
    <div className='flex justify-center'>
      <button
        onClick={onClickStartBtn}
        className='bg-[#FF8DA3] hover:bg-red-500 w-72 h-12 rounded-md font-medium text-2xl text-white'
      >
        {buttonType === 'START' ? '시작' : '저장'}
      </button>
    </div>
  );
}
