// 셀렉트 박스
import React, { useEffect, useState } from 'react';

// selectSetting SettingModal의 selectMode와 selectRound에 해당
interface ISelectBoxProps {
  selectSetting: any;
  options: {
    value: string | number;
    name: string;
  }[];
}

export default function SelectBox({ selectSetting, options }: ISelectBoxProps) {
  const [setting, setSetting] = useState('');

  // 선택한 옵션으로 세팅이 변경되는 기능
  const onChangeSetting = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSetting(event.target.value);
  };

  // onChangeSetting 안에 console.log를 작성했을 때는 한 템포 늦었음
  // useEffect를 사용함으로써, 눌렀을 때 바로 바뀐 selectContent가 console 창에 나타났음
  useEffect(() => {
    selectSetting(setting);
    console.log(setting);
  }, [setting]);

  return (
    <select
      onChange={onChangeSetting}
      className='p-2 border-2 w-[18rem] border-[#FF8DA3] focus:outline-none focus:border-[#fa6d6d] focus:ring-1 focus:ring-[#fa6d6d] rounded-md font-medium text-2xl text-center text-[#514148] font-kdisplay'
    >
      {options.map((option: any) => (
        <option className='font-medium text-xl' key={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
