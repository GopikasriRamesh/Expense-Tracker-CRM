const Income = require('../models/Income');
const Expense = require('../models/Expense');
const { Types } = require('mongoose');

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    // Convert to ObjectId correctly
    const userObjectId = new Types.ObjectId(userId);

    // Get total income
    const totalIncomeAgg = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, totalIncome: { $sum: '$amount' } } }
    ]);

    // Get total expense
    const totalExpenseAgg = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, totalExpense: { $sum: '$amount' } } }
    ]);

    const totalIncome = totalIncomeAgg[0]?.totalIncome || 0;
    const totalExpense = totalExpenseAgg[0]?.totalExpense || 0;

    // Last 60 days income
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(new Date().setDate(new Date().getDate() - 60)) },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, txn) => sum + txn.amount, 0
    );

    // Last 30 days expense
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) },
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, txn) => sum + txn.amount, 0
    );

    // Combine recent transactions from income and expense
    const incomeTxns = await Income.find({ userId }).sort({ date: -1 }).limit(5);
    const expenseTxns = await Expense.find({ userId }).sort({ date: -1 }).limit(5);

    const lastTransactions = [
      ...incomeTxns.map(txn => ({
        ...txn.toObject(),
        type: 'income',
      })),
      ...expenseTxns.map(txn => ({
        ...txn.toObject(),
        type: 'expense',
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Response
    res.status(200).json({
      totalBalance: totalIncome - totalExpense,
      totalIncome,
      totalExpense,
      last60DaysIncome: {
        transactions: last60DaysIncomeTransactions,
        total: incomeLast60Days,
      },
      last30DaysExpense: {
        transactions: last30DaysExpenseTransactions,
        total: expenseLast30Days,
      },
      recentTransactions: lastTransactions.slice(0, 5),
    });

  } catch (error) {
    console.error('❌ Error fetching dashboard data:', error);
    res.status(500).json({
      message: 'Server error while fetching dashboard data',
      error: error.message,
    });
  }
};
