import { Router } from 'express'
import { authGuard } from '../guards/auth.guard'
import { createNote, deleteNote, getNoteDetails, updateNoteDetails } from '../controllers/notes'
const router = Router()

router.post('/', [authGuard], createNote)
router.get('/:id', [authGuard], getNoteDetails)
router.put('/:id', [authGuard], updateNoteDetails)
router.delete('/:id',[authGuard], deleteNote)

export default router