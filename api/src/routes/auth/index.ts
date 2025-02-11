import express from 'express'
import { loginUser, registerUser } from './authController.js'
import { validateData } from '../../middleware/validationMiddleware.js'
import { createUserSchema, loginUserSchema } from '../../db/userSchema.js'

const router = express.Router()

router.post('/register', validateData(createUserSchema), registerUser)
router.post('/login', validateData(loginUserSchema), loginUser)

export default router
