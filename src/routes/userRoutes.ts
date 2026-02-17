import { Router } from "express";
import { createUser, deleteUserDetails, fetchUserDetails, updateUserDetails } from "../controllers/users";
import { validations } from "../validations";

const router = Router()

router.get('/:id', [validations.userValidations.validateUserId], fetchUserDetails)
router.post('/', createUser)
router.put('/:id', [validations.userValidations.validateUserId], updateUserDetails)
router.delete("/:id", [validations.userValidations.validateUserId], deleteUserDetails)

export default router