import { Server } from '@brtmvdl/backend'

import { Database } from '@brtmvdl/database'

import { PORT } from './config.js'

const database = new Database({ type: 'fs', config: '/data' })

const server = new Server()

server.post('/access', ({ body, datetime = Date.now() }, res) => {
  const data = ({ datetime, ...JSON.parse(body) })

  console.log(data)

  database.in('access').new().writeMany(data)

  return res.setJSON(data)
})

server.listen(PORT)
