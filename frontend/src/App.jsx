import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreateTrip from './pages/CreateTrip'
import BuildItinerary from './pages/BuildItinerary'
import TripList from './pages/TripList'
import Profile from './pages/Profile'
import Search from './pages/Search'
import ItineraryView from './pages/ItineraryView'
import Community from './pages/Community'
import CalendarView from './pages/CalendarView'
import Admin from './pages/Admin'
import DebugPage from './pages/DebugPage'
import SimpleTest from './pages/SimpleTest'

function App() {
  return (
    <ErrorBoundary>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/build-itinerary/:tripId" element={<BuildItinerary />} />
          <Route path="/trips" element={<TripList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/itinerary/:tripId" element={<ItineraryView />} />
          <Route path="/community" element={<Community />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/debug" element={<DebugPage />} />
          <Route path="/test" element={<SimpleTest />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App