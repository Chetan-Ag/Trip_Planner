const BudgetBox = ({ budget, spent, dailyBudgets }) => {
  const remaining = budget - spent
  const isOverBudget = spent > budget

  return (
    <div className="card" style={{ border: isOverBudget ? '2px solid #dc3545' : '1px solid #28a745' }}>
      <h3>Budget Overview</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div>
          <p><strong>Total Budget:</strong></p>
          <p style={{ fontSize: '1.5rem', color: '#007bff' }}>${budget}</p>
        </div>
        <div>
          <p><strong>Spent:</strong></p>
          <p style={{ fontSize: '1.5rem', color: isOverBudget ? '#dc3545' : '#28a745' }}>${spent}</p>
        </div>
        <div>
          <p><strong>Remaining:</strong></p>
          <p style={{ fontSize: '1.5rem', color: remaining < 0 ? '#dc3545' : '#28a745' }}>${remaining}</p>
        </div>
      </div>
      {dailyBudgets && (
        <div style={{ marginTop: '1rem' }}>
          <h4>Daily Breakdown:</h4>
          {dailyBudgets.map((day, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
              <span>{day.date}</span>
              <span style={{ color: day.amount > day.budget ? '#dc3545' : '#333' }}>
                ${day.amount} / ${day.budget}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BudgetBox