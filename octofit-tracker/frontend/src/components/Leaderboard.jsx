import { useEffect, useState } from 'react'

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (codespaceName && codespaceName.trim() !== '') {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  return 'http://localhost:8000'
}

const normalizeData = (payload) => {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.data)) return payload.data
  if (payload && Array.isArray(payload.results)) return payload.results
  return []
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`)
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`)

        const payload = await response.json()
        setLeaderboard(normalizeData(payload))
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard')
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="mb-3">Leaderboard</h2>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry._id || `${entry.name}-${entry.rank}`}>
                  <td>{entry.rank}</td>
                  <td>{entry.name}</td>
                  <td>{entry.team}</td>
                  <td>{entry.points ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
