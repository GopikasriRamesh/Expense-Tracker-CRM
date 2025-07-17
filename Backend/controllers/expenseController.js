
const xlsx = require('xlsx');
const Expense= require('../models/Expense');

exports.addExpense=async (req, res) => {
    const userId= req.user._id; // Get user ID from authenticated user
    try{
        const { amount, icon, category, date } = req.body;
        if (!amount || !icon || !category) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const expense = new Expense({
            userId,
            amount,
            icon,
            category,
            date: date ? new Date(date) : new Date(), // Use provided date or current date
        });

        await expense.save();
        res.status(201).json({ message: 'Expense added successfully', expense });
    }catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }   
}

exports.getAllExpense= async (req, res) => {
    const userId = req.user._id; // Get user ID from authenticated user
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 }); // Sort by date descending
        res.status(200).json(expense);
    } catch (error) {
        console.error('Error fetching incomes:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting income:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }       
}   

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user._id; // Get user ID from authenticated user
    try {
        const expense= await Expense.find({ userId }).sort({ date: -1 });
        if (expense.length === 0) {
            return res.status(404).json({ message: 'No income records found' });
        }

        const data = expense.map(expense => ({
            Amount: expense.amount,
            Icon: expense.icon,
            category: expense.category,
            Date: expense.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        }));

        const wb= xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx .utils.book_append_sheet(wb, ws, 'Expenses');
        xlsx .writeFile(wb, 'expenses.xlsx');
        res.download('expenses.xlsx', 'expenses.xlsx', (err) => {
            if (err) {
                console.error('Error downloading Excel file:', err);
                res.status(500).json({ message: 'Error downloading file', error: err.message });
            }
        });
    } catch (error) {
        console.error('Error downloading income Excel:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}