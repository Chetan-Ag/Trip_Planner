const CalendarBox = ({ trips, selectedDate, onDateSelect }) => {
  const today = new Date()
  const currentMonth = selectedDate || today
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const days = []
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }

  const getTripForDate = (day) => {
    if (!day) return null
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return trips.find(trip => 
      dateStr >= trip.startDate && dateStr <= trip.endDate
    )
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3>{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', textAlign: 'center' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} style={{ fontWeight: 'bold', padding: '10px' }}>{day}</div>
        ))}
        {days.map((day, index) => {
          const trip = getTripForDate(day)
          return (
            <div
              key={index}
              onClick={() => day && onDateSelect && onDateSelect(day)}
              style={{
                padding: '10px',
                cursor: day ? 'pointer' : 'default',
                backgroundColor: trip ? '#007bff' : day ? '#f8f9fa' : 'transparent',
                color: trip ? 'white' : '#333',
                borderRadius: '5px',
                border: day === today.getDate() && month === today.getMonth() && year === today.getFullYear() ? '2px solid #007bff' : '1px solid #ddd'
              }}
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarBox