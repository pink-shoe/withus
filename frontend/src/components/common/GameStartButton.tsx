// 모달에서 사용할 시작 버튼

export default function GameStartButton(props: any) {
  const sendContent = () => {
    console.log(props.myMode, props.myRound)
  }

  return (
    <button onClick={sendContent} className='bg-violet-800 hover:bg-indigo-950 w-72 h-12 rounded-md font-semibold text-lg text-white'>시작</button>
  )
}