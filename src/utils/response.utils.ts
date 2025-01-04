import { Response } from 'express'
import { ApiResponse, PaginationParams, PaginatedResponse } from '@bhavin-tank/types/common.types'

export const createApiResponse = <T>(
  success: boolean,
  data?: T,
  message?: string,
  error?: ApiResponse<T>['error']
): ApiResponse<T> => ({
  success,
  ...(data && { data }),
  ...(message && { message }),
  ...(error && { error }),
})

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  data?: T,
  message?: string,
  error?: ApiResponse<T>['error']
): void => {
  res.status(statusCode).json(createApiResponse(success, data, message, error))
}

export const createPaginationMeta = (total: number, { page = 1, limit = 10 }: PaginationParams) => {
  const lastPage = Math.ceil(total / limit)

  return {
    total,
    currentPage: page,
    lastPage,
    perPage: limit,
    prev: page > 1 ? page - 1 : null,
    next: page < lastPage ? page + 1 : null,
  }
}

export const sendPaginatedResponse = <T>(res: Response, data: T[], total: number, pagination: PaginationParams): void => {
  const response: PaginatedResponse<T> = {
    data,
    meta: createPaginationMeta(total, pagination),
  }

  sendResponse(res, 200, true, response)
}
