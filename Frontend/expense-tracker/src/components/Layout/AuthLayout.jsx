import React from 'react'
import c1 from "../../assets/images/c1.png";
import c2 from "../../assets/images/c2.png";
import {LuTrendingUp 
} from 'react-icons/lu';

const AuthLayout = ({children}) => {
  return <div className='flex'>
    <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
        <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
        {children}
    </div>

    <div className='hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative '>
    <div className='w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-8'></div>
    <div className='w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-65 -right-8'></div>
    <div className='w-48 h-48 rounded-[40px] bg-purple-500 absolute -bottom-7 -left-8'></div>
    
    <div className='grid grid-cols-1 z-20 '>
      <StatsInfoCard
      icon={<LuTrendingUp />}
      label="Track Your Income & Expenses"
      value="430,000"
      color="bg-purple-600"
      />
    </div>
    <img src={c2} alt="card 1" className='w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15'/>

    </div>

  </div>
}

export default AuthLayout

const StatsInfoCard = ({icon, label, value, color}) => {
  return <div className='flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/20 border border-gray-200 items-center z-10'>
    <div className={`w-12 h-12 flex justify-center items-center text-[26px] text-white ${color} rounded-full drop-shadow-2xl`}>
      { icon }
    </div>
    <div>
      <h6 className='text-xs text-gray-500'>  { label }</h6>
      <span className='text-[20px]'>${value}</span>
    </div>
  </div>
}