import { useState } from 'react';
import './ExpenseForm.css';

const ExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    description: ''
  });

  const categories = [
    'Food & Dining',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Utilities',
    'Housing',
    'Healthcare',
    'Personal Care',
    'Education',
    'Travel',
    'Gifts & Donations',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.title || !formData.amount || !formData.date || !formData.category) {
      alert('Please fill all required fields');
      return;
    }

    // Create expense object
    const expense = {
      ...formData,
      amount: parseFloat(formData.amount),
      createdAt: new Date().toISOString()
    };

    // Send to parent component
    onAddExpense(expense);

    // Reset form
    setFormData({
      title: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      category: '',
      description: ''
    });
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Expense Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="amount">Amount (₹) *</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0.01"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="category">Category *</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description (Optional)</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        ></textarea>
      </div>
      
      <button type="submit" className="submit-btn">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
