import React from 'react';

interface IModalProps {
  children: any;
  onClose: () => void;
}

function Modal({ children, onClose }: IModalProps) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='fixed inset-0 bg-black opacity-50'></div>
      <div className='bg-white p-4 rounded-md shadow-lg z-10'>
        {children}
        <button
          className='mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
