import { createStore } from 'redux'

const initialState = {
  token: localStorage.getItem('token') || null,
  email: localStorage.getItem('email') || null,
  name: localStorage.getItem('name') || null,
  history: [],
  socket: null,
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'update_token':
      return (state = { ...state, token: action.payload })

    case 'update_email':
      return (state = { ...state, email: action.payload })

    case 'update_name':
      return (state = { ...state, name: action.payload })

    case 'update_history':
      return (state = { ...state, history: action.payload })

    case 'update_socket':
      return (state = { ...state, socket: action.payload })

    default:
      return state
  }
}

export const store = createStore(reducers)
