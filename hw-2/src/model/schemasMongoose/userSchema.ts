import { Document, Schema, model } from 'mongoose'

interface IUser extends Document {
  password: string
  email: string
  subscription: string
  avatarURL: string
  verify: boolean
  verificationCode: number
}

const user = new Schema<IUser>(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (value: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        },
        message: 'Invalid email format',
      },
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
)

export const User = model<IUser>('user', user)
