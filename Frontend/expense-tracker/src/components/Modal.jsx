import React from 'react'

const Modal = ({children, onClose, isOpen, title}) => {

       if (!isOpen) return null
       
  return <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full'>
    <div className='realtive p-4 w-full max-w-2xl max-h-full'>
        <div className='relative bg-white rounded-lg shadow-sm dark:bg-gray-700 '>

            <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200'>
                <h3 className='text-lg font-medium text-gray-900 dark:text-white'>{title}</h3>
            </div>

            <button
            type='button'
            onClick={onClose}
            className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  w-8 h-8 p-1.5 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer '   
            >
              <svg
              className='w-3 h-3'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 14'
              >
                <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                />
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>

            
        </div>
        <div className='p-4 md:p-5 space-y-4'>
            {children}
        </div>
    </div>
  </div>
}

export default Modal