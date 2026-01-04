import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import tripApi from '../services/tripApi'

const ItineraryView = () => {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const [trip, setTrip] = useState(null)
  const [itinerary, setItinerary] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalCost, setTotalCost] = useState(0)

  useEffect(() => {
    loadTripData()
  }, [tripId])

  const loadTripData = async () => {
    try {
      const [tripData, itineraryData] = await Promise.all([
        tripApi.getTrip(tripId),
        tripApi.getItinerary(tripId)
      ])
      setTrip(tripData)
      setItinerary(itineraryData)
      
      // Calculate total cost
      const total = itineraryData.reduce((sum, section) => sum + (parseFloat(section.cost) || 0), 0)
      setTotalCost(total)
    } catch (error) {
      console.error('Error loading trip data:', error)
    } finally {
      setLoading(false)
    }
  }

  const groupedItinerary = itinerary.reduce((acc, section) => {
    if (!acc[section.day_number]) acc[section.day_number] = []
    acc[section.day_number].push(section)
    return acc
  }, {})

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
          <p>Loading your itinerary...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="container" style={{ padding: '2rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1>{trip?.name}</h1>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>
            {trip?.country} • {trip?.start_date} to {trip?.end_date} • Budget: ${trip?.budget}
          </p>
          <p style={{ fontSize: '1.1rem', color: '#28a745' }}>
            Total Activities Cost: ${totalCost.toFixed(2)}
          </p>
        </div>

        <div className="itinerary-timeline">
          {Object.keys(groupedItinerary).sort((a, b) => a - b).map(day => (
            <div key={day} className="card" style={{ marginBottom: '2rem' }}>
              <div style={{ background: '#667eea', color: 'white', padding: '1rem', borderRadius: '8px 8px 0 0' }}>
                <h3>Day {day}</h3>
              </div>
              
              <div style={{ padding: '1rem' }}>
                {groupedItinerary[day].map(section => (
                  <div key={section.id} style={{ 
                    border: '1px solid #e0e0e0', 
                    borderRadius: '8px',
                    padding: '1rem', 
                    marginBottom: '1rem',
                    background: '#f8f9fa'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>{section.title}</h4>
                        <p style={{ marginBottom: '0.5rem' }}>{section.description}</p>
                        
                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#666' }}>
                          {section.start_time && section.end_time && (
                            <span>⏰ {section.start_time} - {section.end_time}</span>
                          )}
                          {section.location && (
                            <span>📍 {section.location}</span>
                          )}
                          {section.cost && (
                            <span style={{ color: '#28a745', fontWeight: 'bold' }}>💰 ${section.cost}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <div className="card" style={{ display: 'inline-block', padding: '2rem', maxWidth: '500px' }}>
            <h3>Trip Summary</h3>
            <div style={{ textAlign: 'left', margin: '1rem 0' }}>
              <p><strong>Destination:</strong> {trip?.country}</p>
              <p><strong>Duration:</strong> {trip?.start_date} to {trip?.end_date}</p>
              <p><strong>Planned Budget:</strong> ${trip?.budget}</p>
              <p><strong>Activities Cost:</strong> ${totalCost.toFixed(2)}</p>
              <p><strong>Remaining Budget:</strong> ${(parseFloat(trip?.budget || 0) - totalCost).toFixed(2)}</p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
              <button 
                onClick={() => navigate(`/build-itinerary/${tripId}`)}
                className="btn"
                style={{ background: '#6c757d', color: 'white' }}
              >
                Edit Itinerary
              </button>
              <button 
                onClick={() => navigate('/trips')}
                className="btn btn-primary"
              >
                Back to Trips
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ItineraryView