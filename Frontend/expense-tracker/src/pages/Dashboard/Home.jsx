import React from 'react';
import {useUserAuth} from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { useEffect } from 'react';
import InfoCard from '../../components/Layout/cards/InfoCard';
import RecentTransactions from '../../components/Layout/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Layout/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Layout/Dashboard/ExpenseTransactions';
import Last30DyasExpenses from './Last30DyasExpenses';
import RecentIncome from '../../components/Layout/Dashboard/RecentIncome';
import RecentIncomeWithChart from '../../components/Layout/Dashboard/RecentIncomeWithChart';

import {LuHandCoins,LuWalletMinimal} from 'react-icons/lu';
import {IoMdCard} from 'react-icons/io';
import { addThousandSeparator } from '../../utils/helper';
const Home = () => {
   useUserAuth();
   const naviagte = useNavigate();

   const[dashboardData, setDashboardData] = useState(null);
   const[loading,setloading] = useState(false);

   const fetchDashboarddata=async () =>{
    if(loading) return;
    setloading(true);
    try{
        const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
        if(response.data){
          setDashboardData(response.data);
    
        }
    }catch(err){
        console.log(err);
    }finally{
        setloading(false);
    }
   }

   useEffect(() => {
    fetchDashboarddata();
    return () => {
    }
   }, []);

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <InfoCard
      icon={<IoMdCard/>}
      label="Total Balance"
      value={addThousandSeparator(dashboardData?.totalBalance || 0)}
      color="bg-purple-600"
/>    

<InfoCard
      icon={<LuWalletMinimal/>}
      label="Total Income"
      value={addThousandSeparator(dashboardData?.totalIncome || 0)}
      color="bg-orange-600"
/>    

<InfoCard
      icon={<LuHandCoins/>}
      label="TotalExpense"
      value={addThousandSeparator(dashboardData?.totalExpenses || 0)}
      color="bg-red-500"
/>    
  </div>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
      <RecentTransactions
       transactions={dashboardData?.recentTransactions}
       onSeeMore={()=>naviagte("/expense")}
      />
      
      <FinanceOverview
      totalBalance={dashboardData?.totalBalance || 0}
      totalIncome={dashboardData?.totalIncome || 0}
      totalExpense={dashboardData?.totalExpense || 0}
      />

      <ExpenseTransactions
      transactions={dashboardData?.last30DaysExpenseTransactions?.transactions}
      onSeeMore={()=>naviagte("/expense")}
      />
      
      <Last30DyasExpenses
      data={dashboardData?.last30DaysExpenseTransactions?.transactions}
      />

      <RecentIncomeWithChart
      data={dashboardData?.last60DaysIncomeTransactions?.transactions?.slice(0,4) || []}
      tottalIncome={dashboardData?.totalIncome || 0}
      />

      <RecentIncome
      transactions={dashboardData?.last60DaysIncomeTransactions?.transactions || []}
      onSeeMore={()=>naviagte("/income")}
      />
    </div>
</>
  );
};

export default Home;
