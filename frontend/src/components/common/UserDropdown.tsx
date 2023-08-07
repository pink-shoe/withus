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
      <div onClick={() => setOpenDropdown(!openDropdown)}>
        <div className='border-white border-2 rounded-full p-1 text-white hover:text-[#FA8D8D] hover:border-[#FA8D8D]'>
          <User />
        </div>
      </div>
      <div>
      {openDropdown && children}

      </div>
    </div>
  );
}