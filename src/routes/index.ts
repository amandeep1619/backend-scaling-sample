import { Express } from "express"
import userRoutes from './userRoutes'
import noteBookRoutes from './noteBooks'

export const handleAppRouting = (app: Express) => {
  app.use("/api/v1/users", userRoutes)
  app.use("/api/v1/note-books", noteBookRoutes)

}