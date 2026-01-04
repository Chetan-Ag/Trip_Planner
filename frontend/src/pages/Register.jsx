import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authApi from '../services/authApi'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    profilePhoto: null
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      console.log('Starting registration...')
      const response = await authApi.register(formData)
      console.log('Registration successful:', response)
      
      // Show success message
      setSuccess(true)
      
      // Force navigation to home page
      console.log('Navigating to home page...')
      window.location.href = '/'
      
    } catch (err) {
      console.error('Registration error:', err)
      const errorMessage = err.message || err.response?.data?.detail || 'Registration failed'
      setError(typeof errorMessage === 'string' ? errorMessage : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
      <div className="card" style={{ width: '500px', maxWidth: '90%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create Account</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
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
            <label>Phone (Optional)</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Profile Photo (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({...formData, profilePhoto: e.target.files[0]})}
            />
          </div>

          {error && <div className="error">{error}</div>}
          {success && <div style={{ color: '#28a745', fontSize: '14px', marginTop: '8px', padding: '8px 12px', background: 'rgba(40, 167, 69, 0.1)', borderRadius: '8px', borderLeft: '4px solid #28a745' }}>Registration successful! Redirecting...</div>}
          
          <div style={{ fontSize: '12px', color: '#666', marginTop: '1rem' }}>
            Having issues? Check browser console (F12) for errors.
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register