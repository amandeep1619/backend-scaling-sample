import { CustomError } from "../interfaces/customError"
import { ICreateUser, IUpdateUser } from "../interfaces/users"
import { HTTP_STATUS, HTTP_STATUS_MESSAGES } from "../lib/constants"
import { sendWelcomeEmail } from "../lib/mailer"
import { generateActivationLink, handleError } from "../lib/utils"
import { User } from "../schema/users"
import { Types } from 'mongoose'
import jwt from 'jsonwebtoken'

const getUserDetails = async (id: string) => {
  try {
    return await User.findOne({ _id: new Types.ObjectId(id)}).select("-password")
  } catch (error) {
    return handleError(error)
  }
}

const createUser = async (reqBody: ICreateUser): Promise<string> => {
  try {
    const {
      email,
      password
    } = reqBody
    const user = {
      email,
      password
    }
    const createdUser = await User.create(user)
    const userId = createdUser._id.toHexString()
    const activationLink = generateActivationLink(userId)
    await sendWelcomeEmail(email, "buddy", activationLink)
    return userId
  } catch (error) {
    return handleError(error)
  }
}

const updateUserDetails = async (id: string, reqBody: IUpdateUser): Promise<string> => {
  try {
    const {
      fullName,
      age
    } = reqBody
    // checking existing user
    const existingUser = await User.findOne({_id: new Types.ObjectId(id)})
    if (!existingUser) {
      throw new CustomError({ message: HTTP_STATUS_MESSAGES.NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }
    // updating details
    existingUser.fullName = fullName,
    existingUser.age = age
    existingUser.updatedAt = new Date()

    await User.updateOne({_id: new Types.ObjectId(id)}, existingUser)

    return id
  } catch (error) {
    return handleError(error)
  }
}

const deleteUserDetails = async (id: string): Promise<void> => {
  try {
    await User.deleteOne({_id: new Types.ObjectId(id)})
    // NEED TO DO CLEANUP HERE
    return
  } catch (error) {
    return handleError(error)
  }
}

const verifyUserAccount = async (token: string): Promise<void> =>{
  try {
   const decoded = jwt.verify(token, process.env.JWT_ACTIVATION_SECRET!) as { sub: string };
   const existingUser = await User.findOne({
    _id: new Types.ObjectId(decoded.sub),
    isActive: false
   })
   if (!existingUser) {
    throw new CustomError({ message: "User is Already Active", status: HTTP_STATUS.OK })
   }
   await User.updateOne({
    _id: new Types.ObjectId(decoded.sub)
   },{
    isActive: true
   })
  } catch (error) {
    return handleError(error)
  }
}

export const userService = {
  createUser,
  getUserDetails,
  updateUserDetails,
  deleteUserDetails,
  verifyUserAccount
}