import express from 'express'
import WebSocket from 'ws'
import http from 'http'
import cors from 'cors'

export const router = express.Router()
export const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

export const server = http.createServer(app)
export const wss = new WebSocket.Server({ server })