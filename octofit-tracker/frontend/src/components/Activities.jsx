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

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`)
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`)

        const payload = await response.json()
        setActivities(normalizeData(payload))
      } catch (err) {
        setError(err.message || 'Unable to load activities')
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (loading) return <div className="alert alert-info">Loading activities...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="mb-3">Activities</h2>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Minutes</th>
                <th>Distance</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || `${activity.user}-${activity.date}`}>
                  <td>{activity.user}</td>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes}</td>
                  <td>{activity.distanceKm ?? 0}</td>
                  <td>{activity.caloriesBurned ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Activities
