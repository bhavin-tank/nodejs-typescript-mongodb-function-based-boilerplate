import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose'
import { PaginationParams } from '@bhavin-tank/types/common.types'
import { NotFoundError } from '@bhavin-tank/exceptions/http.errors'

export type QueryOptions = {
  select?: string | string[]
  populate?: string | string[]
  session?: any
}

const createBaseRepository = <T extends Document>(model: Model<T>) => {
  return {
    findById: async (id: string, options: QueryOptions = {}): Promise<T> => {
      const query = model.findById(id)

      if (options.select) {
        query.select(options.select)
      }

      if (options.populate) {
        const populates = Array.isArray(options.populate) ? options.populate : [options.populate]
        populates.forEach((path) => query.populate(path))
      }

      const doc = await query.exec()
      if (!doc) {
        throw new NotFoundError(`${model.modelName} not found`)
      }
      return doc
    },

    findOne: async (filter: FilterQuery<T>, options: QueryOptions = {}): Promise<T> => {
      const query = model.findOne(filter)

      if (options.select) {
        query.select(options.select)
      }

      if (options.populate) {
        const populates = Array.isArray(options.populate) ? options.populate : [options.populate]
        populates.forEach((path) => query.populate(path))
      }

      const doc = await query.exec()
      if (!doc) {
        throw new NotFoundError(`${model.modelName} not found`)
      }
      return doc
    },

    find: async (
      filter: FilterQuery<T> = {},
      pagination?: PaginationParams,
      options: QueryOptions = {}
    ): Promise<{ data: T[]; total: number }> => {
      const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination || {}
      const skip = (page - 1) * limit

      const query = model
        .find(filter)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit)

      if (options.select) {
        query.select(options.select)
      }

      if (options.populate) {
        const populates = Array.isArray(options.populate) ? options.populate : [options.populate]
        populates.forEach((path) => query.populate(path))
      }

      const [data, total] = await Promise.all([query.exec(), model.countDocuments(filter)])

      return { data, total }
    },

    create: async (data: Partial<T>, options: QueryOptions = {}): Promise<T> => {
      const doc = new model(data)
      if (options.session) {
        doc.$session(options.session)
      }
      return doc.save()
    },

    update: async (id: string, data: UpdateQuery<T>, options: QueryOptions = {}): Promise<T> => {
      const query = model.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
        session: options.session,
      })

      if (options.select) {
        query.select(options.select)
      }

      if (options.populate) {
        const populates = Array.isArray(options.populate) ? options.populate : [options.populate]
        populates.forEach((path) => query.populate(path))
      }

      const doc = await query.exec()
      if (!doc) {
        throw new NotFoundError(`${model.modelName} not found`)
      }
      return doc
    },

    delete: async (id: string, options: QueryOptions = {}): Promise<void> => {
      const doc = await model.findByIdAndDelete(id, { session: options.session })
      if (!doc) {
        throw new NotFoundError(`${model.modelName} not found`)
      }
    },

    // Transaction support
    withTransaction: async <R>(operation: (session: any) => Promise<R>): Promise<R> => {
      const session = await model.db.startSession()
      session.startTransaction()

      try {
        const result = await operation(session)
        await session.commitTransaction()
        return result
      } catch (error) {
        await session.abortTransaction()
        throw error
      } finally {
        session.endSession()
      }
    },
  }
}

export default createBaseRepository
