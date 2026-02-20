import { Request, Response, Router } from 'express'
import { authGuard } from '../guards/auth.guard'
import { createNoteBook, getNoteBookList, updateNoteBook } from '../controllers/noteBook'
import { validations } from '../validations'
const router = Router()

router.get('/list', [authGuard], getNoteBookList)
router.put('/:id',[authGuard], [validations.noteBookValidations.validateNoteBookIdValidations, validations.noteBookValidations.updateNoteBookValidations], updateNoteBook)
router.delete('/:id',[authGuard], [validations.noteBookValidations.validateNoteBookIdValidations], updateNoteBook)
router.post('/',[authGuard], [validations.noteBookValidations.createNoteBookValidations], createNoteBook)

export default router