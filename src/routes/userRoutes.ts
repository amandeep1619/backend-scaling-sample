import { Router } from "express";
import { createUser, deleteUserDetails, fetchUserDetails, loginUser, updateUserDetails, verifyUser } from "../controllers/users";
import { validations } from "../validations";
import { authGuard } from "../guards/auth.guard";

const router = Router()

router.get("/activate-user-account", [validations.userValidations.verifyUserValidations], verifyUser)
router.post("/auth/login", [validations.userValidations.loginUserValidation], loginUser)
router.get('/:id', [validations.userValidations.validateUserId, authGuard], fetchUserDetails)
router.post('/', [validations.userValidations.createUserValidations], createUser)
router.put('/:id', [validations.userValidations.validateUserId, validations.userValidations.updateUserValidations, authGuard], updateUserDetails)
router.delete("/:id", [validations.userValidations.validateUserId, authGuard], deleteUserDetails)

export default router