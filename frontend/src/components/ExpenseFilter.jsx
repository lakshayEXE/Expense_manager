import { useState, useEffect } from 'react';
import './ExpenseFilter.css';

const ExpenseFilter = ({ onFilterChange, onDateRangeChange, dateRange = { start: '', end: '' } }) => {
  const [filters, setFilters] = useState({ category: '', date: '' });

  const categories = [
    'Food & Dining', 'Transportation', 'Entertainment', 'Shopping', 
    'Utilities', 'Housing', 'Healthcare', 'Personal Care', 
    'Education', 'Travel', 'Gifts & Donations', 'Other'
  ];

  // Handles filter changes (Category & Date)
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Handles date range changes
  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    onDateRangeChange((prevRange) => ({
      ...prevRange,
      [name]: value
    }));
  };

  // Clears all filters and resets state
  const clearFilters = () => {
    setFilters({ category: '', date: '' });
    onDateRangeChange({ start: '', end: '' });
  };

  // Update parent state when filters change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <div className="expense-filter">
      <div className="filter-group">
        <label htmlFor="filter-category">Filter by Category</label>
        <select 
          id="filter-category" 
          name="category" 
          value={filters.category} 
          onChange={handleFilterChange}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="filter-date">Filter by Date</label>
        <input 
          type="date" 
          id="filter-date" 
          name="date" 
          value={filters.date} 
          onChange={handleFilterChange} 
        />
      </div>
      <button onClick={clearFilters} className="clear-btn">Clear Filters</button>
    </div>
  );
};

export default ExpenseFilter;
