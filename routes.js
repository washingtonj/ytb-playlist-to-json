import express from 'express'
import { playlist } from './src/controllers/YoutubeController.js'

const route = express.Router()

route.get("/yt/:id", playlist)

export default route 