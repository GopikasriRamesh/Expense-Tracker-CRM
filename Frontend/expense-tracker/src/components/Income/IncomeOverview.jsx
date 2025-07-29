import React from 'react'
import {LuPlus} from 'react-icons/lu'
import Custombarchart from '../Layout/charts/Custombarchart'
import { prepareIncomeBarChartData } from '../../utils/helper'
import { useEffect, useState } from 'react'

const IncomeOverview = ({transactions,onAddIncome}) => {
     const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
    return () => {};
  }, [transactions]);

  return (
    <div>
      <div className='card'>
        <div className='flex items-center justify-between'>
          <h5 className='text-lg'>Income Overview</h5>
          <p className='text-xs text-gray-400 mt-0.5'>
            Track Your Earnings over time and analyse your spending patterns.
          </p>
        </div>

        <button className='add-btn' onClick={onAddIncome}>
          <LuPlus className='text-2xl'/>
          Add Income
        </button>
        <div className='mt-10'>
            <CustomBarChart/>
        </div>
      </div>
    </div>
  )
}

export default IncomeOverview