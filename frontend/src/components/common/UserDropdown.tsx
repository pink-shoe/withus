import { useState } from "react";
import React from 'react';
import { User } from 'react-feather';

interface IUserDropdownProps {
  children: React.ReactNode;
}

export default function UserDropdown({children}: IUserDropdownProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <div>
      <div onClick={() => setOpenDropdown(!openDropdown)} className='flex justify-end'>
        <div className='border-white border-2 font-bold rounded-full p-1 me-1 text-white hover:bg-white hover:text-[#FA8D8D] hover:border-[#FA8D8D]'>
          <User size='30' />
        </div>
      </div>
      <div>
      {openDropdown && children}

      </div>
    </div>
  );
}