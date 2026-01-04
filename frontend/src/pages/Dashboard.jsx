import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TripCard from '../components/TripCard'
import tripApi from '../services/tripApi'
import searchApi from '../services/searchApi'

const Dashboard = () => {
  const [trips, setTrips] = useState([])
  const [recommendedCities, setRecommendedCities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Get user data with better error handling
  const getUserData = () => {
    try {
      const userData = sessionStorage.getItem('user') || localStorage.getItem('user')
      if (!userData) {
        console.warn('No user data found in storage')
        return { name: 'User' }
      }
      return JSON.parse(userData)
    } catch (err) {
      console.error('Error parsing user data:', err)
      return { name: 'User' }
    }
  }
  
  const user = getUserData()
  
  // Check if user is authenticated
  const token = sessionStorage.getItem('token') || localStorage.getItem('token')
  
  useEffect(() => {
    if (!token) {
      console.warn('No authentication token found')
      setError('Please log in to access the dashboard')
      setLoading(false)
      return
    }
    
    // Add a simple health check
    console.log('Dashboard mounted with token:', token ? 'Present' : 'Missing')
    console.log('User data:', user)
    
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      console.log('Fetching dashboard data...')
      const [tripsData, citiesData] = await Promise.all([
        tripApi.getTrips(),
        searchApi.getPopularCities()
      ])
      console.log('Dashboard data fetched successfully')
      setTrips(tripsData)
      setRecommendedCities(citiesData)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setError('Failed to load dashboard data. Please try refreshing the page.')
    } finally {
      setLoading(false)
    }
  }

  const upcomingTrips = trips.filter(trip => trip.status === 'upcoming')
  const previousTrips = trips.filter(trip => trip.status === 'completed')

  if (loading) {
    return (
      <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
        <Navbar />
        <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>
          <div className="card" style={{ display: 'inline-block' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌍</div>
            <p>Loading your travel dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
        <Navbar />
        <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>
          <div className="card" style={{ display: 'inline-block' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
            <h3>Oops! Something went wrong</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>{error}</p>
            <Link to="/login" className="btn btn-primary" style={{ marginRight: '1rem' }}>
              Go to Login
            </Link>
            <button onClick={() => window.location.reload()} className="btn btn-info">
              Refresh Page
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      <Navbar />
      <div className="container" style={{ padding: '2rem 0' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{ 
              color: 'white', 
              fontSize: '2.5rem', 
              fontWeight: '700',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              marginBottom: '0.5rem'
            }}>
              🌟 Welcome back, {user.name}!
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>Ready for your next adventure?</p>
          </div>
          <Link to="/create-trip" className="btn btn-success" style={{ padding: '12px 24px', fontSize: '16px' }}>
            ✨ Plan New Trip
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          <div>
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.8rem' }}>
                🚀 Upcoming Adventures
              </h2>
              {upcomingTrips.length > 0 ? (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {upcomingTrips.map(trip => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
              ) : (
                <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏖️</div>
                  <h3>No upcoming trips yet!</h3>
                  <p style={{ color: '#666', marginBottom: '1rem' }}>Time to plan your next amazing adventure!</p>
                  <Link to="/create-trip" className="btn btn-primary">
                    ✨ Plan Your First Trip
                  </Link>
                </div>
              )}
            </section>

            <section>
              <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.8rem' }}>
                📸 Previous Adventures
              </h2>
              {previousTrips.length > 0 ? (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {previousTrips.slice(0, 3).map(trip => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
              ) : (
                <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌍</div>
                  <p>No previous trips yet. Your adventure story starts here!</p>
                </div>
              )}
            </section>
          </div>

          <div>
            <section>
              <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.5rem' }}>
                🌍 Trending Destinations
              </h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {recommendedCities.map(city => (
                  <div key={city.id} className="card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏙️</div>
                    <h4 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>{city.name}</h4>
                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{city.country}</p>
                    <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '1rem' }}>{city.description}</p>
                    <Link to={`/search?city=${city.name}`} className="btn btn-info" style={{ width: '100%', padding: '8px' }}>
                      🔍 Explore
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard