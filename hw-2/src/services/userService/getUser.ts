import { ErrorDataBase } from '../../errors/ErrorProcessing.js'
import { User } from '../../model/schemasMongoose/userSchema.js'

export const getUser = async (field: string, value: string | number, includePassword = false) => {
  const query: { [key: string]: string | number } = {}
  query[field] = value
  try {
    let user = User.findOne(query)
    if (includePassword) {
      user = user.select('-password')
    }
    return await user.exec()
  } catch (error) {
    throw new ErrorDataBase(error)
  }
}
