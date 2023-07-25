// 모달에서 사용할 시작 버튼

export default function GameStart(props: any) {
  const sendContent = () => {
    console.log(props.myMood, props.myRound)
  }

  return (
    <button onClick={sendContent} className='bg-violet-800 hover:bg-indigo-950 w-60 h-10 rounded-md me-1 font-semibold text-lg text-white'>시작</button>
  )
}