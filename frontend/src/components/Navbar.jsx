import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}')
  const isLoggedIn = !!(localStorage.getItem('token') || sessionStorage.getItem('token'))

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('token')
    navigate('/')
  }

  return (
    <nav style={{ 
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      backdropFilter: 'blur(10px)',
      padding: '1rem 0',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to={isLoggedIn ? "/dashboard" : "/"} style={{ 
          color: 'white', 
          textDecoration: 'none', 
          fontSize: '1.8rem', 
          fontWeight: '700',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          🏖️ TripPlanner
        </Link>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '8px 16px', fontSize: '14px' }}>🏠 Home</Link>
              <Link to="/trips" className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '8px 16px', fontSize: '14px' }}>✈️ Trips</Link>
              <Link to="/search" className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '8px 16px', fontSize: '14px' }}>🔍 Search</Link>
              <Link to="/community" className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '8px 16px', fontSize: '14px' }}>👥 Community</Link>
              <Link to="/calendar" className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '8px 16px', fontSize: '14px' }}>📅 Calendar</Link>
              <Link to="/profile" className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '8px 16px', fontSize: '14px' }}>👤 Profile</Link>
              <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '8px 16px', fontSize: '14px' }}>
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/search" className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '8px 16px', fontSize: '14px' }}>🔍 Search</Link>
              <Link to="/login" className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '8px 16px', fontSize: '14px' }}>🔑 Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }}>📝 Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar