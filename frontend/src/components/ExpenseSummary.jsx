import './ExpenseSummary.css';

const ExpenseSummary = ({ total, dateRange }) => {
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
      currency: 'USD'
    }).format(amount);
  };

  const startDate = formatDate(dateRange.start);
  const endDate = formatDate(dateRange.end);

  return (
    <div className="expense-summary">
      <div className="date-range">
        {startDate} - {endDate}
      </div>
      
      <div className="total-expense">
        {formatCurrency(total)}
      </div>
      
      <div className="summary-details">
        <div className="summary-item">
          <span className="summary-label">Average Daily</span>
          <span className="summary-value">
            {formatCurrency(calculateDailyAverage(total, dateRange))}
          </span>
        </div>
        
        <div className="summary-item">
          <span className="summary-label">Projected Monthly</span>
          <span className="summary-value">
            {formatCurrency(calculateMonthlyProjection(total, dateRange))}
          </span>
        </div>
      </div>
    </div>
  );
};

// Helper functions for calculations
function calculateDailyAverage(total, dateRange) {
  if (!dateRange.start || !dateRange.end || total === 0) return 0;
  
  const start = new Date(dateRange.start);
  const end = new Date(dateRange.end);
  const daysDiff = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1);
  
  return total / daysDiff;
}

function calculateMonthlyProjection(total, dateRange) {
  if (!dateRange.start || !dateRange.end || total === 0) return 0;
  
  const start = new Date(dateRange.start);
  const end = new Date(dateRange.end);
  const daysDiff = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1);
  
  // Project to 30 days
  return (total / daysDiff) * 30;
}

export default ExpenseSummary;