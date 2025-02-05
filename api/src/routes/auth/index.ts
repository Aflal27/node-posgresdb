import express from 'express'
import { loginUser, registerUser } from './authController'
import { validateData } from '../../middleware/validationMiddleware'
import { createUserSchema, loginUserSchema } from '../../db/userSchema'

const router = express.Router()

router.post('/register', validateData(createUserSchema), registerUser)
router.post('/login', validateData(loginUserSchema), loginUser)

export default router
