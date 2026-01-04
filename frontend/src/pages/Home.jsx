import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}')
  const isLoggedIn = !!(localStorage.getItem('token') || sessionStorage.getItem('token'))

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?city=${encodeURIComponent(searchQuery)}`
    }
  }

  const popularDestinations = [
    { name: 'Paris', country: 'France', description: 'City of Light with iconic landmarks' },
    { name: 'Tokyo', country: 'Japan', description: 'Modern metropolis with rich culture' },
    { name: 'New York', country: 'USA', description: 'The city that never sleeps' },
    { name: 'Rome', country: 'Italy', description: 'Ancient history meets modern life' },
    { name: 'Bangkok', country: 'Thailand', description: 'Vibrant street life and temples' },
    { name: 'London', country: 'UK', description: 'Royal heritage and modern attractions' }
  ]

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <div style={{ 
        background: 'rgba(255,255,255,0.1)', 
        backdropFilter: 'blur(10px)',
        color: 'white', 
        padding: '4rem 0', 
        textAlign: 'center',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
      }}>
        <div className="container">
          {isLoggedIn && (
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Welcome back, {user.name}! 👋</h2>
              <p style={{ fontSize: '1rem', opacity: 0.9 }}>Ready for your next adventure?</p>
            </div>
          )}
          
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Plan Your Perfect Trip</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            Discover amazing destinations and create unforgettable memories
          </p>
          
          <div style={{ 
            display: 'flex', 
            maxWidth: '600px', 
            margin: '0 auto', 
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Where do you want to go?"
              style={{
                flex: 1,
                minWidth: '300px',
                padding: '1rem',
                fontSize: '1.1rem',
                border: 'none',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.9)'
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={handleSearch}
              className="btn btn-success"
              style={{
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                whiteSpace: 'nowrap'
              }}
            >
              🔍 Search
            </button>
          </div>
          
          {isLoggedIn && (
            <div style={{ marginTop: '2rem' }}>
              <Link to="/create-trip" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', marginRight: '1rem' }}>
                ✈️ Create New Trip
              </Link>
              <Link to="/trips" className="btn" style={{ padding: '1rem 2rem', fontSize: '1.1rem', background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                📋 My Trips
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="container" style={{ padding: '3rem 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Popular Destinations</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {popularDestinations.map((destination, index) => (
            <div key={index} className="card" style={{ textAlign: 'center' }}>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>{destination.name}</h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>{destination.country}</p>
                <p style={{ marginBottom: '1.5rem' }}>{destination.description}</p>
                <Link 
                  to={`/search?city=${encodeURIComponent(destination.name)}`}
                  className="btn btn-primary"
                >
                  🌟 Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>
        <div className="card" style={{ padding: '3rem', background: 'rgba(255,255,255,0.95)' }}>
          <h2 style={{ marginBottom: '1rem' }}>Ready to Start Planning?</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#666' }}>
            Join thousands of travelers who trust us with their adventures
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {!isLoggedIn ? (
              <>
                <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
                  📝 Sign Up Free
                </Link>
                <Link to="/login" className="btn" style={{ padding: '1rem 2rem', background: '#6c757d', color: 'white' }}>
                  🔑 Login
                </Link>
              </>
            ) : (
              <>
                <Link to="/create-trip" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
                  ✈️ Create Trip
                </Link>
                <Link to="/search" className="btn" style={{ padding: '1rem 2rem', background: '#6c757d', color: 'white' }}>
                  🔍 Browse Destinations
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home