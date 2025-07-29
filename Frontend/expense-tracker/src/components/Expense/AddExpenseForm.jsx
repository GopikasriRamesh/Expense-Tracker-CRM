import React from 'react'
import Input from "../Layout/Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
import { Emoji } from 'emoji-picker-react';

const AddExpenseForm = ({onAddExpense}) => {
    const[income, setIncome] = useState({
        category:"",
        amount:"",
        date:"",
        icon:"",
    });

    const handleChange=(key,value)=>setIncome({...income,[key]:value});

  return <div>
    <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon)=>handleChange('icon',selectedIcon)}
        />

    <Input
        value={income.category}
        onChange={({target})=>handleChange('category',target.value)}
        label="Category"
        plcaeholder="Enter category"
        type="text"
        />
        <Input
        value={income.amount}
        onChange={({target})=>handleChange('amount',target.value)}
        label="Amount"
        plcaeholder="Enter amount"
        type="number"
        />
        <Input
        value={income.date}
        onChange={({target})=>handleChange('date',target.value)}
        label="Date"
        plcaeholder="Enter date"
        type="date"
        />

        <div className='flex justify-end mt-6'>
            <button className='add-btn add-btn-fill' onClick={onAddExpense}>Add Expense</button>
        </div>
  </div>
}

export default AddExpenseForm