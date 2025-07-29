import React, { useEffect } from 'react'
import {LuPlus} from 'react-icons/lu'
import { prepareExpenseLineChartData } from '../../utils/helper'
import CustomLineChart from '../Layout/charts/CustomLineChart'
import { useState } from 'react'


const ExpenseOverview = ({transactions,onExpenseIncome}) => {
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
      const result = prepareExpenseLineChartData(transactions);
      setChartData(result);
      return () => {};
    }, [transactions]);
  return <div className='card'>
    <div className='flex items-center justify-between'>
        <div className=''>
            <h5 className='text-lg'>Expense Overview</h5>
            <p className=''>
                Track Your spending over time and gain insights your money goes
            </p>
        </div>
        <button className='add-btn' onClick={onExpenseIncome}>
            <LuPlus className='text-lg'/>
            Add Expense
        </button>
    </div>
    <div className='mt-10'>
        <CustomLineChart chartData={chartData}/>
    </div>
  </div>
}

export default ExpenseOverview