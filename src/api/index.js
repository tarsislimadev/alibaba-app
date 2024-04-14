const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const { Database } = require('@brtmvdl/database')

const db = new Database({ type: 'fs', config: '/data' })
const PORT = 80

const app = express()
const server = createServer(app)
const io = new Server(server, { cors: '*' })

const save = (data = {}, datetime = Date.now()) => db.in('access').new().writeMany({ datetime, ...data })

app.use(express.static('public'))

io.on('connection', (socket) => {
  const datetime = Date.now()
  console.log('connection', { datetime })
  db.in('connection').new().writeMany({ datetime })

  socket.on('message', (message) => {
    const datetime = Date.now()
    console.log('message', { datetime, message })
    db.in('message').new().writeMany({ datetime, message })
  })
})

io.on('message', (data) => console.info(data))

server.listen(PORT)
