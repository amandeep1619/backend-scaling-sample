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

export const fetchUserDetailsSchema = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid user id'
    })
});