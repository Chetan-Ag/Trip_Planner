import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import tripApi from '../services/tripApi'

const BuildItinerary = () => {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const [trip, setTrip] = useState(null)
  const [itinerary, setItinerary] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingSection, setEditingSection] = useState(null)
  const [newSection, setNewSection] = useState({
    day_number: 1,
    title: '',
    description: '',
    start_time: '09:00',
    end_time: '12:00',
    location: '',
    cost: ''
  })

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
    } catch (err) {
      setError('Failed to load trip data')
    } finally {
      setLoading(false)
    }
  }

  const addSection = async () => {
    try {
      const section = await tripApi.addItinerarySection(tripId, newSection)
      setItinerary([...itinerary, section])
      setNewSection({
        day_number: 1,
        title: '',
        description: '',
        start_time: '09:00',
        end_time: '12:00',
        location: '',
        cost: ''
      })
    } catch (err) {
      setError('Failed to add section')
    }
  }

  const updateSection = async (sectionId, data) => {
    try {
      const updated = await tripApi.updateItinerarySection(tripId, sectionId, data)
      setItinerary(itinerary.map(s => s.id === sectionId ? updated : s))
      setEditingSection(null)
    } catch (err) {
      setError('Failed to update section')
    }
  }

  const deleteSection = async (sectionId) => {
    try {
      await tripApi.deleteItinerarySection(tripId, sectionId)
      setItinerary(itinerary.filter(s => s.id !== sectionId))
    } catch (err) {
      setError('Failed to delete section')
    }
  }

  const groupedItinerary = itinerary.reduce((acc, section) => {
    if (!acc[section.day_number]) acc[section.day_number] = []
    acc[section.day_number].push(section)
    return acc
  }, {})

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <Navbar />
      <div className="container" style={{ padding: '2rem 0' }}>
        <h1>Build Itinerary: {trip?.name}</h1>
        
        {error && <div className="error">{error}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* Itinerary Display */}
          <div>
            <h2>Your Itinerary</h2>
            {Object.keys(groupedItinerary).map(day => (
              <div key={day} className="card" style={{ marginBottom: '1rem' }}>
                <h3>Day {day}</h3>
                {groupedItinerary[day].map(section => (
                  <div key={section.id} style={{ 
                    border: '1px solid #ddd', 
                    padding: '1rem', 
                    margin: '0.5rem 0',
                    borderRadius: '8px'
                  }}>
                    {editingSection === section.id ? (
                      <EditSectionForm 
                        section={section}
                        onSave={(data) => updateSection(section.id, data)}
                        onCancel={() => setEditingSection(null)}
                      />
                    ) : (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <h4>{section.title}</h4>
                          <div>
                            <button onClick={() => setEditingSection(section.id)}>Edit</button>
                            <button onClick={() => deleteSection(section.id)} style={{ marginLeft: '0.5rem' }}>Delete</button>
                          </div>
                        </div>
                        <p>{section.description}</p>
                        <div style={{ fontSize: '0.9rem', color: '#666' }}>
                          <span>{section.start_time} - {section.end_time}</span>
                          {section.location && <span> | {section.location}</span>}
                          {section.cost && <span> | ${section.cost}</span>}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Add Section Form */}
          <div>
            <div className="card">
              <h3>Add New Activity</h3>
              <div className="form-group">
                <label>Day</label>
                <input
                  type="number"
                  min="1"
                  value={newSection.day_number}
                  onChange={(e) => setNewSection({...newSection, day_number: parseInt(e.target.value)})}
                />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={newSection.title}
                  onChange={(e) => setNewSection({...newSection, title: e.target.value})}
                  placeholder="Activity name"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newSection.description}
                  onChange={(e) => setNewSection({...newSection, description: e.target.value})}
                  placeholder="Activity details"
                  rows="3"
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Start Time</label>
                  <input
                    type="time"
                    value={newSection.start_time}
                    onChange={(e) => setNewSection({...newSection, start_time: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>End Time</label>
                  <input
                    type="time"
                    value={newSection.end_time}
                    onChange={(e) => setNewSection({...newSection, end_time: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={newSection.location}
                  onChange={(e) => setNewSection({...newSection, location: e.target.value})}
                  placeholder="Location name"
                />
              </div>
              <div className="form-group">
                <label>Cost ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={newSection.cost}
                  onChange={(e) => setNewSection({...newSection, cost: e.target.value})}
                />
              </div>
              <button onClick={addSection} className="btn btn-primary">Add Activity</button>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button onClick={() => navigate(`/itinerary/${tripId}`)} className="btn btn-primary">
            View Final Itinerary
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const EditSectionForm = ({ section, onSave, onCancel }) => {
  const [data, setData] = useState({
    title: section.title || '',
    description: section.description || '',
    start_time: section.start_time || '09:00',
    end_time: section.end_time || '12:00',
    location: section.location || '',
    cost: section.cost || ''
  })

  return (
    <div>
      <div className="form-group">
        <input
          type="text"
          value={data.title}
          onChange={(e) => setData({...data, title: e.target.value})}
          placeholder="Title"
        />
      </div>
      <div className="form-group">
        <textarea
          value={data.description}
          onChange={(e) => setData({...data, description: e.target.value})}
          placeholder="Description"
          rows="2"
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
        <input
          type="time"
          value={data.start_time}
          onChange={(e) => setData({...data, start_time: e.target.value})}
        />
        <input
          type="time"
          value={data.end_time}
          onChange={(e) => setData({...data, end_time: e.target.value})}
        />
        <input
          type="number"
          value={data.cost}
          onChange={(e) => setData({...data, cost: e.target.value})}
          placeholder="Cost"
        />
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        <button onClick={() => onSave(data)} style={{ marginRight: '0.5rem' }}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default BuildItinerary