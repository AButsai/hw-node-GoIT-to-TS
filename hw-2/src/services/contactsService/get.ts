import { Contact } from '../../model/schemasMongoose/contactsSchema.js'

export const getContactByOwnerDb = async (email: string, owner: string) => {
  return await Contact.findOne({ email, owner })
}
