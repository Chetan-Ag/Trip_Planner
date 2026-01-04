import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TripCard from '../components/TripCard'
import tripApi from '../services/tripApi'

const TripList = () => {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

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

  const deleteTrip = async (tripId) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await tripApi.deleteTrip(tripId)
        setTrips(trips.filter(trip => trip.id !== tripId))
      } catch (error) {
        console.error('Error deleting trip:', error)
      }
    }
  }

  const filteredTrips = trips.filter(trip => {
    if (filter === 'all') return true
    return trip.status === filter
  })

  const ongoingTrips = trips.filter(trip => trip.status === 'ongoing')
  const upcomingTrips = trips.filter(trip => trip.status === 'upcoming')
  const completedTrips = trips.filter(trip => trip.status === 'completed')

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
          <p>Loading trips...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="container" style={{ padding: '2rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1>My Trips</h1>
          <Link to="/create-trip" className="btn btn-primary">Create New Trip</Link>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <button
              onClick={() => setFilter('all')}
              className={`btn ${filter === 'all' ? 'btn-primary' : ''}`}
              style={filter !== 'all' ? { background: '#6c757d', color: 'white' } : {}}
            >
              All ({trips.length})
            </button>
            <button
              onClick={() => setFilter('ongoing')}
              className={`btn ${filter === 'ongoing' ? 'btn-primary' : ''}`}
              style={filter !== 'ongoing' ? { background: '#6c757d', color: 'white' } : {}}
            >
              Ongoing ({ongoingTrips.length})
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`btn ${filter === 'upcoming' ? 'btn-primary' : ''}`}
              style={filter !== 'upcoming' ? { background: '#6c757d', color: 'white' } : {}}
            >
              Upcoming ({upcomingTrips.length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`btn ${filter === 'completed' ? 'btn-primary' : ''}`}
              style={filter !== 'completed' ? { background: '#6c757d', color: 'white' } : {}}
            >
              Completed ({completedTrips.length})
            </button>
          </div>
        </div>

        {filteredTrips.length > 0 ? (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {filteredTrips.map(trip => (
              <div key={trip.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <h3>{trip.name}</h3>
                    <p><strong>Dates:</strong> {trip.startDate} - {trip.endDate}</p>
                    <p><strong>Status:</strong> <span style={{ 
                      color: trip.status === 'ongoing' ? '#28a745' : 
                            trip.status === 'upcoming' ? '#007bff' : '#6c757d',
                      fontWeight: 'bold'
                    }}>{trip.status.toUpperCase()}</span></p>
                    <p>{trip.description}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: '1rem' }}>
                    <Link to={`/itinerary/${trip.id}`} className="btn btn-primary">View</Link>
                    <Link to={`/build-itinerary/${trip.id}`} className="btn" style={{ background: '#28a745', color: 'white' }}>Edit</Link>
                    <button
                      onClick={() => deleteTrip(trip.id)}
                      className="btn"
                      style={{ background: '#dc3545', color: 'white' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <h3>No trips found</h3>
            <p>
              {filter === 'all' 
                ? "You haven't created any trips yet." 
                : `No ${filter} trips found.`
              }
            </p>
            <Link to="/create-trip" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Create Your First Trip
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default TripList