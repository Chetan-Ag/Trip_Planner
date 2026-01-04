import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {}
}

const searchApi = {
  searchCities: async (query, filters = {}) => {
    const token = localStorage.getItem('token')
    const endpoint = token ? '/search/cities' : '/search/public/cities'
    const params = new URLSearchParams(query ? { query, ...filters } : filters)
    const response = await axios.get(`${API_BASE_URL}${endpoint}?${params}`, getAuthHeaders())
    return response.data
  },

  searchActivities: async (query, filters = {}) => {
    const token = localStorage.getItem('token')
    const endpoint = token ? '/search/activities' : '/search/public/activities'
    const params = new URLSearchParams(query ? { query, ...filters } : filters)
    const response = await axios.get(`${API_BASE_URL}${endpoint}?${params}`, getAuthHeaders())
    return response.data
  },

  getPopularCities: async () => {
    try {
      const token = localStorage.getItem('token')
      const endpoint = token ? '/search/popular-cities' : '/search/public/cities'
      const response = await axios.get(`${API_BASE_URL}${endpoint}`, getAuthHeaders())
      return response.data || []
    } catch (error) {
      console.error('Error fetching popular cities:', error)
      return [] // Return empty array instead of throwing
    }
  },

  getRecommendedActivities: async (cityId) => {
    const token = localStorage.getItem('token')
    const endpoint = token ? `/search/cities/${cityId}/activities` : `/search/public/activities?city_id=${cityId}`
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, getAuthHeaders())
    return response.data
  },

  getCommunityTrips: async () => {
    const response = await axios.get(`${API_BASE_URL}/community/trips`, getAuthHeaders())
    return response.data
  }
}

export default searchApi