import Joi from 'joi'
import { INVALID_PASSWORD_MESSAGE } from '../lib/constants'

export const createUserValidationSchema = Joi.object({
  email: Joi.string().required().email(),
  fullName: Joi.string().required().min(3).max(50).message("Name must be between 30 to 50 characters long"),
  password: Joi.string().required()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/)
    .message(
      INVALID_PASSWORD_MESSAGE
    )
    .required()
})
const userIdValidation = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required()
  .messages({
    'string.pattern.base': 'Invalid user id'
  });

export const fetchUserDetailsSchema = Joi.object({
  id: userIdValidation
});

export const updateUserValidationSchema = Joi.object({
  id: userIdValidation,
  fullName: Joi.string()
    .min(3)
    .max(50)
    .message("Name must be between 3 and 50 characters long")
});

export const verifyUserDetailsSchema = Joi.object({
  token: Joi.string().required()
})

export const loginUserRequestSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/)
    .message(
      INVALID_PASSWORD_MESSAGE
    )
    .required()
})
