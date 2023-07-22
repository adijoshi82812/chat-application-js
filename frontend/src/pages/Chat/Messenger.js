import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import avatar1 from '../../assets/images/avatar1.gif'
import avatar2 from '../../assets/images/avatar2.gif'

export const Messenger = () => {
  const messageEndRef = useRef(null)

  const email = useSelector((state) => state.email)
  const history = useSelector((state) => state.history)

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behaviour: 'smooth' })
  })

  return (
    <main className="msger-chat">
      {history.map((data, index) => {
        return (
          <div
            className={
              data.from.email === email ? 'msg right-msg' : 'msg left-msg'
            }
            key={index}
            ref={messageEndRef}
          >
            <div
              className="msg-img"
              style={{
                backgroundImage: `url(${
                  data.from.email === email ? avatar1 : avatar2
                })`,
              }}
            ></div>

            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">{data.from.name}</div>
                <div className="msg-info-time">12:46</div>
              </div>

              <div className="msg-text">{data.message}</div>
            </div>
          </div>
        )
      })}
    </main>
  )
}
