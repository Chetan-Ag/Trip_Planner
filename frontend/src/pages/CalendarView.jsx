import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CalendarBox from '../components/CalendarBox'
import tripApi from '../services/tripApi'

const CalendarView = () => {
  const [trips, setTrips] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTrips()
  }, [])

  const fetchTrips = async () => {
    try {
      const data = await tripApi.getTrips()
      setTrips(data)
    } catch (error) {
      console.error('Error fetching trips:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDateSelect = (day) => {
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    
    const tripForDate = trips.find(trip => 
      dateStr >= trip.start_date && dateStr <= trip.end_date
    )
    
    setSelectedTrip(tripForDate)
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate)
    newDate.setMonth(newDate.getMonth() + direction)
    setSelectedDate(newDate)
  }

  const getTripsForMonth = () => {
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    const monthStart = `${year}-${String(month + 1).padStart(2, '0')}-01`
    const monthEnd = `${year}-${String(month + 2).padStart(2, '0')}-01`

    return trips.filter(trip => 
      trip.start_date < monthEnd && trip.end_date >= monthStart
    )
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
          <p>Loading calendar...</p>
        </div>
        <Footer />
      </div>
    )
  }

  const monthTrips = getTripsForMonth()

  return (
    <div>
      <Navbar />
      <div className="container" style={{ padding: '2rem 0' }}>
        <h1>Trip Calendar</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <button
                onClick={() => navigateMonth(-1)}
                className="btn"
                style={{ background: '#6c757d', color: 'white' }}
              >
                ← Previous
              </button>
              <h2>{selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
              <button
                onClick={() => navigateMonth(1)}
                className="btn"
                style={{ background: '#6c757d', color: 'white' }}
              >
                Next →
              </button>
            </div>

            <CalendarBox
              trips={trips}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />

            <div className="card" style={{ marginTop: '1rem' }}>
              <h3>Legend</h3>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '20px', height: '20px', background: '#007bff', borderRadius: '3px' }}></div>
                  <span>Trip Days</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '20px', height: '20px', border: '2px solid #007bff', borderRadius: '3px' }}></div>
                  <span>Today</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            {selectedTrip ? (
              <div className="card">
                <h3>Selected Trip</h3>
                <h4>{selectedTrip.name}</h4>
                <p><strong>Dates:</strong> {selectedTrip.start_date} - {selectedTrip.end_date}</p>
                <p><strong>Status:</strong> {selectedTrip.status}</p>
                <p>{selectedTrip.description}</p>
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Link to={`/itinerary/${selectedTrip.id}`} className="btn btn-primary">
                    View Itinerary
                  </Link>
                  <Link to={`/build-itinerary/${selectedTrip.id}`} className="btn" style={{ background: '#28a745', color: 'white' }}>
                    Edit Trip
                  </Link>
                </div>
              </div>
            ) : (
              <div className="card">
                <h3>Click a Date</h3>
                <p>Click on a highlighted date to see trip details, or click any date to plan a new trip.</p>
                <Link to="/create-trip" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Plan New Trip
                </Link>
              </div>
            )}

            <div className="card">
              <h3>This Month's Trips</h3>
              {monthTrips.length > 0 ? (
                <div style={{ display: 'grid', gap: '10px' }}>
                  {monthTrips.map(trip => (
                    <div key={trip.id} style={{ padding: '10px', background: '#f8f9fa', borderRadius: '5px' }}>
                      <h5>{trip.name}</h5>
                      <p style={{ fontSize: '0.9rem', margin: '5px 0' }}>
                        {trip.start_date} - {trip.end_date}
                      </p>
                      <Link to={`/itinerary/${trip.id}`} style={{ fontSize: '0.8rem' }}>
                        View Details
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No trips scheduled for this month.</p>
              )}
            </div>

            <div className="card">
              <h3>Quick Actions</h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                <Link to="/create-trip" className="btn btn-primary">
                  Plan New Trip
                </Link>
                <Link to="/trips" className="btn" style={{ background: '#17a2b8', color: 'white' }}>
                  View All Trips
                </Link>
                <button
                  onClick={() => setSelectedDate(new Date())}
                  className="btn"
                  style={{ background: '#28a745', color: 'white' }}
                >
                  Go to Today
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CalendarView