import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const DebugPage = () => {
  const [debugInfo, setDebugInfo] = useState({})

  useEffect(() => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token')
    const user = sessionStorage.getItem('user') || localStorage.getItem('user')
    
    setDebugInfo({
      hasToken: !!token,
      tokenLength: token ? token.length : 0,
      hasUser: !!user,
      userString: user || 'null',
      sessionStorageToken: !!sessionStorage.getItem('token'),
      localStorageToken: !!localStorage.getItem('token'),
      sessionStorageUser: !!sessionStorage.getItem('user'),
      localStorageUser: !!localStorage.getItem('user'),
      currentUrl: window.location.href,
      userAgent: navigator.userAgent
    })
  }, [])

  const testApiConnection = async () => {
    try {
      const response = await fetch('http://localhost:8000/health')
      const data = await response.json()
      alert(`API Health Check: ${JSON.stringify(data)}`)
    } catch (error) {
      alert(`API Error: ${error.message}`)
    }
  }

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>🔧 Debug Information</h1>
        
        <div style={{ marginBottom: '2rem' }}>
          <h3>Authentication Status</h3>
          <pre style={{ 
            background: '#f5f5f5', 
            padding: '1rem', 
            borderRadius: '8px',
            fontSize: '12px',
            overflow: 'auto'
          }}>
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button onClick={testApiConnection} className="btn btn-info">
            Test API Connection
          </button>
          <Link to="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
          <Link to="/login" className="btn btn-warning">
            Go to Login
          </Link>
          <Link to="/" className="btn btn-success">
            Go to Home
          </Link>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Quick Actions</h3>
          <button 
            onClick={() => {
              sessionStorage.clear()
              localStorage.clear()
              alert('Storage cleared!')
              window.location.reload()
            }}
            className="btn btn-danger"
          >
            Clear All Storage
          </button>
        </div>
      </div>
    </div>
  )
}

export default DebugPage