import { Contact } from '../../model/schemasMongoose/contactsSchema.js'

export const getAllContactsDb = async (owner: string, page: number, limit: number) => {
  return Contact.find({ owner }, '', { skip: page * limit, limit })
}
