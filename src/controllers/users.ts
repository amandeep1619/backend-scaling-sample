import { Request, Response } from "express";
import { handleErrorResponse, handleSuccessResponse } from "../lib/utils";
import { userService } from "../services/users";
import { HTTP_STATUS, HTTP_STATUS_MESSAGES } from "../lib/constants";
import { CustomError } from "../interfaces/customError";

export const createUser = async (req: Request, res: Response) => {
  try {
    const userId = await userService.createUser(req.body)
    return handleSuccessResponse({ res, message: HTTP_STATUS_MESSAGES.CREATED, data: [{ id: userId }] })
  } catch (error) {
    return handleErrorResponse(res, error)
  }
}

export const fetchUserDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const userDetails = await userService.getUserDetails(userId as string)
    if (!userDetails) {
      throw new CustomError({ message: HTTP_STATUS_MESSAGES.NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }
    return handleSuccessResponse({ res, message: HTTP_STATUS_MESSAGES.OK, data: [userDetails] })
  } catch (error) {
    return handleErrorResponse(res, error)
  }
}

export const updateUserDetails = async (req: Request, res: Response) => {
  try {
    const userId = await userService.updateUserDetails(req.params.id as string, req.body)
    return handleSuccessResponse({ res, message: HTTP_STATUS_MESSAGES.OK, data: [{ id: userId }] })
  } catch (error) {
    return handleErrorResponse(res, error)
  }
}

export const deleteUserDetails = async (req: Request, res: Response) => {
  try {
    await userService.deleteUserDetails(req.params.id as string)
  } catch (error) {
    return handleErrorResponse(res, error)
  }
}

export const verifyUser = async (req: Request, res: Response) => {
  try {
    await userService.verifyUserAccount(req.query.token as string)
    return handleSuccessResponse({ res, message: HTTP_STATUS_MESSAGES.OK })
  } catch (error) {
    return handleErrorResponse(res, error)
  }
}