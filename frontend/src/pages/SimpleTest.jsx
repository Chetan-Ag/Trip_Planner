import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const SimpleTest = () => {
  const [status, setStatus] = useState('Loading...')
  const [authInfo, setAuthInfo] = useState({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    console.log('SimpleTest component mounted')
    setMounted(true)
    
    // Check authentication status
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    const user = localStorage.getItem('user') || sessionStorage.getItem('user')
    
    console.log('Auth check - Token:', !!token, 'User:', !!user)
    
    setAuthInfo({
      hasToken: !!token,
      hasUser: !!user,
      tokenPreview: token ? token.substring(0, 20) + '...' : 'None',
      userPreview: user ? JSON.parse(user).name || 'Unknown' : 'None'
    })
    
    setStatus('Ready')
  }, [])

  const testBackend = async () => {
    try {
      const response = await fetch('http://localhost:8000/health')
      const data = await response.json()
      alert(`Backend Status: ${JSON.stringify(data, null, 2)}`)
    } catch (error) {
      alert(`Backend Error: ${error.message}`)
    }
  }

  if (!mounted) {
    return (
      <div style={{ 
        background: 'transparent', 
        minHeight: '100vh', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div className="card">
          <h2>Loading...</h2>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      background: 'transparent', 
      minHeight: '100vh', 
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1>🔧 Simple Test Page</h1>
        <p>Status: <strong>{status}</strong></p>
        
        <div style={{ marginTop: '2rem' }}>
          <h3>Authentication Info:</h3>
          <ul>
            <li>Has Token: {authInfo.hasToken ? '✅ Yes' : '❌ No'}</li>
            <li>Has User: {authInfo.hasUser ? '✅ Yes' : '❌ No'}</li>
            <li>Token Preview: {authInfo.tokenPreview}</li>
            <li>User Name: {authInfo.userPreview}</li>
          </ul>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            onClick={testBackend}
            style={{
              padding: '10px 20px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Test Backend
          </button>
          
          <Link 
            to="/dashboard"
            style={{
              padding: '10px 20px',
              background: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              display: 'inline-block'
            }}
          >
            Go to Dashboard
          </Link>
          
          <Link 
            to="/login"
            style={{
              padding: '10px 20px',
              background: '#ffc107',
              color: 'black',
              textDecoration: 'none',
              borderRadius: '4px',
              display: 'inline-block'
            }}
          >
            Go to Login
          </Link>
          
          <button 
            onClick={() => {
              localStorage.clear()
              sessionStorage.clear()
              alert('Storage cleared!')
              window.location.reload()
            }}
            style={{
              padding: '10px 20px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear Storage
          </button>
        </div>
      </div>
    </div>
  )
}

export default SimpleTest