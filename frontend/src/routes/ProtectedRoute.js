import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const ProtectedRoute = (props) => {
  const token = useSelector((state) => state.token)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return props.children
}
