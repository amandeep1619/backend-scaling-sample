import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from "../interfaces/common";
import { handleErrorResponse } from "../lib/utils";
import { HTTP_STATUS, HTTP_STATUS_MESSAGES } from "../lib/constants";
import { CustomError } from "../interfaces/customError";

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new CustomError({ message: HTTP_STATUS_MESSAGES.UNAUTHORIZED, status: HTTP_STATUS.UNAUTHORIZED })
    }

    const token = authHeader.split(' ')[1];


    const secret = process.env.JWT_SESSION_KEY as string
    const decoded = jwt.verify(token, secret);

    (req as any).user = decoded;

    next();
  } catch (error) {
    return handleErrorResponse(res, error)
  }
};