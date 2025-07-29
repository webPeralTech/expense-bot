const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// GET all transactions (reverse chronological order)
router.get('/all', async (req, res) => {
  try {
    const expenses = await Expense.find()
      .sort({ date: -1 })
      .select('note amount type date createdAt');
    
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// POST add new transaction (expense or income)
router.post('/add', async (req, res) => {
  try {
    const { note, amount, type, date } = req.body;
    
    // Validation
    if (!note || !amount) {
      return res.status(400).json({ 
        error: 'Note and amount are required' 
      });
    }
    
    if (amount <= 0) {
      return res.status(400).json({ 
        error: 'Amount must be greater than 0' 
      });
    }

    if (type && !['expense', 'income'].includes(type)) {
      return res.status(400).json({ 
        error: 'Type must be either "expense" or "income"' 
      });
    }
    
    const transaction = new Expense({
      note: note.trim(),
      amount,
      type: type || 'expense',
      date: date ? new Date(date) : new Date()
    });
    
    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ error: 'Failed to add transaction' });
  }
});

// GET monthly summary
router.get('/monthly-summary', async (req, res) => {
  try {
    const { year, month } = req.query;
    const currentDate = new Date();
    const targetYear = year || currentDate.getFullYear();
    const targetMonth = month || currentDate.getMonth() + 1;
    
    const startDate = new Date(targetYear, targetMonth - 1, 1);
    const endDate = new Date(targetYear, targetMonth, 0, 23, 59, 59);
    
    const transactions = await Expense.find({
      date: { $gte: startDate, $lte: endDate }
    });
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    
    const netAmount = totalIncome - totalExpenses;
    
    res.json({
      totalExpenses,
      totalIncome,
      netAmount,
      expenseCount: transactions.filter(t => t.type === 'expense').length,
      incomeCount: transactions.filter(t => t.type === 'income').length,
      totalTransactions: transactions.length,
      month: targetMonth,
      year: targetYear,
      transactions: transactions
    });
  } catch (error) {
    console.error('Error fetching monthly summary:', error);
    res.status(500).json({ error: 'Failed to fetch monthly summary' });
  }
});

module.exports = router; 