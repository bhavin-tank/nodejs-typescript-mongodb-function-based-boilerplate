import { Request, Response, NextFunction } from 'express'
import { Schema } from 'joi'
import { ValidationError } from '@bhavin-tank/exceptions/http.errors'

export const validate = (schema: Schema) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    })

    if (error) {
      const details = error.details.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }))
      throw new ValidationError('Validation failed', details)
    }

    next()
  }
}
