
// import { useState, useEffect } from 'react';
// import './App.css';
// import ExpenseForm from './components/ExpenseForm';
// import ExpenseList from './components/ExpenseList';
// import ExpenseFilter from './components/ExpenseFilter';
// import ExpenseSummary from './components/ExpenseSummary';
// import axios from 'axios';

// // API Base URL (Vite Environment Variable Fallback)
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';

// function App() {
//   const [expenses, setExpenses] = useState([]);
//   const [filters, setFilters] = useState({ category: '', date: '' });
//   const [dateRange, setDateRange] = useState({
//     start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
//     end: new Date().toISOString().split('T')[0]
//   });
//   const [totalExpense, setTotalExpense] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [activeView, setActiveView] = useState('addExpense'); // 'addExpense' or 'summary'

//   /** ========== FETCH EXPENSES ========== */
//   const fetchExpenses = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const params = { ...filters };
//       const response = await axios.get(`${API_URL}/expenses`, { params });
//       setExpenses(response.data || []);
//     } catch (error) {
//       console.error('Error fetching expenses:', error);
//       setError('Failed to fetch expenses. Is the server running?');
//       setExpenses([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /** ========== FETCH TOTAL EXPENSES ========== */
//   const fetchTotalExpenses = async () => {
//     if (!dateRange.start || !dateRange.end) return;
    
//     setIsLoading(true);
//     try {
//       const response = await axios.get(`${API_URL}/expenses/total`, {
//         params: { start: dateRange.start, end: dateRange.end }
//       });
//       setTotalExpense(response.data?.total || 0);
//     } catch (error) {
//       console.error('Error fetching total expenses:', error);
//       setTotalExpense(0);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchExpenses();
//   }, [filters]);

//   useEffect(() => {
//     fetchTotalExpenses();
//   }, [dateRange]);

//   /** ========== HANDLE ACTIONS ========== */
//   const addExpense = async (expense) => {
//     setIsLoading(true);
//     try {
//       await axios.post(`${API_URL}/expenses`, expense);
//       fetchExpenses();
//       fetchTotalExpenses();
//     } catch (error) {
//       console.error('Error adding expense:', error);
//       setError('Failed to add expense. Is the server running?');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /** ✅ Corrected Date Range Handler */
//   const handleDateRangeChange = (e) => {
//     const { name, value } = e.target;
//     setDateRange((prevRange) => ({
//       ...prevRange,
//       [name]: value
//     }));
//   };

//   const handleFilterChange = (newFilters) => setFilters(newFilters);

//   return (
//     <div className="app">
//       {/* ========== NAVIGATION BAR ========== */}
//       <nav className="navbar">
//         <h1 className="logo">Expense Tracker</h1>
//         <div className="nav-links">
//           <button 
//             className={activeView === 'addExpense' ? 'active' : ''}
//             onClick={() => setActiveView('addExpense')}
//           >
//             Add Expense
//           </button>
//           <button 
//             className={activeView === 'summary' ? 'active' : ''}
//             onClick={() => setActiveView('summary')}
//           >
//             Summary
//           </button>
//         </div>
//       </nav>

//       {error && <div className="error-card">{error}</div>}

//       {/* ========== MAIN CONTENT ========== */}
//       <main className="app-main">
//         {activeView === 'addExpense' ? (
//           <>
//             <div className="card-container">
//               <div className="card expense-form-card">
//                 <h2 className="card-header">Add Expense</h2>
//                 <div className="card-body">
//                   <ExpenseForm onAddExpense={addExpense} />
//                 </div>
//               </div>

//               <div className="card filter-card">
//                 <h2 className="card-header">Filter Expenses</h2>
//                 <div className="card-body">
//                   <ExpenseFilter 
//                     onFilterChange={handleFilterChange}
//                     onDateRangeChange={handleDateRangeChange}
//                     dateRange={dateRange}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="card expense-list-card">
//               <h2 className="card-header">Your Expenses</h2>
//               <div className="card-body">
//                 {isLoading ? (
//                   <div className="loading">Loading...</div>
//                 ) : (
//                   <ExpenseList expenses={expenses} />
//                 )}
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="card summary-card">
//             <h2 className="card-header">Expenses Summary</h2>
//             <div className="card-body">
//               {/* ✅ Moved Date Range Filter Inside Card */}
//               <div className="date-range-section">
//                 <h3>Date Range for Summary</h3>
//                 <div className="filter-row">
//                   <div className="filter-group">
//                     <label htmlFor="start">Start Date</label>
//                     <input 
//                       type="date" 
//                       id="start" 
//                       name="start" 
//                       value={dateRange?.start || ''} 
//                       onChange={handleDateRangeChange} 
//                     />
//                   </div>

