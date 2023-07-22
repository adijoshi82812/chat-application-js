import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('name')

    dispatch({ type: 'update_token', payload: null })
    dispatch({ type: 'update_email', payload: null })
    dispatch({ type: 'update_name', payload: null })

    navigate('/')
  }

  return (
    <header className="msger-header">
      <div className="msger-header-title">
        <i className="fas fa-comment-alt"></i> Chat Application
      </div>
      <div className="msger-header-options">
        <div className="dropdown is-hoverable is-right">
          <div className="dropdown-trigger">
            <span>
              <i className="fas fa-cog" />
            </span>
          </div>
          <div className="dropdown-menu">
            <div className="dropdown-content">
              <div className="dropdown-item">
                <p
                  style={{
                    cursor: 'pointer',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    logout()
                  }}
                >
                  <span>Logout</span>
                  <i className="fas fa-right-from-bracket" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
