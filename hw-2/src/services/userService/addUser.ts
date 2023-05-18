import { ErrorDataBase } from '../../errors/ErrorProcessing.js'
import { User } from '../../model/schemasMongoose/userSchema.js'

export interface IUser {
  email: string
  password: string
  verificationCode: number
}

export const addNewUser = async (body: IUser) => {
  try {
    const newUser = new User(body)
    newUser.save()
    return newUser
  } catch (error) {
    throw new ErrorDataBase(error)
  }
}
