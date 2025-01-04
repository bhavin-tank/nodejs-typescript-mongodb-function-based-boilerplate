import { Request, Response, NextFunction } from 'express'
import AppError from '@bhavin-tank/exceptions/app.error'
import { sendResponse } from '@bhavin-tank/utils/response.utils'

const errorHandler = (error: Error | AppError, _req: Request, res: Response, _next: NextFunction): void => {
  if (error instanceof AppError) {
    return sendResponse(res, error.statusCode, false, null, error.message, {
      code: error.constructor.name,
      message: error.message,
      details: error.details,
    })
  }

  // Unexpected errors
  const statusCode = 500
  const message = process.env.NODE_ENV === 'production' ? 'Internal Server Error' : error.message

  sendResponse(res, statusCode, false, null, message, {
    code: 'InternalServerError',
    message,
  })
}

export default errorHandler
