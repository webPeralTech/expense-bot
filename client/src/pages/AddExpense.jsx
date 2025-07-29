import { useState } from 'react'
import { addExpense } from '../services/api'
import './AddExpense.css'

const AddExpense = () => {
  const [formData, setFormData] = useState({
    note: '',
    amount: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.note.trim() || !formData.amount) {
      setMessage('Please fill in all required fields')
      return
    }

    if (parseFloat(formData.amount) <= 0) {
      setMessage('Amount must be greater than 0')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      await addExpense({
        note: formData.note.trim(),
        amount: parseFloat(formData.amount),
        type: formData.type,
        date: formData.date
      })

      setFormData({
        note: '',
        amount: '',
        type: 'expense',
        date: new Date().toISOString().split('T')[0]
      })
      setMessage(`${formData.type === 'income' ? 'Income' : 'Expense'} added successfully! ✅`)
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-expense">
      <div className="page-header">
        <h1>➕ Add Transaction</h1>
        <p>Track your income and expenses</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="type" className="form-label">
              Transaction Type *
            </label>
            <div className="type-selector">
              <label className="type-option">
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={formData.type === 'expense'}
                  onChange={handleChange}
                />
                <span className="type-label expense-type">
                  💸 Expense
                </span>
              </label>
              <label className="type-option">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={formData.type === 'income'}
                  onChange={handleChange}
                />
                <span className="type-label income-type">
                  💰 Income
                </span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="note" className="form-label">
              Description *
            </label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="form-input"
              placeholder={`What was this ${formData.type} for?`}
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount" className="form-label">
              Amount (₹) *
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="form-input"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {message && (
            <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            className={`btn ${formData.type === 'income' ? 'btn-income' : 'btn-expense'}`}
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? 'Adding...' : `Add ${formData.type === 'income' ? 'Income' : 'Expense'}`}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddExpense 