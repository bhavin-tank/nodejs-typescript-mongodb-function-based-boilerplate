import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AuthRequest } from '@bhavin-tank/types/express.types'
import { ForbiddenError, UnauthorizedError } from '@bhavin-tank/exceptions/http.errors'
import config from '@bhavin-tank/config'
import userService from '@bhavin-tank/modules/user/user.service'
import { IUser } from '@bhavin-tank/modules/user/user.types'

export const authenticate = async (req: AuthRequest, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return next(new UnauthorizedError('Authentication required'))
    }

    const decoded = jwt.verify(token, config.jwt.secret) as { id: string }
    const user: IUser = await userService.findById(decoded.id)

    if (!user || !user.isActive) {
      return next(new UnauthorizedError('User not found or inactive'))
    }

    req.user = user
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new UnauthorizedError('Invalid token'))
    } else {
      next(error)
    }
  }
}

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError('User not found')
    }

    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError('Insufficient permissions')
    }

    next()
  }
}
