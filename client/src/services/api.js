import axios from 'axios'

const API_BASE_URL = /* import.meta.env.PROD ? '/api' : */ 'https://expense-bot-3g8s.onrender.com/api' /* 'http://localhost:5000/api' */

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add expense
export const addExpense = async (expenseData) => {
  try {
    const response = await api.post('/expenses/add', expenseData)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to add expense')
  }
}

// Get all expenses
export const getAllExpenses = async () => {
  try {
    const response = await api.get('/expenses/all')
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch expenses')
  }
}

// Get monthly summary
export const getMonthlySummary = async (year, month) => {
  try {
    const params = {}
    if (year) params.year = year
    if (month) params.month = month
    
    const response = await api.get('/expenses/monthly-summary', { params })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch monthly summary')
  }
}

export default api 
