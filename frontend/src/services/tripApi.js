import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  if (!token) {
    throw new Error('No authentication token found')
  }
  return {
    headers: { Authorization: `Bearer ${token}` }
  }
}

const formatDateForAPI = (dateString) => {
  if (!dateString) return dateString
  // Convert YYYY-MM-DD to MM/DD/YYYY
  const date = new Date(dateString)
  return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`
}

const tripApi = {
  getTrips: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trips`, getAuthHeaders())
      return response.data || []
    } catch (error) {
      console.error('Error fetching trips:', error)
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
        window.location.href = '/login'
      }
      return [] // Return empty array instead of throwing
    }
  },

  getTrip: async (tripId) => {
    const response = await axios.get(`${API_BASE_URL}/trips/${tripId}`, getAuthHeaders())
    return response.data
  },

  createTrip: async (tripData) => {
    const response = await axios.post(`${API_BASE_URL}/trips`, tripData, getAuthHeaders())
    return response.data
  },

  updateTrip: async (tripId, tripData) => {
    const response = await axios.put(`${API_BASE_URL}/trips/${tripId}`, tripData, getAuthHeaders())
    return response.data
  },

  deleteTrip: async (tripId) => {
    const response = await axios.delete(`${API_BASE_URL}/trips/${tripId}`, getAuthHeaders())
    return response.data
  },

  getItinerary: async (tripId) => {
    const response = await axios.get(`${API_BASE_URL}/trips/${tripId}/itinerary`, getAuthHeaders())
    return response.data
  },

  updateItinerary: async (tripId, itineraryData) => {
    const response = await axios.put(`${API_BASE_URL}/trips/${tripId}/itinerary`, itineraryData, getAuthHeaders())
    return response.data
  },

  addItinerarySection: async (tripId, sectionData) => {
    const response = await axios.post(`${API_BASE_URL}/trips/${tripId}/sections`, sectionData, getAuthHeaders())
    return response.data
  },

  updateItinerarySection: async (tripId, sectionId, sectionData) => {
    const response = await axios.put(`${API_BASE_URL}/trips/${tripId}/sections/${sectionId}`, sectionData, getAuthHeaders())
    return response.data
  },

  deleteItinerarySection: async (tripId, sectionId) => {
    const response = await axios.delete(`${API_BASE_URL}/trips/${tripId}/sections/${sectionId}`, getAuthHeaders())
    return response.data
  },

  finalizeTrip: async (tripId) => {
    const response = await axios.put(`${API_BASE_URL}/trips/${tripId}/finalize`, {}, getAuthHeaders())
    return response.data
  }
}

export default tripApi