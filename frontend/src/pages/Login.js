import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      if (!credentials.email) throw new Error('Email required')
      if (!credentials.password) throw new Error('Password required')

      const { data } = await axios.post(BACKEND_HOST + '/api/v1/users/login', {
        email: credentials.email,
        password: credentials.password,
      })

      localStorage.setItem('token', data.token)
      localStorage.setItem('email', data.email)
      localStorage.setItem('name', data.name)

      dispatch({ type: 'update_token', payload: data.token })
      dispatch({ type: 'update_email', payload: data.email })
      dispatch({ type: 'update_name', payload: data.name })

      navigate('/dashboard')
    } catch (err) {
      return toast.error(err?.response?.data?.error?.message || err.message)
    }
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className="card-wrapper">
        <div className="card" style={{ width: '25%' }}>
          <div className="card-content">
            <h1 className="title is-4">Login</h1>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Enter your email"
                  value={credentials.email}
                  onChange={(e) => {
                    e.preventDefault()
                    setCredentials((data) => ({
                      ...data,
                      email: e.target.value,
                    }))
                  }}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => {
                    e.preventDefault()
                    setCredentials((data) => ({
                      ...data,
                      password: e.target.value,
                    }))
                  }}
                  onKeyUp={(e) => {
                    e.preventDefault()
                    if (e.key === 'Enter') {
                      handleLogin()
                    }
                  }}
                />
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button
                  className="button is-info"
                  onClick={(e) => {
                    e.preventDefault()
                    handleLogin()
                  }}
                >
                  Login
                </button>
              </div>

              <div className="control">
                <button
                  className="button is-info is-light"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate('/signup')
                  }}
                >
                  Signup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
