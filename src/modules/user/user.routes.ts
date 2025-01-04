import { Router } from 'express'
import { validate } from '@bhavin-tank/middleware/validation.middleware'
import { authenticate, authorize } from '@bhavin-tank/middleware/auth.middleware'
import userController from '@bhavin-tank/modules/user/user.controller'
import { createUserSchema, updateUserSchema, loginSchema } from '@bhavin-tank/modules/user/user.validation'

const router = Router()

// Public routes
router.post('/register', validate(createUserSchema), userController.register)
router.post('/login', validate(loginSchema), userController.login)

// Protected routes
router.use(authenticate)

// Profile routes
router.get('/profile', userController.getProfile)
router.patch('/profile', validate(updateUserSchema), userController.updateProfile)
router.post('/change-password', userController.changePassword)

// Admin routes
router.use(authorize('admin'))
router.get('/', userController.find)
router.get('/:id', userController.findById)
router.patch('/:id', validate(updateUserSchema), userController.update)
router.delete('/:id', userController.delete)

export default router
