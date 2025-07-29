import React from 'react'
import { getInitials } from'../../../utils/helper';
const charAvathar = ({fullName, width, height, style}) => {
  return (
    <div className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''} flrx items-center justify-center bg-slate-400 rounded-full font-medium text-medium` }>
        {getInitials(fullName || "")}
    </div>
  )
}

export default charAvathar