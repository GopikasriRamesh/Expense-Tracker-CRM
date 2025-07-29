import React from 'react'
import {LuDownload} from 'react-icons/lu'
import TransactionInfoCard from '../Layout/cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseList = ({transactions,ondelete,onDownload}) => {

  return(
    <div className='card'>
        <div className='flex justify-between items-center'>
            <h5 className='text-lg'>All Expenses</h5>

            <button className='card-btn' onClick={onDownload}>
                Download<LuDownload className='text-base'/>
            </button>
    </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>
            {transactions?.map((expense)=>(
                <TransactionInfoCard 
                key={expense._id} 
                title={expense.category}
                icon={expense.icon}
                date={moment (expense.date).format("DD-MM-YYYY")}
                amount={expense.amount}
                type="expense"
                onDelete={()=>ondelete(expense._id)}
                />
            ))}
        </div>
    </div>
  )
}

export default ExpenseList