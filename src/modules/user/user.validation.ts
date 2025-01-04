import Joi from 'joi'
import { CreateUserDTO, UpdateUserDTO, LoginDTO } from '@bhavin-tank/modules/user/user.types'

export const createUserSchema = Joi.object<CreateUserDTO>({
  name: Joi.string().required().min(2).max(50),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
})

export const updateUserSchema = Joi.object<UpdateUserDTO>({
  name: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  isActive: Joi.boolean(),
})

export const loginSchema = Joi.object<LoginDTO>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})
