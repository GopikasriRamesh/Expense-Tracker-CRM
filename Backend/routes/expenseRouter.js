const express = require('express');
const{
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel,
}= require('../controllers/expenseController');
const { protect } = require('../middlewares/authMiddleware');
const { route } = require('./authRoutes');
const { get } = require('mongoose');

const router = express.Router();

router.post('/add', protect, addExpense);
router.get('/all', protect, getAllExpense);
router.delete('/:id', protect, deleteExpense);
router.get('/downloadexcel', protect, downloadExpenseExcel);

module.exports = router;