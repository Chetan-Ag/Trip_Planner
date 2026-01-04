import axios from 'axios'
import config from '../utils/config'

const API_BASE_URL = config.API_BASE_URL

// Create axios instance with interceptors
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

const authApi = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials)
    const { access_token, token_type, user } = response.data
    // Store in both for compatibility
    localStorage.setItem('token', access_token)
    localStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('token', access_token)
    sessionStorage.setItem('user', JSON.stringify(user))
    return response.data
  },

  register: async (userData) => {
    console.log('Attempting registration with:', { ...userData, password: '[HIDDEN]' })
    
    try {
      const response = await apiClient.post('/auth/register', userData)
      console.log('Registration response:', response.data)
      const { access_token, token_type, user } = response.data
      
      if (!access_token || !user) {
        console.error('Invalid response structure:', response.data)
        throw new Error('Invalid response from server')
      }
      
      // Store in both for compatibility
      localStorage.setItem('token', access_token)
      localStorage.setItem('user', JSON.stringify(user))
      sessionStorage.setItem('token', access_token)
      sessionStorage.setItem('user', JSON.stringify(user))
      
      console.log('User data stored successfully')
      return response.data
    } catch (error) {
      console.error('Registration API error:', error)
      if (error.response) {
        console.error('Error response:', error.response.data)
        console.error('Error status:', error.response.status)
        // Handle validation errors
        if (error.response.data.detail && Array.isArray(error.response.data.detail)) {
          const errorMessages = error.response.data.detail.map(err => err.msg).join(', ')
          throw new Error(errorMessages)
        }
      }
      throw error
    }
  },

  logout: async () => {
    try {
      await apiClient.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    }
    // Clear both storages
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    return { message: 'Logged out successfully' }
  },

  getProfile: async () => {
    const response = await apiClient.get('/auth/profile')
    return response.data
  },

  updateProfile: async (userData) => {
    const response = await apiClient.put('/auth/profile', userData)
    return response.data
  }
}

export default authApi