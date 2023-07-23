import React, { useState } from "react"

export default function SelectRound(props) {
  const [selectRound, setSelectRound] = useState('');

  const saveRound = (event) => {
    setSelectRound(event.target.value)
    console.log(selectRound)
  }

  return (
    <select onChange={saveRound} className='p-2 border-2 w-[17.5rem] border-blue-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-md font-semibold text-lg text-center'>
      {props.options.map((option) => (
        <option className='font-semibold text-lg' key={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  )
}