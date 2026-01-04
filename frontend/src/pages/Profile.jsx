import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TripCard from '../components/TripCard'
import authApi from '../services/authApi'
import tripApi from '../services/tripApi'

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))
  const [trips, setTrips] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('No token found')
        return
      }
      
      const [profileData, tripsData] = await Promise.all([
        authApi.getProfile(),
        tripApi.getTrips()
      ])
      
      setUser(profileData)
      setTrips(tripsData || [])
      setFormData({
        name: profileData.name || '',
        email: profileData.email || '',
        phone: profileData.phone || ''
      })
    } catch (error) {
      console.error('Error fetching profile data:', error)
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    try {
      const updatedUser = await authApi.updateProfile(formData)
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const preplannedTrips = trips.filter(trip => trip.status === 'upcoming')
  const previousTrips = trips.filter(trip => trip.status === 'completed')

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
          <p>Loading profile...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="container" style={{ padding: '2rem 0' }}>
        <h1>User Profile</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          <div>
            <div className="card">
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '50%', 
                  background: '#007bff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1rem',
                  color: 'white',
                  fontSize: '2rem'
                }}>
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <h2>{user.name}</h2>
              </div>

              {isEditing ? (
                <form onSubmit={handleUpdateProfile}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button 
                      type="button" 
                      onClick={() => setIsEditing(false)}
                      className="btn"
                      style={{ background: '#6c757d', color: 'white' }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div style={{ marginBottom: '1rem' }}>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
                    <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>

            <div className="card">
              <h3>Trip Statistics</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', textAlign: 'center' }}>
                <div>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>{trips.length}</p>
                  <p>Total Trips</p>
                </div>
                <div>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>{previousTrips.length}</p>
                  <p>Completed</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <section style={{ marginBottom: '2rem' }}>
              <h2>Preplanned Trips</h2>
              {preplannedTrips.length > 0 ? (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {preplannedTrips.map(trip => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
              ) : (
                <div className="card">
                  <p>No upcoming trips planned.</p>
                  <Link to="/create-trip" className="btn btn-primary">Plan a Trip</Link>
                </div>
              )}
            </section>

            <section>
              <h2>Previous Trips</h2>
              {previousTrips.length > 0 ? (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {previousTrips.map(trip => (
                    <div key={trip.id} className="card">
                      <h3>{trip.name}</h3>
                      <p><strong>Dates:</strong> {trip.startDate} - {trip.endDate}</p>
                      <p>{trip.description}</p>
                      <Link to={`/itinerary/${trip.id}`} className="btn btn-primary">View Details</Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card">
                  <p>No previous trips yet.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Profile