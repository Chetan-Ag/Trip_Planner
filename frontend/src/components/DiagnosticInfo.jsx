import { useState, useEffect } from 'react'

const DiagnosticInfo = () => {
  const [backendStatus, setBackendStatus] = useState('checking...')
  const [authStatus, setAuthStatus] = useState({})

  useEffect(() => {
    checkBackend()
    checkAuth()
  }, [])

  const checkBackend = async () => {
    try {
      const response = await fetch('http://localhost:8000/health')
      if (response.ok) {
        const data = await response.json()
        setBackendStatus(`✅ Connected - ${data.status}`)
      } else {
        setBackendStatus(`❌ Error - Status ${response.status}`)
      }
    } catch (error) {
      setBackendStatus(`❌ Failed - ${error.message}`)
    }
  }

  const checkAuth = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    const user = localStorage.getItem('user') || sessionStorage.getItem('user')
    
    setAuthStatus({
      hasToken: !!token,
      hasUser: !!user,
      tokenPreview: token ? token.substring(0, 20) + '...' : 'None',
      userInfo: user ? JSON.parse(user) : null
    })
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '8px',
      fontSize: '12px',
      maxWidth: '300px',
      zIndex: 9999
    }}>
      <div><strong>🔧 Diagnostic Info</strong></div>
      <div>Backend: {backendStatus}</div>
      <div>Token: {authStatus.hasToken ? '✅' : '❌'}</div>
      <div>User: {authStatus.hasUser ? '✅' : '❌'}</div>
      {authStatus.userInfo && (
        <div>Name: {authStatus.userInfo.name}</div>
      )}
      <div>URL: {window.location.pathname}</div>
    </div>
  )
}

export default DiagnosticInfo