//                   <div className="filter-group">
//                     <label htmlFor="end">End Date</label>
//                     <input 
//                       type="date" 
//                       id="end" 
//                       name="end" 
//                       value={dateRange?.end || ''} 
//                       onChange={handleDateRangeChange} 
//                     />
//                   </div>
//                 </div>
//               </div>

//               <ExpenseSummary total={totalExpense} dateRange={dateRange} />
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;


import { useState, useEffect } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseSummary from './components/ExpenseSummary';
import axios from 'axios';

// API Base URL (Vite Environment Variable Fallback)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({ category: '', date: '' });
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [totalExpense, setTotalExpense] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState('addExpense'); // 'addExpense' or 'summary'

  /** ========== FETCH EXPENSES ========== */
  const fetchExpenses = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = { ...filters };
      const response = await axios.get(`${API_URL}/expenses`, { params });
      setExpenses(response.data || []);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setError('Failed to fetch expenses. Is the server running?');
      setExpenses([]);
    } finally {
      setIsLoading(false);
    }
  };

  /** ========== FETCH TOTAL EXPENSES ========== */
  const fetchTotalExpenses = async () => {
    if (!dateRange.start || !dateRange.end) return;
    
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/expenses/total`, {
        params: { start: dateRange.start, end: dateRange.end }
      });
      setTotalExpense(response.data?.total || 0);
    } catch (error) {
      console.error('Error fetching total expenses:', error);
      setTotalExpense(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  useEffect(() => {
    fetchTotalExpenses();
  }, [dateRange]);

  /** ========== HANDLE ACTIONS ========== */
  const addExpense = async (expense) => {
    setIsLoading(true);
    try {
      await axios.post(`${API_URL}/expenses`, expense);
      fetchExpenses();
      fetchTotalExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
      setError('Failed to add expense. Is the server running?');
    } finally {
      setIsLoading(false);
    }
  };

  /** ✅ Corrected Date Range Handler */
  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prevRange) => ({
      ...prevRange,
      [name]: value
    }));
  };

  const handleFilterChange = (newFilters) => setFilters(newFilters);

  return (
    <div className="app">
      {/* ========== NAVIGATION BAR ========== */}
      <nav className="navbar">
        <h1 className="logo">Expense Tracker</h1>
        <div className="nav-links">
          <button 
            className={activeView === 'addExpense' ? 'active' : ''}
            onClick={() => setActiveView('addExpense')}
          >
            Add Expense
          </button>
          <button 
            className={activeView === 'summary' ? 'active' : ''}
            onClick={() => setActiveView('summary')}
          >
            Summary
          </button>
        </div>
      </nav>

      {error && <div className="error-card">{error}</div>}

      {/* ========== MAIN CONTENT ========== */}
      <main className={`app-main ${activeView === 'addExpense' ? 'expense-layout' : ''}`}>
        {activeView === 'addExpense' ? (
          <div className="centered-content">
            <div className="panel-container">
              <div className="side-panel">
                <div className="card expense-form-card">
                  <h2 className="card-header">Add Expense</h2>
                  <div className="card-body">
                    <ExpenseForm onAddExpense={addExpense} />
                  </div>
                </div>

                <div className="card filter-card">
                  <h2 className="card-header">Filter Expenses</h2>
                  <div className="card-body compact-filters">
                    <ExpenseFilter 
                      onFilterChange={handleFilterChange}
                      onDateRangeChange={handleDateRangeChange}
                      dateRange={dateRange}
                    />
                  </div>
                </div>
              </div>

              <div className="card expense-list-card">
                <h2 className="card-header">Your Expenses</h2>
                <div className="card-body">
                  {isLoading ? (
                    <div className="loading">Loading...</div>
                  ) : (
                    <ExpenseList expenses={expenses} />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="centered-content">
            <div className="card summary-card">
              <h2 className="card-header">Expenses Summary</h2>
              <div className="card-body">
                <div className="date-range-section">
                  <h3>Date Range for Summary</h3>
                  <div className="filter-row">
                    <div className="filter-group">
                      <label htmlFor="start">Start Date</label>
                      <input 
                        type="date" 
                        id="start" 
                        name="start" 
                        value={dateRange?.start || ''} 
                        onChange={handleDateRangeChange} 
                      />
                    </div>
                    <br></br>
                    <div className="filter-group">
                      <label htmlFor="end">End Date</label>
                      <input 
                        type="date" 
                        id="end" 
                        name="end" 
                        value={dateRange?.end || ''} 
                        onChange={handleDateRangeChange} 
                      />
                    </div>
                  </div>
                </div>

                <ExpenseSummary total={totalExpense} dateRange={dateRange} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;