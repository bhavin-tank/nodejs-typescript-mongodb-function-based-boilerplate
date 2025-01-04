import { Request, Response } from 'express'
import createBaseController from '@bhavin-tank/modules/common/base.controller'
import { tryCatchAsync } from '@bhavin-tank/utils/async.utils'
import { sendResponse } from '@bhavin-tank/utils/response.utils'
import { AuthRequest } from '@bhavin-tank/types/express.types'
import userService from '@bhavin-tank/modules/user/user.service'
import { IUser } from '@bhavin-tank/modules/user/user.types'

const baseController = createBaseController<IUser>(userService)

const userController = {
  ...baseController,

  register: tryCatchAsync(async (req: Request, res: Response) => {
    const user = await userService.register(req.body)
    sendResponse(res, 201, true, user)
  }),

  login: tryCatchAsync(async (req: Request, res: Response) => {
    const authData = await userService.login(req.body)
    sendResponse(res, 200, true, authData)
  }),

  getProfile: tryCatchAsync(async (req: AuthRequest, res: Response) => {
    sendResponse(res, 200, true, req.user)
  }),

  updateProfile: tryCatchAsync(async (req: AuthRequest, res: Response) => {
    const user = await userService.updateProfile(req.user!._id as string, req.body)
    sendResponse(res, 200, true, user)
  }),

  changePassword: tryCatchAsync(async (req: AuthRequest, res: Response) => {
    const { oldPassword, newPassword } = req.body
    await userService.changePassword(req.user!._id as string, oldPassword, newPassword)
    sendResponse(res, 200, true, { message: 'Password updated successfully' })
  }),
}

export default userController
