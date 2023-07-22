import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST

export const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignup = async () => {
    try {
      if (!credentials.name) throw new Error('Name required')
      if (!credentials.email) throw new Error('Email required')
      if (!credentials.password) throw new Error('Password required')

      const { data } = await axios.post(BACKEND_HOST + '/api/v1/users/signup', {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      })

      localStorage.setItem('name', data.name)
      localStorage.setItem('email', data.email)
      localStorage.setItem('token', data.token)

      dispatch({ type: 'update_name', payload: data.name })
      dispatch({ type: 'update_email', payload: data.email })
      dispatch({ type: 'update_token', payload: data.token })

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
            <h1 className="title is-4">Signup</h1>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Enter your name"
                  value={credentials.name}
                  onChange={(e) => {
                    e.preventDefault()
                    setCredentials((data) => ({
                      ...data,
                      name: e.target.value,
                    }))
                  }}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
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
                      handleSignup()
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
                    handleSignup()
                  }}
                >
                  Signup
                </button>
              </div>
              <div className="control">
                <button
                  className="button is-info is-light"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate('/')
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
