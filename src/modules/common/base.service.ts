import { Document } from 'mongoose'
import { PaginationParams } from '@bhavin-tank/types/common.types'
import createBaseRepository, { QueryOptions } from '@bhavin-tank/modules/common/base.repository'

export interface ServiceOptions extends QueryOptions {
  user?: any
}

const createBaseService = <T extends Document>(repository: ReturnType<typeof createBaseRepository<T>>) => {
  return {
    findById: async (id: string, options: ServiceOptions = {}) => {
      return repository.findById(id, options)
    },

    findOne: async (filter: any, options: ServiceOptions = {}) => {
      return repository.findOne(filter, options)
    },

    find: async (filter: any = {}, pagination?: PaginationParams, options: ServiceOptions = {}) => {
      return repository.find(filter, pagination, options)
    },

    create: async (data: Partial<T>, options: ServiceOptions = {}) => {
      return repository.create(data, options)
    },

    update: async (id: string, data: Partial<T>, options: ServiceOptions = {}) => {
      return repository.update(id, data, options)
    },

    delete: async (id: string, options: ServiceOptions = {}) => {
      return repository.delete(id, options)
    },

    withTransaction: async <R>(operation: (session: any) => Promise<R>): Promise<R> => {
      return repository.withTransaction(operation)
    },
  }
}

export default createBaseService
