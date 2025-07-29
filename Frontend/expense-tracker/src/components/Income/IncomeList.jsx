import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Layout/cards/TransactionInfoCard'
import moment from 'moment'


const IncomeList = ({transactions,onDelete,onDownload}) => {
  return (
    <div className='card'>
        <div className='flex justify-between items-center'>
            <h5 className='text-lg'>Income Sources</h5>

            <button className='card-btn' onClick={onDownload}>
                Download<LuDownload className='text-base'/>
            </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2'>
            {transactions?.map((income)=>(
                <TransactionInfoCard 
                key={income._id} 
                title={income.source}
                icon={income.icon}
                date={moment (income.date).format("DD-MM-YYYY")}
                amount={income.amount}
                type="income"
                onDelete={()=>onDelete(income._id)}
                />
            ))}
        </div>
    </div>
  )
}

export default IncomeList