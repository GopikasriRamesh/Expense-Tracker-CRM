import React, { useEffect } from 'react'
import DashboardLayout from '../../components/Layout/DashboardLayout';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import ExpenseList from '../../components/Expense/ExpenseList';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import Modal from '../../components/Modal';
import DeleteAlert from '../../components/DeleteAlert'; // ✅ Import this
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { toast } from 'react-hot-toast';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useState } from 'react';

const Expense = () => {
  useUserAuth();

  const[expenseData, setExpenseData] = useState([]);
  const[loading,setLoading] = useState(false);
  const[openDeleteAlert, setOpenDeleteAlert] = useState({show:false,data:null});
  const[openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_EXPENSE);
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load expense data");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("Category is required");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number > 0");
      return;
    }

    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add expense");
    }
  };
  
   // ✅ Delete expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete expense");
    }
  };

  // ✅ Download expese details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Expense Excel downloaded");
    } catch (err) {
      console.error(err);
      toast.error("expense details Download failed ");
    }
  };
  useEffect(() => {
    fetchExpenseDetails();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'></div>
      <div className='grid grid-cols-1 gap-6'>
        <div className=''>
          <ExpenseOverview transactions={expenseData} 
          onExpenseIncome={()=>setOpenAddExpenseModal(true)} />
        </div>

        <ExpenseList
          transactions={expenseData}
          onDelete={(expense) => setOpenDeleteAlert({ show: true, data: expense })}
          onDownload={handleDownloadExpenseDetails}
        />
        </div>

        <Modal
        isOpen={openAddExpenseModal}
        onClose={() => setOpenAddExpenseModal(false)}
        title="Add Expense"
      >
        <AddExpenseForm onAddExpense={handleAddExpense} />
      </Modal>

              <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>


    </DashboardLayout>
  )
}

export default Expense