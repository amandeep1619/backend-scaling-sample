import express from 'express'
import * as dotenv from 'dotenv'
import { handleAppRouting } from './routes'

dotenv.config()

const app = express()
const APP_PORT = process.env.APP_PORT || 8000
handleAppRouting(app)


app.listen(APP_PORT, () => {
  console.log(`Server is running on http://localhost:${APP_PORT}`)
})