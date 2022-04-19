import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import path from 'path'
import { fileURLToPath } from 'node:url'

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

//view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket) => {
    console.log(socket.id)
})

//start server
httpServer.listen(process.env.PORT || 3001, () => {
    console.log(`Server Started on port ${process.env.PORT || 3001}`)
})