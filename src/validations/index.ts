import { NextFunction, Request, Response } from 'express';
import Joi from 'joi'
import { handleErrorResponse } from '../lib/utils';
import { CustomError } from '../interfaces/customError';
import { HTTP_STATUS, HTTP_STATUS_MESSAGES } from '../lib/constants';
import { AuthenticatedRequest } from '../interfaces/common';
import { createUserValidationSchema, fetchUserDetailsSchema } from './user.validations';

const getRequestErrors = (schema: Joi.Schema) => {
  return (
    req: Request<any, any, any, any> | AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { params, body } = req as Request;
    const requestBody = { ...params, ...body };

    const { error } = schema.validate(requestBody, {
      abortEarly: false,
      allowUnknown: false
    });

    if (error) {
      const validationError = error.details
        .map((singleError) => errorFormatter(singleError))
        .join(', ');
      return handleErrorResponse(
        res,
        new CustomError({
          message: HTTP_STATUS_MESSAGES.BAD_REQUEST,
          status: HTTP_STATUS.BAD_REQUEST,
          extraMessage: validationError
        })
      );
    }

    return next();
  };
}


/**
 * Formats individual Joi error messages
 */
const errorFormatter = (singleError: Joi.ValidationErrorItem): string => {
  let message = singleError.message.replace(/""/g, '');

  if (isRequired(singleError.message)) {
    return message;
  }

  return message;
}

/**
 * Checks whether a field is required
 */
const isRequired = (message: string): boolean => {
  console.log(message)
  return message.toLowerCase().includes('required');
}


export const validations = {
  userValidations: {
    createUserValidations: getRequestErrors(createUserValidationSchema),
    validateUserId: getRequestErrors(fetchUserDetailsSchema)
  }
}