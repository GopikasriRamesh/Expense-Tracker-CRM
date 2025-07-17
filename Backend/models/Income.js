const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true }, // Reference to User model
    amount: { type: Number, required: true },
    icon: { type: String, required: true },
    source:{type: String, required: true },
    date: { type: Date, default: Date.now },}, {timestamps: true });

module.exports = mongoose.model('Income', incomeSchema);