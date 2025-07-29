import React from 'react'
import CustomPieChart from '../charts/CustomPieChart'

const COLORS=["#875CF5",'#FA2C37','#FF6900']
const FinanceOverview = ({totalIncome,totalExpense,totalBalance}) => {
    const balanceData = [{name:"Income",value:totalIncome},{name:"Expense",value:totalExpense},{name:"Balance",value:totalBalance}];

  return (
    <div className='card'>
        <div className='flex justify-between items-center'>
            <h5 className='text-lg'>Financial Overview</h5>
    </div>
    <CustomPieChart data={balanceData}
    label="Total Balance"
    totalAmount={`$${totalBalance}`}
    colors={COLORS}
    showTextAnchor
    /></div>
  )
}

export default FinanceOverview