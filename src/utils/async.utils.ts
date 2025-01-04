import { Request, Response, NextFunction } from 'express'
import AppError from '@bhavin-tank/exceptions/app.error'

export const tryCatchAsync =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next)
    } catch (error) {
      if (error instanceof AppError) {
        next(error)
      } else {
        const errorMessage = error && typeof error === 'object' && 'message' in error ? (error as Error).message : 'Unknown error'

        next(new AppError('Internal Server Error', 500, errorMessage))
      }
    }
  }
