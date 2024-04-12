import  { Server } from '@brtmvdl/backend'

// import  { Database } from '@brtmvdl/database'

import  { PORT } from './config.js'

// const database = new Database({ type: 'fs', config: '/data' })

const server = new Server()

server.listen(PORT)
