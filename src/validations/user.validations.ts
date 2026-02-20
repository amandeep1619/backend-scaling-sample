import Joi from 'joi'
import { INVALID_PASSWORD_MESSAGE } from '../lib/constants'

export const createUserValidationSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/)
    .message(
      INVALID_PASSWORD_MESSAGE
    )
    .required()
})

export const updateUserValidationSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).message("Name must be between 30 to 50 characters long"),
  age: Joi.number().min(2).max(100).message("Invalid Age")
})

export const fetchUserDetailsSchema = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid user id'
    })
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
