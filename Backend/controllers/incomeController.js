
const xlsx = require('xlsx');
const Income= require('../models/Income');

exports.addIncome=async (req, res) => {
    const userId= req.user._id; // Get user ID from authenticated user
    try{
        const { amount, icon, source, date } = req.body;
        if (!amount || !icon || !source) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const income = new Income({
            userId,
            amount,
            icon,
            source,
            date: date ? new Date(date) : new Date(), // Use provided date or current date
        });

        await income.save();
        res.status(201).json({ message: 'Income added successfully', income });
    }catch (error) {
        console.error('Error adding income:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }   
}

exports.getAllIncome = async (req, res) => {
    const userId = req.user._id; // Get user ID from authenticated user
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 }); // Sort by date descending
        res.status(200).json(incomes);
    } catch (error) {
        console.error('Error fetching incomes:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        console.error('Error deleting income:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }       
}   

exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user._id; // Get user ID from authenticated user
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        if (incomes.length === 0) {
            return res.status(404).json({ message: 'No income records found' });
        }

        const data = incomes.map(income => ({
            Amount: income.amount,
            Icon: income.icon,
            Source: income.source,
            Date: income.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        }));

        const wb= xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx .utils.book_append_sheet(wb, ws, 'Incomes');
        xlsx .writeFile(wb, 'incomes.xlsx');
        res.download('incomes.xlsx', 'incomes.xlsx', (err) => {
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