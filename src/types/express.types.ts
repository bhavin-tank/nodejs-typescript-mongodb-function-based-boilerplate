import { Request } from 'express'
import { IUser } from '@bhavin-tank/modules/user/user.types'

export interface AuthRequest extends Request {
  user?: IUser
}
