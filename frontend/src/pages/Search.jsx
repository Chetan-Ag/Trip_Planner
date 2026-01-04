import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ActivityCard from '../components/ActivityCard'
import searchApi from '../services/searchApi'

const Search = () => {
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('city') || '')
  const [searchType, setSearchType] = useState('cities')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    minCost: '',
    maxCost: '',
    popularity: 'all'
  })

  useEffect(() => {
    if (searchQuery) {
      handleSearch()
    }
  }, [])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      const searchFilters = {
        max_price: filters.maxCost || undefined,
        category: filters.popularity !== 'all' ? filters.popularity : undefined
      }

      const data = searchType === 'cities' 
        ? await searchApi.searchCities(searchQuery, searchFilters)
        : await searchApi.searchActivities(searchQuery, searchFilters)
      
      setResults(data || [])
    } catch (error) {
      console.error('Error searching:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const addToTrip = (item) => {
    // This would typically open a modal to select which trip to add to
    alert(`Added "${item.name}" to your trip planning list!`)
  }

  return (
    <div>
      <Navbar />
      <div className="container" style={{ padding: '2rem 0' }}>
        <h1>Search Cities & Activities</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
          <div>
            <div className="card">
              <h3>Search</h3>
              <div className="form-group">
                <label>Search Type</label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="cities">Cities</option>
                  <option value="activities">Activities</option>
                </select>
              </div>

              <div className="form-group">
                <label>Search Query</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search for ${searchType}...`}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>

              <button onClick={handleSearch} className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
                Search
              </button>

              <h4>Filters</h4>
              <div className="form-group">
                <label>Min Cost ($)</label>
                <input
                  type="number"
                  value={filters.minCost}
                  onChange={(e) => setFilters({...filters, minCost: e.target.value})}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Max Cost ($)</label>
                <input
                  type="number"
                  value={filters.maxCost}
                  onChange={(e) => setFilters({...filters, maxCost: e.target.value})}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Popularity</label>
                <select
                  value={filters.popularity}
                  onChange={(e) => setFilters({...filters, popularity: e.target.value})}
                >
                  <option value="all">All</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <button onClick={handleSearch} className="btn" style={{ width: '100%', background: '#28a745', color: 'white' }}>
                Apply Filters
              </button>
            </div>
          </div>

          <div>
            {loading ? (
              <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <p>Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div>
                <h2>Search Results ({results.length})</h2>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {results.map(item => (
                    searchType === 'activities' ? (
                      <ActivityCard key={item.id} activity={item} onAdd={addToTrip} />
                    ) : (
                      <div key={item.id} className="card">
                        <h3>{item.name}</h3>
                        <p><strong>Country:</strong> {item.country}</p>
                        {item.description && <p>{item.description}</p>}
                        {item.latitude && item.longitude && (
                          <p><strong>Location:</strong> {item.latitude}, {item.longitude}</p>
                        )}
                        <button onClick={() => addToTrip(item)} className="btn btn-primary">
                          Explore Activities
                        </button>
                      </div>
                    )
                  ))}
                </div>
              </div>
            ) : searchQuery ? (
              <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <h3>No results found</h3>
                <p>Try adjusting your search query or filters.</p>
              </div>
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <h3>Start Your Search</h3>
                <p>Enter a search query to find cities and activities for your trip.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Search