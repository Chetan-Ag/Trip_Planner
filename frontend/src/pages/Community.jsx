import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import searchApi from '../services/searchApi'

const Community = () => {
  const [communityTrips, setCommunityTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchCommunityTrips()
  }, [])

  const fetchCommunityTrips = async () => {
    try {
      const data = await searchApi.getCommunityTrips()
      setCommunityTrips(data)
    } catch (error) {
      console.error('Error fetching community trips:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTrips = communityTrips.filter(trip => {
    if (filter === 'all') return true
    if (filter === 'popular') return trip.likes > 10
    if (filter === 'recent') return new Date(trip.sharedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return true
  })

  const getInspirationFromTrip = (trip) => {
    alert(`Getting inspiration from "${trip.name}"! This would copy elements to your planning workspace.`)
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
          <p>Loading community trips...</p>
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
          <h1>Community Trips</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => setFilter('all')}
              className={`btn ${filter === 'all' ? 'btn-primary' : ''}`}
              style={filter !== 'all' ? { background: '#6c757d', color: 'white' } : {}}
            >
              All
            </button>
            <button
              onClick={() => setFilter('popular')}
              className={`btn ${filter === 'popular' ? 'btn-primary' : ''}`}
              style={filter !== 'popular' ? { background: '#6c757d', color: 'white' } : {}}
            >
              Popular
            </button>
            <button
              onClick={() => setFilter('recent')}
              className={`btn ${filter === 'recent' ? 'btn-primary' : ''}`}
              style={filter !== 'recent' ? { background: '#6c757d', color: 'white' } : {}}
            >
              Recent
            </button>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem', background: '#e7f3ff' }}>
          <h3>🌟 Discover Amazing Trips</h3>
          <p>Get inspired by trips shared by our community! Browse through real itineraries, see what others have planned, and get ideas for your next adventure.</p>
          <p><strong>Note:</strong> These are read-only trips shared by other users. You can view them for inspiration but cannot edit them.</p>
        </div>

        {filteredTrips.length > 0 ? (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {filteredTrips.map(trip => (
              <div key={trip.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <h3>{trip.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', color: '#666' }}>
                        <span>👤 {trip.author}</span>
                        <span>❤️ {trip.likes}</span>
                        <span>👁️ {trip.views}</span>
                      </div>
                    </div>
                    
                    <p><strong>Destination:</strong> {trip.destination}</p>
                    <p><strong>Duration:</strong> {trip.duration} days</p>
                    <p><strong>Budget:</strong> ${trip.budget}</p>
                    <p><strong>Highlights:</strong> {trip.highlights}</p>
                    <p>{trip.description}</p>
                    
                    <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                      <p>Shared on {new Date(trip.sharedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: '1rem' }}>
                    <button
                      onClick={() => alert(`Viewing detailed itinerary for "${trip.name}"`)}
                      className="btn btn-primary"
                    >
                      View Itinerary
                    </button>
                    <button
                      onClick={() => getInspirationFromTrip(trip)}
                      className="btn"
                      style={{ background: '#28a745', color: 'white' }}
                    >
                      Get Inspiration
                    </button>
                    <button
                      onClick={() => alert('Like feature coming soon!')}
                      className="btn"
                      style={{ background: '#dc3545', color: 'white' }}
                    >
                      ❤️ Like
                    </button>
                  </div>
                </div>
                
                {trip.tags && (
                  <div style={{ marginTop: '1rem' }}>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      {trip.tags.map((tag, index) => (
                        <span
                          key={index}
                          style={{
                            background: '#007bff',
                            color: 'white',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.8rem'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <h3>No community trips found</h3>
            <p>Be the first to share your amazing trip with the community!</p>
            <Link to="/trips" className="btn btn-primary">
              Share Your Trip
            </Link>
          </div>
        )}

        <div className="card" style={{ marginTop: '2rem', textAlign: 'center', background: '#f8f9fa' }}>
          <h3>Share Your Trip</h3>
          <p>Have an amazing trip to share? Help inspire other travelers by sharing your itinerary with the community!</p>
          <Link to="/trips" className="btn btn-primary">
            Share Your Trip
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Community