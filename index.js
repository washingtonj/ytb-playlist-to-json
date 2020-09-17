import express from 'express'
import Routes from './routes.js'

const server = express()
const port = 3030

server.use(Routes)

server.listen(port, () => {
    console.log(`Estamos online na porta ${port}`)
})