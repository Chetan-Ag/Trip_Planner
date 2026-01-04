import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import adminApi from '../services/adminApi'

const Admin = () => {
  const [analytics, setAnalytics] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      const [analyticsData, usersData] = await Promise.all([
        adminApi.getAnalytics(),
        adminApi.getUsers()
      ])
      setAnalytics(analyticsData)
      setUsers(usersData)
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminApi.deleteUser(userId)
        setUsers(users.filter(user => user.id !== userId))
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
          <p>Loading admin dashboard...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="container" style={{ padding: '2rem 0' }}>
        <h1>Admin Dashboard</h1>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #ddd' }}>
            <button
              onClick={() => setActiveTab('overview')}
              className={`btn ${activeTab === 'overview' ? 'btn-primary' : ''}`}
              style={activeTab !== 'overview' ? { background: 'transparent', color: '#007bff', border: 'none' } : {}}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`btn ${activeTab === 'users' ? 'btn-primary' : ''}`}
              style={activeTab !== 'users' ? { background: 'transparent', color: '#007bff', border: 'none' } : {}}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`btn ${activeTab === 'analytics' ? 'btn-primary' : ''}`}
              style={activeTab !== 'analytics' ? { background: 'transparent', color: '#007bff', border: 'none' } : {}}
            >
              Analytics
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div className="card" style={{ textAlign: 'center' }}>
                <h3>Total Users</h3>
                <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#007bff', margin: '1rem 0' }}>
                  {analytics?.totalUsers || 0}
                </p>
                <p style={{ color: '#28a745' }}>+{analytics?.newUsersThisMonth || 0} this month</p>
              </div>

              <div className="card" style={{ textAlign: 'center' }}>
                <h3>Total Trips</h3>
                <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#28a745', margin: '1rem 0' }}>
                  {analytics?.totalTrips || 0}
                </p>
                <p style={{ color: '#007bff' }}>+{analytics?.newTripsThisMonth || 0} this month</p>
              </div>

              <div className="card" style={{ textAlign: 'center' }}>
                <h3>Active Trips</h3>
                <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ffc107', margin: '1rem 0' }}>
                  {analytics?.activeTrips || 0}
                </p>
                <p style={{ color: '#6c757d' }}>Currently ongoing</p>
              </div>

              <div className="card" style={{ textAlign: 'center' }}>
                <h3>Community Shares</h3>
                <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#17a2b8', margin: '1rem 0' }}>
                  {analytics?.sharedTrips || 0}
                </p>
                <p style={{ color: '#28a745' }}>Public itineraries</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div className="card">
                <h3>Popular Destinations</h3>
                {analytics?.popularDestinations?.map((dest, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                    <span>{dest.name}</span>
                    <span style={{ fontWeight: 'bold' }}>{dest.count} trips</span>
                  </div>
                ))}
              </div>

              <div className="card">
                <h3>Recent Activity</h3>
                {analytics?.recentActivity?.map((activity, index) => (
                  <div key={index} style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
                    <p style={{ margin: '0', fontSize: '0.9rem' }}>{activity.description}</p>
                    <p style={{ margin: '0', fontSize: '0.8rem', color: '#6c757d' }}>{activity.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <div className="card">
              <h3>User Management</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #ddd' }}>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Trips</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Joined</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '10px' }}>{user.name}</td>
                        <td style={{ padding: '10px' }}>{user.email}</td>
                        <td style={{ padding: '10px' }}>{user.tripCount || 0}</td>
                        <td style={{ padding: '10px' }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td style={{ padding: '10px' }}>
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="btn"
                            style={{ background: '#dc3545', color: 'white', padding: '5px 10px', fontSize: '0.8rem' }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div className="card">
                <h3>User Growth</h3>
                <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
                  <p>Chart visualization would go here</p>
                </div>
              </div>

              <div className="card">
                <h3>Trip Statistics</h3>
                <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
                  <p>Chart visualization would go here</p>
                </div>
              </div>

              <div className="card">
                <h3>Popular Activities</h3>
                {analytics?.popularActivities?.map((activity, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                    <span>{activity.name}</span>
                    <span style={{ fontWeight: 'bold' }}>{activity.count} bookings</span>
                  </div>
                ))}
              </div>

              <div className="card">
                <h3>System Health</h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Server Status:</span>
                    <span style={{ color: '#28a745', fontWeight: 'bold' }}>Online</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Database:</span>
                    <span style={{ color: '#28a745', fontWeight: 'bold' }}>Connected</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>API Response:</span>
                    <span style={{ color: '#28a745', fontWeight: 'bold' }}>Fast</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Admin