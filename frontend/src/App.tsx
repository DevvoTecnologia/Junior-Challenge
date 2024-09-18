import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { RingCarousel } from './components/RingCarousel'
import Login from './components/Login'
import Authenticate from './components/Authenticate'
import ProtectedRoute from './components/ProtectedRoute'
import { RingProvider } from './context/RingContext'

function App() {
  return (
    <RingProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/verify-auth" element={<Authenticate />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<RingCarousel />} />
          </Route>
        </Routes>
      </Router>
    </RingProvider>
  )
}

export default App
