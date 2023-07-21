export default function Button({ version }: { version?: number }) {
  let windcss: string = 'rounded w-full  border-2  bg-violet-600  hover:border-indigo-500/100';

  if (version == 1) {
    windcss = 'rounded w-full border-solid border-2 border-indigo-600';
  } else {
  }

  return (
    <div className='flex justify-center'>
      <button type='button' className={windcss}>
        TEST버튼
      </button>
    </div>
  );
}
