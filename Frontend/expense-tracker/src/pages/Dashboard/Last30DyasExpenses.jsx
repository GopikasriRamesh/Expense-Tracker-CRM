import React, { useEffect, useState } from 'react';
import { prepareExpenseBarChartData } from '../../utils/helper';
import Custombarchart from '../../components/Layout/charts/Custombarchart';

const Last30DyasExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data || []);
    setChartData(result);
    return () => {};
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className='flex items-center justify-center'>
        <h5 className='text-lg'>Last 30 Days Expenses</h5>
      </div>
      <Custombarchart data={chartData} />
    </div>
  );
};

export default Last30DyasExpenses;
