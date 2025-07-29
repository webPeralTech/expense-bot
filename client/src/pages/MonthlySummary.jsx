import { useState, useEffect } from 'react'
import { getMonthlySummary } from '../services/api'
import './MonthlySummary.css'

const MonthlySummary = () => {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')

  useEffect(() => {
    fetchSummary()
  }, [selectedMonth])

  const fetchSummary = async () => {
    try {
      setLoading(true)
      const currentDate = new Date()
      const year = currentDate.getFullYear()
      const month = selectedMonth || currentDate.getMonth() + 1
      
      const data = await getMonthlySummary(year, month)
      setSummary(data)
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const getMonthName = (monthNumber) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return months[monthNumber - 1]
  }

  const generateMonthOptions = () => {
    const options = []
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1

    for (let month = 1; month <= 12; month++) {
      const monthName = getMonthName(month)
      const isCurrentMonth = month === currentMonth
      options.push(
        <option key={month} value={month}>
          {monthName} {currentYear} {isCurrentMonth ? '(Current)' : ''}
        </option>
      )
    }
    return options
  }

  if (loading) {
    return (
      <div className="monthly-summary">
        <div className="page-header">
          <h1>📊 Monthly Summary</h1>
          <p>Track your monthly finances</p>
        </div>
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading summary...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="monthly-summary">
        <div className="page-header">
          <h1>📊 Monthly Summary</h1>
          <p>Track your monthly finances</p>
        </div>
        <div className="error-message">
          <p>{error}</p>
          <button className="btn" onClick={fetchSummary}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="monthly-summary">
      <div className="page-header">
        <h1>📊 Monthly Summary</h1>
        <p>Track your monthly finances</p>
      </div>

      <div className="month-selector">
        <label htmlFor="month" className="form-label">Select Month</label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="form-input"
        >
          {generateMonthOptions()}
        </select>
      </div>

      {summary && (
        <div className="summary-content">
          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="summary-card income-card">
              <div className="card-icon">💰</div>
              <div className="card-content">
                <h3>Total Income</h3>
                <div className="card-amount">{formatAmount(summary.totalIncome)}</div>
              </div>
            </div>
            
            <div className="summary-card expense-card">
              <div className="card-icon">💸</div>
              <div className="card-content">
                <h3>Total Expenses</h3>
                <div className="card-amount">{formatAmount(summary.totalExpenses)}</div>
              </div>
            </div>
            
            <div className="summary-card net-card">
              <div className="card-icon">📊</div>
              <div className="card-content">
                <h3>Net Amount</h3>
                <div className={`card-amount ${summary.netAmount >= 0 ? 'positive' : 'negative'}`}>
                  {formatAmount(summary.netAmount)}
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="expense-details">
            <h2>📋 Transaction Details</h2>
            {summary.transactions && summary.transactions.length > 0 ? (
              <div className="expenses-table">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Description</th>
                      <th>Amount (₹)</th>
                      <th>Date</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.transactions.map((transaction, index) => (
                      <tr key={transaction._id} className={`${transaction.type}-row`}>
                        <td>{index + 1}</td>
                        <td>{transaction.note}</td>
                        <td className={`amount-cell ${transaction.type}-amount`}>
                          {formatAmount(transaction.amount)}
                        </td>
                        <td>{new Date(transaction.date).toLocaleDateString('en-IN')}</td>
                        <td className="transaction-type-cell">
                          {transaction.type === 'income' ? '💰 Income' : '💸 Expense'}
                        </td>
                      </tr>
                    ))}
                    <tr className="total-row">
                      <td colSpan="2"><strong>Net Amount</strong></td>
                      <td className={`amount-cell ${summary.netAmount >= 0 ? 'positive' : 'negative'}`}>
                        <strong>{formatAmount(summary.netAmount)}</strong>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-breakdown">
                <p>No transactions found for this month</p>
              </div>
            )}
          </div>

          {/* Financial Summary */}
          <div className="split-info">
            <h2>💡 Financial Summary</h2>
            <div className="split-details">
              <div className="split-item income-item">
                <span>Total Income:</span>
                <span className="split-amount positive">{formatAmount(summary.totalIncome)}</span>
              </div>
              <div className="split-item expense-item">
                <span>Total Expenses:</span>
                <span className="split-amount negative">{formatAmount(summary.totalExpenses)}</span>
              </div>
              <div className="split-item net-item">
                <span>Net Savings:</span>
                <span className={`split-amount ${summary.netAmount >= 0 ? 'positive' : 'negative'}`}>
                  {formatAmount(summary.netAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MonthlySummary 