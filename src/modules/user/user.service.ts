import jwt from 'jsonwebtoken'
import userRepository from '@bhavin-tank/modules/user/user.repository'
import createBaseService from '@bhavin-tank/modules/common/base.service'
import { IUser, CreateUserDTO, UpdateUserDTO, LoginDTO, AuthResponse } from '@bhavin-tank/modules/user/user.types'
import { ConflictError, UnauthorizedError, NotFoundError } from '@bhavin-tank/exceptions/http.errors'
import config from '@bhavin-tank/config'

const baseService = createBaseService<IUser>(userRepository)

const generateToken = (user: IUser): string => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    config.jwt.secret,
    {
      expiresIn: config.jwt.expiresIn,
    }
  )
}

const userService = {
  ...baseService,

  register: async (userData: CreateUserDTO): Promise<IUser> => {
    const existingUser = await userRepository.findByEmail(userData.email)
    if (existingUser) {
      throw new ConflictError('Email already exists')
    }

    return userRepository.create(userData)
  },

  login: async (credentials: LoginDTO): Promise<AuthResponse> => {
    const user: IUser | null = await userRepository.findByEmail(credentials.email, true)
    if (!user) {
      throw new UnauthorizedError('Invalid credentials')
    }

    const isPasswordValid = await user.comparePassword(credentials.password)
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials')
    }

    if (!user.isActive) {
      throw new UnauthorizedError('Account is inactive')
    }

    // Update last login
    await userRepository.update(user._id as string, {
      lastLoginAt: new Date(),
    })

    const token = generateToken(user)
    return { user, token }
  },

  updateProfile: async (userId: string, data: UpdateUserDTO): Promise<IUser> => {
    if (data.email) {
      const existingUser = await userRepository.findByEmail(data.email)
      if (existingUser && existingUser._id && existingUser._id.toString() !== userId) {
        throw new ConflictError('Email already exists')
      }
    }

    const user = await userRepository.update(userId, data)
    if (!user) {
      throw new NotFoundError('User not found')
    }

    return user
  },

  changePassword: async (userId: string, oldPassword: string, newPassword: string): Promise<void> => {
    const user = await userRepository.findById(userId)

    const isPasswordValid = await user.comparePassword(oldPassword)
    if (!isPasswordValid) {
      throw new UnauthorizedError('Current password is incorrect')
    }

    user.password = newPassword
    await user.save()
  },
}

export default userService
