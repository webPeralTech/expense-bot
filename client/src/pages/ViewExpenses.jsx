import { useState, useEffect } from 'react'
import { getAllExpenses } from '../services/api'
import './ViewExpenses.css'

const ViewExpenses = () => {
  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [amountFilter, setAmountFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchTransactions()
  }, [])

  useEffect(() => {
    filterTransactions()
  }, [transactions, searchTerm, amountFilter, dateFilter, typeFilter])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const data = await getAllExpenses()
      setTransactions(data)
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const filterTransactions = () => {
    let filtered = [...transactions]

    // Search by description
    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.note.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by amount
    if (amountFilter) {
      const amount = parseFloat(amountFilter)
      if (!isNaN(amount)) {
        filtered = filtered.filter(transaction => transaction.amount >= amount)
      }
    }

    // Filter by date
    if (dateFilter) {
      const filterDate = new Date(dateFilter)
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.date)
        return transactionDate.toDateString() === filterDate.toDateString()
      })
    }

    // Filter by type
    if (typeFilter) {
      filtered = filtered.filter(transaction => transaction.type === typeFilter)
    }

    setFilteredTransactions(filtered)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setAmountFilter('')
    setDateFilter('')
    setTypeFilter('')
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const getTotalIncome = () => {
    return filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, transaction) => sum + transaction.amount, 0)
  }

  const getTotalExpenses = () => {
    return filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, transaction) => sum + transaction.amount, 0)
  }

  const getNetAmount = () => {
    return getTotalIncome() - getTotalExpenses()
  }

  const getRecentTransactions = () => {
    return filteredTransactions.slice(0, 5)
  }

  if (loading) {
    return (
      <div className="view-expenses">
        <div className="page-header">
          <h1>📊 Financial Dashboard</h1>
          <p>Track your income and expenses</p>
        </div>
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading transactions...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="view-expenses">
        <div className="page-header">
          <h1>📊 Financial Dashboard</h1>
          <p>Track your income and expenses</p>
        </div>
        <div className="error-message">
          <p>{error}</p>
          <button className="btn" onClick={fetchTransactions}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="view-expenses">
      <div className="page-header">
        <h1>📊 Financial Dashboard</h1>
        <p>Track your income and expenses</p>
      </div>

      {transactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No transactions yet</h3>
          <p>Start adding income and expenses to see them here!</p>
        </div>
      ) : (
        <div className="dashboard-content">
          {/* Search and Filters */}
          <div className="search-section">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button
                className="btn btn-secondary filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Hide' : 'Show'} Filters
              </button>
            </div>

            {showFilters && (
              <div className="filters-panel">
                <div className="filter-group">
                  <label>Minimum Amount (₹)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={amountFilter}
                    onChange={(e) => setAmountFilter(e.target.value)}
                    className="filter-input"
                  />
                </div>
                <div className="filter-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="filter-input"
                  />
                </div>
                <div className="filter-group">
                  <label>Type</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="filter-input"
                  >
                    <option value="">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <button
                  className="btn btn-secondary clear-filters"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Results Summary */}
            <div className="results-summary">
              <span>
                Showing {filteredTransactions.length} of {transactions.length} transactions
              </span>
              {(searchTerm || amountFilter || dateFilter || typeFilter) && (
                <span className="active-filters">
                  (Filtered)
                </span>
              )}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="summary-card income-card">
              <div className="card-icon">💰</div>
              <div className="card-content">
                <h3>Total Income</h3>
                <div className="card-amount">{formatAmount(getTotalIncome())}</div>
              </div>
            </div>
            
            <div className="summary-card expense-card">
              <div className="card-icon">💸</div>
              <div className="card-content">
                <h3>Total Expenses</h3>
                <div className="card-amount">{formatAmount(getTotalExpenses())}</div>
              </div>
            </div>
            
            <div className="summary-card net-card">
              <div className="card-icon">📊</div>
              <div className="card-content">
                <h3>Net Amount</h3>
                <div className={`card-amount ${getNetAmount() >= 0 ? 'positive' : 'negative'}`}>
                  {formatAmount(getNetAmount())}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          {filteredTransactions.length > 0 && (
            <div className="recent-expenses">
              <h2>Recent Transactions</h2>
              <div className="expenses-grid">
                {getRecentTransactions().map((transaction) => (
                  <div key={transaction._id} className={`expense-card ${transaction.type}-card`}>
                    <div className="expense-header">
                      <div className="expense-note">{transaction.note}</div>
                      <div className={`expense-amount ${transaction.type}-amount`}>
                        {formatAmount(transaction.amount)}
                      </div>
                    </div>
                    <div className="expense-date">
                      {formatDate(transaction.date)}
                    </div>
                    <div className="transaction-type">
                      {transaction.type === 'income' ? '💰 Income' : '💸 Expense'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Transactions List */}
          <div className="all-expenses">
            <h2>All Transactions</h2>
            {filteredTransactions.length > 0 ? (
              <div className="expenses-list">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction._id} className={`expense-item ${transaction.type}-item`}>
                    <div className="expense-header">
                      <div className="expense-note">{transaction.note}</div>
                      <div className={`expense-amount ${transaction.type}-amount`}>
                        {formatAmount(transaction.amount)}
                      </div>
                    </div>
                    <div className="expense-date">
                      {formatDate(transaction.date)}
                    </div>
                    <div className="transaction-type">
                      {transaction.type === 'income' ? '💰 Income' : '💸 Expense'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>No transactions match your search criteria</p>
                <button className="btn btn-secondary" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewExpenses 