export default function SelectBox(props) {
  return (
    <select className='p-2 border-2 w-[17.5rem] border-blue-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-md font-semibold text-lg text-center'>
      {props.options.map((option) => (
        <option className='font-semibold text-lg' value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  )
}