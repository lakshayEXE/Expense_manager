import './ExpenseList.css';

const ExpenseList = ({ expenses }) => {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colorMap = {
      'Food & Dining': '#10B981',      // Green
      'Transportation': '#3B82F6',     // Blue
      'Entertainment': '#8B5CF6',      // Purple
      'Shopping': '#EC4899',           // Pink
      'Utilities': '#F59E0B',          // Amber
      'Housing': '#6366F1',            // Indigo
      'Healthcare': '#EF4444',         // Red
      'Personal Care': '#F97316',      // Orange
      'Education': '#14B8A6',          // Teal
      'Travel': '#06B6D4',             // Cyan
      'Gifts & Donations': '#A855F7',  // Purple
      'Other': '#6B7280'               // Gray
    };
    
    return colorMap[category] || '#6B7280';
  };

  return (
    <div className="expense-list">
      {expenses.length === 0 ? (
        <div className="no-expenses">
          <p>No expenses found. Add your first expense!</p>
        </div>
      ) : (
        <>
          <div className="expense-list-header">
            <span>Total: {expenses.length} expense{expenses.length !== 1 ? 's' : ''}</span>
          </div>
          
          <div className="expense-items">
            {expenses.map((expense) => (
              <div key={expense._id || expense.id} className="expense-item">
                <div className="expense-info">
                  <div className="expense-title">{expense.title}</div>
                  <div className="expense-meta">
                    <span className="expense-date">{formatDate(expense.date)}</span>
                    <span 
                      className="expense-category"
                      style={{ 
                        backgroundColor: getCategoryColor(expense.category),
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        marginLeft: '8px'
                      }}
                    >
                      {expense.category}
                    </span>
                  </div>
                  {expense.description && (
                    <div className="expense-description">{expense.description}</div>
                  )}
                </div>
                <div className="expense-amount">
                  {formatCurrency(expense.amount)}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseList;
