import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST

export const InputSection = () => {
  const [message, setMessage] = useState('')

  const name = useSelector((state) => state.name)
  const email = useSelector((state) => state.email)
  const token = useSelector((state) => state.token)
  const history = useSelector((state) => state.history)
  const socket = useSelector((state) => state.socket)
  const dispatch = useDispatch()

  const sendMessage = async () => {
    try {
      if (!message) throw new Error('Message cannot be empty')

      await axios.post(
        BACKEND_HOST + '/api/v1/messages/add',
        { name, email, message },
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      )

      const data = [...history]
      const messageInstance = { from: { name, email }, message }
      data.push(messageInstance)

      socket.send(JSON.stringify(messageInstance))

      dispatch({ type: 'update_history', payload: data })
      setMessage('')
    } catch (err) {
      return toast.error(err?.response?.data?.error?.message || err.message)
    }
  }

  return (
    <form
      className="msger-inputarea"
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <input
        type="text"
        className="msger-input"
        placeholder="Enter your message..."
        value={message}
        onChange={(e) => {
          e.preventDefault()
          setMessage(e.target.value)
        }}
        onKeyUp={(e) => {
          e.preventDefault()
          if (e.key === 'Enter') {
            sendMessage()
          }
        }}
      />
      <button type="submit" className="msger-send-btn">
        Send
      </button>
    </form>
  )
}
