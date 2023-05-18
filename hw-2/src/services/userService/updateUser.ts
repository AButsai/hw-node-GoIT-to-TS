import { ErrorDataBase } from '../../errors/ErrorProcessing.js'
import { User } from '../../model/schemasMongoose/userSchema.js'

interface IUpdateUser {
  subscription?: string
  avatarURL?: string
  verify?: boolean
  verificationCode?: number
}

export const updateUser = async (email: string, body: IUpdateUser) => {
  try {
    return await User.updateOne({ email }, body, { new: true })
  } catch (error) {
    throw new ErrorDataBase(error)
  }
}
