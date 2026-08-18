import { NavLink, Route, Routes, BrowserRouter } from 'react-router-dom'
import Users from './components/Users'
import Teams from './components/Teams'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Workouts from './components/Workouts'

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded mb-4 shadow-sm">
          <div className="container-fluid">
            <span className="navbar-brand fw-bold">Octofit Tracker</span>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {navItems.map((item) => (
                  <li key={item.to} className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link ${isActive ? 'active' : ''}`
                      }
                      to={item.to}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
