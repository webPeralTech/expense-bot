import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import AddExpense from './pages/AddExpense'
import ViewExpenses from './pages/ViewExpenses'
import MonthlySummary from './pages/MonthlySummary'

function App() {
  return (
    <div className="App">
      <Navigation />
      <main className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <Routes>
          <Route path="/" element={<AddExpense />} />
          <Route path="/expenses" element={<ViewExpenses />} />
          <Route path="/summary" element={<MonthlySummary />} />
        </Routes>
      </main>
    </div>
  )
}

export default App 