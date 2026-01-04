import { Link } from 'react-router-dom'

const TripCard = ({ trip }) => {
  const getStatusEmoji = (status) => {
    switch(status) {
      case 'upcoming': return '🚀'
      case 'ongoing': return '✈️'
      case 'completed': return '✅'
      default: return '🏖️'
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return '#667eea'
      case 'ongoing': return '#56ab2f'
      case 'completed': return '#6c757d'
      default: return '#667eea'
    }
  }

  return (
    <div className="card" style={{ 
      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
      border: '1px solid rgba(255,255,255,0.3)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        background: getStatusColor(trip.status),
        color: 'white',
        padding: '4px 12px',
        borderBottomLeftRadius: '12px',
        fontSize: '0.8rem',
        fontWeight: '500'
      }}>
        {getStatusEmoji(trip.status)} {trip.status?.toUpperCase()}
      </div>
      
      <div style={{ paddingTop: '1rem' }}>
        <h3 style={{ 
          color: '#2c3e50', 
          marginBottom: '1rem',
          fontSize: '1.3rem',
          fontWeight: '600'
        }}>
          🏖️ {trip.name}
        </h3>
        
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ color: '#666', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📅</span>
            <strong>Dates:</strong> {trip.startDate} - {trip.endDate}
          </p>
          <p style={{ color: '#666', lineHeight: '1.5' }}>
            <span>📝</span> {trip.description}
          </p>
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginTop: '1.5rem',
          flexWrap: 'wrap'
        }}>
          <Link 
            to={`/itinerary/${trip.id}`} 
            className="btn btn-primary" 
            style={{ flex: '1', minWidth: '100px', textAlign: 'center' }}
          >
            👁️ View
          </Link>
          <Link 
            to={`/build-itinerary/${trip.id}`} 
            className="btn btn-success" 
            style={{ flex: '1', minWidth: '100px', textAlign: 'center' }}
          >
            ✏️ Edit
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TripCard