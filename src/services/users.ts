import { ICreateUser } from "../interfaces/users"
import { handleError } from "../lib/utils"

const getUserDetails = async (id: string) => {
  try {
    
  } catch (error) {
    return handleError(error)
  }
}

const createUser = async (reqBody: ICreateUser) => {
  try {
    const {
      email,
      password
    } = reqBody
    
  } catch (error) {
    
  }
}