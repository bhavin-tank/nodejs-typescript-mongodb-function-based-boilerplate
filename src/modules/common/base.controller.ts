import { Request, Response } from 'express'
import { Document } from 'mongoose'
import { tryCatchAsync } from '@bhavin-tank/utils/async.utils'
import { sendResponse, sendPaginatedResponse } from '@bhavin-tank/utils/response.utils'
import { PaginationParams } from '@bhavin-tank/types/common.types'
import createBaseService from '@bhavin-tank/modules/common/base.service'

const createBaseController = <T extends Document>(service: ReturnType<typeof createBaseService<T>>) => {
  return {
    find: tryCatchAsync(async (req: Request, res: Response) => {
      const pagination: PaginationParams = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        sortBy: req.query.sortBy as string,
        sortOrder: req.query.sortOrder as 'asc' | 'desc',
      }

      const filter = { ...req.query }
      delete filter.page
      delete filter.limit
      delete filter.sortBy
      delete filter.sortOrder

      const { data, total } = await service.find(filter, pagination)
      sendPaginatedResponse(res, data, total, pagination)
    }),

    findById: tryCatchAsync(async (req: Request, res: Response) => {
      const { id } = req.params
      const resource = await service.findById(id)
      sendResponse(res, 200, true, resource)
    }),

    create: tryCatchAsync(async (req: Request, res: Response) => {
      const resource = await service.create(req.body)
      sendResponse(res, 201, true, resource)
    }),

    update: tryCatchAsync(async (req: Request, res: Response) => {
      const { id } = req.params
      const resource = await service.update(id, req.body)
      sendResponse(res, 200, true, resource)
    }),

    delete: tryCatchAsync(async (req: Request, res: Response) => {
      const { id } = req.params
      await service.delete(id)
      sendResponse(res, 200, true, { message: 'Resource deleted successfully' })
    }),
  }
}

export default createBaseController
