import { Routes, Route } from 'react-router-dom'

import { IsUser, ProtectedRoute } from './routes'
import { Chat, Login, Signup } from './pages'

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <IsUser>
            <Login />
          </IsUser>
        }
      />

      <Route
        path="/signup"
        element={
          <IsUser>
            <Signup />
          </IsUser>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
