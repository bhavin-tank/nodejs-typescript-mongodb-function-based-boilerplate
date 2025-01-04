import { Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: 'user' | 'admin'
  isActive: boolean
  lastLoginAt?: Date
  comparePassword(password: string): Promise<boolean>
}

export interface CreateUserDTO {
  name: string
  email: string
  password: string
  role?: 'user' | 'admin'
}

export interface UpdateUserDTO {
  name?: string
  email?: string
  password?: string
  isActive?: boolean
}

export interface LoginDTO {
  email: string
  password: string
}

export interface AuthResponse {
  user: Omit<IUser, 'password'>
  token: string
}
