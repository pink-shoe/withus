import React, { useEffect, useState } from "react";

export default function SelectMood(props : any) {
  const [selectMood, setSelectMood] = useState('');

  const saveMood = (event : any) => {
    setSelectMood(event.target.value);
  }

  // saveMood 안에 console.log를 작성했을 때는 한 템포 늦었음
  // useEffect를 사용함으로써, 눌렀을 때 바로 바뀐 selectMood가 console 창에 나타났음
  useEffect(() => {
    console.log(selectMood);
  }, [selectMood]);

  return (
    <select onChange={saveMood} className='p-2 border-2 w-[17.5rem] border-blue-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-md font-semibold text-lg text-center'>
      {props.options.map((option : any) => (
        <option className='font-semibold text-lg' key={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  )
}