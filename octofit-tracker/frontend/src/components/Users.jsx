import { useEffect, useState } from 'react'

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (codespaceName && codespaceName.trim() !== '') {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  return 'http://localhost:8000'
}

const normalizeData = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results
  }

  return []
}

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setUsers(normalizeData(payload))
      } catch (err) {
        setError(err.message || 'Unable to load users')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return <div className="alert alert-info">Loading users...</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="mb-3">Users</h2>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
                <th>Fitness Level</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.team}</td>
                  <td>{user.fitnessLevel}</td>
                  <td>{user.totalPoints ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Users
