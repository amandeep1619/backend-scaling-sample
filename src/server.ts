import express from 'express'
import * as dotenv from 'dotenv'
import { handleAppRouting } from './routes'
import mongoose from 'mongoose'
dotenv.config()

const app = express()
app.use(express.json())
const APP_PORT = process.env.APP_PORT || 8000
handleAppRouting(app)

mongoose.connect(process.env.DB_URL as string).then(() => {
  console.log("DB connected successfully")
  app.listen(APP_PORT, () => {
    console.log(`Server is running on http://localhost:${APP_PORT}`)
  })
}).catch((err) => {
  console.log('Error occurred while starting the app', err)
})
