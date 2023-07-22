const WebSocketServer = require('websocket').server

const socket = (server) => {
  const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: true,
  })

  const conns = []

  wsServer.on('connect', (conn) => {
    conns.push(conn)
    conn.on('message', (data) => {
      const exceptConn = [...conns]
      exceptConn.splice(exceptConn.indexOf(conn), 1)
      for (const conn of exceptConn) {
        conn.send(data.utf8Data)
      }
    })

    conn.on('close', () => conns.splice(conns.indexOf(conn), 1))
  })
}

module.exports = { socket }
