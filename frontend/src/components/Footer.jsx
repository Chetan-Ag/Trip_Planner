const Footer = () => {
  return (
    <footer style={{ 
      background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
      backdropFilter: 'blur(10px)',
      color: 'white', 
      textAlign: 'center', 
      padding: '2rem 0', 
      marginTop: '3rem',
      borderTop: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div className="container">
        <div style={{ marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🌍✈️🏖️</span>
        </div>
        <p style={{ 
          fontSize: '1.1rem', 
          fontWeight: '500',
          textShadow: '0 1px 2px rgba(0,0,0,0.5)'
        }}>
          &copy; 2026 TripPlanner - Making Dreams Come True ✨
        </p>
        <p style={{ 
          color: 'rgba(255,255,255,0.7)', 
          fontSize: '0.9rem',
          marginTop: '0.5rem'
        }}>
          Plan. Explore. Remember. 🌟
        </p>
      </div>
    </footer>
  )
}

export default Footer