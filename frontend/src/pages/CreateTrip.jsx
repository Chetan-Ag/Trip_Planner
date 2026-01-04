import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import tripApi from '../services/tripApi'

const CreateTrip = () => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    startDate: '',
    endDate: '',
    description: '',
    budget: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      if (!token) {
        setError('Please log in to create a trip')
        return
      }
      
      // Format data for backend
      const tripData = {
        name: formData.name,
        country: formData.country,
        description: formData.description,
        start_date: formData.startDate,
        end_date: formData.endDate,
        budget: formData.budget ? parseFloat(formData.budget) : null
      }
      
      const response = await tripApi.createTrip(tripData)
      if (response && response.id) {
        navigate(`/itinerary/${response.id}`)
      } else {
        setError('Failed to create trip - invalid response')
      }
    } catch (err) {
      console.error('Create trip error:', err)
      if (err.response?.status === 401) {
        setError('Please log in to create a trip')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setTimeout(() => navigate('/login'), 2000)
      } else {
        const errorMessage = err.response?.data?.detail || err.response?.data?.message || err.message || 'Failed to create trip'
        setError(typeof errorMessage === 'string' ? errorMessage : 'Failed to create trip')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container" style={{ padding: '2rem 0' }}>
        <h1>Create New Trip</h1>
        
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Trip Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Summer Europe Adventure"
                  required
                />
              </div>

              <div className="form-group">
                <label>Destination Country</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  required
                >
                  <option value="">Select a country</option>
                  <option value="Japan">Japan</option>
                  <option value="France">France</option>
                  <option value="Italy">Italy</option>
                  <option value="Thailand">Thailand</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="Spain">Spain</option>
                  <option value="Australia">Australia</option>
                  <option value="India">India</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Budget ($)</label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  placeholder="Total trip budget"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your trip plans..."
                  rows="4"
                />
              </div>

              {error && <div className="error">{error}</div>}

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="btn"
                  style={{ background: '#6c757d', color: 'white' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ flex: 1 }}
                >
                  {loading ? 'Creating...' : 'Create Trip'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CreateTrip