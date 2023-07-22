import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'

import { Header } from './Header'
import { InputSection } from './InputSection'
import { Messenger } from './Messenger'

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST

export const Chat = () => {
  const [newMessage, setNewMessage] = useState('')

  const history = useSelector((state) => state.history)
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch()

  const getHistory = async () => {
    try {
      const { data } = await axios.get(
        BACKEND_HOST + '/api/v1/messages/history',
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      )

      dispatch({ type: 'update_history', payload: data })
    } catch (err) {
      return toast.error(err?.response?.data?.error?.message || err.message)
    }
  }

  const connect = () => {
    const socket = new WebSocket('ws://localhost:8080')
    dispatch({ type: 'update_socket', payload: socket })
    socket.onmessage = (message) => {
      message = JSON.parse(message.data)
      setNewMessage(message)
    }
  }

  useEffect(() => {
    getHistory()
    connect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (newMessage) {
      const data = [...history]
      data.push(newMessage)
      dispatch({ type: 'update_history', payload: data })
      setNewMessage('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage])

  return (
    <>
      <Toaster position="top-center" />
      <div className="chat">
        <section className="msger">
          <Header />
          <Messenger />
          <InputSection />
        </section>
      </div>
    </>
  )
}
