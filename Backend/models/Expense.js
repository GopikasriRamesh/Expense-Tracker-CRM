const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    amount: { type: Number, required: true },
    icon: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);