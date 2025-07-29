const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  note: {
    type: String,
    required: [true, 'Note is required'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  type: {
    type: String,
    enum: ['expense', 'income'],
    default: 'expense',
    required: true
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient querying by date
expenseSchema.index({ date: -1 });
expenseSchema.index({ type: 1 });

module.exports = mongoose.model('Expense', expenseSchema); 