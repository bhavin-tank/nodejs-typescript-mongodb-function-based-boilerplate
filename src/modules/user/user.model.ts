import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser } from '@bhavin-tank/modules/user/user.types'
import config from '@bhavin-tank/config'

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.password
        return ret
      },
    },
  }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, config.bcrypt.saltRounds)
  }
  next()
})

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password)
}

const User = model<IUser>('User', userSchema)

export default User
