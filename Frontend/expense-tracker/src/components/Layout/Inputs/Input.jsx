import React ,{useState} from 'react'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa'; 

const Input = ({value,onChange,placeholder,label,type}) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleshowPassword = () => {
        setShowPassword(!showPassword);
      };
  return (
    <div>
        <label className='text-[13px] text-slate-800'>{label}</label>

        <div className='input-box'>
            <input type={type==='password' ? showPassword ? 'text' : 'password' : type} value={value} onChange={(e)=>onChange(e)} placeholder={placeholder}
            className='w-full bg-transparent outline-none' />
            {type === 'password' && (
                <>
                {showPassword ? (
                        <FaRegEye size={22} className='text-slate-500 cursor-pointer' onClick={()=>toggleshowPassword()} />
                ) : (   
                    <FaRegEyeSlash size={22} className='text-purple-600 cursor-pointer' onClick={()=>toggleshowPassword()} />
                        
                )}  
                </>
            )}
        </div>
    </div>
  )
}

export default Input