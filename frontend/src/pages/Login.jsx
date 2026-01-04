import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authApi from '../services/authApi'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    try {
      const response = await authApi.login(formData)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'transparent',
      padding: '20px'
    }}>
      <div className="card" style={{ 
        width: '420px', 
        maxWidth: '90%',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏖️</div>
          <h2 style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2rem',
            fontWeight: '700'
          }}>Welcome Back!</h2>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>Ready for your next adventure?</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>✉️ Email/Username</label>
            <input
              type="text"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>🔒 Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem', padding: '14px' }} disabled={loading}>
            {loading ? '🔄 Logging in...' : '🚀 Start Planning!'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', padding: '1rem 0', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
          <p style={{ color: '#666' }}>New to TripPlanner? <Link to="/register" style={{ color: '#667eea', fontWeight: '500' }}>Create Account 🎉</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login