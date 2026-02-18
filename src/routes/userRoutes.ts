import { Router } from "express";
import { createUser, deleteUserDetails, fetchUserDetails, updateUserDetails, verifyUser } from "../controllers/users";
import { validations } from "../validations";

const router = Router()

router.get("/activate-user-account",[validations.userValidations.verifyUserValidations], verifyUser)
router.get('/:id', [validations.userValidations.validateUserId], fetchUserDetails)
router.post('/', [validations.userValidations.createUserValidations], createUser)
router.put('/:id', [validations.userValidations.validateUserId, validations.userValidations.updateUserValidations], updateUserDetails)
router.delete("/:id", [validations.userValidations.validateUserId], deleteUserDetails)

export default router