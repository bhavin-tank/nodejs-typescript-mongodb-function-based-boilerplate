import createBaseRepository from '@bhavin-tank/modules/common/base.repository'
import User from '@bhavin-tank/modules/user/user.model'
import { IUser } from '@bhavin-tank/modules/user/user.types'

const baseRepository = createBaseRepository<IUser>(User)

const userRepository = {
  ...baseRepository,

  findByEmail: async (email: string, includePassword = false) => {
    const query = User.findOne({ email })
    if (includePassword) {
      query.select('+password')
    }
    return query.exec()
  },

  findByIds: async (ids: string[]) => {
    return User.find({ _id: { $in: ids } })
  },
}

export default userRepository
