import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
})

const adminApi = {
  getAnalytics: async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/analytics`, getAuthHeaders())
    return response.data
  },

  getUsers: async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/users`, getAuthHeaders())
    return response.data
  },

  getUserStats: async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/stats/users`, getAuthHeaders())
    return response.data
  },

  getTripStats: async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/stats/trips`, getAuthHeaders())
    return response.data
  },

  getPopularDestinations: async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/stats/destinations`, getAuthHeaders())
    return response.data
  },

  deleteUser: async (userId) => {
    const response = await axios.delete(`${API_BASE_URL}/admin/users/${userId}`, getAuthHeaders())
    return response.data
  }
}

export default adminApi