import { Express } from "express"
import userRoutes from './userRoutes'


export const handleAppRouting = (app: Express) => {
  app.use("/api/v1/users", userRoutes)
}