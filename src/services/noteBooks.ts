import { CustomError } from "../interfaces/customError"
import { ICreateNoteBook, IShareNoteBook, IUpdateNoteBook } from "../interfaces/noteBooks"
import { HTTP_STATUS } from "../lib/constants"
import { handleError } from "../lib/utils"
import { NoteBook } from "../schema/noteBooks"
import { Types } from 'mongoose'
import { userService } from "./users"

const getNoteBookDetails = async (id: string) => {
  try {
    return await NoteBook.findOne({ _id: new Types.ObjectId(id) })
  } catch (error) {
    return handleError(error)
  }
}

const getNoteBookList = async (userId: string) => {
  try {
    const noteBookList = await NoteBook.find({
      $or: [
        { userId: new Types.ObjectId(userId) },
        { sharedWith: new Types.ObjectId(userId) }
      ]
    })
      .populate('userId', 'name email')
      .sort({ updatedAt: -1 });
    return noteBookList
  } catch (error) {
    return handleError(error)
  }
}

const createNoteBook = async (reqBody: ICreateNoteBook): Promise<string> => {
  try {
    const {
      name,
      userId
    } = reqBody
    const userExistence = await userService.getUserDetails(userId)
    if (!userExistence) {
      throw new CustomError({ message: "User not Found", status: HTTP_STATUS.NOT_FOUND })
    }

    const noteBook = {
      userId: userExistence._id,
      name
    }
    const createdNoteBook = await NoteBook.create(noteBook)
    const noteBookId = createdNoteBook._id.toHexString()
    return noteBookId
  } catch (error) {
    return handleError(error)
  }
}

const updateNoteBookDetails = async (id: string, reqBody: IUpdateNoteBook): Promise<string> => {
  try {
    const {
      name
    } = reqBody
    // checking existing user TODO - use the current logged in user information 
    // const existingUser = await User.findOne({_id: new Types.ObjectId(id)})
    // if (!existingUser) {
    //   throw new CustomError({ message: HTTP_STATUS_MESSAGES.NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    // }
    const existingNoteBook = await NoteBook.findOne({ _id: new Types.ObjectId(id) })
    if (!existingNoteBook) {
      throw new CustomError({ message: "NoteBook not Found", status: HTTP_STATUS.NOT_FOUND })
    }

    existingNoteBook.name = name
    existingNoteBook.updatedAt = new Date()

    await NoteBook.updateOne({ _id: new Types.ObjectId(id) }, existingNoteBook)

    return id
  } catch (error) {
    return handleError(error)
  }
}

const deleteNoteBook = async (id: string): Promise<void> => {
  try {
    await NoteBook.deleteOne({ _id: new Types.ObjectId(id) })
    return
  } catch (error) {
    return handleError(error)
  }
}

const shareNoteBook = async (reqBody: IShareNoteBook): Promise<void> => {
  try {
    const {
      userId,
      id
    } = reqBody
    const existingNoteBook = await NoteBook.findOne({ _id: new Types.ObjectId(id) })
    if (!existingNoteBook) {
      throw new CustomError({ message: "NoteBook not Found", status: HTTP_STATUS.NOT_FOUND })
    }
    const sharedIds = [
      ...existingNoteBook.sharedWith,
      ...userId.map(id => new Types.ObjectId(id))
    ]
    existingNoteBook.sharedWith = sharedIds
    await NoteBook.updateOne({ _id: new Types.ObjectId(id) }, existingNoteBook)
  } catch (error) {
    return handleError(error)
  }
}

export const noteBookService = {
  getNoteBookDetails,
  createNoteBook,
  updateNoteBookDetails,
  deleteNoteBook,
  shareNoteBook,
  getNoteBookList
}