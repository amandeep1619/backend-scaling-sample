import Joi from 'joi'

export const createNoteBookSchema = Joi.object({
  name: Joi.string().required()
})

export const noteBookIdSchema = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid note book id'
    })
})
