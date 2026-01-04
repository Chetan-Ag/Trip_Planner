import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          background: 'transparent', 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="card" style={{ maxWidth: '500px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
            <h2>Something went wrong!</h2>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-primary"
              style={{ marginRight: '1rem' }}
            >
              Refresh Page
            </button>
            <button 
              onClick={() => window.location.href = '/'} 
              className="btn btn-info"
            >
              Go Home
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ marginTop: '1rem', textAlign: 'left' }}>
                <summary>Error Details (Development)</summary>
                <pre style={{ fontSize: '12px', overflow: 'auto', maxHeight: '200px' }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary